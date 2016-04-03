"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

exports.__esModule = true;

exports["default"] = function (_ref4) {
  var t = _ref4.types;
  var template = _ref4.template;

  var buildMutatorMapAssign = template("\n    MUTATOR_MAP_REF[KEY] = MUTATOR_MAP_REF[KEY] || {};\n    MUTATOR_MAP_REF[KEY].KIND = VALUE;\n  ");

  function getValue(prop) {
    if (t.isObjectProperty(prop)) {
      return prop.value;
    } else if (t.isObjectMethod(prop)) {
      return t.functionExpression(null, prop.params, prop.body, prop.generator, prop.async);
    }
  }

  function pushAssign(objId, prop, body) {
    if (prop.kind === "get" && prop.kind === "set") {
      pushMutatorDefine(objId, prop, body);
    } else {
      body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(objId, prop.key, prop.computed || t.isLiteral(prop.key)), getValue(prop))));
    }
  }

  function pushMutatorDefine(_ref5, prop) {
    var objId = _ref5.objId;
    var body = _ref5.body;
    var getMutatorId = _ref5.getMutatorId;
    var scope = _ref5.scope;

    var key = !prop.computed && t.isIdentifier(prop.key) ? t.stringLiteral(prop.key.name) : prop.key;

    var maybeMemoise = scope.maybeGenerateMemoised(key);
    if (maybeMemoise) {
      body.push(t.expressionStatement(t.assignmentExpression("=", maybeMemoise, key)));
      key = maybeMemoise;
    }

    body.push.apply(body, buildMutatorMapAssign({
      MUTATOR_MAP_REF: getMutatorId(),
      KEY: key,
      VALUE: getValue(prop),
      KIND: t.identifier(prop.kind)
    }));
  }

  function loose(info) {
    for (var _iterator = info.computedProps, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
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

      if (prop.kind === "get" || prop.kind === "set") {
        pushMutatorDefine(info, prop);
      } else {
        pushAssign(info.objId, prop, info.body);
      }
    }
  }

  function spec(info) {
    var objId = info.objId;
    var body = info.body;
    var computedProps = info.computedProps;
    var state = info.state;

    for (var _iterator2 = computedProps, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var prop = _ref2;

      var key = t.toComputedKey(prop);

      if (prop.kind === "get" || prop.kind === "set") {
        pushMutatorDefine(info, prop);
      } else if (t.isStringLiteral(key, { value: "__proto__" })) {
        pushAssign(objId, prop, body);
      } else {
        if (computedProps.length === 1) {
          return t.callExpression(state.addHelper("defineProperty"), [info.initPropExpression, key, getValue(prop)]);
        } else {
          body.push(t.expressionStatement(t.callExpression(state.addHelper("defineProperty"), [objId, key, getValue(prop)])));
        }
      }
    }
  }

  return {
    visitor: {
      ObjectExpression: {
        exit: function exit(path, state) {
          var node = path.node;
          var parent = path.parent;
          var scope = path.scope;

          var hasComputed = false;
          var _arr = node.properties;
          for (var _i3 = 0; _i3 < _arr.length; _i3++) {
            var prop = _arr[_i3];
            hasComputed = prop.computed === true;
            if (hasComputed) break;
          }
          if (!hasComputed) return;

          // put all getters/setters into the first object expression as well as all initialisers up
          // to the first computed property

          var initProps = [];
          var computedProps = [];
          var foundComputed = false;

          for (var _iterator3 = node.properties, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _getIterator(_iterator3);;) {
            var _ref3;

            if (_isArray3) {
              if (_i4 >= _iterator3.length) break;
              _ref3 = _iterator3[_i4++];
            } else {
              _i4 = _iterator3.next();
              if (_i4.done) break;
              _ref3 = _i4.value;
            }

            var prop = _ref3;

            if (prop.computed) {
              foundComputed = true;
            }

            if (foundComputed) {
              computedProps.push(prop);
            } else {
              initProps.push(prop);
            }
          }

          var objId = scope.generateUidIdentifierBasedOnNode(parent);
          var initPropExpression = t.objectExpression(initProps);
          var body = [];

          body.push(t.variableDeclaration("var", [t.variableDeclarator(objId, initPropExpression)]));

          var callback = spec;
          if (state.opts.loose) callback = loose;

          var mutatorRef = undefined;

          var getMutatorId = function getMutatorId() {
            if (!mutatorRef) {
              mutatorRef = scope.generateUidIdentifier("mutatorMap");

              body.push(t.variableDeclaration("var", [t.variableDeclarator(mutatorRef, t.objectExpression([]))]));
            }

            return mutatorRef;
          };

          var single = callback({
            scope: scope,
            objId: objId,
            body: body,
            computedProps: computedProps,
            initPropExpression: initPropExpression,
            getMutatorId: getMutatorId,
            state: state
          });

          if (mutatorRef) {
            body.push(t.expressionStatement(t.callExpression(state.addHelper("defineEnumerableProperties"), [objId, mutatorRef])));
          }

          if (single) {
            path.replaceWith(single);
          } else {
            body.push(t.expressionStatement(objId));
            path.replaceWithMultiple(body);
          }
        }
      }
    }
  };
};

module.exports = exports["default"];