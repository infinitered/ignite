"use strict";

exports.__esModule = true;
exports.File = File;
exports.Program = Program;
exports.BlockStatement = BlockStatement;
exports.Noop = Noop;
exports.Directive = Directive;
exports.DirectiveLiteral = DirectiveLiteral;

function File(node) {
  this.print(node.program, node);
}

function Program(node) {
  this.printInnerComments(node, false);

  this.printSequence(node.directives, node);
  if (node.directives && node.directives.length) this.newline();

  this.printSequence(node.body, node);
}

function BlockStatement(node) {
  this.push("{");
  this.printInnerComments(node);
  if (node.body.length) {
    this.newline();

    this.printSequence(node.directives, node, { indent: true });
    if (node.directives && node.directives.length) this.newline();

    this.printSequence(node.body, node, { indent: true });
    if (!this.format.retainLines && !this.format.concise) this.removeLast("\n");
    this.rightBrace();
  } else {
    this.push("}");
  }
}

function Noop() {}

function Directive(node) {
  this.print(node.value, node);
  this.semicolon();
}

function DirectiveLiteral(node) {
  this.push(this._stringLiteral(node.value));
}