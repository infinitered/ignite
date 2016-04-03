"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _defaults = require("babel-runtime/helpers/defaults")["default"];

var _interopExportWildcard = require("babel-runtime/helpers/interop-export-wildcard")["default"];

exports.__esModule = true;
exports.is = is;
exports.isType = isType;
exports.validate = validate;
exports.shallowEqual = shallowEqual;
exports.appendToMemberExpression = appendToMemberExpression;
exports.prependToMemberExpression = prependToMemberExpression;
exports.ensureBlock = ensureBlock;
exports.clone = clone;
exports.cloneWithoutLoc = cloneWithoutLoc;
exports.cloneDeep = cloneDeep;
exports.buildMatchMemberExpression = buildMatchMemberExpression;
exports.removeComments = removeComments;
exports.inheritsComments = inheritsComments;
exports.inheritTrailingComments = inheritTrailingComments;
exports.inheritLeadingComments = inheritLeadingComments;
exports.inheritInnerComments = inheritInnerComments;
exports.inherits = inherits;
exports.assertNode = assertNode;
exports.isNode = isNode;

var _toFastProperties = require("to-fast-properties");

var _toFastProperties2 = _interopRequireDefault(_toFastProperties);

var _lodashArrayCompact = require("lodash/array/compact");

var _lodashArrayCompact2 = _interopRequireDefault(_lodashArrayCompact);

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashArrayUniq = require("lodash/array/uniq");

var _lodashArrayUniq2 = _interopRequireDefault(_lodashArrayUniq);

require("./definitions/init");

var _definitions = require("./definitions");

var _react2 = require("./react");

var _react = _interopRequireWildcard(_react2);

var t = exports;

/**
 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
 */

function registerType(type) {
  var is = t["is" + type] = function (node, opts) {
    return t.is(type, node, opts);
  };

  t["assert" + type] = function (node, opts) {
    opts = opts || {};
    if (!is(node, opts)) {
      throw new Error("Expected type " + JSON.stringify(type) + " with option " + JSON.stringify(opts));
    }
  };
}

//

var _constants = require("./constants");

_defaults(exports, _interopExportWildcard(_constants, _defaults));

exports.VISITOR_KEYS = _definitions.VISITOR_KEYS;
exports.ALIAS_KEYS = _definitions.ALIAS_KEYS;
exports.NODE_FIELDS = _definitions.NODE_FIELDS;
exports.BUILDER_KEYS = _definitions.BUILDER_KEYS;
exports.DEPRECATED_KEYS = _definitions.DEPRECATED_KEYS;
exports.react = _react;

/**
 * Registers `is[Type]` and `assert[Type]` for all types.
 */

for (var type in t.VISITOR_KEYS) {
  registerType(type);
}

/**
 * Flip `ALIAS_KEYS` for faster access in the reverse direction.
 */

t.FLIPPED_ALIAS_KEYS = {};

_lodashCollectionEach2["default"](t.ALIAS_KEYS, function (aliases, type) {
  _lodashCollectionEach2["default"](aliases, function (alias) {
    var types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
    types.push(type);
  });
});

/**
 * Registers `is[Alias]` and `assert[Alias]` functions for all aliases.
 */

_lodashCollectionEach2["default"](t.FLIPPED_ALIAS_KEYS, function (types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;
  registerType(type);
});

var TYPES = _Object$keys(t.VISITOR_KEYS).concat(_Object$keys(t.FLIPPED_ALIAS_KEYS)).concat(_Object$keys(t.DEPRECATED_KEYS));

exports.TYPES = TYPES;
/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
 */

function is(type, node, opts) {
  if (!node) return false;

  var matches = isType(node.type, type);
  if (!matches) return false;

  if (typeof opts === "undefined") {
    return true;
  } else {
    return t.shallowEqual(node, opts);
  }
}

/**
 * Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.
 */

