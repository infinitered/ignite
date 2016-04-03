/* eslint max-len: 0 */

"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.push = push;
exports.hasComputed = hasComputed;
exports.toComputedObjectFromClass = toComputedObjectFromClass;
exports.toClassObject = toClassObject;
exports.toDefineObject = toDefineObject;

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashObjectHas = require("lodash/object/has");

var _lodashObjectHas2 = _interopRequireDefault(_lodashObjectHas);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function toKind(node) {
  if (t.isClassMethod(node) || t.isObjectMethod(node)) {
    if (node.kind === "get" || node.kind === "set") {
      return node.kind;
    }
  }

  return "value";
}

function push(mutatorMap, node, kind, file, scope) {
  var alias = t.toKeyAlias(node);

  //

  var map = {};
  if (_lodashObjectHas2["default"](mutatorMap, alias)) map = mutatorMap[alias];
  mutatorMap[alias] = map;

  //

  map._inherits = map._inherits || [];
  map._inherits.push(node);

  map._key = node.key;

  if (node.computed) {
    map._computed = true;
  }

  if (node.decorators) {
    var decorators = map.decorators = map.decorators || t.arrayExpression([]);
    decorators.elements = decorators.elements.concat(node.decorators.map(function (dec) {
      return dec.expression;
    }).reverse());
  }

  if (map.value || map.initializer) {
    throw file.buildCodeFrameError(node, "Key conflict with sibling node");
  }

  var key = undefined,
      value = undefined;

  // save the key so we can possibly do function name inferences
  if (t.isObjectProperty(node) || t.isObjectMethod(node) || t.isClassMethod(node)) {
    key = t.toComputedKey(node, node.key);
  }

  if (t.isObjectProperty(node) || t.isClassProperty(node)) {
    value = node.value;
  } else if (t.isObjectMethod(node) || t.isClassMethod(node)) {
    value = t.functionExpression(null, node.params, node.body, node.generator, node.async);
  }

  var inheritedKind = toKind(node);
  if (!kind || inheritedKind !== "value") {
    kind = inheritedKind;
  }

  // infer function name
  if (scope && t.isStringLiteral(key) && (kind === "value" || kind === "initializer") && t.isFunctionExpression(value)) {
    value = _babelHelperFunctionName2["default"]({ id: key, node: value, scope: scope });
  }

  if (value) {
    t.inheritsComments(value, node);
    map[kind] = value;
  }

  return map;
}

function hasComputed(mutatorMap) {
  for (var key in mutatorMap) {
    if (mutatorMap[key]._computed) {
      return true;
    }
  }
  return false;
}

function toComputedObjectFromClass(obj) {
  var objExpr = t.arrayExpression([]);

  for (var i = 0; i < obj.properties.length; i++) {
    var prop = obj.properties[i];
    var val = prop.value;
    val.properties.unshift(t.objectProperty(t.identifier("key"), t.toComputedKey(prop)));
    objExpr.elements.push(val);
  }

  return objExpr;
}

function toClassObject(mutatorMap) {
  var objExpr = t.objectExpression([]);

  _lodashCollectionEach2["default"](mutatorMap, function (map) {
    var mapNode = t.objectExpression([]);

    var propNode = t.objectProperty(map._key, mapNode, map._computed);

    _lodashCollectionEach2["default"](map, function (node, key) {
      if (key[0] === "_") return;

      var inheritNode = node;
      if (t.isClassMethod(node) || t.isClassProperty(node)) node = node.value;

      var prop = t.objectProperty(t.identifier(key), node);
      t.inheritsComments(prop, inheritNode);
      t.removeComments(inheritNode);

      mapNode.properties.push(prop);
    });

    objExpr.properties.push(propNode);
  });

  return objExpr;
}

function toDefineObject(mutatorMap) {
  _lodashCollectionEach2["default"](mutatorMap, function (map) {
    if (map.value) map.writable = t.booleanLiteral(true);
    map.configurable = t.booleanLiteral(true);
    map.enumerable = t.booleanLiteral(true);
  });

  return toClassObject(mutatorMap);
}