"use strict";

exports.__esModule = true;
exports.JSXAttribute = JSXAttribute;
exports.JSXIdentifier = JSXIdentifier;
exports.JSXNamespacedName = JSXNamespacedName;
exports.JSXMemberExpression = JSXMemberExpression;
exports.JSXSpreadAttribute = JSXSpreadAttribute;
exports.JSXExpressionContainer = JSXExpressionContainer;
exports.JSXText = JSXText;
exports.JSXElement = JSXElement;
exports.JSXOpeningElement = JSXOpeningElement;
exports.JSXClosingElement = JSXClosingElement;
exports.JSXEmptyExpression = JSXEmptyExpression;

function JSXAttribute(node) {
  this.print(node.name, node);
  if (node.value) {
    this.push("=");
    this.print(node.value, node);
  }
}

function JSXIdentifier(node) {
  this.push(node.name);
}

function JSXNamespacedName(node) {
  this.print(node.namespace, node);
  this.push(":");
  this.print(node.name, node);
}

function JSXMemberExpression(node) {
  this.print(node.object, node);
  this.push(".");
  this.print(node.property, node);
}

function JSXSpreadAttribute(node) {
  this.push("{...");
  this.print(node.argument, node);
  this.push("}");
}

function JSXExpressionContainer(node) {
  this.push("{");
  this.print(node.expression, node);
  this.push("}");
}

function JSXText(node) {
  this.push(node.value, true);
}

function JSXElement(node) {
  var open = node.openingElement;
  this.print(open, node);
  if (open.selfClosing) return;

  this.indent();
  var _arr = node.children;
  for (var _i = 0; _i < _arr.length; _i++) {
    var child = _arr[_i];
    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingElement, node);
}

function JSXOpeningElement(node) {
  this.push("<");
  this.print(node.name, node);
  if (node.attributes.length > 0) {
    this.push(" ");
    this.printJoin(node.attributes, node, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
}

function JSXClosingElement(node) {
  this.push("</");
  this.print(node.name, node);
  this.push(">");
}

function JSXEmptyExpression() {}