function isType(nodeType, targetType) {
  if (nodeType === targetType) return true;

  var aliases = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType) return true;

    for (var _iterator = aliases, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var alias = _ref;

      if (nodeType === alias) return true;
    }
  }

  return false;
}

/**
 * Description
 */

_lodashCollectionEach2["default"](t.BUILDER_KEYS, function (keys, type) {
  function builder() {
    if (arguments.length > keys.length) {
      throw new Error("t." + type + ": Too many arguments passed. Received " + arguments.length + " but can receive " + ("no more than " + keys.length));
    }

    var node = {};
    node.type = type;

    var i = 0;

    var _arr = keys;
    for (var _i2 = 0; _i2 < _arr.length; _i2++) {
      var key = _arr[_i2];
      var field = t.NODE_FIELDS[type][key];

      var arg = arguments[i++];
      if (arg === undefined) arg = _lodashLangClone2["default"](field["default"]);

      node[key] = arg;
    }

    for (var key in node) {
      validate(node, key, node[key]);
    }

    return node;
  }

  t[type] = builder;
  t[type[0].toLowerCase() + type.slice(1)] = builder;
});

/**
 * Description
 */

var _loop = function (type) {
  var proxy = function proxy(fn) {
    return function () {
      console.trace("The node type " + type + " has been renamed to " + newType);
      return fn.apply(this, arguments);
    };
  };

  var newType = t.DEPRECATED_KEYS[type];

  t[type] = t[type[0].toLowerCase() + type.slice(1)] = proxy(t[newType]);
  t["is" + type] = proxy(t["is" + newType]);
  t["assert" + type] = proxy(t["assert" + newType]);
};

for (var type in t.DEPRECATED_KEYS) {
  _loop(type);
}

/**
 * Description
 */

function validate(node, key, val) {
  if (!node) return;

  var fields = t.NODE_FIELDS[node.type];
  if (!fields) return;

  var field = fields[key];
  if (!field || !field.validate) return;
  if (field.optional && val == null) return;

  field.validate(node, key, val);
}

/**
 * Test if an object is shallowly equal.
 */

