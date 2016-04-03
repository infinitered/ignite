"use strict";

var _WeakMap = require("babel-runtime/core-js/weak-map")["default"];

exports.__esModule = true;
exports.clear = clear;
var path = new _WeakMap();
exports.path = path;
var scope = new _WeakMap();

exports.scope = scope;

function clear() {
  exports.path = path = new _WeakMap();
  exports.scope = scope = new _WeakMap();
}