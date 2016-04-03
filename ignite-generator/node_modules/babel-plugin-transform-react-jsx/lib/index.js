/* eslint max-len: 0 */

"use strict";

exports.__esModule = true;

exports["default"] = function (_ref) {
  var t = _ref.types;

  var JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;

  var visitor = require("babel-helper-builder-react-jsx")({
    pre: function pre(state) {
      var tagName = state.tagName;
      var args = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post: function post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    }
  });

  visitor.Program = function (path, state) {
    var file = state.file;

    var id = state.opts.pragma || "React.createElement";

    var _arr = file.ast.comments;
    for (var _i = 0; _i < _arr.length; _i++) {
      var comment = _arr[_i];
      var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
      if (matches) {
        id = matches[1];
        if (id === "React.DOM") {
          throw file.buildCodeFrameError(comment, "The @jsx React.DOM pragma has been deprecated as of React 0.12");
        } else {
          break;
        }
      }
    }

    state.set("jsxIdentifier", function () {
      return id.split(".").map(function (name) {
        return t.identifier(name);
      }).reduce(function (object, property) {
        return t.memberExpression(object, property);
      });
    });
  };

  return {
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: visitor
  };
};

module.exports = exports["default"];