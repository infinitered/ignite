"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _debugNode = require("debug/node");

var _debugNode2 = _interopRequireDefault(_debugNode);

var verboseDebug = _debugNode2["default"]("babel:verbose");
var generalDebug = _debugNode2["default"]("babel");

var seenDeprecatedMessages = [];

var Logger = (function () {
  function Logger(file, filename) {
    _classCallCheck(this, Logger);

    this.filename = filename;
    this.file = file;
  }

  Logger.prototype._buildMessage = function _buildMessage(msg) {
    var parts = "[BABEL] " + this.filename;
    if (msg) parts += ": " + msg;
    return parts;
  };

  Logger.prototype.warn = function warn(msg) {
    console.warn(this._buildMessage(msg));
  };

  Logger.prototype.error = function error(msg) {
    var Constructor = arguments.length <= 1 || arguments[1] === undefined ? Error : arguments[1];

    throw new Constructor(this._buildMessage(msg));
  };

  Logger.prototype.deprecate = function deprecate(msg) {
    if (this.file.opts && this.file.opts.suppressDeprecationMessages) return;

    msg = this._buildMessage(msg);

    // already seen this message
    if (seenDeprecatedMessages.indexOf(msg) >= 0) return;

    // make sure we don't see it again
    seenDeprecatedMessages.push(msg);

    console.error(msg);
  };

  Logger.prototype.verbose = function verbose(msg) {
    if (verboseDebug.enabled) verboseDebug(this._buildMessage(msg));
  };

  Logger.prototype.debug = function debug(msg) {
    if (generalDebug.enabled) generalDebug(this._buildMessage(msg));
  };

  Logger.prototype.deopt = function deopt(node, msg) {
    this.debug(msg);
  };

  return Logger;
})();

exports["default"] = Logger;
module.exports = exports["default"];