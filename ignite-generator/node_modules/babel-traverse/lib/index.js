/* eslint max-len: 0 */

"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _Object$getOwnPropertySymbols = require("babel-runtime/core-js/object/get-own-property-symbols")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

exports.__esModule = true;
exports["default"] = traverse;

var _context = require("./context");

var _context2 = _interopRequireDefault(_context);

var _visitors = require("./visitors");

var visitors = _interopRequireWildcard(_visitors);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _cache = require("./cache");

var cache = _interopRequireWildcard(_cache);

var _path = require("./path");

exports.NodePath = _interopRequire(_path);

var _scope = require("./scope");

exports.Scope = _interopRequire(_scope);

var _hub = require("./hub");

exports.Hub = _interopRequire(_hub);
exports.visitors = visitors;

function traverse(parent, opts, scope, state, parentPath) {
  if (!parent) return;
  if (!opts) opts = {};

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error(messages.get("traverseNeedsParent", parent.type));
    }
  }

  visitors.explode(opts);

  traverse.node(parent, opts, scope, state, parentPath);
}

traverse.visitors = visitors;
traverse.verify = visitors.verify;
traverse.explode = visitors.explode;

traverse.NodePath = require("./path");
traverse.Scope = require("./scope");
traverse.Hub = require("./hub");

traverse.cheap = function (node, enter) {
  if (!node) return;

  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  enter(node);

  for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var key = _ref;

    var subNode = node[key];

    if (Array.isArray(subNode)) {
      for (var _iterator2 = subNode, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var _node = _ref2;

        traverse.cheap(_node, enter);
      }
    } else {
      traverse.cheap(subNode, enter);
    }
  }
};

traverse.node = function (node, opts, scope, state, parentPath, skipKeys) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new _context2["default"](scope, opts, state, parentPath);
  for (var _i3 = 0; _i3 < keys.length; _i3++) {
    var key = keys[_i3];
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
  }
};

var CLEAR_KEYS = t.COMMENT_KEYS.concat(["tokens", "comments", "start", "end", "loc", "raw", "rawValue"]);

traverse.clearNode = function (node) {
  for (var _i4 = 0; _i4 < CLEAR_KEYS.length; _i4++) {
    var key = CLEAR_KEYS[_i4];
    if (node[key] != null) node[key] = undefined;
  }

  for (var key in node) {
    if (key[0] === "_" && node[key] != null) node[key] = undefined;
  }

  cache.path["delete"](node);

  var syms = _Object$getOwnPropertySymbols(node);
  for (var _i5 = 0; _i5 < syms.length; _i5++) {
    var sym = syms[_i5];
    node[sym] = null;
  }
};

traverse.removeProperties = function (tree) {
  traverse.cheap(tree, traverse.clearNode);
  return tree;
};

function hasBlacklistedType(path, state) {
  if (path.node.type === state.type) {
    state.has = true;
    path.skip();
  }
}

traverse.hasType = function (tree, scope, type, blacklistTypes) {
  // the node we're searching in is blacklisted
  if (_lodashCollectionIncludes2["default"](blacklistTypes, tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  var state = {
    has: false,
    type: type
  };

  traverse(tree, {
    blacklist: blacklistTypes,
    enter: hasBlacklistedType
  }, scope, state);

  return state.has;
};

traverse.clearCache = function () {
  cache.clear();
};

traverse.copyCache = function (source, destination) {
  if (cache.path.has(source)) {
    cache.path.set(destination, cache.path.get(source));
  }
};