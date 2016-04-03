/* eslint max-len: 0 */

"use strict";

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _lodashLangCloneDeep = require("lodash/lang/cloneDeep");

var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

var _lodashObjectAssign = require("lodash/object/assign");

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _lodashObjectHas = require("lodash/object/has");

var _lodashObjectHas2 = _interopRequireDefault(_lodashObjectHas);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var FROM_TEMPLATE = "_fromTemplate"; //Symbol(); // todo: probably wont get copied over
var TEMPLATE_SKIP = _Symbol();

exports["default"] = function (code, opts) {
  // since we lazy parse the template, we get the current stack so we have the
  // original stack to append if it errors when parsing
  var stack = undefined;
  try {
    // error stack gets populated in IE only on throw (https://msdn.microsoft.com/en-us/library/hh699850(v=vs.94).aspx)
    throw new Error();
  } catch (error) {
    if (error.stack) {
      // error.stack does not exists in IE <= 9
      stack = error.stack.split("\n").slice(1).join("\n");
    }
  }

  var _getAst = function getAst() {
    var ast = undefined;

    try {
      ast = babylon.parse(code, _lodashObjectAssign2["default"]({
        allowReturnOutsideFunction: true,
        allowSuperOutsideMethod: true
      }, opts));

      ast = _babelTraverse2["default"].removeProperties(ast);

      _babelTraverse2["default"].cheap(ast, function (node) {
        node[FROM_TEMPLATE] = true;
      });
    } catch (err) {
      err.stack = err.stack + "from\n" + stack;
      throw err;
    }

    _getAst = function () {
      return ast;
    };

    return ast;
  };

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return useTemplate(_getAst(), args);
  };
};

function useTemplate(ast, nodes) {
  ast = _lodashLangCloneDeep2["default"](ast);
  var _ast = ast;
  var program = _ast.program;

  if (nodes.length) {
    _babelTraverse2["default"](ast, templateVisitor, null, nodes);
  }

  if (program.body.length > 1) {
    return program.body;
  } else {
    return program.body[0];
  }
}

var templateVisitor = {
  // 360
  noScope: true,

  enter: function enter(path, args) {
    var node = path.node;

    if (node[TEMPLATE_SKIP]) return path.skip();

    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }

    var replacement = undefined;

    if (t.isIdentifier(node) && node[FROM_TEMPLATE]) {
      if (_lodashObjectHas2["default"](args[0], node.name)) {
        replacement = args[0][node.name];
      } else if (node.name[0] === "$") {
        var i = +node.name.slice(1);
        if (args[i]) replacement = args[i];
      }
    }

    if (replacement === null) {
      path.remove();
    }

    if (replacement) {
      replacement[TEMPLATE_SKIP] = true;
      path.replaceInline(replacement);
    }
  },

  exit: function exit(_ref) {
    var node = _ref.node;

    if (!node.loc) _babelTraverse2["default"].clearNode(node);
  }
};
module.exports = exports["default"];