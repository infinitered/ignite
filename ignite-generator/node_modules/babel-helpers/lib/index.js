/* eslint no-confusing-arrow: 0 */

"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;
exports.get = get;

var _helpers = require("./helpers");

var _helpers2 = _interopRequireDefault(_helpers);

function get(name) {
  var fn = _helpers2["default"][name];
  if (!fn) throw new ReferenceError("Unknown helper " + name);

  return fn().expression;
}

var list = _Object$keys(_helpers2["default"]).map(function (name) {
  return name[0] === "_" ? name.slice(1) : name;
}).filter(function (name) {
  return name !== "__esModule";
});

exports.list = list;
exports["default"] = get;