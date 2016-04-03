"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var visitor = {
  Scope: function Scope(path, state) {
    if (state.kind === "let") path.skip();
  },

  Function: function Function(path) {
    path.skip();
  },

  VariableDeclaration: function VariableDeclaration(path, state) {
    if (state.kind && path.node.kind !== state.kind) return;

    var nodes = [];

    var declarations = path.get("declarations");
    var firstId = undefined;

    for (var _i = 0; _i < declarations.length; _i++) {
      var declar = declarations[_i];
      firstId = declar.node.id;

      if (declar.node.init) {
        nodes.push(t.expressionStatement(t.assignmentExpression("=", declar.node.id, declar.node.init)));
      }

      for (var _name in declar.getBindingIdentifiers()) {
        state.emit(t.identifier(_name), _name);
      }
    }

    // for (var i in test)
    if (path.parentPath.isFor({ left: path.node })) {
      path.replaceWith(firstId);
    } else {
      path.replaceWithMultiple(nodes);
    }
  }
};

exports["default"] = function (path, emit) {
  var kind = arguments.length <= 2 || arguments[2] === undefined ? "var" : arguments[2];

  path.traverse(visitor, { kind: kind, emit: emit });
};

module.exports = exports["default"];