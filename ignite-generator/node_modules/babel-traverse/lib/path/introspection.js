// This file contains methods responsible for introspecting the current path for certain values.

"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.matchesPattern = matchesPattern;
exports.has = has;
exports.isStatic = isStatic;
exports.isnt = isnt;
exports.equals = equals;
exports.isNodeType = isNodeType;
exports.canHaveVariableDeclarationOrExpression = canHaveVariableDeclarationOrExpression;
exports.canSwapBetweenExpressionAndStatement = canSwapBetweenExpressionAndStatement;
exports.isCompletionRecord = isCompletionRecord;
exports.isStatementOrBlock = isStatementOrBlock;
exports.referencesImport = referencesImport;
exports.getSource = getSource;
exports.willIMaybeExecuteBefore = willIMaybeExecuteBefore;
exports._guessExecutionStatusRelativeTo = _guessExecutionStatusRelativeTo;
exports._guessExecutionStatusRelativeToDifferentFunctions = _guessExecutionStatusRelativeToDifferentFunctions;
exports.resolve = resolve;
exports._resolve = _resolve;

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

/**
 * Match the current node if it matches the provided `pattern`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */

function matchesPattern(pattern, allowPartial) {
  // not a member expression
  if (!this.isMemberExpression()) return false;

  var parts = pattern.split(".");
  var search = [this.node];
  var i = 0;

  function matches(name) {
    var part = parts[i];
    return part === "*" || name === part;
  }

  while (search.length) {
    var node = search.shift();

    if (allowPartial && i === parts.length) {
      return true;
    }

    if (t.isIdentifier(node)) {
      // this part doesn't match
      if (!matches(node.name)) return false;
    } else if (t.isLiteral(node)) {
      // this part doesn't match
      if (!matches(node.value)) return false;
    } else if (t.isMemberExpression(node)) {
      if (node.computed && !t.isLiteral(node.property)) {
        // we can't deal with this
        return false;
      } else {
        search.unshift(node.property);
        search.unshift(node.object);
        continue;
      }
    } else if (t.isThisExpression(node)) {
      if (!matches("this")) return false;
    } else {
      // we can't deal with this
      return false;
    }

    // too many parts
    if (++i > parts.length) {
      return false;
    }
  }

  return i === parts.length;
}

/**
 * Check whether we have the input `key`. If the `key` references an array then we check
 * if the array has any items, otherwise we just check if it's falsy.
 */

function has(key) {
  var val = this.node && this.node[key];
  if (val && Array.isArray(val)) {
    return !!val.length;
  } else {
    return !!val;
  }
}

/**
 * Description
 */

function isStatic() {
  return this.scope.isStatic(this.node);
}

/**
 * Alias of `has`.
 */

var is = has;

exports.is = is;
/**
 * Opposite of `has`.
 */

function isnt(key) {
  return !this.has(key);
}

/**
 * Check whether the path node `key` strict equals `value`.
 */

function equals(key, value) {
  return this.node[key] === value;
}

/**
 * Check the type against our stored internal type of the node. This is handy when a node has
 * been removed yet we still internally know the type and need it to calculate node replacement.
 */

function isNodeType(type) {
  return t.isType(this.type, type);
}

/**
 * This checks whether or not we're in one of the following positions:
 *
 *   for (KEY in right);
 *   for (KEY;;);
 *
 * This is because these spots allow VariableDeclarations AND normal expressions so we need
 * to tell the path replacement that it's ok to replace this with an expression.
 */

function canHaveVariableDeclarationOrExpression() {
  return (this.key === "init" || this.key === "left") && this.parentPath.isFor();
}

/**
 * This checks whether we are swapping an arrow function's body between an
 * expression and a block statement (or vice versa).
 *
 * This is because arrow functions may implicitly return an expression, which
 * is the same as containing a block statement.
 */

function canSwapBetweenExpressionAndStatement(replacement) {
  if (this.key !== "body" || !this.parentPath.isArrowFunctionExpression()) {
    return false;
  }

  if (this.isExpression()) {
    return t.isBlockStatement(replacement);
  } else if (this.isBlockStatement()) {
    return t.isExpression(replacement);
  }

  return false;
}

/**
 * Check whether the current path references a completion record
 */

