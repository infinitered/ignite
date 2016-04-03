"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

exports["default"] = function (_ref) {
  var t = _ref.types;

  function addDisplayName(id, call) {
    var props = call.arguments[0].properties;
    var safe = true;

    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      var key = t.toComputedKey(prop);
      if (t.isLiteral(key, { value: "displayName" })) {
        safe = false;
        break;
      }
    }

    if (safe) {
      props.unshift(t.objectProperty(t.identifier("displayName"), t.stringLiteral(id)));
    }
  }

  var isCreateClassCallExpression = t.buildMatchMemberExpression("React.createClass");

  function isCreateClass(node) {
    if (!node || !t.isCallExpression(node)) return false;

    // not React.createClass call member object
    if (!isCreateClassCallExpression(node.callee)) return false;

    // no call arguments
    var args = node.arguments;
    if (args.length !== 1) return false;

    // first node arg is not an object
    var first = args[0];
    if (!t.isObjectExpression(first)) return false;

    return true;
  }

  return {
    visitor: {
      ExportDefaultDeclaration: function ExportDefaultDeclaration(_ref2, state) {
        var node = _ref2.node;

        if (isCreateClass(node.declaration)) {
          var displayName = state.file.opts.basename;

          // ./{module name}/index.js
          if (displayName === "index") {
            displayName = _path2["default"].basename(_path2["default"].dirname(state.file.opts.filename));
          }

          addDisplayName(displayName, node.declaration);
        }
      },

      CallExpression: function CallExpression(path) {
        var node = path.node;

        if (!isCreateClass(node)) return;

        var id = undefined;

        // crawl up the ancestry looking for possible candidates for displayName inference
        path.find(function (path) {
          if (path.isAssignmentExpression()) {
            id = path.node.left;
          } else if (path.isObjectProperty()) {
            id = path.node.key;
          } else if (path.isVariableDeclarator()) {
            id = path.node.id;
          } else if (path.isStatement()) {
            // we've hit a statement, we should stop crawling up
            return true;
          }

          // we've got an id! no need to continue
          if (id) return true;
        });

        // ensure that we have an identifier we can inherit from
        if (!id) return;

        // foo.bar -> bar
        if (t.isMemberExpression(id)) {
          id = id.property;
        }

        // identifiers are the only thing we can reliably get a name from
        if (t.isIdentifier(id)) {
          addDisplayName(id.name, node);
        }
      }
    }
  };
};

module.exports = exports["default"];