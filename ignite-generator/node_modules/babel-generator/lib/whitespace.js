/**
 * Get whitespace around tokens.
 */

"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

exports.__esModule = true;

var Whitespace = (function () {
  function Whitespace(tokens) {
    _classCallCheck(this, Whitespace);

    this.tokens = tokens;
    this.used = {};
  }

  /**
   * Count all the newlines before a node.
   */

  Whitespace.prototype.getNewlinesBefore = function getNewlinesBefore(node) {
    var startToken = undefined;
    var endToken = undefined;
    var tokens = this.tokens;

    var index = this._findToken(function (token) {
      return token.start - node.start;
    }, 0, tokens.length);
    if (index >= 0) {
      while (index && node.start === tokens[index - 1].start) --index;
      startToken = tokens[index - 1];
      endToken = tokens[index];
    }

    return this.getNewlinesBetween(startToken, endToken);
  };

  /**
   * Count all the newlines after a node.
   */

  Whitespace.prototype.getNewlinesAfter = function getNewlinesAfter(node) {
    var startToken = undefined;
    var endToken = undefined;
    var tokens = this.tokens;

    var index = this._findToken(function (token) {
      return token.end - node.end;
    }, 0, tokens.length);
    if (index >= 0) {
      while (index && node.end === tokens[index - 1].end) --index;
      startToken = tokens[index];
      endToken = tokens[index + 1];
      if (endToken.type.label === ",") endToken = tokens[index + 2];
    }

    if (endToken && endToken.type.label === "eof") {
      return 1;
    } else {
      var lines = this.getNewlinesBetween(startToken, endToken);
      if (node.type === "CommentLine" && !lines) {
        // line comment
        return 1;
      } else {
        return lines;
      }
    }
  };

  /**
   * Count all the newlines between two tokens.
   */

  Whitespace.prototype.getNewlinesBetween = function getNewlinesBetween(startToken, endToken) {
    if (!endToken || !endToken.loc) return 0;

    var start = startToken ? startToken.loc.end.line : 1;
    var end = endToken.loc.start.line;
    var lines = 0;

    for (var line = start; line < end; line++) {
      if (typeof this.used[line] === "undefined") {
        this.used[line] = true;
        lines++;
      }
    }

    return lines;
  };

  /**
   * Find a token between start and end.
   */

  Whitespace.prototype._findToken = function _findToken(test, start, end) {
    if (start >= end) return -1;
    var middle = start + end >>> 1;
    var match = test(this.tokens[middle]);
    if (match < 0) {
      return this._findToken(test, middle + 1, end);
    } else if (match > 0) {
      return this._findToken(test, start, middle);
    } else if (match === 0) {
      return middle;
    }
    return -1;
  };

  return Whitespace;
})();

exports["default"] = Whitespace;
module.exports = exports["default"];