function isCompletionRecord(allowInsideFunction) {
  var path = this;
  var first = true;

  do {
    var container = path.container;

    // we're in a function so can't be a completion record
    if (path.isFunction() && !first) {
      return !!allowInsideFunction;
    }

    first = false;

    // check to see if we're the last item in the container and if we are
    // we're a completion record!
    if (Array.isArray(container) && path.key !== container.length - 1) {
      return false;
    }
  } while ((path = path.parentPath) && !path.isProgram());

  return true;
}

/**
 * Check whether or not the current `key` allows either a single statement or block statement
 * so we can explode it if necessary.
 */

function isStatementOrBlock() {
  if (this.parentPath.isLabeledStatement() || t.isBlockStatement(this.container)) {
    return false;
  } else {
    return _lodashCollectionIncludes2["default"](t.STATEMENT_OR_BLOCK_KEYS, this.key);
  }
}

/**
 * Check if the currently assigned path references the `importName` of `moduleSource`.
 */

function referencesImport(moduleSource, importName) {
  if (!this.isReferencedIdentifier()) return false;

  var binding = this.scope.getBinding(this.node.name);
  if (!binding || binding.kind !== "module") return false;

  var path = binding.path;
  var parent = path.parentPath;
  if (!parent.isImportDeclaration()) return false;

  // check moduleSource
  if (parent.node.source.value === moduleSource) {
    if (!importName) return true;
  } else {
    return false;
  }

  if (path.isImportDefaultSpecifier() && importName === "default") {
    return true;
  }

  if (path.isImportNamespaceSpecifier() && importName === "*") {
    return true;
  }

  if (path.isImportSpecifier() && path.node.imported.name === importName) {
    return true;
  }

  return false;
}

/**
 * Get the source code associated with this node.
 */

function getSource() {
  var node = this.node;
  if (node.end) {
    return this.hub.file.code.slice(node.start, node.end);
  } else {
    return "";
  }
}

function willIMaybeExecuteBefore(target) {
  return this._guessExecutionStatusRelativeTo(target) !== "after";
}

/**
 * Given a `target` check the execution status of it relative to the current path.
 *
 * "Execution status" simply refers to where or not we **think** this will execuete
 * before or after the input `target` element.
 */

function _guessExecutionStatusRelativeTo(target) {
  // check if the two paths are in different functions, we can't track execution of these
  var targetFuncParent = target.scope.getFunctionParent();
  var selfFuncParent = this.scope.getFunctionParent();

  // here we check the `node` equality as sometimes we may have different paths for the
  // same node due to path thrashing
  if (targetFuncParent.node !== selfFuncParent.node) {
    var _status = this._guessExecutionStatusRelativeToDifferentFunctions(targetFuncParent);
    if (_status) {
      return _status;
    } else {
      target = targetFuncParent.path;
    }
  }

  var targetPaths = target.getAncestry();
  if (targetPaths.indexOf(this) >= 0) return "after";

  var selfPaths = this.getAncestry();

  // get ancestor where the branches intersect
  var commonPath = undefined;
  var targetIndex = undefined;
  var selfIndex = undefined;
  for (selfIndex = 0; selfIndex < selfPaths.length; selfIndex++) {
    var selfPath = selfPaths[selfIndex];
    targetIndex = targetPaths.indexOf(selfPath);
    if (targetIndex >= 0) {
      commonPath = selfPath;
      break;
    }
  }
  if (!commonPath) {
    return "before";
  }

  // get the relationship paths that associate these nodes to their common ancestor
  var targetRelationship = targetPaths[targetIndex - 1];
  var selfRelationship = selfPaths[selfIndex - 1];
  if (!targetRelationship || !selfRelationship) {
    return "before";
  }

  // container list so let's see which one is after the other
  if (targetRelationship.listKey && targetRelationship.container === selfRelationship.container) {
    return targetRelationship.key > selfRelationship.key ? "before" : "after";
  }

  // otherwise we're associated by a parent node, check which key comes before the other
  var targetKeyPosition = t.VISITOR_KEYS[targetRelationship.type].indexOf(targetRelationship.key);
  var selfKeyPosition = t.VISITOR_KEYS[selfRelationship.type].indexOf(selfRelationship.key);
  return targetKeyPosition > selfKeyPosition ? "before" : "after";
}

