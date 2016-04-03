"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports._params = _params;
exports._method = _method;
exports.FunctionExpression = FunctionExpression;
exports.ArrowFunctionExpression = ArrowFunctionExpression;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _params(node) {
  // istanbul ignore next

  var _this = this;

  this.print(node.typeParameters, node);
  this.push("(");
  this.printList(node.params, node, {
    iterator: function iterator(node) {
      if (node.optional) _this.push("?");
      _this.print(node.typeAnnotation, node);
    }
  });
  this.push(")");

  if (node.returnType) {
    this.print(node.returnType, node);
  }
}

function _method(node) {
  var kind = node.kind;
  var key = node.key;

  if (kind === "method" || kind === "init") {
    if (node.generator) {
      this.push("*");
    }
  }

  if (kind === "get" || kind === "set") {
    this.push(kind + " ");
  }

  if (node.async) this.push("async ");

  if (node.computed) {
    this.push("[");
    this.print(key, node);
    this.push("]");
  } else {
    this.print(key, node);
  }

  this._params(node);
  this.space();
  this.print(node.body, node);
}

function FunctionExpression(node) {
  if (node.async) this.push("async ");
  this.push("function");
  if (node.generator) this.push("*");

  if (node.id) {
    this.push(" ");
    this.print(node.id, node);
  } else {
    this.space();
  }

  this._params(node);
  this.space();
  this.print(node.body, node);
}

exports.FunctionDeclaration = FunctionExpression;

function ArrowFunctionExpression(node) {
  if (node.async) this.push("async ");

  if (node.params.length === 1 && t.isIdentifier(node.params[0])) {
    this.print(node.params[0], node);
  } else {
    this._params(node);
  }

  this.push(" => ");

  this.print(node.body, node);
}