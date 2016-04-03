/* eslint max-len: 0 */

"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("AssignmentPattern", {
  visitor: ["left", "right"],
  aliases: ["Pattern", "LVal"],
  fields: {
    left: {
      validate: _index.assertNodeType("Identifier")
    },
    right: {
      validate: _index.assertNodeType("Expression")
    }
  }
});

_index2["default"]("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  aliases: ["Pattern", "LVal"],
  fields: {
    elements: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("Expression")))
    }
  }
});

_index2["default"]("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType"],
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
  fields: {
    params: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("LVal")))
    },
    body: {
      validate: _index.assertNodeType("BlockStatement", "Expression")
    },
    async: {
      validate: _index.assertValueType("boolean"),
      "default": false
    }
  }
});

_index2["default"]("ClassBody", {
  visitor: ["body"],
  fields: {
    body: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("ClassMethod", "ClassProperty")))
    }
  }
});

_index2["default"]("ClassDeclaration", {
  builder: ["id", "superClass", "body", "decorators"],
  visitor: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Statement", "Declaration", "Pureish"],
  fields: {
    id: {
      validate: _index.assertNodeType("Identifier")
    },
    body: {
      validate: _index.assertNodeType("ClassBody")
    },
    superClass: {
      optional: true,
      validate: _index.assertNodeType("Expression")
    },
    decorators: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("Decorator")))
    }
  }
});

_index2["default"]("ClassExpression", {
  inherits: "ClassDeclaration",
  aliases: ["Scopable", "Class", "Expression", "Pureish"],
  fields: {
    id: {
      optional: true,
      validate: _index.assertNodeType("Identifier")
    },
    body: {
      validate: _index.assertNodeType("ClassBody")
    },
    superClass: {
      optional: true,
      validate: _index.assertNodeType("Expression")
    },
    decorators: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("Decorator")))
    }
  }
});

_index2["default"]("ExportAllDeclaration", {
  visitor: ["source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    source: {
      validate: _index.assertNodeType("StringLiteral")
    }
  }
});

_index2["default"]("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    declaration: {
      validate: _index.assertNodeType("FunctionDeclaration", "ClassDeclaration", "Expression")
    }
  }
});

_index2["default"]("ExportNamedDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    declaration: {
      validate: _index.assertNodeType("Declaration"),
      optional: true
    },
    specifiers: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("ExportSpecifier")))
    },
    source: {
      validate: _index.assertNodeType("StringLiteral"),
      optional: true
    }
  }
});

_index2["default"]("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: _index.assertNodeType("Identifier")
    },
    exported: {
      validate: _index.assertNodeType("Identifier")
    }
  }
});

_index2["default"]("ForOfStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: _index.assertNodeType("VariableDeclaration", "LVal")
    },
    right: {
      validate: _index.assertNodeType("Expression")
    },
    body: {
      validate: _index.assertNodeType("Statement")
    }
  }
});

_index2["default"]("ImportDeclaration", {
  visitor: ["specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration"],
  fields: {
    specifiers: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier")))
    },
    source: {
      validate: _index.assertNodeType("StringLiteral")
    }
  }
});

_index2["default"]("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: _index.assertNodeType("Identifier")
    }
  }
});

_index2["default"]("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: _index.assertNodeType("Identifier")
    }
  }
});

_index2["default"]("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: _index.assertNodeType("Identifier")
    },
    imported: {
      validate: _index.assertNodeType("Identifier")
    }
  }
});

_index2["default"]("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"],
  fields: {
    // todo: limit to new.target
    meta: {
      validate: _index.assertValueType("string")
    },
    property: {
      validate: _index.assertValueType("string")
    }
  }
});

_index2["default"]("ClassMethod", {
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
  builder: ["kind", "key", "params", "body", "computed", "static"],
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  fields: {
    kind: {
      validate: _index.chain(_index.assertValueType("string"), _index.assertOneOf("get", "set", "method", "constructor")),
      "default": "method"
    },
    computed: {
      "default": false,
      validate: _index.assertValueType("boolean")
    },
    "static": {
      "default": false,
      validate: _index.assertValueType("boolean")
    },
    key: {
      validate: function validate(node, key, val) {
        var expectedTypes = node.computed ? ["Expression"] : ["Identifier", "StringLiteral", "NumericLiteral"];
        _index.assertNodeType.apply(undefined, expectedTypes)(node, key, val);
      }
    },
    params: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("LVal")))
    },
    body: {
      validate: _index.assertNodeType("BlockStatement")
    },
    generator: {
      "default": false,
      validate: _index.assertValueType("boolean")
    },
    async: {
      "default": false,
      validate: _index.assertValueType("boolean")
    }
  }
});

_index2["default"]("ObjectPattern", {
  visitor: ["properties", "typeAnnotation"],
  aliases: ["Pattern", "LVal"],
  fields: {
    properties: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("RestProperty", "Property")))
    }
  }
});

_index2["default"]("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  fields: {
    argument: {
      validate: _index.assertNodeType("Expression")
    }
  }
});

_index2["default"]("Super", {
  aliases: ["Expression"]
});

_index2["default"]("TaggedTemplateExpression", {
  visitor: ["tag", "quasi"],
  aliases: ["Expression"],
  fields: {
    tag: {
      validate: _index.assertNodeType("Expression")
    },
    quasi: {
      validate: _index.assertNodeType("TemplateLiteral")
    }
  }
});

_index2["default"]("TemplateElement", {
  builder: ["value", "tail"],
  fields: {
    value: {
      // todo: flatten `raw` into main node
    },
    tail: {
      validate: _index.assertValueType("boolean"),
      "default": false
    }
  }
});

_index2["default"]("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression", "Literal"],
  fields: {
    quasis: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("TemplateElement")))
    },
    expressions: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("Expression")))
    }
  }
});

_index2["default"]("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    delegate: {
      validate: _index.assertValueType("boolean"),
      "default": false
    },
    argument: {
      optional: true,
      validate: _index.assertNodeType("Expression")
    }
  }
});