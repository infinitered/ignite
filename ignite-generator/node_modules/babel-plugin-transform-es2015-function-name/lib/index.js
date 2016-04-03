"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

exports["default"] = function () {
  return {
    visitor: {
      "ArrowFunctionExpression|FunctionExpression": {
        exit: function exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            var replacement = _babelHelperFunctionName2["default"](path);
            if (replacement) path.replaceWith(replacement);
          }
        }
      },

      ObjectProperty: function ObjectProperty(path) {
        var value = path.get("value");
        if (value.isFunction()) {
          var newNode = _babelHelperFunctionName2["default"](value);
          if (newNode) value.replaceWith(newNode);
        }
      }
    }
  };
};

module.exports = exports["default"];