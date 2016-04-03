"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _regexpuCore = require("regexpu-core");

var _regexpuCore2 = _interopRequireDefault(_regexpuCore);

var _babelHelperRegex = require("babel-helper-regex");

var regex = _interopRequireWildcard(_babelHelperRegex);

exports["default"] = function () {
  return {
    visitor: {
      RegExpLiteral: function RegExpLiteral(_ref) {
        var node = _ref.node;

        if (!regex.is(node, "u")) return;
        node.pattern = _regexpuCore2["default"](node.pattern, node.flags);
        regex.pullFlag(node, "u");
      }
    }
  };
};

module.exports = exports["default"];