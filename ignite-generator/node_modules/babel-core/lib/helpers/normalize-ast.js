"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

/**
 * Normalize an AST.
 *
 * - Wrap `Program` node with a `File` node.
 */

exports["default"] = function (ast, comments, tokens) {
  if (ast) {
    if (ast.type === "Program") {
      return t.file(ast, comments || [], tokens || []);
    } else if (ast.type === "File") {
      return ast;
    }
  }

  throw new Error("Not a valid ast?");
};

module.exports = exports["default"];