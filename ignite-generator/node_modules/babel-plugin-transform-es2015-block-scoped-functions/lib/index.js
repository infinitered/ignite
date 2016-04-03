"use strict";

exports.__esModule = true;

exports["default"] = function (_ref) {
  var t = _ref.types;

  function statementList(key, path) {
    var paths = path.get(key);

    for (var _i = 0; _i < paths.length; _i++) {
      var _path = paths[_i];
      var func = _path.node;
      if (!_path.isFunctionDeclaration()) continue;

      var declar = t.variableDeclaration("let", [t.variableDeclarator(func.id, t.toExpression(func))]);

      // hoist it up above everything else
      declar._blockHoist = 2;

      // todo: name this
      func.id = null;

      _path.replaceWith(declar);
    }
  }

  return {
    visitor: {
      BlockStatement: function BlockStatement(path) {
        var node = path.node;
        var parent = path.parent;

        if (t.isFunction(parent, { body: node }) || t.isExportDeclaration(parent)) {
          return;
        }

        statementList("body", path);
      },

      SwitchCase: function SwitchCase(path) {
        statementList("consequent", path);
      }
    }
  };
};

module.exports = exports["default"];