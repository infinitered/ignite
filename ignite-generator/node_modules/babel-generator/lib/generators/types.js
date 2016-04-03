/* eslint max-len: 0 */
/* eslint quotes: 0 */

"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.Identifier = Identifier;
exports.RestElement = RestElement;
exports.ObjectExpression = ObjectExpression;
exports.ObjectMethod = ObjectMethod;
exports.ObjectProperty = ObjectProperty;
exports.ArrayExpression = ArrayExpression;
exports.RegExpLiteral = RegExpLiteral;
exports.BooleanLiteral = BooleanLiteral;
exports.NullLiteral = NullLiteral;
exports.NumericLiteral = NumericLiteral;
exports.StringLiteral = StringLiteral;
exports._stringLiteral = _stringLiteral;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function Identifier(node) {
  // FIXME: We hang variance off Identifer to support Flow's def-site variance.
  // This is a terrible hack, but changing type annotations to use a new,
  // dedicated node would be a breaking change. This should be cleaned up in
  // the next major.
  if (node.variance === "plus") {
    this.push("+");
  } else if (node.variance === "minus") {
    this.push("-");
  }

  this.push(node.name);
}

function RestElement(node) {
  this.push("...");
  this.print(node.argument, node);
}

exports.SpreadElement = RestElement;
exports.SpreadProperty = RestElement;
exports.RestProperty = RestElement;

function ObjectExpression(node) {
  var props = node.properties;

  this.push("{");
  this.printInnerComments(node);

  if (props.length) {
    this.space();
    this.printList(props, node, { indent: true });
    this.space();
  }

  this.push("}");
}

exports.ObjectPattern = ObjectExpression;

function ObjectMethod(node) {
  this.printJoin(node.decorators, node, { separator: "" });
  this._method(node);
}

function ObjectProperty(node) {
  this.printJoin(node.decorators, node, { separator: "" });

  if (node.computed) {
    this.push("[");
    this.print(node.key, node);
    this.push("]");
  } else {
    // print `({ foo: foo = 5 } = {})` as `({ foo = 5 } = {});`
    if (t.isAssignmentPattern(node.value) && t.isIdentifier(node.key) && node.key.name === node.value.left.name) {
      this.print(node.value, node);
      return;
    }

    this.print(node.key, node);

    // shorthand!
    if (node.shorthand && t.isIdentifier(node.key) && t.isIdentifier(node.value) && node.key.name === node.value.name) {
      return;
    }
  }

  this.push(":");
  this.space();
  this.print(node.value, node);
}

function ArrayExpression(node) {
  var elems = node.elements;
  var len = elems.length;

  this.push("[");
  this.printInnerComments(node);

  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    if (elem) {
      if (i > 0) this.space();
      this.print(elem, node);
      if (i < len - 1) this.push(",");
    } else {
      // If the array expression ends with a hole, that hole
      // will be ignored by the interpreter, but if it ends with
      // two (or more) holes, we need to write out two (or more)
      // commas so that the resulting code is interpreted with
      // both (all) of the holes.
      this.push(",");
    }
  }

  this.push("]");
}

exports.ArrayPattern = ArrayExpression;

function RegExpLiteral(node) {
  this.push("/" + node.pattern + "/" + node.flags);
}

function BooleanLiteral(node) {
  this.push(node.value ? "true" : "false");
}

function NullLiteral() {
  this.push("null");
}

function NumericLiteral(node) {
  this.push(node.value + "");
}

function StringLiteral(node, parent) {
  this.push(this._stringLiteral(node.value, parent));
}

function _stringLiteral(val, parent) {
  val = JSON.stringify(val);

  // escape illegal js but valid json unicode characters
  val = val.replace(/[\u000A\u000D\u2028\u2029]/g, function (c) {
    return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
  });

  if (this.format.quotes === "single" && !t.isJSX(parent)) {
    // remove double quotes
    val = val.slice(1, -1);

    // unescape double quotes
    val = val.replace(/\\"/g, '"');

    // escape single quotes
    val = val.replace(/'/g, "\\'");

    // add single quotes
    val = "'" + val + "'";
  }

  return val;
}