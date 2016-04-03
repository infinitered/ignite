"use strict";

exports.__esModule = true;

exports["default"] = function (_ref) {
  var t = _ref.types;

  function isString(node) {
    return t.isLiteral(node) && typeof node.value === "string";
  }

  function buildBinaryExpression(left, right) {
    return t.binaryExpression("+", left, right);
  }

  return {
    visitor: {
      TaggedTemplateExpression: function TaggedTemplateExpression(path, state) {
        var node = path.node;

        var quasi = node.quasi;
        var args = [];

        var strings = [];
        var raw = [];

        var _arr = quasi.quasis;
        for (var _i = 0; _i < _arr.length; _i++) {
          var elem = _arr[_i];
          strings.push(t.stringLiteral(elem.value.cooked));
          raw.push(t.stringLiteral(elem.value.raw));
        }

        strings = t.arrayExpression(strings);
        raw = t.arrayExpression(raw);

        var templateName = "taggedTemplateLiteral";
        if (state.opts.loose) templateName += "Loose";

        var templateObject = state.file.addTemplateObject(templateName, strings, raw);
        args.push(templateObject);

        args = args.concat(quasi.expressions);

        path.replaceWith(t.callExpression(node.tag, args));
      },

      TemplateLiteral: function TemplateLiteral(path, state) {
        var nodes = [];

        var expressions = path.get("expressions");

        var _arr2 = path.node.quasis;
        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var elem = _arr2[_i2];
          nodes.push(t.stringLiteral(elem.value.cooked));

          var expr = expressions.shift();
          if (expr) {
            if (state.opts.spec && !expr.isBaseType("string") && !expr.isBaseType("number")) {
              nodes.push(t.callExpression(t.identifier("String"), [expr.node]));
            } else {
              nodes.push(expr.node);
            }
          }
        }

        // filter out empty string literals
        nodes = nodes.filter(function (n) {
          return !t.isLiteral(n, { value: "" });
        });

        // since `+` is left-to-right associative
        // ensure the first node is a string if first/second isn't
        if (!isString(nodes[0]) && !isString(nodes[1])) {
          nodes.unshift(t.stringLiteral(""));
        }

        if (nodes.length > 1) {
          var root = buildBinaryExpression(nodes.shift(), nodes.shift());

          for (var _i3 = 0; _i3 < nodes.length; _i3++) {
            var node = nodes[_i3];
            root = buildBinaryExpression(root, node);
          }

          path.replaceWith(root);
        } else {
          path.replaceWith(nodes[0]);
        }
      }
    }
  };
};

module.exports = exports["default"];