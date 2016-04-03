"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

var _vanilla = require("./vanilla");

var _vanilla2 = _interopRequireDefault(_vanilla);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var LooseClassTransformer = (function (_VanillaTransformer) {
  _inherits(LooseClassTransformer, _VanillaTransformer);

  function LooseClassTransformer() {
    _classCallCheck(this, LooseClassTransformer);

    _VanillaTransformer.apply(this, arguments);
    this.isLoose = true;
  }

  LooseClassTransformer.prototype._processMethod = function _processMethod(node, scope) {
    if (!node.decorators) {
      // use assignments instead of define properties for loose classes

      var classRef = this.classRef;
      if (!node["static"]) classRef = t.memberExpression(classRef, t.identifier("prototype"));
      var methodName = t.memberExpression(classRef, node.key, node.computed || t.isLiteral(node.key));

      var func = t.functionExpression(null, node.params, node.body, node.generator, node.async);
      var key = t.toComputedKey(node, node.key);
      if (t.isStringLiteral(key)) {
        func = _babelHelperFunctionName2["default"]({
          node: func,
          id: key,
          scope: scope
        });
      }

      var expr = t.expressionStatement(t.assignmentExpression("=", methodName, func));
      t.inheritsComments(expr, node);
      this.body.push(expr);
      return true;
    }
  };

  return LooseClassTransformer;
})(_vanilla2["default"]);

exports["default"] = LooseClassTransformer;
module.exports = exports["default"];