"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;
exports.canCompile = canCompile;
exports.list = list;
exports.regexify = regexify;
exports.arrayify = arrayify;
exports.booleanify = booleanify;
exports.shouldIgnore = shouldIgnore;

var _lodashStringEscapeRegExp = require("lodash/string/escapeRegExp");

var _lodashStringEscapeRegExp2 = _interopRequireDefault(_lodashStringEscapeRegExp);

var _lodashStringStartsWith = require("lodash/string/startsWith");

var _lodashStringStartsWith2 = _interopRequireDefault(_lodashStringStartsWith);

var _lodashLangIsBoolean = require("lodash/lang/isBoolean");

var _lodashLangIsBoolean2 = _interopRequireDefault(_lodashLangIsBoolean);

var _minimatch = require("minimatch");

var _minimatch2 = _interopRequireDefault(_minimatch);

var _lodashCollectionContains = require("lodash/collection/contains");

var _lodashCollectionContains2 = _interopRequireDefault(_lodashCollectionContains);

var _lodashLangIsString = require("lodash/lang/isString");

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _lodashLangIsRegExp = require("lodash/lang/isRegExp");

var _lodashLangIsRegExp2 = _interopRequireDefault(_lodashLangIsRegExp);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _slash = require("slash");

var _slash2 = _interopRequireDefault(_slash);

var _util = require("util");

exports.inherits = _util.inherits;
exports.inspect = _util.inspect;

/**
 * Test if a filename ends with a compilable extension.
 */

function canCompile(filename, altExts) {
  var exts = altExts || canCompile.EXTENSIONS;
  var ext = _path2["default"].extname(filename);
  return _lodashCollectionContains2["default"](exts, ext);
}

/**
 * Default set of compilable extensions.
 */

canCompile.EXTENSIONS = [".js", ".jsx", ".es6", ".es"];

/**
 * Create an array from any value, splitting strings by ",".
 */

function list(val) {
  if (!val) {
    return [];
  } else if (Array.isArray(val)) {
    return val;
  } else if (typeof val === "string") {
    return val.split(",");
  } else {
    return [val];
  }
}

/**
 * Create a RegExp from a string, array, or regexp.
 */

function regexify(val) {
  if (!val) {
    return new RegExp(/.^/);
  }

  if (Array.isArray(val)) {
    val = new RegExp(val.map(_lodashStringEscapeRegExp2["default"]).join("|"), "i");
  }

  if (typeof val === "string") {
    // normalise path separators
    val = _slash2["default"](val);

    // remove starting wildcards or relative separator if present
    if (_lodashStringStartsWith2["default"](val, "./") || _lodashStringStartsWith2["default"](val, "*/")) val = val.slice(2);
    if (_lodashStringStartsWith2["default"](val, "**/")) val = val.slice(3);

    var regex = _minimatch2["default"].makeRe(val, { nocase: true });
    return new RegExp(regex.source.slice(1, -1), "i");
  }

  if (_lodashLangIsRegExp2["default"](val)) {
    return val;
  }

  throw new TypeError("illegal type for regexify");
}

/**
 * Create an array from a boolean, string, or array, mapped by and optional function.
 */

function arrayify(val, mapFn) {
  if (!val) return [];
  if (_lodashLangIsBoolean2["default"](val)) return arrayify([val], mapFn);
  if (_lodashLangIsString2["default"](val)) return arrayify(list(val), mapFn);

  if (Array.isArray(val)) {
    if (mapFn) val = val.map(mapFn);
    return val;
  }

  return [val];
}

/**
 * Makes boolean-like strings into booleans.
 */

function booleanify(val) {
  if (val === "true" || val == 1) {
    return true;
  }

  if (val === "false" || val == 0 || !val) {
    return false;
  }

  return val;
}

/**
 * Tests if a filename should be ignored based on "ignore" and "only" options.
 */

function shouldIgnore(filename, ignore, only) {
  if (ignore === undefined) ignore = [];

  filename = _slash2["default"](filename);

  if (only) {
    for (var _i = 0; _i < only.length; _i++) {
      var pattern = only[_i];
      if (_shouldIgnore(pattern, filename)) return false;
    }
    return true;
  } else if (ignore.length) {
    for (var _i2 = 0; _i2 < ignore.length; _i2++) {
      var pattern = ignore[_i2];
      if (_shouldIgnore(pattern, filename)) return true;
    }
  }

  return false;
}

/**
 * Returns result of calling function with filename if pattern is a function.
 * Otherwise returns result of matching pattern Regex with filename.
 */

function _shouldIgnore(pattern, filename) {
  if (typeof pattern === "function") {
    return pattern(filename);
  } else {
    return pattern.test(filename);
  }
}