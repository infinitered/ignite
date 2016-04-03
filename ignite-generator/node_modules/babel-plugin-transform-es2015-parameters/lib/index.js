"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTraverse = require("babel-traverse");

var _destructuring = require("./destructuring");

var destructuring = _interopRequireWildcard(_destructuring);

var _default = require("./default");

var def = _interopRequireWildcard(_default);

var _rest = require("./rest");

var rest = _interopRequireWildcard(_rest);

exports["default"] = function () {
  return {
    visitor: _babelTraverse.visitors.merge([{
      ArrowFunctionExpression: function ArrowFunctionExpression(path) {
        // default/rest visitors require access to `arguments`
        var params = path.get("params");
        for (var _i = 0; _i < params.length; _i++) {
          var param = params[_i];
          if (param.isRestElement() || param.isAssignmentPattern()) {
            path.arrowFunctionToShadowed();
            break;
          }
        }
      }
    }, destructuring.visitor, rest.visitor, def.visitor])
  };
};

module.exports = exports["default"];