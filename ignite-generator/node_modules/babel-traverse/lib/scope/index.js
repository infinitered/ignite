/* eslint max-len: 0 */

"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _repeating = require("repeating");

var _repeating2 = _interopRequireDefault(_repeating);

var _libRenamer = require("./lib/renamer");

var _libRenamer2 = _interopRequireDefault(_libRenamer);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _lodashObjectDefaults = require("lodash/object/defaults");

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _binding = require("./binding");

var _binding2 = _interopRequireDefault(_binding);

var _globals = require("globals");

var _globals2 = _interopRequireDefault(_globals);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _cache = require("../cache");

// Number of calls to the crawl method to figure out whether we're
// somewhere inside a call that was trigerred by call. This is meant
// to be used to figure out whether a warning should be trigerred.
// See `warnOnFlowBinding`.
var _crawlCallsCount = 0;

/**
 * To avoid creating a new Scope instance for each traversal, we maintain a cache on the
 * node itself containing all scopes it has been associated with.
 */

function getCache(path, parentScope, self) {
  var scopes = _cache.scope.get(path.node) || [];

  for (var _i = 0; _i < scopes.length; _i++) {
    var scope = scopes[_i];
    if (scope.parent === parentScope && scope.path === path) return scope;
  }

  scopes.push(self);

  if (!_cache.scope.has(path.node)) {
    _cache.scope.set(path.node, scopes);
  }
}

//

var collectorVisitor = {
  For: function For(path) {
    var _arr = t.FOR_INIT_KEYS;

    for (var _i2 = 0; _i2 < _arr.length; _i2++) {
      var key = _arr[_i2];
      var declar = path.get(key);
      if (declar.isVar()) path.scope.getFunctionParent().registerBinding("var", declar);
    }
  },

  Declaration: function Declaration(path) {
    // delegate block scope handling to the `blockVariableVisitor`
    if (path.isBlockScoped()) return;

    // this will be hit again once we traverse into it after this iteration
    if (path.isExportDeclaration() && path.get("declaration").isDeclaration()) return;

    // TODO(amasad): remove support for flow as bindings (See warning below).
    //if (path.isFlow()) return;

    // we've ran into a declaration!
    path.scope.getFunctionParent().registerDeclaration(path);
  },

  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    state.references.push(path);
  },

  ForXStatement: function ForXStatement(path, state) {
    var left = path.get("left");
    if (left.isPattern() || left.isIdentifier()) {
      state.constantViolations.push(left);
    }
  },

  ExportDeclaration: {
    exit: function exit(_ref5) {
      var node = _ref5.node;
      var scope = _ref5.scope;

      var declar = node.declaration;
      if (t.isClassDeclaration(declar) || t.isFunctionDeclaration(declar)) {
        var _id = declar.id;
        if (!_id) return;

        var binding = scope.getBinding(_id.name);
        if (binding) binding.reference();
      } else if (t.isVariableDeclaration(declar)) {
        var _arr2 = declar.declarations;

        for (var _i3 = 0; _i3 < _arr2.length; _i3++) {
          var decl = _arr2[_i3];
          var ids = t.getBindingIdentifiers(decl);
          for (var _name in ids) {
            var binding = scope.getBinding(_name);
            if (binding) binding.reference();
          }
        }
      }
    }
  },

  LabeledStatement: function LabeledStatement(path) {
    path.scope.getProgramParent().addGlobal(path.node);
    path.scope.getBlockParent().registerDeclaration(path);
  },

  AssignmentExpression: function AssignmentExpression(path, state) {
    state.assignments.push(path);
  },

  UpdateExpression: function UpdateExpression(path, state) {
    state.constantViolations.push(path.get("argument"));
  },

  UnaryExpression: function UnaryExpression(path, state) {
    if (path.node.operator === "delete") {
      state.constantViolations.push(path.get("argument"));
    }
  },

  BlockScoped: function BlockScoped(path) {
    var scope = path.scope;
    if (scope.path === path) scope = scope.parent;
    scope.getBlockParent().registerDeclaration(path);
  },

  ClassDeclaration: function ClassDeclaration(path) {
    var id = path.node.id;
    if (!id) return;

    var name = id.name;
    path.scope.bindings[name] = path.scope.getBinding(name);
  },

  Block: function Block(path) {
    var paths = path.get("body");
    var _arr3 = paths;
    for (var _i4 = 0; _i4 < _arr3.length; _i4++) {
      var bodyPath = _arr3[_i4];
      if (bodyPath.isFunctionDeclaration()) {
        path.scope.getBlockParent().registerDeclaration(bodyPath);
      }
    }
  }
};

