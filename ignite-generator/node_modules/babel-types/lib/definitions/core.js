/* eslint max-len: 0 */

"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _index = require("../index");

var t = _interopRequireWildcard(_index);

var _constants = require("../constants");

var _index2 = require("./index");

var _index3 = _interopRequireDefault(_index2);

_index3["default"]("ArrayExpression", {
  fields: {
    elements: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeOrValueType("null", "Expression", "SpreadElement"))),
      "default": []
    }
  },
  visitor: ["elements"],
  aliases: ["Expression"]
});

_index3["default"]("AssignmentExpression", {
  fields: {
    operator: {
      validate: _index2.assertValueType("string")
    },
    left: {
      validate: _index2.assertNodeType("LVal")
    },
    right: {
      validate: _index2.assertNodeType("Expression")
    }
  },
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});

_index3["default"]("BinaryExpression", {
  builder: ["operator", "left", "right"],
  fields: {
    operator: {
      validate: _index2.assertOneOf.apply(undefined, _constants.BINARY_OPERATORS)
    },
    left: {
      validate: _index2.assertNodeType("Expression")
    },
    right: {
      validate: _index2.assertNodeType("Expression")
    }
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

_index3["default"]("Directive", {
  visitor: ["value"],
  fields: {
    value: {
      validate: _index2.assertNodeType("DirectiveLiteral")
    }
  }
});

_index3["default"]("DirectiveLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: _index2.assertValueType("string")
    }
  }
});

_index3["default"]("BlockStatement", {
  builder: ["body", "directives"],
  visitor: ["directives", "body"],
  fields: {
    directives: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Directive"))),
      "default": []
    },
    body: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});

_index3["default"]("BreakStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: _index2.assertNodeType("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

_index3["default"]("CallExpression", {
  visitor: ["callee", "arguments"],
  fields: {
    callee: {
      validate: _index2.assertNodeType("Expression")
    },
    arguments: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Expression", "SpreadElement")))
    }
  },
  aliases: ["Expression"]
});

_index3["default"]("CatchClause", {
  visitor: ["param", "body"],
  fields: {
    param: {
      validate: _index2.assertNodeType("Identifier")
    },
    body: {
      validate: _index2.assertNodeType("BlockStatement")
    }
  },
  aliases: ["Scopable"]
});

_index3["default"]("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  fields: {
    test: {
      validate: _index2.assertNodeType("Expression")
    },
    consequent: {
      validate: _index2.assertNodeType("Expression")
    },
    alternate: {
      validate: _index2.assertNodeType("Expression")
    }
  },
  aliases: ["Expression", "Conditional"]
});

_index3["default"]("ContinueStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: _index2.assertNodeType("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

_index3["default"]("DebuggerStatement", {
  aliases: ["Statement"]
});

_index3["default"]("DoWhileStatement", {
  visitor: ["test", "body"],
  fields: {
    test: {
      validate: _index2.assertNodeType("Expression")
    },
    body: {
      validate: _index2.assertNodeType("Statement")
    }
  },
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

_index3["default"]("EmptyStatement", {
  aliases: ["Statement"]
});

_index3["default"]("ExpressionStatement", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: _index2.assertNodeType("Expression")
    }
  },
  aliases: ["Statement", "ExpressionWrapper"]
});

_index3["default"]("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"],
  fields: {
    program: {
      validate: _index2.assertNodeType("Program")
    }
  }
});

_index3["default"]("ForInStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: _index2.assertNodeType("VariableDeclaration", "LVal")
    },
    right: {
      validate: _index2.assertNodeType("Expression")
    },
    body: {
      validate: _index2.assertNodeType("Statement")
    }
  }
});

_index3["default"]("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
  fields: {
    init: {
      validate: _index2.assertNodeType("VariableDeclaration", "Expression"),
      optional: true
    },
    test: {
      validate: _index2.assertNodeType("Expression"),
      optional: true
    },
    update: {
      validate: _index2.assertNodeType("Expression"),
      optional: true
    },
    body: {
      validate: _index2.assertNodeType("Statement")
    }
  }
});

