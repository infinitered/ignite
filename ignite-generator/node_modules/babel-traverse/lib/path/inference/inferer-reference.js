"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

exports["default"] = function (node) {
  if (!this.isReferenced()) return;

  // check if a binding exists of this value and if so then return a union type of all
  // possible types that the binding could be
  var binding = this.scope.getBinding(node.name);
  if (binding) {
    if (binding.identifier.typeAnnotation) {
      return binding.identifier.typeAnnotation;
    } else {
      return getTypeAnnotationBindingConstantViolations(this, node.name);
    }
  }

  // built-in values
  if (node.name === "undefined") {
    return t.voidTypeAnnotation();
  } else if (node.name === "NaN" || node.name === "Infinity") {
    return t.numberTypeAnnotation();
  } else if (node.name === "arguments") {
    // todo
  }
};

function getTypeAnnotationBindingConstantViolations(path, name) {
  var binding = path.scope.getBinding(name);

  var types = [];
  path.typeAnnotation = t.unionTypeAnnotation(types);

  var functionConstantViolations = [];
  var constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);

  var testType = getConditionalAnnotation(path, name);
  if (testType) {
    (function () {
      var testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);

      // remove constant violations observed before the IfStatement
      constantViolations = constantViolations.filter(function (path) {
        return testConstantViolations.indexOf(path) < 0;
      });

      // clear current types and add in observed test type
      types.push(testType.typeAnnotation);
    })();
  }

  if (constantViolations.length) {
    // pick one constant from each scope which will represent the last possible
    // control flow path that it could've taken/been
    /* This code is broken for the following problems:
     * It thinks that assignments can only happen in scopes.
     * What about conditionals, if statements without block,
     * or guarded assignments.
     * It also checks to see if one of the assignments is in the
     * same scope and uses that as the only "violation". However,
     * the binding is returned by `getConstantViolationsBefore` so we for
     * sure always going to return that as the only "violation".
    let rawConstantViolations = constantViolations.reverse();
    let visitedScopes = [];
    constantViolations = [];
    for (let violation of (rawConstantViolations: Array<NodePath>)) {
      let violationScope = violation.scope;
      if (visitedScopes.indexOf(violationScope) >= 0) continue;
       visitedScopes.push(violationScope);
      constantViolations.push(violation);
       if (violationScope === path.scope) {
        constantViolations = [violation];
        break;
      }
    }*/

    // add back on function constant violations since we can't track calls
    constantViolations = constantViolations.concat(functionConstantViolations);

    // push on inferred types of violated paths
    var _arr = constantViolations;
    for (var _i = 0; _i < _arr.length; _i++) {
      var violation = _arr[_i];
      types.push(violation.getTypeAnnotation());
    }
  }

  if (types.length) {
    return t.createUnionTypeAnnotation(types);
  }
}

function getConstantViolationsBefore(binding, path, functions) {
  var violations = binding.constantViolations.slice();
  violations.unshift(binding.path);
  return violations.filter(function (violation) {
    violation = violation.resolve();
    var status = violation._guessExecutionStatusRelativeTo(path);
    if (functions && status === "function") functions.push(violation);
    return status === "before";
  });
}

function inferAnnotationFromBinaryExpression(name, path) {
  var operator = path.node.operator;

  var right = path.get("right").resolve();
  var left = path.get("left").resolve();

  var target = undefined;
  if (left.isIdentifier({ name: name })) {
    target = right;
  } else if (right.isIdentifier({ name: name })) {
    target = left;
  }
  if (target) {
    if (operator === "===") {
      return target.getTypeAnnotation();
    } else if (t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.numberTypeAnnotation();
    } else {
      return;
    }
  } else {
    if (operator !== "===") return;
  }

  //
  var typeofPath = undefined;
  var typePath = undefined;
  if (left.isUnaryExpression({ operator: "typeof" })) {
    typeofPath = left;
    typePath = right;
  } else if (right.isUnaryExpression({ operator: "typeof" })) {
    typeofPath = right;
    typePath = left;
  }
  if (!typePath && !typeofPath) return;

  // ensure that the type path is a Literal
  typePath = typePath.resolve();
  if (!typePath.isLiteral()) return;

  // and that it's a string so we can infer it
  var typeValue = typePath.node.value;
  if (typeof typeValue !== "string") return;

  // and that the argument of the typeof path references us!
  if (!typeofPath.get("argument").isIdentifier({ name: name })) return;

  // turn type value into a type annotation
  return t.createTypeAnnotationBasedOnTypeof(typePath.node.value);
}

function getParentConditionalPath(path) {
  var parentPath = undefined;
  while (parentPath = path.parentPath) {
    if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
      if (path.key === "test") {
        return;
      } else {
        return parentPath;
      }
    } else {
      path = parentPath;
    }
  }
}

function getConditionalAnnotation(path, name) {
  var ifStatement = getParentConditionalPath(path);
  if (!ifStatement) return;

  var test = ifStatement.get("test");
  var paths = [test];
  var types = [];

  do {
    var _path = paths.shift().resolve();

    if (_path.isLogicalExpression()) {
      paths.push(_path.get("left"));
      paths.push(_path.get("right"));
    }

    if (_path.isBinaryExpression()) {
      var type = inferAnnotationFromBinaryExpression(name, _path);
      if (type) types.push(type);
    }
  } while (paths.length);

  if (types.length) {
    return {
      typeAnnotation: t.createUnionTypeAnnotation(types),
      ifStatement: ifStatement
    };
  } else {
    return getConditionalAnnotation(ifStatement, name);
  }
}
module.exports = exports["default"];