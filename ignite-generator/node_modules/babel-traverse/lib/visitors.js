"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;
exports.explode = explode;
exports.verify = verify;
exports.merge = merge;

var _pathLibVirtualTypes = require("./path/lib/virtual-types");

var virtualTypes = _interopRequireWildcard(_pathLibVirtualTypes);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

/**
 * explode() will take a visitor object with all of the various shorthands
 * that we support, and validates & normalizes it into a common format, ready
 * to be used in traversal
 *
 * The various shorthands are:
 * * `Identifier() { ... }` -> `Identifier: { enter() { ... } }`
 * * `"Identifier|NumericLiteral": { ... }` -> `Identifier: { ... }, NumericLiteral: { ... }`
 * * Aliases in `babel-types`: e.g. `Property: { ... }` -> `ObjectProperty: { ... }, ClassProperty: { ... }`
 *
 * Other normalizations are:
 * * Visitors of virtual types are wrapped, so that they are only visited when
 *   their dynamic check passes
 * * `enter` and `exit` functions are wrapped in arrays, to ease merging of
 *   visitors
 */

function explode(visitor) {
  if (visitor._exploded) return visitor;
  visitor._exploded = true;

  // normalise pipes
  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    var parts = nodeType.split("|");
    if (parts.length === 1) continue;

    var fns = visitor[nodeType];
    delete visitor[nodeType];

    for (var _i = 0; _i < parts.length; _i++) {
      var part = parts[_i];
      visitor[part] = fns;
    }
  }

  // verify data structure
  verify(visitor);

  // make sure there's no __esModule type since this is because we're using loose mode
  // and it sets __esModule to be enumerable on all modules :(
  delete visitor.__esModule;

  // ensure visitors are objects
  ensureEntranceObjects(visitor);

  // ensure enter/exit callbacks are arrays
  ensureCallbackArrays(visitor);

  // add type wrappers

  var _arr = _Object$keys(visitor);

  for (var _i2 = 0; _i2 < _arr.length; _i2++) {
    var nodeType = _arr[_i2];
    if (shouldIgnoreKey(nodeType)) continue;

    var wrapper = virtualTypes[nodeType];
    if (!wrapper) continue;

    // wrap all the functions
    var fns = visitor[nodeType];
    for (var type in fns) {
      fns[type] = wrapCheck(wrapper, fns[type]);
    }

    // clear it from the visitor
    delete visitor[nodeType];

    if (wrapper.types) {
      var _arr2 = wrapper.types;

      for (var _i4 = 0; _i4 < _arr2.length; _i4++) {
        var type = _arr2[_i4];
        // merge the visitor if necessary or just put it back in
        if (visitor[type]) {
          mergePair(visitor[type], fns);
        } else {
          visitor[type] = fns;
        }
      }
    } else {
      mergePair(visitor, fns);
    }
  }

  // add aliases
  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    var fns = visitor[nodeType];

    var aliases = t.FLIPPED_ALIAS_KEYS[nodeType];

    var deprecratedKey = t.DEPRECATED_KEYS[nodeType];
    if (deprecratedKey) {
      console.trace("Visitor defined for " + nodeType + " but it has been renamed to " + deprecratedKey);
      aliases = [deprecratedKey];
    }

    if (!aliases) continue;

    // clear it from the visitor
    delete visitor[nodeType];

    for (var _iterator = aliases, _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i3 >= _iterator.length) break;
        _ref = _iterator[_i3++];
      } else {
        _i3 = _iterator.next();
        if (_i3.done) break;
        _ref = _i3.value;
      }

      var alias = _ref;

      var existing = visitor[alias];
      if (existing) {
        mergePair(existing, fns);
      } else {
        visitor[alias] = _lodashLangClone2["default"](fns);
      }
    }
  }

  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    ensureCallbackArrays(visitor[nodeType]);
  }

  return visitor;
}

function verify(visitor) {
  if (visitor._verified) return;

  if (typeof visitor === "function") {
    throw new Error(messages.get("traverseVerifyRootFunction"));
  }

  for (var nodeType in visitor) {
    if (nodeType === "enter" || nodeType === "exit") {
      validateVisitorMethods(nodeType, visitor[nodeType]);
    }

    if (shouldIgnoreKey(nodeType)) continue;

    if (t.TYPES.indexOf(nodeType) < 0) {
      throw new Error(messages.get("traverseVerifyNodeType", nodeType));
    }

    var visitors = visitor[nodeType];
    if (typeof visitors === "object") {
      for (var visitorKey in visitors) {
        if (visitorKey === "enter" || visitorKey === "exit") {
          // verify that it just contains functions
          validateVisitorMethods(nodeType + "." + visitorKey, visitors[visitorKey]);
        } else {
          throw new Error(messages.get("traverseVerifyVisitorProperty", nodeType, visitorKey));
        }
      }
    }
  }

  visitor._verified = true;
}

function validateVisitorMethods(path, val) {
  var fns = [].concat(val);
  for (var _iterator2 = fns, _isArray2 = Array.isArray(_iterator2), _i5 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
    var _ref2;

    if (_isArray2) {
      if (_i5 >= _iterator2.length) break;
      _ref2 = _iterator2[_i5++];
    } else {
      _i5 = _iterator2.next();
      if (_i5.done) break;
      _ref2 = _i5.value;
    }

    var fn = _ref2;

    if (typeof fn !== "function") {
      throw new TypeError("Non-function found defined in " + path + " with type " + typeof fn);
    }
  }
}

function merge(visitors) {
  var states = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var rootVisitor = {};

  for (var i = 0; i < visitors.length; i++) {
    var visitor = visitors[i];
    var state = states[i];

    explode(visitor);

    for (var type in visitor) {
      var visitorType = visitor[type];

      // if we have state then overload the callbacks to take it
      if (state) visitorType = wrapWithState(visitorType, state);

      var nodeVisitor = rootVisitor[type] = rootVisitor[type] || {};
      mergePair(nodeVisitor, visitorType);
    }
  }

  return rootVisitor;
}

function wrapWithState(oldVisitor, state) {
  var newVisitor = {};

  for (var key in oldVisitor) {
    var fns = oldVisitor[key];

    // not an enter/exit array of callbacks
    if (!Array.isArray(fns)) continue;

    fns = fns.map(function (fn) {
      var newFn = function newFn(path) {
        return fn.call(state, path, state);
      };
      newFn.toString = function () {
        return fn.toString();
      };
      return newFn;
    });

    newVisitor[key] = fns;
  }

  return newVisitor;
}

function ensureEntranceObjects(obj) {
  for (var key in obj) {
    if (shouldIgnoreKey(key)) continue;

    var fns = obj[key];
    if (typeof fns === "function") {
      obj[key] = { enter: fns };
    }
  }
}

function ensureCallbackArrays(obj) {
  if (obj.enter && !Array.isArray(obj.enter)) obj.enter = [obj.enter];
  if (obj.exit && !Array.isArray(obj.exit)) obj.exit = [obj.exit];
}

function wrapCheck(wrapper, fn) {
  var newFn = function newFn(path) {
    if (wrapper.checkPath(path)) {
      return fn.apply(this, arguments);
    }
  };
  newFn.toString = function () {
    return fn.toString();
  };
  return newFn;
}

function shouldIgnoreKey(key) {
  // internal/hidden key
  if (key[0] === "_") return true;

  // ignore function keys
  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;

  // ignore other options
  if (key === "blacklist" || key === "noScope" || key === "skipKeys") return true;

  return false;
}

function mergePair(dest, src) {
  for (var key in src) {
    dest[key] = [].concat(dest[key] || [], src[key]);
  }
}