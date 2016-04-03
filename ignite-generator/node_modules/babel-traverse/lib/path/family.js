// This file contains methods responsible for dealing with/retrieving children or siblings.

"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.getStatementParent = getStatementParent;
exports.getOpposite = getOpposite;
exports.getCompletionRecords = getCompletionRecords;
exports.getSibling = getSibling;
exports.get = get;
exports._getKey = _getKey;
exports._getPattern = _getPattern;
exports.getBindingIdentifiers = getBindingIdentifiers;
exports.getOuterBindingIdentifiers = getOuterBindingIdentifiers;

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function getStatementParent() {
  var path = this;

  do {
    if (!path.parentPath || Array.isArray(path.container) && path.isStatement()) {
      break;
    } else {
      path = path.parentPath;
    }
  } while (path);

  if (path && (path.isProgram() || path.isFile())) {
    throw new Error("File/Program node, we can't possibly find a statement parent to this");
  }

  return path;
}

function getOpposite() {
  if (this.key === "left") {
    return this.getSibling("right");
  } else if (this.key === "right") {
    return this.getSibling("left");
  }
}

function getCompletionRecords() {
  var paths = [];

  var add = function add(path) {
    if (path) paths = paths.concat(path.getCompletionRecords());
  };

  if (this.isIfStatement()) {
    add(this.get("consequent"));
    add(this.get("alternate"));
  } else if (this.isDoExpression() || this.isFor() || this.isWhile()) {
    add(this.get("body"));
  } else if (this.isProgram() || this.isBlockStatement()) {
    add(this.get("body").pop());
  } else if (this.isFunction()) {
    return this.get("body").getCompletionRecords();
  } else if (this.isTryStatement()) {
    add(this.get("block"));
    add(this.get("handler"));
    add(this.get("finalizer"));
  } else {
    paths.push(this);
  }

  return paths;
}

function getSibling(key) {
  return _index2["default"].get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key
  });
}

function get(key, context) {
  if (context === true) context = this.context;
  var parts = key.split(".");
  if (parts.length === 1) {
    // "foo"
    return this._getKey(key, context);
  } else {
    // "foo.bar"
    return this._getPattern(parts, context);
  }
}

function _getKey(key, context) {
  // istanbul ignore next

  var _this = this;

  var node = this.node;
  var container = node[key];

  if (Array.isArray(container)) {
    // requested a container so give them all the paths
    return container.map(function (_, i) {
      return _index2["default"].get({
        listKey: key,
        parentPath: _this,
        parent: node,
        container: container,
        key: i
      }).setContext(context);
    });
  } else {
    return _index2["default"].get({
      parentPath: this,
      parent: node,
      container: node,
      key: key
    }).setContext(context);
  }
}

function _getPattern(parts, context) {
  var path = this;
  var _arr = parts;
  for (var _i = 0; _i < _arr.length; _i++) {
    var part = _arr[_i];
    if (part === ".") {
      path = path.parentPath;
    } else {
      if (Array.isArray(path)) {
        path = path[part];
      } else {
        path = path.get(part, context);
      }
    }
  }
  return path;
}

function getBindingIdentifiers(duplicates) {
  return t.getBindingIdentifiers(this.node, duplicates);
}

function getOuterBindingIdentifiers(duplicates) {
  return t.getOuterBindingIdentifiers(this.node, duplicates);
}