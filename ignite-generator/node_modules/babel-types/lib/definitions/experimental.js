"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("AwaitExpression", {
  builder: ["argument"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    argument: {
      validate: _index.assertNodeType("Expression")
    }
  }
});

_index2["default"]("BindExpression", {
  visitor: ["object", "callee"],
  aliases: ["Expression"],
  fields: {
    // todo
  }
});

_index2["default"]("Decorator", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: _index.assertNodeType("Expression")
    }
  }
});

_index2["default"]("DoExpression", {
  visitor: ["body"],
  aliases: ["Expression"],
  fields: {
    body: {
      validate: _index.assertNodeType("BlockStatement")
    }
  }
});

_index2["default"]("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: _index.assertNodeType("Identifier")
    }
  }
});

_index2["default"]("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: _index.assertNodeType("Identifier")
    }
  }
});

_index2["default"]("RestProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: _index.assertNodeType("LVal")
    }
  }
});

_index2["default"]("SpreadProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: _index.assertNodeType("Expression")
    }
  }
});