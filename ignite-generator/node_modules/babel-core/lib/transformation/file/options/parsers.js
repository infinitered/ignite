"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.boolean = boolean;
exports.booleanString = booleanString;
exports.list = list;

var _slash = require("slash");

var _slash2 = _interopRequireDefault(_slash);

var _util = require("../../../util");

var util = _interopRequireWildcard(_util);

var filename = _slash2["default"];

exports.filename = filename;

function boolean(val) {
  return !!val;
}

function booleanString(val) {
  return util.booleanify(val);
}

function list(val) {
  return util.list(val);
}