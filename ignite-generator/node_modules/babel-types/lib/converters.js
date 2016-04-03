"use strict";

var _Number$MAX_SAFE_INTEGER = require("babel-runtime/core-js/number/max-safe-integer")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.toComputedKey = toComputedKey;
exports.toSequenceExpression = toSequenceExpression;
exports.toKeyAlias = toKeyAlias;
exports.toIdentifier = toIdentifier;
exports.toBindingIdentifierName = toBindingIdentifierName;
exports.toStatement = toStatement;
exports.toExpression = toExpression;
exports.toBlock = toBlock;
exports.valueToNode = valueToNode;

var _lodashLangIsPlainObject = require("lodash/lang/isPlainObject");

var _lodashLangIsPlainObject2 = _interopRequireDefault(_lodashLangIsPlainObject);

var _lodashLangIsNumber = require("lodash/lang/isNumber");

var _lodashLangIsNumber2 = _interopRequireDefault(_lodashLangIsNumber);

var _lodashLangIsRegExp = require("lodash/lang/isRegExp");

var _lodashLangIsRegExp2 = _interopRequireDefault(_lodashLangIsRegExp);

var _lodashLangIsString = require("lodash/lang/isString");

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _index = require("./index");

var t = _interopRequireWildcard(_index);

function toComputedKey(node) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? node.key || node.property : arguments[1];
  return (function () {
    if (!node.computed) {
      if (t.isIdentifier(key)) key = t.stringLiteral(key.name);
    }
    return key;
  })();
}

/**
 * Turn an array of statement `nodes` into a `SequenceExpression`.
 *
 * Variable declarations are turned into simple assignments and their
 * declarations hoisted to the top of the current scope.
 *
 * Expression statements are just resolved to their expression.
 */

function toSequenceExpression(nodes, scope) {
  if (!nodes || !nodes.length) return;

  var declars = [];
  var bailed = false;

  var result = convert(nodes);
  if (bailed) return;

  for (var i = 0; i < declars.length; i++) {
    scope.push(declars[i]);
  }

  return result;

  function convert(nodes) {
    var ensureLastUndefined = false;
    var exprs = [];

    var _arr = nodes;
    for (var _i = 0; _i < _arr.length; _i++) {
      var node = _arr[_i];
      if (t.isExpression(node)) {
        exprs.push(node);
      } else if (t.isExpressionStatement(node)) {
        exprs.push(node.expression);
      } else if (t.isVariableDeclaration(node)) {
        if (node.kind !== "var") return bailed = true; // bailed

        var _arr2 = node.declarations;
        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var declar = _arr2[_i2];
          var bindings = t.getBindingIdentifiers(declar);
          for (var key in bindings) {
            declars.push({
              kind: node.kind,
              id: bindings[key]
            });
          }

          if (declar.init) {
            exprs.push(t.assignmentExpression("=", declar.id, declar.init));
          }
        }

        ensureLastUndefined = true;
        continue;
      } else if (t.isIfStatement(node)) {
        var consequent = node.consequent ? convert([node.consequent]) : scope.buildUndefinedNode();
        var alternate = node.alternate ? convert([node.alternate]) : scope.buildUndefinedNode();
        if (!consequent || !alternate) return bailed = true;

        exprs.push(t.conditionalExpression(node.test, consequent, alternate));
      } else if (t.isBlockStatement(node)) {
        exprs.push(convert(node.body));
      } else if (t.isEmptyStatement(node)) {
        // empty statement so ensure the last item is undefined if we're last
        ensureLastUndefined = true;
        continue;
      } else {
        // bailed, we can't turn this statement into an expression
        return bailed = true;
      }

      ensureLastUndefined = false;
    }

    if (ensureLastUndefined || exprs.length === 0) {
      exprs.push(scope.buildUndefinedNode());
    }

    //

    if (exprs.length === 1) {
      return exprs[0];
    } else {
      return t.sequenceExpression(exprs);
    }
  }
}