var uid = 0;

var Scope = (function () {

  /**
   * This searches the current "scope" and collects all references/bindings
   * within.
   */

  function Scope(path, parentScope) {
    _classCallCheck(this, Scope);

    if (parentScope && parentScope.block === path.node) {
      return parentScope;
    }

    var cached = getCache(path, parentScope, this);
    if (cached) return cached;

    this.uid = uid++;
    this.parent = parentScope;
    this.hub = path.hub;

    this.parentBlock = path.parent;
    this.block = path.node;
    this.path = path;
  }

  /**
   * Globals.
   */

  /**
   * Traverse node with current scope and path.
   */

  Scope.prototype.traverse = function traverse(node, opts, state) {
    _index2["default"](node, opts, this, state, this.path);
  };

  /**
   * Generate a unique identifier and add it to the current scope.
   */

  Scope.prototype.generateDeclaredUidIdentifier = function generateDeclaredUidIdentifier() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "temp" : arguments[0];

    var id = this.generateUidIdentifier(name);
    this.push({ id: id });
    return id;
  };

  /**
   * Generate a unique identifier.
   */

  Scope.prototype.generateUidIdentifier = function generateUidIdentifier() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "temp" : arguments[0];

    return t.identifier(this.generateUid(name));
  };

  /**
   * Generate a unique `_id1` binding.
   */

  Scope.prototype.generateUid = function generateUid() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "temp" : arguments[0];

    name = t.toIdentifier(name).replace(/^_+/, "").replace(/[0-9]+$/g, "");

    var uid = undefined;
    var i = 0;
    do {
      uid = this._generateUid(name, i);
      i++;
    } while (this.hasBinding(uid) || this.hasGlobal(uid) || this.hasReference(uid));

    var program = this.getProgramParent();
    program.references[uid] = true;
    program.uids[uid] = true;

    return uid;
  };

  /**
   * Generate an `_id1`.
   */

  Scope.prototype._generateUid = function _generateUid(name, i) {
    var id = name;
    if (i > 1) id += i;
    return "_" + id;
  };

  /**
   * Generate a unique identifier based on a node.
   */

  Scope.prototype.generateUidIdentifierBasedOnNode = function generateUidIdentifierBasedOnNode(parent, defaultName) {
    var node = parent;

    if (t.isAssignmentExpression(parent)) {
      node = parent.left;
    } else if (t.isVariableDeclarator(parent)) {
      node = parent.id;
    } else if (t.isObjectProperty(node) || t.isObjectMethod(node)) {
      node = node.key;
    }

    var parts = [];

    var add = function add(node) {
      if (t.isModuleDeclaration(node)) {
        if (node.source) {
          add(node.source);
        } else if (node.specifiers && node.specifiers.length) {
          var _arr4 = node.specifiers;

          for (var _i5 = 0; _i5 < _arr4.length; _i5++) {
            var specifier = _arr4[_i5];
            add(specifier);
          }
        } else if (node.declaration) {
          add(node.declaration);
        }
      } else if (t.isModuleSpecifier(node)) {
        add(node.local);
      } else if (t.isMemberExpression(node)) {
        add(node.object);
        add(node.property);
      } else if (t.isIdentifier(node)) {
        parts.push(node.name);
      } else if (t.isLiteral(node)) {
        parts.push(node.value);
      } else if (t.isCallExpression(node)) {
        add(node.callee);
      } else if (t.isObjectExpression(node) || t.isObjectPattern(node)) {
        var _arr5 = node.properties;

        for (var _i6 = 0; _i6 < _arr5.length; _i6++) {
          var prop = _arr5[_i6];
          add(prop.key || prop.argument);
        }
      }
    };

    add(node);

    var id = parts.join("$");
    id = id.replace(/^_/, "") || defaultName || "ref";

    return this.generateUidIdentifier(id.slice(0, 20));
  };

  /**
   * Determine whether evaluating the specific input `node` is a consequenceless reference. ie.
   * evaluating it wont result in potentially arbitrary code from being ran. The following are
   * whitelisted and determined not to cause side effects:
   *
   *  - `this` expressions
   *  - `super` expressions
   *  - Bound identifiers
   */

  Scope.prototype.isStatic = function isStatic(node) {
    if (t.isThisExpression(node) || t.isSuper(node)) {
      return true;
    }

    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding) {
        return binding.constant;
      } else {
        return this.hasBinding(node.name);
      }
    }

    return false;
  };

  /**
   * Possibly generate a memoised identifier if it is not static and has consequences.
   */

  Scope.prototype.maybeGenerateMemoised = function maybeGenerateMemoised(node, dontPush) {
    if (this.isStatic(node)) {
      return null;
    } else {
      var _id2 = this.generateUidIdentifierBasedOnNode(node);
      if (!dontPush) this.push({ id: _id2 });
      return _id2;
    }
  };

  Scope.prototype.checkBlockScopedCollisions = function checkBlockScopedCollisions(local, kind, name, id) {
    // ignore parameters
    if (kind === "param") return;

    // ignore hoisted functions if there's also a local let
    if (kind === "hoisted" && local.kind === "let") return;

    var duplicate = false;

    // don't allow duplicate bindings to exist alongside
    if (!duplicate) duplicate = kind === "let" || local.kind === "let" || local.kind === "const" || local.kind === "module";

    // don't allow a local of param with a kind of let
    if (!duplicate) duplicate = local.kind === "param" && (kind === "let" || kind === "const");

    if (duplicate) {
      throw this.hub.file.buildCodeFrameError(id, messages.get("scopeDuplicateDeclaration", name), TypeError);
    }
  };

  Scope.prototype.rename = function rename(oldName, newName, block) {
    var binding = this.getBinding(oldName);
    if (binding) {
      newName = newName || this.generateUidIdentifier(oldName).name;
      return new _libRenamer2["default"](binding, oldName, newName).rename(block);
    }
  };

  Scope.prototype._renameFromMap = function _renameFromMap(map, oldName, newName, value) {
    if (map[oldName]) {
      map[newName] = value;
      map[oldName] = null;
    }
  };

  Scope.prototype.dump = function dump() {
    var sep = _repeating2["default"]("-", 60);
    console.log(sep);
    var scope = this;
    do {
      console.log("#", scope.block.type);
      for (var _name2 in scope.bindings) {
        var binding = scope.bindings[_name2];
        console.log(" -", _name2, {
          constant: binding.constant,
          references: binding.references,
          violations: binding.constantViolations.length,
          kind: binding.kind
        });
      }
    } while (scope = scope.parent);
    console.log(sep);
  };

  Scope.prototype.toArray = function toArray(node, i) {
    var file = this.hub.file;

    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding && binding.constant && binding.path.isGenericType("Array")) return node;
    }

    if (t.isArrayExpression(node)) {
      return node;
    }

    if (t.isIdentifier(node, { name: "arguments" })) {
      return t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier("Array"), t.identifier("prototype")), t.identifier("slice")), t.identifier("call")), [node]);
    }

    var helperName = "toArray";
    var args = [node];
    if (i === true) {
      helperName = "toConsumableArray";
    } else if (i) {
      args.push(t.numericLiteral(i));
      helperName = "slicedToArray";
      // TODO if (this.hub.file.isLoose("es6.forOf")) helperName += "-loose";
    }
    return t.callExpression(file.addHelper(helperName), args);
  };

  Scope.prototype.registerDeclaration = function registerDeclaration(path) {
    if (path.isLabeledStatement()) {
      this.registerBinding("label", path);
    } else if (path.isFunctionDeclaration()) {
      this.registerBinding("hoisted", path.get("id"), path);
    } else if (path.isVariableDeclaration()) {
      var declarations = path.get("declarations");
      var _arr6 = declarations;
      for (var _i7 = 0; _i7 < _arr6.length; _i7++) {
        var declar = _arr6[_i7];
        this.registerBinding(path.node.kind, declar);
      }
    } else if (path.isClassDeclaration()) {
      this.registerBinding("let", path);
    } else if (path.isImportDeclaration()) {
      var specifiers = path.get("specifiers");
      var _arr7 = specifiers;
      for (var _i8 = 0; _i8 < _arr7.length; _i8++) {
        var specifier = _arr7[_i8];
        this.registerBinding("module", specifier);
      }
    } else if (path.isExportDeclaration()) {
      var declar = path.get("declaration");
      if (declar.isClassDeclaration() || declar.isFunctionDeclaration() || declar.isVariableDeclaration()) {
        this.registerDeclaration(declar);
      }
    } else {
      this.registerBinding("unknown", path);
    }
  };

  Scope.prototype.buildUndefinedNode = function buildUndefinedNode() {
    if (this.hasBinding("undefined")) {
      return t.unaryExpression("void", t.numericLiteral(0), true);
    } else {
      return t.identifier("undefined");
    }
  };

  Scope.prototype.registerConstantViolation = function registerConstantViolation(path) {
    var ids = path.getBindingIdentifiers();
    for (var _name3 in ids) {
      var binding = this.getBinding(_name3);
      if (binding) binding.reassign(path);
    }
  };

  Scope.prototype.registerBinding = function registerBinding(kind, path) {
    var bindingPath = arguments.length <= 2 || arguments[2] === undefined ? path : arguments[2];
    return (function () {
      if (!kind) throw new ReferenceError("no `kind`");

      if (path.isVariableDeclaration()) {
        var declarators = path.get("declarations");
        for (var _i9 = 0; _i9 < declarators.length; _i9++) {
          var declar = declarators[_i9];
          this.registerBinding(kind, declar);
        }
        return;
      }

      var parent = this.getProgramParent();
      var ids = path.getBindingIdentifiers(true);

      for (var _name4 in ids) {
        var _arr8 = ids[_name4];

        for (var _i10 = 0; _i10 < _arr8.length; _i10++) {
          var _id3 = _arr8[_i10];
          var local = this.getOwnBinding(_name4);
          if (local) {
            // same identifier so continue safely as we're likely trying to register it
            // multiple times
            if (local.identifier === _id3) continue;

            this.checkBlockScopedCollisions(local, kind, _name4, _id3);
          }

          // It's erroneous that we currently consider flow a binding, however, we can't
          // remove it because people might be depending on it. See warning section
          // in `warnOnFlowBinding`.
          if (local && local.path.isFlow()) local = null;

          parent.references[_name4] = true;

          this.bindings[_name4] = new _binding2["default"]({
            identifier: _id3,
            existing: local,
            scope: this,
            path: bindingPath,
            kind: kind
          });
        }
      }
    }).apply(this, arguments);
  };

  Scope.prototype.addGlobal = function addGlobal(node) {
    this.globals[node.name] = node;
  };

  Scope.prototype.hasUid = function hasUid(name) {
    var scope = this;

    do {
      if (scope.uids[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  Scope.prototype.hasGlobal = function hasGlobal(name) {
    var scope = this;

    do {
      if (scope.globals[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  Scope.prototype.hasReference = function hasReference(name) {
    var scope = this;

    do {
      if (scope.references[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  Scope.prototype.isPure = function isPure(node, constantsOnly) {
    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (!binding) return false;
      if (constantsOnly) return binding.constant;
      return true;
    } else if (t.isClass(node)) {
      if (node.superClass && !this.isPure(node.superClass, constantsOnly)) return false;
      return this.isPure(node.body, constantsOnly);
    } else if (t.isClassBody(node)) {
      for (var _iterator = node.body, _isArray = Array.isArray(_iterator), _i11 = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i11 >= _iterator.length) break;
          _ref = _iterator[_i11++];
        } else {
          _i11 = _iterator.next();
          if (_i11.done) break;
          _ref = _i11.value;
        }

        var method = _ref;

        if (!this.isPure(method, constantsOnly)) return false;
      }
      return true;
    } else if (t.isBinary(node)) {
      return this.isPure(node.left, constantsOnly) && this.isPure(node.right, constantsOnly);
    } else if (t.isArrayExpression(node)) {
      var _arr9 = node.elements;

      for (var _i12 = 0; _i12 < _arr9.length; _i12++) {
        var elem = _arr9[_i12];
        if (!this.isPure(elem, constantsOnly)) return false;
      }
      return true;
    } else if (t.isObjectExpression(node)) {
      var _arr10 = node.properties;

      for (var _i13 = 0; _i13 < _arr10.length; _i13++) {
        var prop = _arr10[_i13];
        if (!this.isPure(prop, constantsOnly)) return false;
      }
      return true;
    } else if (t.isClassMethod(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly)) return false;
      if (node.kind === "get" || node.kind === "set") return false;
      return true;
    } else if (t.isClassProperty(node) || t.isObjectProperty(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly)) return false;
      return this.isPure(node.value, constantsOnly);
    } else if (t.isUnaryExpression(node)) {
      return this.isPure(node.argument, constantsOnly);
    } else {
      return t.isPureish(node);
    }
  };

  /**
   * Set some arbitrary data on the current scope.
   */

  Scope.prototype.setData = function setData(key, val) {
    return this.data[key] = val;
  };

  /**
   * Recursively walk up scope tree looking for the data `key`.
   */

  Scope.prototype.getData = function getData(key) {
    var scope = this;
    do {
      var data = scope.data[key];
      if (data != null) return data;
    } while (scope = scope.parent);
  };

  /**
   * Recursively walk up scope tree looking for the data `key` and if it exists,
   * remove it.
   */

  Scope.prototype.removeData = function removeData(key) {
    var scope = this;
    do {
      var data = scope.data[key];
      if (data != null) scope.data[key] = null;
    } while (scope = scope.parent);
  };

  Scope.prototype.init = function init() {
    if (!this.references) this.crawl();
  };

  Scope.prototype.crawl = function crawl() {
    _crawlCallsCount++;
    this._crawl();
    _crawlCallsCount--;
  };

  Scope.prototype._crawl = function _crawl() {
    var path = this.path;

    //

    this.references = _Object$create(null);
    this.bindings = _Object$create(null);
    this.globals = _Object$create(null);
    this.uids = _Object$create(null);
    this.data = _Object$create(null);

    // ForStatement - left, init

    if (path.isLoop()) {
      var _arr11 = t.FOR_INIT_KEYS;

      for (var _i14 = 0; _i14 < _arr11.length; _i14++) {
        var key = _arr11[_i14];
        var node = path.get(key);
        if (node.isBlockScoped()) this.registerBinding(node.node.kind, node);
      }
    }

    // FunctionExpression - id

    if (path.isFunctionExpression() && path.has("id")) {
      if (!path.get("id").node[t.NOT_LOCAL_BINDING]) {
        this.registerBinding("local", path.get("id"), path);
      }
    }

    // Class

    if (path.isClassExpression() && path.has("id")) {
      if (!path.get("id").node[t.NOT_LOCAL_BINDING]) {
        this.registerBinding("local", path);
      }
    }

    // Function - params, rest

    if (path.isFunction()) {
      var params = path.get("params");
      for (var _i15 = 0; _i15 < params.length; _i15++) {
        var param = params[_i15];
        this.registerBinding("param", param);
      }
    }

    // CatchClause - param

    if (path.isCatchClause()) {
      this.registerBinding("let", path);
    }

    // Program

    var parent = this.getProgramParent();
    if (parent.crawling) return;

    var state = {
      references: [],
      constantViolations: [],
      assignments: []
    };

    this.crawling = true;
    path.traverse(collectorVisitor, state);
    this.crawling = false;

    // register assignments
    for (var _iterator2 = state.assignments, _isArray2 = Array.isArray(_iterator2), _i16 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i16 >= _iterator2.length) break;
        _ref2 = _iterator2[_i16++];
      } else {
        _i16 = _iterator2.next();
        if (_i16.done) break;
        _ref2 = _i16.value;
      }

      var _path = _ref2;

      // register undeclared bindings as globals
      var ids = _path.getBindingIdentifiers();
      var programParent = undefined;
      for (var _name5 in ids) {
        if (_path.scope.getBinding(_name5)) continue;

        programParent = programParent || _path.scope.getProgramParent();
        programParent.addGlobal(ids[_name5]);
      }

      // register as constant violation
      _path.scope.registerConstantViolation(_path);
    }

    // register references
    for (var _iterator3 = state.references, _isArray3 = Array.isArray(_iterator3), _i17 = 0, _iterator3 = _isArray3 ? _iterator3 : _getIterator(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i17 >= _iterator3.length) break;
        _ref3 = _iterator3[_i17++];
      } else {
        _i17 = _iterator3.next();
        if (_i17.done) break;
        _ref3 = _i17.value;
      }

      var ref = _ref3;

      var binding = ref.scope.getBinding(ref.node.name);
      if (binding) {
        binding.reference(ref);
      } else {
        ref.scope.getProgramParent().addGlobal(ref.node);
      }
    }

    // register constant violations
    for (var _iterator4 = state.constantViolations, _isArray4 = Array.isArray(_iterator4), _i18 = 0, _iterator4 = _isArray4 ? _iterator4 : _getIterator(_iterator4);;) {
      var _ref4;

      if (_isArray4) {
        if (_i18 >= _iterator4.length) break;
        _ref4 = _iterator4[_i18++];
      } else {
        _i18 = _iterator4.next();
        if (_i18.done) break;
        _ref4 = _i18.value;
      }

      var _path2 = _ref4;

      _path2.scope.registerConstantViolation(_path2);
    }
  };

  Scope.prototype.push = function push(opts) {
    var path = this.path;

    if (!path.isBlockStatement() && !path.isProgram()) {
      path = this.getBlockParent().path;
    }

    if (path.isSwitchStatement()) {
      path = this.getFunctionParent().path;
    }

    if (path.isLoop() || path.isCatchClause() || path.isFunction()) {
      t.ensureBlock(path.node);
      path = path.get("body");
    }

    var unique = opts.unique;
    var kind = opts.kind || "var";
    var blockHoist = opts._blockHoist == null ? 2 : opts._blockHoist;

    var dataKey = "declaration:" + kind + ":" + blockHoist;
    var declarPath = !unique && path.getData(dataKey);

    if (!declarPath) {
      var declar = t.variableDeclaration(kind, []);
      declar._generated = true;
      declar._blockHoist = blockHoist;

      var _path$unshiftContainer = path.unshiftContainer("body", [declar]);

      declarPath = _path$unshiftContainer[0];

      if (!unique) path.setData(dataKey, declarPath);
    }

    var declarator = t.variableDeclarator(opts.id, opts.init);
    declarPath.node.declarations.push(declarator);
    this.registerBinding(kind, declarPath.get("declarations").pop());
  };

  /**
   * Walk up to the top of the scope tree and get the `Program`.
   */

  Scope.prototype.getProgramParent = function getProgramParent() {
    var scope = this;
    do {
      if (scope.path.isProgram()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  };

  /**
   * Walk up the scope tree until we hit either a Function or reach the
   * very top and hit Program.
   */

  Scope.prototype.getFunctionParent = function getFunctionParent() {
    var scope = this;
    do {
      if (scope.path.isFunctionParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  };

  /**
   * Walk up the scope tree until we hit either a BlockStatement/Loop/Program/Function/Switch or reach the
   * very top and hit Program.
   */

  Scope.prototype.getBlockParent = function getBlockParent() {
    var scope = this;
    do {
      if (scope.path.isBlockParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
  };

  /**
   * Walks the scope tree and gathers **all** bindings.
   */

  Scope.prototype.getAllBindings = function getAllBindings() {
    var ids = _Object$create(null);

    var scope = this;
    do {
      _lodashObjectDefaults2["default"](ids, scope.bindings);
      scope = scope.parent;
    } while (scope);

    return ids;
  };

  /**
   * Walks the scope tree and gathers all declarations of `kind`.
   */

  Scope.prototype.getAllBindingsOfKind = function getAllBindingsOfKind() {
    var ids = _Object$create(null);

    var _arr12 = arguments;
    for (var _i19 = 0; _i19 < _arr12.length; _i19++) {
      var kind = _arr12[_i19];
      var scope = this;
      do {
        for (var _name6 in scope.bindings) {
          var binding = scope.bindings[_name6];
          if (binding.kind === kind) ids[_name6] = binding;
        }
        scope = scope.parent;
      } while (scope);
    }

    return ids;
  };

  Scope.prototype.bindingIdentifierEquals = function bindingIdentifierEquals(name, node) {
    return this.getBindingIdentifier(name) === node;
  };

  Scope.prototype.warnOnFlowBinding = function warnOnFlowBinding(binding) {
    if (_crawlCallsCount === 0 && binding && binding.path.isFlow()) {
      console.warn("\n        You or one of the Babel plugins you are using are using Flow declarations as bindings.\n        Support for this will be removed in version 6.8. To find out the caller, grep for this\n        message and change it to a `console.trace()`.\n      ");
    }
    return binding;
  };

  Scope.prototype.getBinding = function getBinding(name) {
    var scope = this;

    do {
      var binding = scope.getOwnBinding(name);
      if (binding) return this.warnOnFlowBinding(binding);
    } while (scope = scope.parent);
  };

  Scope.prototype.getOwnBinding = function getOwnBinding(name) {
    return this.warnOnFlowBinding(this.bindings[name]);
  };

  Scope.prototype.getBindingIdentifier = function getBindingIdentifier(name) {
    var info = this.getBinding(name);
    return info && info.identifier;
  };

  Scope.prototype.getOwnBindingIdentifier = function getOwnBindingIdentifier(name) {
    var binding = this.bindings[name];
    return binding && binding.identifier;
  };

  Scope.prototype.hasOwnBinding = function hasOwnBinding(name) {
    return !!this.getOwnBinding(name);
  };

  Scope.prototype.hasBinding = function hasBinding(name, noGlobals) {
    if (!name) return false;
    if (this.hasOwnBinding(name)) return true;
    if (this.parentHasBinding(name, noGlobals)) return true;
    if (this.hasUid(name)) return true;
    if (!noGlobals && _lodashCollectionIncludes2["default"](Scope.globals, name)) return true;
    if (!noGlobals && _lodashCollectionIncludes2["default"](Scope.contextVariables, name)) return true;
    return false;
  };

  Scope.prototype.parentHasBinding = function parentHasBinding(name, noGlobals) {
    return this.parent && this.parent.hasBinding(name, noGlobals);
  };

  /**
   * Move a binding of `name` to another `scope`.
   */

  Scope.prototype.moveBindingTo = function moveBindingTo(name, scope) {
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
      info.scope = scope;
      scope.bindings[name] = info;
    }
  };

  Scope.prototype.removeOwnBinding = function removeOwnBinding(name) {
    delete this.bindings[name];
  };

  Scope.prototype.removeBinding = function removeBinding(name) {
    // clear literal binding
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
    }

    // clear uids with this name - https://github.com/babel/babel/issues/2101
    var scope = this;
    do {
      if (scope.uids[name]) {
        scope.uids[name] = false;
      }
    } while (scope = scope.parent);
  };

  _createClass(Scope, null, [{
    key: "globals",
    value: _Object$keys(_globals2["default"].builtin),

    /**
     * Variables available in current context.
     */

    enumerable: true
  }, {
    key: "contextVariables",
    value: ["arguments", "undefined", "Infinity", "NaN"],
    enumerable: true
  }]);

  return Scope;
})();

exports["default"] = Scope;
module.exports = exports["default"];