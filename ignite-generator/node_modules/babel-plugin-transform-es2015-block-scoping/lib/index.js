/* eslint max-len: 0 */

"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _tdz = require("./tdz");

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _lodashObjectValues = require("lodash/object/values");

var _lodashObjectValues2 = _interopRequireDefault(_lodashObjectValues);

var _lodashObjectExtend = require("lodash/object/extend");

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

exports["default"] = function () {
  return {
    visitor: {
      VariableDeclaration: function VariableDeclaration(path, file) {
        var node = path.node;
        var parent = path.parent;
        var scope = path.scope;

        if (!isBlockScoped(node)) return;
        convertBlockScopedToVar(path, parent, scope, true);

        if (node._tdzThis) {
          var nodes = [node];

          for (var i = 0; i < node.declarations.length; i++) {
            var decl = node.declarations[i];
            if (decl.init) {
              var assign = t.assignmentExpression("=", decl.id, decl.init);
              assign._ignoreBlockScopingTDZ = true;
              nodes.push(t.expressionStatement(assign));
            }
            decl.init = file.addHelper("temporalUndefined");
          }

          node._blockHoist = 2;

          if (path.isCompletionRecord()) {
            // ensure we don't break completion record semantics by returning
            // the initialiser of the last declarator
            nodes.push(t.expressionStatement(scope.buildUndefinedNode()));
          }

          path.replaceWithMultiple(nodes);
        }
      },

      Loop: function Loop(path, file) {
        var node = path.node;
        var parent = path.parent;
        var scope = path.scope;

        t.ensureBlock(node);
        var blockScoping = new BlockScoping(path, path.get("body"), parent, scope, file);
        var replace = blockScoping.run();
        if (replace) path.replaceWith(replace);
      },

      "BlockStatement|Program": function BlockStatementProgram(path, file) {
        if (!t.isLoop(path.parent)) {
          var blockScoping = new BlockScoping(null, path, path.parent, path.scope, file);
          blockScoping.run();
        }
      }
    }
  };
};

var buildRetCheck = _babelTemplate2["default"]("\n  if (typeof RETURN === \"object\") return RETURN.v;\n");

function isBlockScoped(node) {
  if (!t.isVariableDeclaration(node)) return false;
  if (node[t.BLOCK_SCOPED_SYMBOL]) return true;
  if (node.kind !== "let" && node.kind !== "const") return false;
  return true;
}

function convertBlockScopedToVar(path, parent, scope) {
  var moveBindingsToParent = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
  var node = path.node;

  // https://github.com/babel/babel/issues/255
  if (!t.isFor(parent)) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      declar.init = declar.init || scope.buildUndefinedNode();
    }
  }

  node[t.BLOCK_SCOPED_SYMBOL] = true;
  node.kind = "var";

  // Move bindings from current block scope to function scope.
  if (moveBindingsToParent) {
    var parentScope = scope.getFunctionParent();
    var ids = path.getBindingIdentifiers();
    for (var _name in ids) {
      var binding = scope.getOwnBinding(_name);
      if (binding) binding.kind = "var";
      scope.moveBindingTo(_name, parentScope);
    }
  }
}

function isVar(node) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !isBlockScoped(node);
}

function replace(path, node, scope, remaps) {
  var remap = remaps[node.name];
  if (!remap) return;

  var ownBinding = scope.getBindingIdentifier(node.name);
  if (ownBinding === remap.binding) {
    scope.rename(node.name, remap.uid);
  } else {
    // scope already has it's own binding that doesn't
    // match the one we have a stored replacement for
    if (path) path.skip();
  }
}

var replaceVisitor = {
  ReferencedIdentifier: function ReferencedIdentifier(path, remaps) {
    replace(path, path.node, path.scope, remaps);
  },

  AssignmentExpression: function AssignmentExpression(path, remaps) {
    var ids = path.getBindingIdentifiers();
    for (var _name2 in ids) {
      replace(null, ids[_name2], path.scope, remaps);
    }
  }
};