function shallowEqual(actual, expected) {
  var keys = _Object$keys(expected);

  var _arr2 = keys;
  for (var _i3 = 0; _i3 < _arr2.length; _i3++) {
    var key = _arr2[_i3];
    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Append a node to a member expression.
 */

function appendToMemberExpression(member, append, computed) {
  member.object = t.memberExpression(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}

/**
 * Prepend a node to a member expression.
 */

function prependToMemberExpression(member, prepend) {
  member.object = t.memberExpression(prepend, member.object);
  return member;
}

/**
 * Ensure the `key` (defaults to "body") of a `node` is a block.
 * Casting it to a block if it is not.
 */

function ensureBlock(node) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? "body" : arguments[1];

  return node[key] = t.toBlock(node[key], node);
}

/**
 * Create a shallow clone of a `node` excluding `_private` properties.
 */

function clone(node) {
  var newNode = {};
  for (var key in node) {
    if (key[0] === "_") continue;
    newNode[key] = node[key];
  }
  return newNode;
}

/**
 * Create a shallow clone of a `node` excluding `_private` and location properties.
 */

function cloneWithoutLoc(node) {
  var newNode = clone(node);
  delete newNode.loc;
  return newNode;
}

/**
 * Create a deep clone of a `node` and all of it's child nodes
 * exluding `_private` properties.
 */

function cloneDeep(node) {
  var newNode = {};

  for (var key in node) {
    if (key[0] === "_") continue;

    var val = node[key];

    if (val) {
      if (val.type) {
        val = t.cloneDeep(val);
      } else if (Array.isArray(val)) {
        val = val.map(t.cloneDeep);
      }
    }

    newNode[key] = val;
  }

  return newNode;
}

/**
 * Build a function that when called will return whether or not the
 * input `node` `MemberExpression` matches the input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */

function buildMatchMemberExpression(match, allowPartial) {
  var parts = match.split(".");

  return function (member) {
    // not a member expression
    if (!t.isMemberExpression(member)) return false;

    var search = [member];
    var i = 0;

    while (search.length) {
      var node = search.shift();

      if (allowPartial && i === parts.length) {
        return true;
      }

      if (t.isIdentifier(node)) {
        // this part doesn't match
        if (parts[i] !== node.name) return false;
      } else if (t.isStringLiteral(node)) {
        // this part doesn't match
        if (parts[i] !== node.value) return false;
      } else if (t.isMemberExpression(node)) {
        if (node.computed && !t.isStringLiteral(node.property)) {
          // we can't deal with this
          return false;
        } else {
          search.push(node.object);
          search.push(node.property);
          continue;
        }
      } else {
        // we can't deal with this
        return false;
      }

      // too many parts
      if (++i > parts.length) {
        return false;
      }
    }

    return true;
  };
}

/**
 * Remove comment properties from a node.
 */

function removeComments(node) {
  for (var _iterator2 = t.COMMENT_KEYS, _isArray2 = Array.isArray(_iterator2), _i4 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
    var _ref2;

    if (_isArray2) {
      if (_i4 >= _iterator2.length) break;
      _ref2 = _iterator2[_i4++];
    } else {
      _i4 = _iterator2.next();
      if (_i4.done) break;
      _ref2 = _i4.value;
    }

    var key = _ref2;

    delete node[key];
  }
  return node;
}

/**
 * Inherit all unique comments from `parent` node to `child` node.
 */

function inheritsComments(child, parent) {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);
  return child;
}

function inheritTrailingComments(child, parent) {
  _inheritComments("trailingComments", child, parent);
}

function inheritLeadingComments(child, parent) {
  _inheritComments("leadingComments", child, parent);
}

function inheritInnerComments(child, parent) {
  _inheritComments("innerComments", child, parent);
}

function _inheritComments(key, child, parent) {
  if (child && parent) {
    child[key] = _lodashArrayUniq2["default"](_lodashArrayCompact2["default"]([].concat(child[key], parent[key])));
  }
}

// Can't use import because of cyclic dependency between babel-traverse
// and this module (babel-types). This require needs to appear after
// we export the TYPES constant.
var traverse = require("babel-traverse")["default"];

/**
 * Inherit all contextual properties from `parent` node to `child` node.
 */

function inherits(child, parent) {
  if (!child || !parent) return child;

  // optionally inherit specific properties if not null
  var _arr3 = t.INHERIT_KEYS.optional;
  for (var _i5 = 0; _i5 < _arr3.length; _i5++) {
    var key = _arr3[_i5];
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }

  // force inherit "private" properties
  for (var key in parent) {
    if (key[0] === "_") child[key] = parent[key];
  }

  // force inherit select properties
  var _arr4 = t.INHERIT_KEYS.force;
  for (var _i6 = 0; _i6 < _arr4.length; _i6++) {
    var key = _arr4[_i6];
    child[key] = parent[key];
  }

  t.inheritsComments(child, parent);
  traverse.copyCache(parent, child);

  return child;
}

/**
 * TODO
 */

function assertNode(node) {
  if (!isNode(node)) {
    // $FlowFixMe
    throw new TypeError("Not a valid node " + (node && node.type));
  }
}

/**
 * TODO
 */

function isNode(node) {
  return !!(node && _definitions.VISITOR_KEYS[node.type]);
}

// Optimize property access.
_toFastProperties2["default"](t);
_toFastProperties2["default"](t.VISITOR_KEYS);

//

var _retrievers = require("./retrievers");

_defaults(exports, _interopExportWildcard(_retrievers, _defaults));

var _validators = require("./validators");

_defaults(exports, _interopExportWildcard(_validators, _defaults));

var _converters = require("./converters");

_defaults(exports, _interopExportWildcard(_converters, _defaults));

var _flow = require("./flow");

_defaults(exports, _interopExportWildcard(_flow, _defaults));