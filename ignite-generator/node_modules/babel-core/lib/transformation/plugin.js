/* eslint max-len: 0 */

"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _fileOptionsOptionManager = require("./file/options/option-manager");

var _fileOptionsOptionManager2 = _interopRequireDefault(_fileOptionsOptionManager);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _lodashObjectAssign = require("lodash/object/assign");

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

var GLOBAL_VISITOR_PROPS = ["enter", "exit"];

var Plugin = (function (_Store) {
  _inherits(Plugin, _Store);

  function Plugin(plugin, key) {
    _classCallCheck(this, Plugin);

    _Store.call(this);

    this.initialized = false;
    this.raw = _lodashObjectAssign2["default"]({}, plugin);
    this.key = key;

    this.manipulateOptions = this.take("manipulateOptions");
    this.post = this.take("post");
    this.pre = this.take("pre");
    this.visitor = this.normaliseVisitor(_lodashLangClone2["default"](this.take("visitor")) || {});
  }

  Plugin.prototype.take = function take(key) {
    var val = this.raw[key];
    delete this.raw[key];
    return val;
  };

  Plugin.prototype.chain = function chain(target, key) {
    if (!target[key]) return this[key];
    if (!this[key]) return target[key];

    var fns = [target[key], this[key]];

    return function () {
      var val = undefined;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var _i = 0; _i < fns.length; _i++) {
        var fn = fns[_i];
        if (fn) {
          var ret = fn.apply(this, args);
          if (ret != null) val = ret;
        }
      }
      return val;
    };
  };

  Plugin.prototype.maybeInherit = function maybeInherit(loc) {
    var inherits = this.take("inherits");
    if (!inherits) return;

    inherits = _fileOptionsOptionManager2["default"].normalisePlugin(inherits, loc, "inherits");

    this.manipulateOptions = this.chain(inherits, "manipulateOptions");
    this.post = this.chain(inherits, "post");
    this.pre = this.chain(inherits, "pre");
    this.visitor = _babelTraverse2["default"].visitors.merge([inherits.visitor, this.visitor]);
  };

  /**
   * We lazy initialise parts of a plugin that rely on contextual information such as
   * position on disk and how it was specified.
   */

  Plugin.prototype.init = function init(loc, i) {
    if (this.initialized) return;
    this.initialized = true;

    this.maybeInherit(loc);

    for (var key in this.raw) {
      throw new Error(messages.get("pluginInvalidProperty", loc, i, key));
    }
  };

  Plugin.prototype.normaliseVisitor = function normaliseVisitor(visitor) {
    for (var _iterator = GLOBAL_VISITOR_PROPS, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i2 >= _iterator.length) break;
        _ref = _iterator[_i2++];
      } else {
        _i2 = _iterator.next();
        if (_i2.done) break;
        _ref = _i2.value;
      }

      var key = _ref;

      if (visitor[key]) {
        throw new Error("Plugins aren't allowed to specify catch-all enter/exit handlers. Please target individual nodes.");
      }
    }

    _babelTraverse2["default"].explode(visitor);
    return visitor;
  };

  return Plugin;
})(_store2["default"]);

exports["default"] = Plugin;
module.exports = exports["default"];