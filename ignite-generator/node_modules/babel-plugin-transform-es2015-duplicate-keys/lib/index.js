"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function getName(key) {
  if (t.isIdentifier(key)) {
    return key.name;
  }
  return key.value.toString();
}

exports["default"] = function () {
  return {
    visitor: {
      ObjectExpression: function ObjectExpression(path) {
        var node = path.node;

        var plainProps = node.properties.filter(function (prop) {
          return !t.isSpreadProperty(prop) && !prop.computed;
        });

        // A property is a duplicate key if:
        // * the property is a data property, and is preceeded by a data,
        //   getter, or setter property of the same name.
        // * the property is a getter property, and is preceeded by a data or
        //   getter property of the same name.
        // * the property is a setter property, and is preceeded by a data or
        //   setter property of the same name.

        var alreadySeenData = _Object$create(null);
        var alreadySeenGetters = _Object$create(null);
        var alreadySeenSetters = _Object$create(null);

        for (var _iterator = plainProps, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var prop = _ref;

          var _name = getName(prop.key);
          var isDuplicate = false;
          switch (prop.kind) {
            case "get":
              if (alreadySeenData[_name] || alreadySeenGetters[_name]) {
                isDuplicate = true;
              }
              alreadySeenGetters[_name] = true;
              break;
            case "set":
              if (alreadySeenData[_name] || alreadySeenSetters[_name]) {
                isDuplicate = true;
              }
              alreadySeenSetters[_name] = true;
              break;
            default:
              if (alreadySeenData[_name] || alreadySeenGetters[_name] || alreadySeenSetters[_name]) {
                isDuplicate = true;
              }
              alreadySeenData[_name] = true;
          }

          if (isDuplicate) {
            // Rely on the computed properties transform to split the property
            // assignment out of the object literal.
            prop.computed = true;
            prop.key = t.stringLiteral(_name);
          }
        }
      }
    }
  };
};

module.exports = exports["default"];