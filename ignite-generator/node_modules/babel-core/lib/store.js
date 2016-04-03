"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Map2 = require("babel-runtime/core-js/map")["default"];

exports.__esModule = true;

var Store = (function (_Map) {
  _inherits(Store, _Map);

  function Store() {
    _classCallCheck(this, Store);

    _Map.call(this);
    this.dynamicData = {};
  }

  Store.prototype.setDynamic = function setDynamic(key, fn) {
    this.dynamicData[key] = fn;
  };

  Store.prototype.get = function get(key) {
    if (this.has(key)) {
      return _Map.prototype.get.call(this, key);
    } else {
      if (Object.prototype.hasOwnProperty.call(this.dynamicData, key)) {
        var val = this.dynamicData[key]();
        this.set(key, val);
        return val;
      }
    }
  };

  return Store;
})(_Map2);

exports["default"] = Store;
module.exports = exports["default"];