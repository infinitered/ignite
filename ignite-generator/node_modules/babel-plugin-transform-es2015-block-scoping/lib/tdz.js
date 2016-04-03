"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function getTDZStatus(refPath, bindingPath) {
  var executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

  if (executionStatus === "before") {
    return "inside";
  } else if (executionStatus === "after") {
    return "outside";
  } else {
    return "maybe";
  }
}

function buildTDZAssert(node, file) {
  return t.callExpression(file.addHelper("temporalRef"), [node, t.stringLiteral(node.name), file.addHelper("temporalUndefined")]);
}

function isReference(node, scope, state) {
  var declared = state.letReferences[node.name];
  if (!declared) return false;

  // declared node is different in this scope
  return scope.getBindingIdentifier(node.name) === declared;
}

var visitor = {
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    if (!this.file.opts.tdz) return;

    var node = path.node;
    var parent = path.parent;
    var scope = path.scope;

    if (path.parentPath.isFor({ left: node })) return;
    if (!isReference(node, scope, state)) return;

    var bindingPath = scope.getBinding(node.name).path;

    var status = getTDZStatus(path, bindingPath);
    if (status === "inside") return;

    if (status === "maybe") {
      var assert = buildTDZAssert(node, state.file);

      // add tdzThis to parent variable declarator so it's exploded
      bindingPath.parent._tdzThis = true;

      path.skip();

      if (path.parentPath.isUpdateExpression()) {
        if (parent._ignoreBlockScopingTDZ) return;
        path.parentPath.replaceWith(t.sequenceExpression([assert, parent]));
      } else {
        path.replaceWith(assert);
      }
    } else if (status === "outside") {
      path.replaceWith(t.throwStatement(t.inherits(t.newExpression(t.identifier("ReferenceError"), [t.stringLiteral(node.name + " is not defined - temporal dead zone")]), node)));
    }
  },

  AssignmentExpression: {
    exit: function exit(path, state) {
      if (!this.file.opts.tdz) return;

      var node = path.node;

      if (node._ignoreBlockScopingTDZ) return;

      var nodes = [];
      var ids = path.getBindingIdentifiers();

      for (var _name in ids) {
        var id = ids[_name];

        if (isReference(id, path.scope, state)) {
          nodes.push(buildTDZAssert(id, state.file));
        }
      }

      if (nodes.length) {
        node._ignoreBlockScopingTDZ = true;
        nodes.push(node);
        path.replaceWithMultiple(nodes.map(t.expressionStatement));
      }
    }
  }
};
exports.visitor = visitor;