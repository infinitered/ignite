"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelHelperHoistVariables = require("babel-helper-hoist-variables");

var _babelHelperHoistVariables2 = _interopRequireDefault(_babelHelperHoistVariables);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var visitor = {
  enter: function enter(path, state) {
    if (path.isThisExpression()) {
      state.foundThis = true;
    }

    if (path.isReferencedIdentifier({ name: "arguments" })) {
      state.foundArguments = true;
    }
  },

  Function: function Function(path) {
    path.skip();
  }
};

exports["default"] = function (path) {
  var scope = arguments.length <= 1 || arguments[1] === undefined ? path.scope : arguments[1];
  return (function () {
    var node = path.node;

    var container = t.functionExpression(null, [], node.body, node.generator, node.async);

    var callee = container;
    var args = [];

    // todo: only hoist if necessary
    _babelHelperHoistVariables2["default"](path, function (id) {
      return scope.push({ id: id });
    });

    var state = {
      foundThis: false,
      foundArguments: false
    };

    path.traverse(visitor, state);

    if (state.foundArguments) {
      callee = t.memberExpression(container, t.identifier("apply"));
      args = [];

      if (state.foundThis) {
        args.push(t.thisExpression());
      }

      if (state.foundArguments) {
        if (!state.foundThis) args.push(t.nullLiteral());
        args.push(t.identifier("arguments"));
      }
    }

    var call = t.callExpression(callee, args);
    if (node.generator) call = t.yieldExpression(call, true);

    return t.returnStatement(call);
  })();
};

module.exports = exports["default"];