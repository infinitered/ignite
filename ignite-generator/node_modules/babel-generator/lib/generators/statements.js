"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.WithStatement = WithStatement;
exports.IfStatement = IfStatement;
exports.ForStatement = ForStatement;
exports.WhileStatement = WhileStatement;
exports.DoWhileStatement = DoWhileStatement;
exports.LabeledStatement = LabeledStatement;
exports.TryStatement = TryStatement;
exports.CatchClause = CatchClause;
exports.SwitchStatement = SwitchStatement;
exports.SwitchCase = SwitchCase;
exports.DebuggerStatement = DebuggerStatement;
exports.VariableDeclaration = VariableDeclaration;
exports.VariableDeclarator = VariableDeclarator;

var _repeating = require("repeating");

var _repeating2 = _interopRequireDefault(_repeating);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var NON_ALPHABETIC_UNARY_OPERATORS = t.UPDATE_OPERATORS.concat(t.NUMBER_UNARY_OPERATORS).concat(["!"]);

function WithStatement(node) {
  this.keyword("with");
  this.push("(");
  this.print(node.object, node);
  this.push(")");
  this.printBlock(node);
}

function IfStatement(node) {
  this.keyword("if");
  this.push("(");
  this.print(node.test, node);
  this.push(")");
  this.space();

  var needsBlock = node.alternate && t.isIfStatement(getLastStatement(node.consequent));
  if (needsBlock) {
    this.push("{");
    this.newline();
    this.indent();
  }

  this.printAndIndentOnComments(node.consequent, node);

  if (needsBlock) {
    this.dedent();
    this.newline();
    this.push("}");
  }

  if (node.alternate) {
    if (this.isLast("}")) this.space();
    this.push("else ");
    this.printAndIndentOnComments(node.alternate, node);
  }
}

// Recursively get the last statement.
function getLastStatement(statement) {
  if (!t.isStatement(statement.body)) return statement;
  return getLastStatement(statement.body);
}

function ForStatement(node) {
  this.keyword("for");
  this.push("(");

  this._inForStatementInitCounter++;
  this.print(node.init, node);
  this._inForStatementInitCounter--;
  this.push(";");

  if (node.test) {
    this.space();
    this.print(node.test, node);
  }
  this.push(";");

  if (node.update) {
    this.space();
    this.print(node.update, node);
  }

  this.push(")");
  this.printBlock(node);
}

function WhileStatement(node) {
  this.keyword("while");
  this.push("(");
  this.print(node.test, node);
  this.push(")");
  this.printBlock(node);
}

var buildForXStatement = function buildForXStatement(op) {
  return function (node) {
    this.keyword("for");
    this.push("(");
    this.print(node.left, node);
    this.push(" " + op + " ");
    this.print(node.right, node);
    this.push(")");
    this.printBlock(node);
  };
};

var ForInStatement = buildForXStatement("in");
exports.ForInStatement = ForInStatement;
var ForOfStatement = buildForXStatement("of");

exports.ForOfStatement = ForOfStatement;

function DoWhileStatement(node) {
  this.push("do ");
  this.print(node.body, node);
  this.space();
  this.keyword("while");
  this.push("(");
  this.print(node.test, node);
  this.push(");");
}

function buildLabelStatement(prefix) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? "label" : arguments[1];

  return function (node) {
    this.push(prefix);

    var label = node[key];
    if (label) {
      if (!(this.format.minified && (t.isUnaryExpression(label, { prefix: true }) || t.isUpdateExpression(label, { prefix: true })) && NON_ALPHABETIC_UNARY_OPERATORS.indexOf(label.operator) > -1)) {
        this.push(" ");
      }

      var terminatorState = this.startTerminatorless();
      this.print(label, node);
      this.endTerminatorless(terminatorState);
    }

    this.semicolon();
  };
}

var ContinueStatement = buildLabelStatement("continue");
exports.ContinueStatement = ContinueStatement;
var ReturnStatement = buildLabelStatement("return", "argument");
exports.ReturnStatement = ReturnStatement;
var BreakStatement = buildLabelStatement("break");
exports.BreakStatement = BreakStatement;
var ThrowStatement = buildLabelStatement("throw", "argument");

exports.ThrowStatement = ThrowStatement;

function LabeledStatement(node) {
  this.print(node.label, node);
  this.push(": ");
  this.print(node.body, node);
}

function TryStatement(node) {
  this.keyword("try");
  this.print(node.block, node);
  this.space();

  // Esprima bug puts the catch clause in a `handlers` array.
  // see https://code.google.com/p/esprima/issues/detail?id=433
  // We run into this from regenerator generated ast.
  if (node.handlers) {
    this.print(node.handlers[0], node);
  } else {
    this.print(node.handler, node);
  }

  if (node.finalizer) {
    this.space();
    this.push("finally ");
    this.print(node.finalizer, node);
  }
}

function CatchClause(node) {
  this.keyword("catch");
  this.push("(");
  this.print(node.param, node);
  this.push(")");
  this.space();
  this.print(node.body, node);
}

function SwitchStatement(node) {
  this.keyword("switch");
  this.push("(");
  this.print(node.discriminant, node);
  this.push(")");
  this.space();
  this.push("{");

  this.printSequence(node.cases, node, {
    indent: true,
    addNewlines: function addNewlines(leading, cas) {
      if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
    }
  });

  this.push("}");
}

function SwitchCase(node) {
  if (node.test) {
    this.push("case ");
    this.print(node.test, node);
    this.push(":");
  } else {
    this.push("default:");
  }

  if (node.consequent.length) {
    this.newline();
    this.printSequence(node.consequent, node, { indent: true });
  }
}

function DebuggerStatement() {
  this.push("debugger;");
}

function VariableDeclaration(node, parent) {
  this.push(node.kind + " ");

  var hasInits = false;
  // don't add whitespace to loop heads
  if (!t.isFor(parent)) {
    var _arr = node.declarations;

    for (var _i = 0; _i < _arr.length; _i++) {
      var declar = _arr[_i];
      if (declar.init) {
        // has an init so let's split it up over multiple lines
        hasInits = true;
      }
    }
  }

  //
  // use a pretty separator when we aren't in compact mode, have initializers and don't have retainLines on
  // this will format declarations like:
  //
  //   let foo = "bar", bar = "foo";
  //
  // into
  //
  //   let foo = "bar",
  //       bar = "foo";
  //

  var sep = undefined;
  if (!this.format.compact && !this.format.concise && hasInits && !this.format.retainLines) {
    sep = ",\n" + _repeating2["default"](" ", node.kind.length + 1);
  }

  //

  this.printList(node.declarations, node, { separator: sep });

  if (t.isFor(parent)) {
    // don't give semicolons to these nodes since they'll be inserted in the parent generator
    if (parent.left === node || parent.init === node) return;
  }

  this.semicolon();
}

function VariableDeclarator(node) {
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  if (node.init) {
    this.space();
    this.push("=");
    this.space();
    this.print(node.init, node);
  }
}