"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],
  checkPath: function checkPath(_ref, opts) {
    var node = _ref.node;
    var parent = _ref.parent;

    if (!t.isIdentifier(node, opts)) {
      if (t.isJSXIdentifier(node, opts)) {
        if (_babelTypes.react.isCompatTag(node.name)) return false;
      } else {
        // not a JSXIdentifier or an Identifier
        return false;
      }
    }

    // check if node is referenced
    return t.isReferenced(node, parent);
  }
};

exports.ReferencedIdentifier = ReferencedIdentifier;
var ReferencedMemberExpression = {
  types: ["MemberExpression"],
  checkPath: function checkPath(_ref2) {
    var node = _ref2.node;
    var parent = _ref2.parent;

    return t.isMemberExpression(node) && t.isReferenced(node, parent);
  }
};

exports.ReferencedMemberExpression = ReferencedMemberExpression;
var BindingIdentifier = {
  types: ["Identifier"],
  checkPath: function checkPath(_ref3) {
    var node = _ref3.node;
    var parent = _ref3.parent;

    return t.isIdentifier(node) && t.isBinding(node, parent);
  }
};

exports.BindingIdentifier = BindingIdentifier;
var Statement = {
  types: ["Statement"],
  checkPath: function checkPath(_ref4) {
    var node = _ref4.node;
    var parent = _ref4.parent;

    if (t.isStatement(node)) {
      if (t.isVariableDeclaration(node)) {
        if (t.isForXStatement(parent, { left: node })) return false;
        if (t.isForStatement(parent, { init: node })) return false;
      }

      return true;
    } else {
      return false;
    }
  }
};

exports.Statement = Statement;
var Expression = {
  types: ["Expression"],
  checkPath: function checkPath(path) {
    if (path.isIdentifier()) {
      return path.isReferencedIdentifier();
    } else {
      return t.isExpression(path.node);
    }
  }
};

exports.Expression = Expression;
var Scope = {
  types: ["Scopable"],
  checkPath: function checkPath(path) {
    return t.isScope(path.node, path.parent);
  }
};

exports.Scope = Scope;
var Referenced = {
  checkPath: function checkPath(path) {
    return t.isReferenced(path.node, path.parent);
  }
};

exports.Referenced = Referenced;
var BlockScoped = {
  checkPath: function checkPath(path) {
    return t.isBlockScoped(path.node);
  }
};

exports.BlockScoped = BlockScoped;
var Var = {
  types: ["VariableDeclaration"],
  checkPath: function checkPath(path) {
    return t.isVar(path.node);
  }
};

exports.Var = Var;
var User = {
  checkPath: function checkPath(path) {
    return path.node && !!path.node.loc;
  }
};

exports.User = User;
var Generated = {
  checkPath: function checkPath(path) {
    return !path.isUser();
  }
};

exports.Generated = Generated;
var Pure = {
  checkPath: function checkPath(path, opts) {
    return path.scope.isPure(path.node, opts);
  }
};

exports.Pure = Pure;
var Flow = {
  types: ["Flow", "ImportDeclaration", "ExportDeclaration"],
  checkPath: function checkPath(_ref5) {
    var node = _ref5.node;

    if (t.isFlow(node)) {
      return true;
    } else if (t.isImportDeclaration(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else if (t.isExportDeclaration(node)) {
      return node.exportKind === "type";
    } else {
      return false;
    }
  }
};
exports.Flow = Flow;