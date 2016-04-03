
/**
* This adds {fileName, lineNumber} annotations to React component definitions
* and to jsx tag literals.
*
*
* == JSX Literals ==
*
* <sometag />
*
* becomes:
*
* var __jsxFileName = 'this/file.js';
* <sometag __source={{fileName: __jsxFileName, lineNumber: 10}}/>
*/

"use strict";

exports.__esModule = true;
var TRACE_ID = "__source";
var FILE_NAME_VAR = "_jsxFileName";

exports["default"] = function (_ref) {
  var t = _ref.types;

  function makeTrace(fileNameIdentifier, lineNumber) {
    var fileLineLiteral = lineNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();
    var fileNameProperty = t.objectProperty(t.identifier("fileName"), fileNameIdentifier);
    var lineNumberProperty = t.objectProperty(t.identifier("lineNumber"), fileLineLiteral);
    return t.objectExpression([fileNameProperty, lineNumberProperty]);
  }

  var visitor = {
    JSXOpeningElement: function JSXOpeningElement(path, state) {
      if (!state.fileNameIdentifier) {
        var fileName = state.file.log.filename !== "unknown" ? state.file.log.filename : null;

        var fileNameIdentifier = path.scope.generateUidIdentifier(FILE_NAME_VAR);
        path.hub.file.scope.push({ id: fileNameIdentifier, init: t.stringLiteral(fileName) });
        state.fileNameIdentifier = fileNameIdentifier;
      }

      var id = t.jSXIdentifier(TRACE_ID);
      var location = path.container.openingElement.loc; // undefined for generated elements
      if (location) {
        var trace = makeTrace(state.fileNameIdentifier, location.start.line);
        path.container.openingElement.attributes.push(t.jSXAttribute(id, t.jSXExpressionContainer(trace)));
      }
    }
  };

  return {
    visitor: visitor
  };
};

module.exports = exports["default"];