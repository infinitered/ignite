"use strict";

exports.__esModule = true;

exports["default"] = function (_ref) {
  var t = _ref.types;

  var FLOW_DIRECTIVE = "@flow";

  return {
    inherits: require("babel-plugin-syntax-flow"),

    visitor: {
      Program: function Program(path, _ref2) {
        var comments = _ref2.file.ast.comments;
        var _arr = comments;

        for (var _i = 0; _i < _arr.length; _i++) {
          var comment = _arr[_i];
          if (comment.value.indexOf(FLOW_DIRECTIVE) >= 0) {
            // remove flow directive
            comment.value = comment.value.replace(FLOW_DIRECTIVE, "");

            // remove the comment completely if it only consists of whitespace and/or stars
            if (!comment.value.replace(/\*/g, "").trim()) comment.ignore = true;
          }
        }
      },

      Flow: function Flow(path) {
        path.remove();
      },

      ClassProperty: function ClassProperty(path) {
        path.node.typeAnnotation = null;
        if (!path.node.value) path.remove();
      },

      Class: function Class(_ref3) {
        var node = _ref3.node;

        node["implements"] = null;
      },

      Function: function Function(_ref4) {
        var node = _ref4.node;

        for (var i = 0; i < node.params.length; i++) {
          var param = node.params[i];
          param.optional = false;
        }
      },

      TypeCastExpression: function TypeCastExpression(path) {
        var node = path.node;

        do {
          node = node.expression;
        } while (t.isTypeCastExpression(node));
        path.replaceWith(node);
      }
    }
  };
};

module.exports = exports["default"];