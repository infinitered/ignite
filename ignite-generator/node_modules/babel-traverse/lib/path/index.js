/* eslint max-len: 0 */

"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _libVirtualTypes = require("./lib/virtual-types");

var virtualTypes = _interopRequireWildcard(_libVirtualTypes);

var _debug2 = require("debug");

var _debug3 = _interopRequireDefault(_debug2);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _lodashObjectAssign = require("lodash/object/assign");

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _scope = require("../scope");

var _scope2 = _interopRequireDefault(_scope);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _cache = require("../cache");

var _debug = _debug3["default"]("babel");

var NodePath = (function () {
  function NodePath(hub, parent) {
    _classCallCheck(this, NodePath);

    this.parent = parent;
    this.hub = hub;
    this.contexts = [];
    this.data = {};
    this.shouldSkip = false;
    this.shouldStop = false;
    this.removed = false;
    this.state = null;
    this.opts = null;
    this.skipKeys = null;
    this.parentPath = null;
    this.context = null;
    this.container = null;
    this.listKey = null;
    this.inList = false;
    this.parentKey = null;
    this.key = null;
    this.node = null;
    this.scope = null;
    this.type = null;
    this.typeAnnotation = null;
  }

  NodePath.get = function get(_ref) {
    var hub = _ref.hub;
    var parentPath = _ref.parentPath;
    var parent = _ref.parent;
    var container = _ref.container;
    var listKey = _ref.listKey;
    var key = _ref.key;

    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    _invariant2["default"](parent, "To get a node path the parent needs to exist");

    var targetNode = container[key];

    var paths = _cache.path.get(parent) || [];
    if (!_cache.path.has(parent)) {
      _cache.path.set(parent, paths);
    }

    var path = undefined;

    for (var i = 0; i < paths.length; i++) {
      var pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (path && !(path instanceof NodePath)) {
      if (path.constructor.name === "NodePath") {
        // we're going to absolutley thrash the tree and allocate way too many node paths
        // than is necessary but there's no way around this as the node module resolution
        // algorithm is ridiculous
        path = null;
      } else {
        // badly deserialised probably
        throw new Error("We found a path that isn't a NodePath instance. Possibly due to bad serialisation.");
      }
    }

    if (!path) {
      path = new NodePath(hub, parent);
      paths.push(path);
    }

    path.setup(parentPath, container, listKey, key);

    return path;
  };

  NodePath.prototype.getScope = function getScope(scope) {
    var ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (this.isScope()) {
      ourScope = new _scope2["default"](this, scope);
    }

    return ourScope;
  };

  NodePath.prototype.setData = function setData(key, val) {
    return this.data[key] = val;
  };

  NodePath.prototype.getData = function getData(key, def) {
    var val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  };

  NodePath.prototype.buildCodeFrameError = function buildCodeFrameError(msg) {
    var Error = arguments.length <= 1 || arguments[1] === undefined ? SyntaxError : arguments[1];

    return this.hub.file.buildCodeFrameError(this.node, msg, Error);
  };

  NodePath.prototype.traverse = function traverse(visitor, state) {
    _index2["default"](this.node, visitor, this.scope, state, this);
  };

  NodePath.prototype.mark = function mark(type, message) {
    this.hub.file.metadata.marked.push({
      type: type,
      message: message,
      loc: this.node.loc
    });
  };

  NodePath.prototype.set = function set(key, node) {
    t.validate(this.node, key, node);
    this.node[key] = node;
  };

  NodePath.prototype.getPathLocation = function getPathLocation() {
    var parts = [];
    var path = this;
    do {
      var key = path.key;
      if (path.inList) key = path.listKey + "[" + key + "]";
      parts.unshift(key);
    } while (path = path.parentPath);
    return parts.join(".");
  };

  NodePath.prototype.debug = function debug(buildMessage) {
    if (!_debug.enabled) return;
    _debug(this.getPathLocation() + " " + this.type + ": " + buildMessage());
  };

  return NodePath;
})();

exports["default"] = NodePath;

_lodashObjectAssign2["default"](NodePath.prototype, require("./ancestry"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./inference"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./replacement"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./evaluation"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./conversion"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./introspection"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./context"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./removal"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./modification"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./family"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./comments"));

var _arr = t.TYPES;

var _loop = function () {
  var type = _arr[_i];
  var typeKey = "is" + type;
  NodePath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };

  NodePath.prototype["assert" + type] = function (opts) {
    if (!this[typeKey](opts)) {
      throw new TypeError("Expected node path of type " + type);
    }
  };
};

for (var _i = 0; _i < _arr.length; _i++) {
  _loop();
}

var _loop2 = function (type) {
  if (type[0] === "_") return "continue";
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);

  var virtualType = virtualTypes[type];

  NodePath.prototype["is" + type] = function (opts) {
    return virtualType.checkPath(this, opts);
  };
};

for (var type in virtualTypes) {
  var _ret2 = _loop2(type);

  // istanbul ignore next
  if (_ret2 === "continue") continue;
}
module.exports = exports["default"];