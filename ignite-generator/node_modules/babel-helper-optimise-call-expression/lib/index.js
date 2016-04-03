/* eslint max-len: 0 */

"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

exports["default"] = function (callee, thisNode, args) {
  if (args.length === 1 && t.isSpreadElement(args[0]) && t.isIdentifier(args[0].argument, { name: "arguments" })) {
    // eg. super(...arguments);
    return t.callExpression(t.memberExpression(callee, t.identifier("apply")), [thisNode, args[0].argument]);
  } else {
    return t.callExpression(t.memberExpression(callee, t.identifier("call")), [thisNode].concat(args));
  }
};

module.exports = exports["default"];