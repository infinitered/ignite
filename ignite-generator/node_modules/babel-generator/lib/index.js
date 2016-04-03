"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _detectIndent = require("detect-indent");

var _detectIndent2 = _interopRequireDefault(_detectIndent);

var _whitespace = require("./whitespace");

var _whitespace2 = _interopRequireDefault(_whitespace);

var _sourceMap = require("./source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _position = require("./position");

var _position2 = _interopRequireDefault(_position);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _printer = require("./printer");

var _printer2 = _interopRequireDefault(_printer);

/**
 * Babel's code generator, turns an ast into code, maintaining sourcemaps,
 * user preferences, and valid output.
 */

var CodeGenerator = (function (_Printer) {
  _inherits(CodeGenerator, _Printer);

  function CodeGenerator(ast, opts, code) {
    _classCallCheck(this, CodeGenerator);

    opts = opts || {};

    var comments = ast.comments || [];
    var tokens = ast.tokens || [];
    var format = CodeGenerator.normalizeOptions(code, opts, tokens);

    var position = new _position2["default"]();

    _Printer.call(this, position, format);

    this.comments = comments;
    this.position = position;
    this.tokens = tokens;
    this.format = format;
    this.opts = opts;
    this.ast = ast;
    this._inForStatementInitCounter = 0;

    this.whitespace = new _whitespace2["default"](tokens);
    this.map = new _sourceMap2["default"](position, opts, code);
  }

  /**
   * Normalize generator options, setting defaults.
   *
   * - Detects code indentation.
   * - If `opts.compact = "auto"` and the code is over 100KB, `compact` will be set to `true`.
    */

  CodeGenerator.normalizeOptions = function normalizeOptions(code, opts, tokens) {
    var style = "  ";
    if (code && typeof code === "string") {
      var _indent = _detectIndent2["default"](code).indent;
      if (_indent && _indent !== " ") style = _indent;
    }

    var format = {
      auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
      auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
      shouldPrintComment: opts.shouldPrintComment,
      retainLines: opts.retainLines,
      comments: opts.comments == null || opts.comments,
      compact: opts.compact,
      minified: opts.minified,
      concise: opts.concise,
      quotes: opts.quotes || CodeGenerator.findCommonStringDelimiter(code, tokens),
      indent: {
        adjustMultilineComment: true,
        style: style,
        base: 0
      }
    };

    if (format.minified) {
      format.compact = true;
    }

    if (format.compact === "auto") {
      format.compact = code.length > 100000; // 100KB

      if (format.compact) {
        console.error("[BABEL] " + messages.get("codeGeneratorDeopt", opts.filename, "100KB"));
      }
    }

    if (format.compact) {
      format.indent.adjustMultilineComment = false;
    }

    return format;
  };

  /**
   * Determine if input code uses more single or double quotes.
   */

  CodeGenerator.findCommonStringDelimiter = function findCommonStringDelimiter(code, tokens) {
    var occurences = {
      single: 0,
      double: 0
    };

    var checked = 0;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (token.type.label !== "string") continue;

      var raw = code.slice(token.start, token.end);
      if (raw[0] === "'") {
        occurences.single++;
      } else {
        occurences.double++;
      }

      checked++;
      if (checked >= 3) break;
    }
    if (occurences.single > occurences.double) {
      return "single";
    } else {
      return "double";
    }
  };

  /**
   * Generate code and sourcemap from ast.
   *
   * Appends comments that weren't attached to any node to the end of the generated output.
   */

  CodeGenerator.prototype.generate = function generate() {
    this.print(this.ast);
    this.printAuxAfterComment();

    return {
      map: this.map.get(),
      code: this.get()
    };
  };

  return CodeGenerator;
})(_printer2["default"]);

exports.CodeGenerator = CodeGenerator;

exports["default"] = function (ast, opts, code) {
  var gen = new CodeGenerator(ast, opts, code);
  return gen.generate();
};