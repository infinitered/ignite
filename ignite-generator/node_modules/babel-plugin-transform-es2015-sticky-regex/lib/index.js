"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelHelperRegex = require("babel-helper-regex");

var regex = _interopRequireWildcard(_babelHelperRegex);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

exports["default"] = function () {
  return {
    visitor: {
      RegExpLiteral: function RegExpLiteral(path) {
        var node = path.node;

        if (!regex.is(node, "y")) return;

        path.replaceWith(t.newExpression(t.identifier("RegExp"), [t.stringLiteral(node.pattern), t.stringLiteral(node.flags)]));
      }
    }
  };
};

module.exports = exports["default"];