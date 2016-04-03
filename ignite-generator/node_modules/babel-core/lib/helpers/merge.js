"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _lodashObjectMerge = require("lodash/object/merge");

var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);

exports["default"] = function (dest, src) {
  if (!dest || !src) return;

  return _lodashObjectMerge2["default"](dest, src, function (a, b) {
    if (b && Array.isArray(a)) {
      var newArray = b.slice(0);

      for (var _iterator = a, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var item = _ref;

        if (newArray.indexOf(item) < 0) {
          newArray.push(item);
        }
      }

      return newArray;
    }
  });
};

module.exports = exports["default"];