_index3["default"]("FunctionDeclaration", {
  builder: ["id", "params", "body", "generator", "async"],
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  fields: {
    id: {
      validate: _index2.assertNodeType("Identifier")
    },
    params: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("LVal")))
    },
    body: {
      validate: _index2.assertNodeType("BlockStatement")
    },
    generator: {
      "default": false,
      validate: _index2.assertValueType("boolean")
    },
    async: {
      "default": false,
      validate: _index2.assertValueType("boolean")
    }
  },
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration"]
});

_index3["default"]("FunctionExpression", {
  inherits: "FunctionDeclaration",
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
  fields: {
    id: {
      validate: _index2.assertNodeType("Identifier"),
      optional: true
    },
    params: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("LVal")))
    },
    body: {
      validate: _index2.assertNodeType("BlockStatement")
    },
    generator: {
      "default": false,
      validate: _index2.assertValueType("boolean")
    },
    async: {
      "default": false,
      validate: _index2.assertValueType("boolean")
    }
  }
});

_index3["default"]("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation"],
  aliases: ["Expression", "LVal"],
  fields: {
    name: {
      validate: function validate(node, key, val) {
        if (!t.isValidIdentifier(val)) {
          // todo
        }
      }
    }
  }
});

_index3["default"]("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement", "Conditional"],
  fields: {
    test: {
      validate: _index2.assertNodeType("Expression")
    },
    consequent: {
      validate: _index2.assertNodeType("Statement")
    },
    alternate: {
      optional: true,
      validate: _index2.assertNodeType("Statement")
    }
  }
});

_index3["default"]("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"],
  fields: {
    label: {
      validate: _index2.assertNodeType("Identifier")
    },
    body: {
      validate: _index2.assertNodeType("Statement")
    }
  }
});

_index3["default"]("StringLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: _index2.assertValueType("string")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});

_index3["default"]("NumericLiteral", {
  builder: ["value"],
  deprecatedAlias: "NumberLiteral",
  fields: {
    value: {
      validate: _index2.assertValueType("number")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});

_index3["default"]("NullLiteral", {
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});

_index3["default"]("BooleanLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: _index2.assertValueType("boolean")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});

_index3["default"]("RegExpLiteral", {
  builder: ["pattern", "flags"],
  deprecatedAlias: "RegexLiteral",
  aliases: ["Expression", "Literal"],
  fields: {
    pattern: {
      validate: _index2.assertValueType("string")
    },
    flags: {
      validate: _index2.assertValueType("string"),
      "default": ""
    }
  }
});

_index3["default"]("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"],
  fields: {
    operator: {
      validate: _index2.assertOneOf.apply(undefined, _constants.LOGICAL_OPERATORS)
    },
    left: {
      validate: _index2.assertNodeType("Expression")
    },
    right: {
      validate: _index2.assertNodeType("Expression")
    }
  }
});

_index3["default"]("MemberExpression", {
  builder: ["object", "property", "computed"],
  visitor: ["object", "property"],
  aliases: ["Expression", "LVal"],
  fields: {
    object: {
      validate: _index2.assertNodeType("Expression")
    },
    property: {
      validate: function validate(node, key, val) {
        var expectedType = node.computed ? "Expression" : "Identifier";
        _index2.assertNodeType(expectedType)(node, key, val);
      }
    },
    computed: {
      "default": false
    }
  }
});

_index3["default"]("NewExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"],
  fields: {
    callee: {
      validate: _index2.assertNodeType("Expression")
    },
    arguments: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Expression", "SpreadElement")))
    }
  }
});

_index3["default"]("Program", {
  visitor: ["directives", "body"],
  builder: ["body", "directives"],
  fields: {
    directives: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Directive"))),
      "default": []
    },
    body: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block", "FunctionParent"]
});

_index3["default"]("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("ObjectMethod", "ObjectProperty", "SpreadProperty")))
    }
  }
});

_index3["default"]("ObjectMethod", {
  builder: ["kind", "key", "params", "body", "computed"],
  fields: {
    kind: {
      validate: _index2.chain(_index2.assertValueType("string"), _index2.assertOneOf("method", "get", "set")),
      "default": "method"
    },
    computed: {
      validate: _index2.assertValueType("boolean"),
      "default": false
    },
    key: {
      validate: function validate(node, key, val) {
        var expectedTypes = node.computed ? ["Expression"] : ["Identifier", "StringLiteral", "NumericLiteral"];
        _index2.assertNodeType.apply(undefined, expectedTypes)(node, key, val);
      }
    },
    decorators: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Decorator")))
    },
    body: {
      validate: _index2.assertNodeType("BlockStatement")
    },
    generator: {
      "default": false,
      validate: _index2.assertValueType("boolean")
    },
    async: {
      "default": false,
      validate: _index2.assertValueType("boolean")
    }
  },
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  aliases: ["UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember"]
});

