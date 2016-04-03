"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

exports["default"] = function () {
  return {
    visitor: {
      Program: function Program(path, state) {
        if (state.opts.strict === false) return;

        var node = path.node;
        var _arr = node.directives;

        for (var _i = 0; _i < _arr.length; _i++) {
          var directive = _arr[_i];
          if (directive.value.value === "use strict") return;
        }

        path.unshiftContainer("directives", t.directive(t.directiveLiteral("use strict")));
      }
    }
  };
};

module.exports = exports["default"];