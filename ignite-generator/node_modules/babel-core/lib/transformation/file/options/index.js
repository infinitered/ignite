"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;
exports.normaliseOptions = normaliseOptions;

var _parsers = require("./parsers");

var parsers = _interopRequireWildcard(_parsers);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

exports.config = _config2["default"];

function normaliseOptions() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  for (var key in options) {
    var val = options[key];
    if (val == null) continue;

    var opt = _config2["default"][key];
    if (opt && opt.alias) opt = _config2["default"][opt.alias];
    if (!opt) continue;

    var parser = parsers[opt.type];
    if (parser) val = parser(val);

    options[key] = val;
  }

  return options;
}