function traverseReplace(node, parent, scope, remaps) {
  if (t.isIdentifier(node)) {
    replace(node, parent, scope, remaps);
  }

  if (t.isAssignmentExpression(node)) {
    var ids = t.getBindingIdentifiers(node);
    for (var _name3 in ids) {
      replace(ids[_name3], parent, scope, remaps);
    }
  }

  scope.traverse(node, replaceVisitor, remaps);
}

var letReferenceBlockVisitor = _babelTraverse2["default"].visitors.merge([{
  Function: function Function(path, state) {
    path.traverse(letReferenceFunctionVisitor, state);
    return path.skip();
  }
}, _tdz.visitor]);

var letReferenceFunctionVisitor = _babelTraverse2["default"].visitors.merge([{
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    var ref = state.letReferences[path.node.name];

    // not a part of our scope
    if (!ref) return;

    // this scope has a variable with the same name so it couldn't belong
    // to our let scope
    var localBinding = path.scope.getBindingIdentifier(path.node.name);
    if (localBinding && localBinding !== ref) return;

    state.closurify = true;
  }
}, _tdz.visitor]);

var hoistVarDeclarationsVisitor = {
  enter: function enter(path, self) {
    var node = path.node;
    var parent = path.parent;

    if (path.isForStatement()) {
      if (isVar(node.init, node)) {
        var nodes = self.pushDeclar(node.init);
        if (nodes.length === 1) {
          node.init = nodes[0];
        } else {
          node.init = t.sequenceExpression(nodes);
        }
      }
    } else if (path.isFor()) {
      if (isVar(node.left, node)) {
        self.pushDeclar(node.left);
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node, parent)) {
      path.replaceWithMultiple(self.pushDeclar(node).map(function (expr) {
        return t.expressionStatement(expr);
      }));
    } else if (path.isFunction()) {
      return path.skip();
    }
  }
};

var loopLabelVisitor = {
  LabeledStatement: function LabeledStatement(_ref, state) {
    var node = _ref.node;

    state.innerLabels.push(node.label.name);
  }
};

var continuationVisitor = {
  enter: function enter(path, state) {
    if (path.isAssignmentExpression() || path.isUpdateExpression()) {
      var bindings = path.getBindingIdentifiers();
      for (var _name4 in bindings) {
        if (state.outsideReferences[_name4] !== path.scope.getBindingIdentifier(_name4)) continue;
        state.reassignments[_name4] = true;
      }
    }
  }
};

function loopNodeTo(node) {
  if (t.isBreakStatement(node)) {
    return "break";
  } else if (t.isContinueStatement(node)) {
    return "continue";
  }
}

var loopVisitor = {
  Loop: function Loop(path, state) {
    var oldIgnoreLabeless = state.ignoreLabeless;
    state.ignoreLabeless = true;
    path.traverse(loopVisitor, state);
    state.ignoreLabeless = oldIgnoreLabeless;
    path.skip();
  },

  Function: function Function(path) {
    path.skip();
  },

  SwitchCase: function SwitchCase(path, state) {
    var oldInSwitchCase = state.inSwitchCase;
    state.inSwitchCase = true;
    path.traverse(loopVisitor, state);
    state.inSwitchCase = oldInSwitchCase;
    path.skip();
  },

  "BreakStatement|ContinueStatement|ReturnStatement": function BreakStatementContinueStatementReturnStatement(path, state) {
    var node = path.node;
    var parent = path.parent;
    var scope = path.scope;

    if (node[this.LOOP_IGNORE]) return;

    var replace = undefined;
    var loopText = loopNodeTo(node);

    if (loopText) {
      if (node.label) {
        // we shouldn't be transforming this because it exists somewhere inside
        if (state.innerLabels.indexOf(node.label.name) >= 0) {
          return;
        }

        loopText = loopText + "|" + node.label.name;
      } else {
        // we shouldn't be transforming these statements because
        // they don't refer to the actual loop we're scopifying
        if (state.ignoreLabeless) return;

        //
        if (state.inSwitchCase) return;

        // break statements mean something different in this context
        if (t.isBreakStatement(node) && t.isSwitchCase(parent)) return;
      }

      state.hasBreakContinue = true;
      state.map[loopText] = node;
      replace = t.stringLiteral(loopText);
    }

    if (path.isReturnStatement()) {
      state.hasReturn = true;
      replace = t.objectExpression([t.objectProperty(t.identifier("v"), node.argument || scope.buildUndefinedNode())]);
    }

    if (replace) {
      replace = t.returnStatement(replace);
      replace[this.LOOP_IGNORE] = true;
      path.skip();
      path.replaceWith(t.inherits(replace, node));
    }
  }
};

