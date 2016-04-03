"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.getTypeAnnotation = getTypeAnnotation;
exports._getTypeAnnotation = _getTypeAnnotation;
exports.isBaseType = isBaseType;
exports.couldBeBaseType = couldBeBaseType;
exports.baseTypeStrictlyMatches = baseTypeStrictlyMatches;
exports.isGenericType = isGenericType;

var _inferers = require("./inferers");

var inferers = _interopRequireWildcard(_inferers);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

/**
 * Infer the type of the current `NodePath`.
 */

function getTypeAnnotation() {
  if (this.typeAnnotation) return this.typeAnnotation;

  var type = this._getTypeAnnotation() || t.anyTypeAnnotation();
  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  return this.typeAnnotation = type;
}

/**
 * todo: split up this method
 */

function _getTypeAnnotation() {
  var node = this.node;

  if (!node) {
    // handle initializerless variables, add in checks for loop initializers too
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      var declar = this.parentPath.parentPath;
      var declarParent = declar.parentPath;

      // for (let NODE in bar) {}
      if (declar.key === "left" && declarParent.isForInStatement()) {
        return t.stringTypeAnnotation();
      }

      // for (let NODE of bar) {}
      if (declar.key === "left" && declarParent.isForOfStatement()) {
        return t.anyTypeAnnotation();
      }

      return t.voidTypeAnnotation();
    } else {
      return;
    }
  }

  if (node.typeAnnotation) {
    return node.typeAnnotation;
  }

  var inferer = inferers[node.type];
  if (inferer) {
    return inferer.call(this, node);
  }

  inferer = inferers[this.parentPath.type];
  if (inferer && inferer.validParent) {
    return this.parentPath.getTypeAnnotation();
  }
}

function isBaseType(baseName, soft) {
  return _isBaseType(baseName, this.getTypeAnnotation(), soft);
}

function _isBaseType(baseName, type, soft) {
  if (baseName === "string") {
    return t.isStringTypeAnnotation(type);
  } else if (baseName === "number") {
    return t.isNumberTypeAnnotation(type);
  } else if (baseName === "boolean") {
    return t.isBooleanTypeAnnotation(type);
  } else if (baseName === "any") {
    return t.isAnyTypeAnnotation(type);
  } else if (baseName === "mixed") {
    return t.isMixedTypeAnnotation(type);
  } else if (baseName === "void") {
    return t.isVoidTypeAnnotation(type);
  } else {
    if (soft) {
      return false;
    } else {
      throw new Error("Unknown base type " + baseName);
    }
  }
}

function couldBeBaseType(name) {
  var type = this.getTypeAnnotation();
  if (t.isAnyTypeAnnotation(type)) return true;

  if (t.isUnionTypeAnnotation(type)) {
    var _arr = type.types;

    for (var _i = 0; _i < _arr.length; _i++) {
      var type2 = _arr[_i];
      if (t.isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
        return true;
      }
    }
    return false;
  } else {
    return _isBaseType(name, type, true);
  }
}

function baseTypeStrictlyMatches(right) {
  var left = this.getTypeAnnotation();
  right = right.getTypeAnnotation();

  if (!t.isAnyTypeAnnotation(left) && t.isFlowBaseAnnotation(left)) {
    return right.type === left.type;
  }
}

function isGenericType(genericName) {
  var type = this.getTypeAnnotation();
  return t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName });
}