_index3["default"]("ObjectProperty", {
  builder: ["key", "value", "computed", "shorthand", "decorators"],
  fields: {
    computed: {
      validate: _index2.assertValueType("boolean"),
      "default": false
    },
    key: {
      validate: function validate(node, key, val) {
        var expectedTypes = node.computed ? ["Expression"] : ["Identifier", "StringLiteral", "NumericLiteral"];
        _index2.assertNodeType.apply(undefined, expectedTypes)(node, key, val);
      }
    },
    value: {
      validate: _index2.assertNodeType("Expression")
    },
    shorthand: {
      validate: _index2.assertValueType("boolean"),
      "default": false
    },
    decorators: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Decorator"))),
      optional: true
    }
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable", "Property", "ObjectMember"]
});

_index3["default"]("RestElement", {
  visitor: ["argument", "typeAnnotation"],
  aliases: ["LVal"],
  fields: {
    argument: {
      validate: _index2.assertNodeType("LVal")
    }
  }
});

_index3["default"]("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: _index2.assertNodeType("Expression"),
      optional: true
    }
  }
});

_index3["default"]("SequenceExpression", {
  visitor: ["expressions"],
  fields: {
    expressions: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Expression")))
    }
  },
  aliases: ["Expression"]
});

_index3["default"]("SwitchCase", {
  visitor: ["test", "consequent"],
  fields: {
    test: {
      validate: _index2.assertNodeType("Expression"),
      optional: true
    },
    consequent: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("Statement")))
    }
  }
});

_index3["default"]("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"],
  fields: {
    discriminant: {
      validate: _index2.assertNodeType("Expression")
    },
    cases: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("SwitchCase")))
    }
  }
});

_index3["default"]("ThisExpression", {
  aliases: ["Expression"]
});

_index3["default"]("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: _index2.assertNodeType("Expression")
    }
  }
});

// todo: at least handler or finalizer should be set to be valid
_index3["default"]("TryStatement", {
  visitor: ["block", "handler", "finalizer"],
  aliases: ["Statement"],
  fields: {
    body: {
      validate: _index2.assertNodeType("BlockStatement")
    },
    handler: {
      optional: true,
      handler: _index2.assertNodeType("BlockStatement")
    },
    finalizer: {
      optional: true,
      validate: _index2.assertNodeType("BlockStatement")
    }
  }
});

_index3["default"]("UnaryExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      "default": true
    },
    argument: {
      validate: _index2.assertNodeType("Expression")
    },
    operator: {
      validate: _index2.assertOneOf.apply(undefined, _constants.UNARY_OPERATORS)
    }
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});

_index3["default"]("UpdateExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      "default": false
    },
    argument: {
      validate: _index2.assertNodeType("Expression")
    },
    operator: {
      validate: _index2.assertOneOf.apply(undefined, _constants.UPDATE_OPERATORS)
    }
  },
  visitor: ["argument"],
  aliases: ["Expression"]
});

_index3["default"]("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"],
  fields: {
    kind: {
      validate: _index2.chain(_index2.assertValueType("string"), _index2.assertOneOf("var", "let", "const"))
    },
    declarations: {
      validate: _index2.chain(_index2.assertValueType("array"), _index2.assertEach(_index2.assertNodeType("VariableDeclarator")))
    }
  }
});

_index3["default"]("VariableDeclarator", {
  visitor: ["id", "init"],
  fields: {
    id: {
      validate: _index2.assertNodeType("LVal")
    },
    init: {
      optional: true,
      validate: _index2.assertNodeType("Expression")
    }
  }
});

_index3["default"]("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
  fields: {
    test: {
      validate: _index2.assertNodeType("Expression")
    },
    body: {
      validate: _index2.assertNodeType("BlockStatement", "Statement")
    }
  }
});

_index3["default"]("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"],
  fields: {
    object: {
      object: _index2.assertNodeType("Expression")
    },
    body: {
      validate: _index2.assertNodeType("BlockStatement", "Statement")
    }
  }
});