var BlockScoping = (function () {
  function BlockScoping(loopPath, blockPath, parent, scope, file) {
    _classCallCheck(this, BlockScoping);

    this.parent = parent;
    this.scope = scope;
    this.file = file;

    this.blockPath = blockPath;
    this.block = blockPath.node;

    this.outsideLetReferences = _Object$create(null);
    this.hasLetReferences = false;
    this.letReferences = _Object$create(null);
    this.body = [];

    if (loopPath) {
      this.loopParent = loopPath.parent;
      this.loopLabel = t.isLabeledStatement(this.loopParent) && this.loopParent.label;
      this.loopPath = loopPath;
      this.loop = loopPath.node;
    }
  }

  /**
   * Start the ball rolling.
   */

  BlockScoping.prototype.run = function run() {
    var block = this.block;
    if (block._letDone) return;
    block._letDone = true;

    var needsClosure = this.getLetReferences();

    // this is a block within a `Function/Program` so we can safely leave it be
    if (t.isFunction(this.parent) || t.isProgram(this.block)) {
      this.updateScopeInfo();
      return;
    }

    // we can skip everything
    if (!this.hasLetReferences) return;

    if (needsClosure) {
      this.wrapClosure();
    } else {
      this.remap();
    }

    this.updateScopeInfo();

    if (this.loopLabel && !t.isLabeledStatement(this.loopParent)) {
      return t.labeledStatement(this.loopLabel, this.loop);
    }
  };

  BlockScoping.prototype.updateScopeInfo = function updateScopeInfo() {
    var scope = this.scope;
    var parentScope = scope.getFunctionParent();
    var letRefs = this.letReferences;

    for (var key in letRefs) {
      var ref = letRefs[key];
      var binding = scope.getBinding(ref.name);
      if (!binding) continue;
      if (binding.kind === "let" || binding.kind === "const") {
        binding.kind = "var";
        scope.moveBindingTo(ref.name, parentScope);
      }
    }
  };

  BlockScoping.prototype.remap = function remap() {
    var hasRemaps = false;
    var letRefs = this.letReferences;
    var scope = this.scope;

    // alright, so since we aren't wrapping this block in a closure
    // we have to check if any of our let variables collide with
    // those in upper scopes and then if they do, generate a uid
    // for them and replace all references with it
    var remaps = _Object$create(null);

    for (var key in letRefs) {
      // just an Identifier node we collected in `getLetReferences`
      // this is the defining identifier of a declaration
      var ref = letRefs[key];

      // todo: could skip this if the colliding binding is in another function
      if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
        var uid = scope.generateUidIdentifier(ref.name).name;
        ref.name = uid;

        hasRemaps = true;
        remaps[key] = remaps[uid] = {
          binding: ref,
          uid: uid
        };
      }
    }

    if (!hasRemaps) return;

    //

    var loop = this.loop;
    if (loop) {
      traverseReplace(loop.right, loop, scope, remaps);
      traverseReplace(loop.test, loop, scope, remaps);
      traverseReplace(loop.update, loop, scope, remaps);
    }

    this.blockPath.traverse(replaceVisitor, remaps);
  };

  BlockScoping.prototype.wrapClosure = function wrapClosure() {
    var block = this.block;

    var outsideRefs = this.outsideLetReferences;

    // remap loop heads with colliding variables
    if (this.loop) {
      for (var _name5 in outsideRefs) {
        var id = outsideRefs[_name5];

        if (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) {
          delete outsideRefs[id.name];
          delete this.letReferences[id.name];

          this.scope.rename(id.name);

          this.letReferences[id.name] = id;
          outsideRefs[id.name] = id;
        }
      }
    }

    // if we're inside of a for loop then we search to see if there are any
    // `break`s, `continue`s, `return`s etc
    this.has = this.checkLoop();

    // hoist let references to retain scope
    this.hoistVarDeclarations();

    // turn outsideLetReferences into an array
    var params = _lodashObjectValues2["default"](outsideRefs);
    var args = _lodashObjectValues2["default"](outsideRefs);

    // build the closure that we're going to wrap the block with
    var fn = t.functionExpression(null, params, t.blockStatement(block.body));
    fn.shadow = true;

    // continuation
    this.addContinuations(fn);

    // replace the current block body with the one we're going to build
    block.body = this.body;

    var ref = fn;

    if (this.loop) {
      ref = this.scope.generateUidIdentifier("loop");
      this.loopPath.insertBefore(t.variableDeclaration("var", [t.variableDeclarator(ref, fn)]));
    }

    // build a call and a unique id that we can assign the return value to
    var call = t.callExpression(ref, args);
    var ret = this.scope.generateUidIdentifier("ret");

    // handle generators
    var hasYield = _babelTraverse2["default"].hasType(fn.body, this.scope, "YieldExpression", t.FUNCTION_TYPES);
    if (hasYield) {
      fn.generator = true;
      call = t.yieldExpression(call, true);
    }

    // handlers async functions
    var hasAsync = _babelTraverse2["default"].hasType(fn.body, this.scope, "AwaitExpression", t.FUNCTION_TYPES);
    if (hasAsync) {
      fn.async = true;
      call = t.awaitExpression(call);
    }

    this.buildClosure(ret, call);
  };

  /**
   * Push the closure to the body.
   */

  BlockScoping.prototype.buildClosure = function buildClosure(ret, call) {
    var has = this.has;
    if (has.hasReturn || has.hasBreakContinue) {
      this.buildHas(ret, call);
    } else {
      this.body.push(t.expressionStatement(call));
    }
  };

  /**
   * If any of the outer let variables are reassigned then we need to rename them in
   * the closure so we can get direct access to the outer variable to continue the
   * iteration with bindings based on each iteration.
   *
   * Reference: https://github.com/babel/babel/issues/1078
   */

  BlockScoping.prototype.addContinuations = function addContinuations(fn) {
    var state = {
      reassignments: {},
      outsideReferences: this.outsideLetReferences
    };

    this.scope.traverse(fn, continuationVisitor, state);

    for (var i = 0; i < fn.params.length; i++) {
      var param = fn.params[i];
      if (!state.reassignments[param.name]) continue;

      var newParam = this.scope.generateUidIdentifier(param.name);
      fn.params[i] = newParam;

      this.scope.rename(param.name, newParam.name, fn);

      // assign outer reference as it's been modified internally and needs to be retained
      fn.body.body.push(t.expressionStatement(t.assignmentExpression("=", param, newParam)));
    }
  };

  BlockScoping.prototype.getLetReferences = function getLetReferences() {
    var block = this.block;

    var declarators = [];

    if (this.loop) {
      var init = this.loop.left || this.loop.init;
      if (isBlockScoped(init)) {
        declarators.push(init);
        _lodashObjectExtend2["default"](this.outsideLetReferences, t.getBindingIdentifiers(init));
      }
    }

    //
    if (block.body) {
      for (var i = 0; i < block.body.length; i++) {
        var declar = block.body[i];
        if (t.isClassDeclaration(declar) || t.isFunctionDeclaration(declar) || isBlockScoped(declar)) {
          var declarPath = this.blockPath.get("body")[i];
          if (isBlockScoped(declar)) {
            convertBlockScopedToVar(declarPath, block, this.scope);
          }
          declarators = declarators.concat(declar.declarations || declar);
        }
      }
    }

    //
    for (var i = 0; i < declarators.length; i++) {
      var declar = declarators[i];
      var keys = t.getBindingIdentifiers(declar);
      _lodashObjectExtend2["default"](this.letReferences, keys);
      this.hasLetReferences = true;
    }

    // no let references so we can just quit
    if (!this.hasLetReferences) return;

    var state = {
      letReferences: this.letReferences,
      closurify: false,
      file: this.file
    };

    // traverse through this block, stopping on functions and checking if they
    // contain any local let references
    this.blockPath.traverse(letReferenceBlockVisitor, state);

    return state.closurify;
  };

  /**
   * If we're inside of a loop then traverse it and check if it has one of
   * the following node types `ReturnStatement`, `BreakStatement`,
   * `ContinueStatement` and replace it with a return value that we can track
   * later on.
   */

  BlockScoping.prototype.checkLoop = function checkLoop() {
    var state = {
      hasBreakContinue: false,
      ignoreLabeless: false,
      inSwitchCase: false,
      innerLabels: [],
      hasReturn: false,
      isLoop: !!this.loop,
      map: {},
      LOOP_IGNORE: _Symbol()
    };

    this.blockPath.traverse(loopLabelVisitor, state);
    this.blockPath.traverse(loopVisitor, state);

    return state;
  };

  /**
   * Hoist all let declarations in this block to before it so they retain scope
   * once we wrap everything in a closure.
   */

  BlockScoping.prototype.hoistVarDeclarations = function hoistVarDeclarations() {
    this.blockPath.traverse(hoistVarDeclarationsVisitor, this);
  };

  /**
   * Turn a `VariableDeclaration` into an array of `AssignmentExpressions` with
   * their declarations hoisted to before the closure wrapper.
   */

  BlockScoping.prototype.pushDeclar = function pushDeclar(node) {
    var declars = [];
    var names = t.getBindingIdentifiers(node);
    for (var _name6 in names) {
      declars.push(t.variableDeclarator(names[_name6]));
    }

    this.body.push(t.variableDeclaration(node.kind, declars));

    var replace = [];

    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      if (!declar.init) continue;

      var expr = t.assignmentExpression("=", declar.id, declar.init);
      replace.push(t.inherits(expr, declar));
    }

    return replace;
  };

  BlockScoping.prototype.buildHas = function buildHas(ret, call) {
    var body = this.body;

    body.push(t.variableDeclaration("var", [t.variableDeclarator(ret, call)]));

    var retCheck = undefined;
    var has = this.has;
    var cases = [];

    if (has.hasReturn) {
      // typeof ret === "object"
      retCheck = buildRetCheck({
        RETURN: ret
      });
    }

    if (has.hasBreakContinue) {
      for (var key in has.map) {
        cases.push(t.switchCase(t.stringLiteral(key), [has.map[key]]));
      }

      if (has.hasReturn) {
        cases.push(t.switchCase(null, [retCheck]));
      }

      if (cases.length === 1) {
        var single = cases[0];
        body.push(t.ifStatement(t.binaryExpression("===", ret, single.test), single.consequent[0]));
      } else {
        // https://github.com/babel/babel/issues/998
        for (var i = 0; i < cases.length; i++) {
          var caseConsequent = cases[i].consequent[0];
          if (t.isBreakStatement(caseConsequent) && !caseConsequent.label) {
            caseConsequent.label = this.loopLabel = this.loopLabel || this.scope.generateUidIdentifier("loop");
          }
        }

        body.push(t.switchStatement(ret, cases));
      }
    } else {
      if (has.hasReturn) {
        body.push(retCheck);
      }
    }
  };

  return BlockScoping;
})();

module.exports = exports["default"];