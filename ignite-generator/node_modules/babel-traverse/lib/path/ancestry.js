// This file contains that retrieve or validate anything related to the current paths ancestry.

"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;
exports.findParent = findParent;
exports.find = find;
exports.getFunctionParent = getFunctionParent;
exports.getStatementParent = getStatementParent;
exports.getEarliestCommonAncestorFrom = getEarliestCommonAncestorFrom;
exports.getDeepestCommonAncestorFrom = getDeepestCommonAncestorFrom;
exports.getAncestry = getAncestry;
exports.inType = inType;
exports.inShadow = inShadow;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

/**
 * Call the provided `callback` with the `NodePath`s of all the parents.
 * When the `callback` returns a truthy value, we return that node path.
 */

function findParent(callback) {
  var path = this;
  while (path = path.parentPath) {
    if (callback(path)) return path;
  }
  return null;
}

/**
 * Description
 */

function find(callback) {
  var path = this;
  do {
    if (callback(path)) return path;
  } while (path = path.parentPath);
  return null;
}

/**
 * Get the parent function of the current path.
 */

function getFunctionParent() {
  return this.findParent(function (path) {
    return path.isFunction() || path.isProgram();
  });
}

/**
 * Walk up the tree until we hit a parent node path in a list.
 */

function getStatementParent() {
  var path = this;
  do {
    if (Array.isArray(path.container)) {
      return path;
    }
  } while (path = path.parentPath);
}

/**
 * Get the deepest common ancestor and then from it, get the earliest relationship path
 * to that ancestor.
 *
 * Earliest is defined as being "before" all the other nodes in terms of list container
 * position and visiting key.
 */

function getEarliestCommonAncestorFrom(paths) {
  return this.getDeepestCommonAncestorFrom(paths, function (deepest, i, ancestries) {
    var earliest = undefined;
    var keys = t.VISITOR_KEYS[deepest.type];

    var _arr = ancestries;
    for (var _i = 0; _i < _arr.length; _i++) {
      var ancestry = _arr[_i];
      var path = ancestry[i + 1];

      // first path
      if (!earliest) {
        earliest = path;
        continue;
      }

      // handle containers
      if (path.listKey && earliest.listKey === path.listKey) {
        // we're in the same container so check if we're earlier
        if (path.key < earliest.key) {
          earliest = path;
          continue;
        }
      }

      // handle keys
      var earliestKeyIndex = keys.indexOf(earliest.parentKey);
      var currentKeyIndex = keys.indexOf(path.parentKey);
      if (earliestKeyIndex > currentKeyIndex) {
        // key appears before so it's earlier
        earliest = path;
      }
    }

    return earliest;
  });
}

/**
 * Get the earliest path in the tree where the provided `paths` intersect.
 *
 * TODO: Possible optimisation target.
 */

function getDeepestCommonAncestorFrom(paths, filter) {
  // istanbul ignore next

  var _this = this;

  if (!paths.length) {
    return this;
  }

  if (paths.length === 1) {
    return paths[0];
  }

  // minimum depth of the tree so we know the highest node
  var minDepth = Infinity;

  // last common ancestor
  var lastCommonIndex = undefined,
      lastCommon = undefined;

  // get the ancestors of the path, breaking when the parent exceeds ourselves
  var ancestries = paths.map(function (path) {
    var ancestry = [];

    do {
      ancestry.unshift(path);
    } while ((path = path.parentPath) && path !== _this);

    // save min depth to avoid going too far in
    if (ancestry.length < minDepth) {
      minDepth = ancestry.length;
    }

    return ancestry;
  });

  // get the first ancestry so we have a seed to assess all other ancestries with
  var first = ancestries[0];

  // check ancestor equality
  depthLoop: for (var i = 0; i < minDepth; i++) {
    var shouldMatch = first[i];

    var _arr2 = ancestries;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var ancestry = _arr2[_i2];
      if (ancestry[i] !== shouldMatch) {
        // we've hit a snag
        break depthLoop;
      }
    }

    // next iteration may break so store these so they can be returned
    lastCommonIndex = i;
    lastCommon = shouldMatch;
  }

  if (lastCommon) {
    if (filter) {
      return filter(lastCommon, lastCommonIndex, ancestries);
    } else {
      return lastCommon;
    }
  } else {
    throw new Error("Couldn't find intersection");
  }
}

/**
 * Build an array of node paths containing the entire ancestry of the current node path.
 *
 * NOTE: The current node path is included in this.
 */

function getAncestry() {
  var path = this;
  var paths = [];
  do {
    paths.push(path);
  } while (path = path.parentPath);
  return paths;
}

function inType() {
  var path = this;
  while (path) {
    var _arr3 = arguments;

    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var type = _arr3[_i3];
      if (path.node.type === type) return true;
    }
    path = path.parentPath;
  }

  return false;
}

/**
 * Checks whether the binding for 'key' is a local binding in its current function context.
 *
 * Checks if the current path either is, or has a direct parent function that is, inside
 * of a function that is marked for shadowing of a binding matching 'key'. Also returns
 * the parent path if the parent path is an arrow, since arrow functions pass through
 * binding values to their parent, meaning they have no local bindings.
 *
 * Shadowing means that when the given binding is transformed, it will read the binding
 * value from the container containing the shadow function, rather than from inside the
 * shadow function.
 *
 * Function shadowing is acheieved by adding a "shadow" property on "FunctionExpression"
 * and "FunctionDeclaration" node types.
 *
 * Node's "shadow" props have the following behavior:
 *
 * - Boolean true will cause the function to shadow both "this" and "arguments".
 * - {this: false} Shadows "arguments" but not "this".
 * - {arguments: false} Shadows "this" but not "arguments".
 *
 * Separately, individual identifiers can be flagged with two flags:
 *
 * - _forceShadow - If truthy, this specific identifier will be bound in the closest
 *    Function that is not flagged "shadow", or the Program.
 * - _shadowedFunctionLiteral - When set to a NodePath, this specific identifier will be bound
 *    to this NodePath/Node or the Program. If this path is not found relative to the
 *    starting location path, the closest function will be used.
 *
 * Please Note, these flags are for private internal use only and should be avoided.
 * Only "shadow" is a public property that other transforms may manipulate.
 */

function inShadow(key) {
  var parentFn = this.isFunction() ? this : this.findParent(function (p) {
    return p.isFunction();
  });
  if (!parentFn) return;

  if (parentFn.isFunctionExpression() || parentFn.isFunctionDeclaration()) {
    var shadow = parentFn.node.shadow;

    // this is because sometimes we may have a `shadow` value of:
    //
    //   { this: false }
    //
    // we need to catch this case if `inShadow` has been passed a `key`
    if (shadow && (!key || shadow[key] !== false)) {
      return parentFn;
    }
  } else if (parentFn.isArrowFunctionExpression()) {
    return parentFn;
  }

  // normal function, we've found our function context
  return null;
}