function _guessExecutionStatusRelativeToDifferentFunctions(targetFuncParent) {
  var targetFuncPath = targetFuncParent.path;
  if (!targetFuncPath.isFunctionDeclaration()) return;

  // so we're in a completely different function, if this is a function declaration
  // then we can be a bit smarter and handle cases where the function is either
  // a. not called at all (part of an export)
  // b. called directly
  var binding = targetFuncPath.scope.getBinding(targetFuncPath.node.id.name);

  // no references!
  if (!binding.references) return "before";

  var referencePaths = binding.referencePaths;

  // verify that all of the references are calls
  for (var _i = 0; _i < referencePaths.length; _i++) {
    var path = referencePaths[_i];
    if (path.key !== "callee" || !path.parentPath.isCallExpression()) {
      return;
    }
  }

  var allStatus = undefined;

  // verify that all the calls have the same execution status
  for (var _i2 = 0; _i2 < referencePaths.length; _i2++) {
    var path = referencePaths[_i2];
    // if a reference is a child of the function we're checking against then we can
    // safelty ignore it
    var childOfFunction = !!path.find(function (path) {
      return path.node === targetFuncPath.node;
    });
    if (childOfFunction) continue;

    var _status2 = this._guessExecutionStatusRelativeTo(path);

    if (allStatus) {
      if (allStatus !== _status2) return;
    } else {
      allStatus = _status2;
    }
  }

  return allStatus;
}

/**
 * Resolve a "pointer" `NodePath` to it's absolute path.
 */

function resolve(dangerous, resolved) {
  return this._resolve(dangerous, resolved) || this;
}

function _resolve(dangerous, resolved) {
  // istanbul ignore next

  var _this = this;

  // detect infinite recursion
  // todo: possibly have a max length on this just to be safe
  if (resolved && resolved.indexOf(this) >= 0) return;

  // we store all the paths we've "resolved" in this array to prevent infinite recursion
  resolved = resolved || [];
  resolved.push(this);

  if (this.isVariableDeclarator()) {
    if (this.get("id").isIdentifier()) {
      return this.get("init").resolve(dangerous, resolved);
    } else {
      // otherwise it's a request for a pattern and that's a bit more tricky
    }
  } else if (this.isReferencedIdentifier()) {
      var binding = this.scope.getBinding(this.node.name);
      if (!binding) return;

      // reassigned so we can't really resolve it
      if (!binding.constant) return;

      // todo - lookup module in dependency graph
      if (binding.kind === "module") return;

      if (binding.path !== this) {
        var _ret = (function () {
          var ret = binding.path.resolve(dangerous, resolved);
          // If the identifier resolves to parent node then we can't really resolve it.
          if (_this.find(function (parent) {
            return parent.node === ret.node;
          })) return {
              v: undefined
            };
          return {
            v: ret
          };
        })();

        // istanbul ignore next
        if (typeof _ret === "object") return _ret.v;
      }
    } else if (this.isTypeCastExpression()) {
      return this.get("expression").resolve(dangerous, resolved);
    } else if (dangerous && this.isMemberExpression()) {
      // this is dangerous, as non-direct target assignments will mutate it's state
      // making this resolution inaccurate

      var targetKey = this.toComputedKey();
      if (!t.isLiteral(targetKey)) return;

      var targetName = targetKey.value;

      var target = this.get("object").resolve(dangerous, resolved);

      if (target.isObjectExpression()) {
        var props = target.get("properties");
        var _arr = props;
        for (var _i3 = 0; _i3 < _arr.length; _i3++) {
          var prop = _arr[_i3];
          if (!prop.isProperty()) continue;

          var key = prop.get("key");

          // { foo: obj }
          var match = prop.isnt("computed") && key.isIdentifier({ name: targetName });

          // { "foo": "obj" } or { ["foo"]: "obj" }
          match = match || key.isLiteral({ value: targetName });

          if (match) return prop.get("value").resolve(dangerous, resolved);
        }
      } else if (target.isArrayExpression() && !isNaN(+targetName)) {
        var elems = target.get("elements");
        var elem = elems[targetName];
        if (elem) return elem.resolve(dangerous, resolved);
      }
    }
}