"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

exports["default"] = function (decorators, scope) {
  for (var _i = 0; _i < decorators.length; _i++) {
    var decorator = decorators[_i];
    var expression = decorator.expression;
    if (!t.isMemberExpression(expression)) continue;

    var temp = scope.maybeGenerateMemoised(expression.object);
    var ref = undefined;

    var nodes = [];

    if (temp) {
      ref = temp;
      nodes.push(t.assignmentExpression("=", temp, expression.object));
    } else {
      ref = expression.object;
    }

    nodes.push(t.callExpression(t.memberExpression(t.memberExpression(ref, expression.property, expression.computed), t.identifier("bind")), [ref]));

    if (nodes.length === 1) {
      decorator.expression = nodes[0];
    } else {
      decorator.expression = t.sequenceExpression(nodes);
    }
  }

  return decorators;
};

module.exports = exports["default"];