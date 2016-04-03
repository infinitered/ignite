"use strict";

exports.__esModule = true;

exports["default"] = function (_ref) {
  var messages = _ref.messages;

  return {
    visitor: {
      Scope: function Scope(_ref2) {
        var scope = _ref2.scope;

        for (var _name in scope.bindings) {
          var binding = scope.bindings[_name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          var _arr = binding.constantViolations;
          for (var _i = 0; _i < _arr.length; _i++) {
            var violation = _arr[_i];
            throw violation.buildCodeFrameError(messages.get("readOnly", _name));
          }
        }
      }
    }
  };
};

module.exports = exports["default"];