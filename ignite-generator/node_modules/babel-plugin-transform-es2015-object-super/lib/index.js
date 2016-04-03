"use strict";

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _babelHelperReplaceSupers = require("babel-helper-replace-supers");

var _babelHelperReplaceSupers2 = _interopRequireDefault(_babelHelperReplaceSupers);

exports["default"] = function (_ref) {
  var t = _ref.types;

  function Property(path, node, scope, getObjectRef, file) {
    var replaceSupers = new _babelHelperReplaceSupers2["default"]({
      getObjectRef: getObjectRef,
      methodNode: node,
      methodPath: path,
      isStatic: true,
      scope: scope,
      file: file
    });

    replaceSupers.replace();
  }

  var CONTAINS_SUPER = _Symbol();

  return {
    visitor: {
      Super: function Super(path) {
        var parentObj = path.findParent(function (path) {
          return path.isObjectExpression();
        });
        if (parentObj) parentObj.node[CONTAINS_SUPER] = true;
      },

      ObjectExpression: {
        exit: function exit(path, file) {
          if (!path.node[CONTAINS_SUPER]) return;

          var objectRef = undefined;
          var getObjectRef = function getObjectRef() {
            return objectRef = objectRef || path.scope.generateUidIdentifier("obj");
          };

          var propPaths = path.get("properties");
          for (var _i = 0; _i < propPaths.length; _i++) {
            var propPath = propPaths[_i];
            if (propPath.isObjectProperty()) propPath = propPath.get("value");
            Property(propPath, propPath.node, path.scope, getObjectRef, file);
          }

          if (objectRef) {
            path.scope.push({ id: objectRef });
            path.replaceWith(t.assignmentExpression("=", objectRef, path.node));
          }
        }
      }
    }
  };
};

module.exports = exports["default"];