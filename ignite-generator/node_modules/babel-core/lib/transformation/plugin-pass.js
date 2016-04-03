"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _file5 = require("./file");

var _file6 = _interopRequireDefault(_file5);

var PluginPass = (function (_Store) {
  _inherits(PluginPass, _Store);

  function PluginPass(file, plugin) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, PluginPass);

    _Store.call(this);
    this.plugin = plugin;
    this.file = file;
    this.opts = options;
  }

  PluginPass.prototype.transform = function transform() {
    var file = this.file;
    file.log.debug("Start transformer " + this.key);
    _babelTraverse2["default"](file.ast, this.plugin.visitor, file.scope, file);
    file.log.debug("Finish transformer " + this.key);
  };

  PluginPass.prototype.addHelper = function addHelper() {
    // istanbul ignore next

    var _file;

    return (_file = this.file).addHelper.apply(_file, arguments);
  };

  PluginPass.prototype.addImport = function addImport() {
    // istanbul ignore next

    var _file2;

    return (_file2 = this.file).addImport.apply(_file2, arguments);
  };

  PluginPass.prototype.getModuleName = function getModuleName() {
    // istanbul ignore next

    var _file3;

    return (_file3 = this.file).getModuleName.apply(_file3, arguments);
  };

  PluginPass.prototype.buildCodeFrameError = function buildCodeFrameError() {
    // istanbul ignore next

    var _file4;

    return (_file4 = this.file).buildCodeFrameError.apply(_file4, arguments);
  };

  return PluginPass;
})(_store2["default"]);

exports["default"] = PluginPass;
module.exports = exports["default"];