"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

/**
 * Build a sourcemap.
 */

var SourceMap = (function () {
  function SourceMap(position, opts, code) {
    // istanbul ignore next

    var _this = this;

    _classCallCheck(this, SourceMap);

    this.position = position;
    this.opts = opts;
    this.last = { generated: {}, original: {} };

    if (opts.sourceMaps) {
      this.map = new _sourceMap2["default"].SourceMapGenerator({
        file: opts.sourceMapTarget,
        sourceRoot: opts.sourceRoot
      });

      if (typeof code === "string") {
        this.map.setSourceContent(opts.sourceFileName, code);
      } else if (typeof code === "object") {
        _Object$keys(code).forEach(function (sourceFileName) {
          _this.map.setSourceContent(sourceFileName, code[sourceFileName]);
        });
      }
    } else {
      this.map = null;
    }
  }

  /**
   * Get the sourcemap.
   */

  SourceMap.prototype.get = function get() {
    var map = this.map;
    if (map) {
      return map.toJSON();
    } else {
      return map;
    }
  };

  /**
   * Mark a node's generated position, and add it to the sourcemap.
   */

  SourceMap.prototype.mark = function mark(node) {
    var loc = node.loc;
    if (!loc) return; // no location info

    var map = this.map;
    if (!map) return; // no source map

    if (t.isProgram(node) || t.isFile(node)) return; // illegal mapping nodes

    var position = this.position;

    var generated = {
      line: position.line,
      column: position.column
    };

    var original = loc.start;

    // Avoid emitting duplicates on either side. Duplicated
    // original values creates unnecesssarily large source maps
    // and increases compile time. Duplicates on the generated
    // side can lead to incorrect mappings.
    if (comparePosition(original, this.last.original) || comparePosition(generated, this.last.generated)) {
      return;
    }

    this.last = {
      source: loc.filename || this.opts.sourceFileName,
      generated: generated,
      original: original
    };

    map.addMapping(this.last);
  };

  return SourceMap;
})();

exports["default"] = SourceMap;

function comparePosition(a, b) {
  return a.line === b.line && a.column === b.column;
}
module.exports = exports["default"];