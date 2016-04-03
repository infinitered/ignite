"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: _index.assertNodeType("JSXIdentifier", "JSXNamespacedName")
    },
    value: {
      optional: true,
      validate: _index.assertNodeType("JSXElement", "StringLiteral", "JSXExpressionContainer")
    }
  }
});

_index2["default"]("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: _index.assertNodeType("JSXIdentifier", "JSXMemberExpression")
    }
  }
});

_index2["default"]("JSXElement", {
  builder: ["openingElement", "closingElement", "children", "selfClosing"],
  visitor: ["openingElement", "children", "closingElement"],
  aliases: ["JSX", "Immutable", "Expression"],
  fields: {
    openingElement: {
      validate: _index.assertNodeType("JSXOpeningElement")
    },
    closingElement: {
      optional: true,
      validate: _index.assertNodeType("JSXClosingElement")
    },
    children: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("JSXText", "JSXExpressionContainer", "JSXElement")))
    }
  }
});

_index2["default"]("JSXEmptyExpression", {
  aliases: ["JSX", "Expression"]
});

_index2["default"]("JSXExpressionContainer", {
  visitor: ["expression"],
  aliases: ["JSX", "Immutable"],
  fields: {
    expression: {
      validate: _index.assertNodeType("Expression")
    }
  }
});

_index2["default"]("JSXIdentifier", {
  builder: ["name"],
  aliases: ["JSX", "Expression"],
  fields: {
    name: {
      validate: _index.assertValueType("string")
    }
  }
});

_index2["default"]("JSXMemberExpression", {
  visitor: ["object", "property"],
  aliases: ["JSX", "Expression"],
  fields: {
    object: {
      validate: _index.assertNodeType("JSXMemberExpression", "JSXIdentifier")
    },
    property: {
      validate: _index.assertNodeType("JSXIdentifier")
    }
  }
});

_index2["default"]("JSXNamespacedName", {
  visitor: ["namespace", "name"],
  aliases: ["JSX"],
  fields: {
    namespace: {
      validate: _index.assertNodeType("JSXIdentifier")
    },
    name: {
      validate: _index.assertNodeType("JSXIdentifier")
    }
  }
});

_index2["default"]("JSXOpeningElement", {
  builder: ["name", "attributes", "selfClosing"],
  visitor: ["name", "attributes"],
  aliases: ["JSX", "Immutable"],
  fields: {
    name: {
      validate: _index.assertNodeType("JSXIdentifier", "JSXMemberExpression")
    },
    selfClosing: {
      "default": false,
      validate: _index.assertValueType("boolean")
    },
    attributes: {
      validate: _index.chain(_index.assertValueType("array"), _index.assertEach(_index.assertNodeType("JSXAttribute", "JSXSpreadAttribute")))
    }
  }
});

_index2["default"]("JSXSpreadAttribute", {
  visitor: ["argument"],
  aliases: ["JSX"],
  fields: {
    argument: {
      validate: _index.assertNodeType("Expression")
    }
  }
});

_index2["default"]("JSXText", {
  aliases: ["JSX"],
  builder: ["value"],
  fields: {
    value: {
      validate: _index.assertValueType("string")
    }
  }
});