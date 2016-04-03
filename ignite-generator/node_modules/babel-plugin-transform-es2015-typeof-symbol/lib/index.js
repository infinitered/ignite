/* eslint max-len: 0 */

"use strict";

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

exports.__esModule = true;

exports["default"] = function (_ref) {
  var t = _ref.types;

  var IGNORE = _Symbol();

  return {
    visitor: {
      Scope: function Scope(_ref2) {
        var scope = _ref2.scope;

        if (!scope.getBinding("Symbol")) {
          return;
        }

        scope.rename("Symbol");
      },

      UnaryExpression: function UnaryExpression(path) {
        var node = path.node;
        var parent = path.parent;

        if (node[IGNORE]) return;
        if (path.find(function (path) {
          return path.node && !!path.node._generated;
        })) return;

        if (path.parentPath.isBinaryExpression() && t.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
          // optimise `typeof foo === "string"` since we can determine that they'll never need to handle symbols
          var opposite = path.getOpposite();
          if (opposite.isLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "object") {
            return;
          }
        }

        if (node.operator === "typeof") {
          var call = t.callExpression(this.addHelper("typeof"), [node.argument]);
          if (path.get("argument").isIdentifier()) {
            var undefLiteral = t.stringLiteral("undefined");
            var unary = t.unaryExpression("typeof", node.argument);
            unary[IGNORE] = true;
            path.replaceWith(t.conditionalExpression(t.binaryExpression("===", unary, undefLiteral), undefLiteral, call));
          } else {
            path.replaceWith(call);
          }
        }
      }
    }
  };
};

module.exports = exports["default"];