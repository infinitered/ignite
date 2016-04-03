"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("Noop", {
  visitor: []
});

_index2["default"]("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression", "ExpressionWrapper"],
  fields: {
    expression: {
      validate: _index.assertNodeType("Expression")
    }
  }
});