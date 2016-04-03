"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

exports["default"] = function () {
  return {
    visitor: {
      ObjectMethod: function ObjectMethod(path) {
        var node = path.node;

        if (node.kind === "method") {
          path.replaceWith(t.objectProperty(node.key, t.functionExpression(null, node.params, node.body, node.generator, node.async), node.computed));
        }
      },

      ObjectProperty: function ObjectProperty(_ref) {
        var node = _ref.node;

        if (node.shorthand) {
          node.shorthand = false;
        }
      }
    }
  };
};

module.exports = exports["default"];