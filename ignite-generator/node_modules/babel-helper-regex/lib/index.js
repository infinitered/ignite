"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.is = is;
exports.pullFlag = pullFlag;

var _lodashArrayPull = require("lodash/array/pull");

var _lodashArrayPull2 = _interopRequireDefault(_lodashArrayPull);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function is(node, flag) {
  return t.isRegExpLiteral(node) && node.flags.indexOf(flag) >= 0;
}

function pullFlag(node, flag) {
  var flags = node.flags.split("");
  if (node.flags.indexOf(flag) < 0) return;
  _lodashArrayPull2["default"](flags, flag);
  node.flags = flags.join("");
}