function toKeyAlias(node) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? node.key : arguments[1];
  return (function () {
    var alias = undefined;

    if (node.kind === "method") {
      return toKeyAlias.increment() + "";
    } else if (t.isIdentifier(key)) {
      alias = key.name;
    } else if (t.isStringLiteral(key)) {
      alias = JSON.stringify(key.value);
    } else {
      alias = JSON.stringify(_babelTraverse2["default"].removeProperties(t.cloneDeep(key)));
    }

    if (node.computed) {
      alias = "[" + alias + "]";
    }

    if (node["static"]) {
      alias = "static:" + alias;
    }

    return alias;
  })();
}

toKeyAlias.uid = 0;

toKeyAlias.increment = function () {
  if (toKeyAlias.uid >= _Number$MAX_SAFE_INTEGER) {
    return toKeyAlias.uid = 0;
  } else {
    return toKeyAlias.uid++;
  }
};

function toIdentifier(name) {
  name = name + "";

  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9$_]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (!t.isValidIdentifier(name)) {
    name = "_" + name;
  }

  return name || "_";
}

function toBindingIdentifierName(name) {
  name = toIdentifier(name);
  if (name === "eval" || name === "arguments") name = "_" + name;
  return name;
}

/**
 * [Please add a description.]
 * @returns {Object|Boolean}
 */

function toStatement(node, ignore) {
  if (t.isStatement(node)) {
    return node;
  }

  var mustHaveId = false;
  var newType = undefined;

  if (t.isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if (t.isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if (t.isAssignmentExpression(node)) {
    return t.expressionStatement(node);
  }

  if (mustHaveId && !node.id) {
    newType = false;
  }

  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error("cannot turn " + node.type + " to a statement");
    }
  }

  node.type = newType;

  return node;
}

function toExpression(node) {
  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  if (t.isClass(node)) {
    node.type = "ClassExpression";
  } else if (t.isFunction(node)) {
    node.type = "FunctionExpression";
  }

  if (t.isExpression(node)) {
    return node;
  } else {
    throw new Error("cannot turn " + node.type + " to an expression");
  }
}

function toBlock(node, parent) {
  if (t.isBlockStatement(node)) {
    return node;
  }

  if (t.isEmptyStatement(node)) {
    node = [];
  }

  if (!Array.isArray(node)) {
    if (!t.isStatement(node)) {
      if (t.isFunction(parent)) {
        node = t.returnStatement(node);
      } else {
        node = t.expressionStatement(node);
      }
    }

    node = [node];
  }

  return t.blockStatement(node);
}

function valueToNode(value) {
  // undefined
  if (value === undefined) {
    return t.identifier("undefined");
  }

  // boolean
  if (value === true || value === false) {
    return t.booleanLiteral(value);
  }

  // null
  if (value === null) {
    return t.nullLiteral();
  }

  // strings
  if (_lodashLangIsString2["default"](value)) {
    return t.stringLiteral(value);
  }

  // numbers
  if (_lodashLangIsNumber2["default"](value)) {
    return t.numericLiteral(value);
  }

  // regexes
  if (_lodashLangIsRegExp2["default"](value)) {
    var pattern = value.source;
    var flags = value.toString().match(/\/([a-z]+|)$/)[1];
    return t.regExpLiteral(pattern, flags);
  }

  // array
  if (Array.isArray(value)) {
    return t.arrayExpression(value.map(t.valueToNode));
  }

  // object
  if (_lodashLangIsPlainObject2["default"](value)) {
    var props = [];
    for (var key in value) {
      var nodeKey = undefined;
      if (t.isValidIdentifier(key)) {
        nodeKey = t.identifier(key);
      } else {
        nodeKey = t.stringLiteral(key);
      }
      props.push(t.objectProperty(nodeKey, t.valueToNode(value[key])));
    }
    return t.objectExpression(props);
  }

  throw new Error("don't know how to turn this value into a node");
}