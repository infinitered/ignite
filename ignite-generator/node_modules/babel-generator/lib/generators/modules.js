"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.ImportSpecifier = ImportSpecifier;
exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
exports.ExportDefaultSpecifier = ExportDefaultSpecifier;
exports.ExportSpecifier = ExportSpecifier;
exports.ExportNamespaceSpecifier = ExportNamespaceSpecifier;
exports.ExportAllDeclaration = ExportAllDeclaration;
exports.ExportNamedDeclaration = ExportNamedDeclaration;
exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
exports.ImportDeclaration = ImportDeclaration;
exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function ImportSpecifier(node) {
  this.print(node.imported, node);
  if (node.local && node.local.name !== node.imported.name) {
    this.push(" as ");
    this.print(node.local, node);
  }
}

function ImportDefaultSpecifier(node) {
  this.print(node.local, node);
}

function ExportDefaultSpecifier(node) {
  this.print(node.exported, node);
}

function ExportSpecifier(node) {
  this.print(node.local, node);
  if (node.exported && node.local.name !== node.exported.name) {
    this.push(" as ");
    this.print(node.exported, node);
  }
}

function ExportNamespaceSpecifier(node) {
  this.push("* as ");
  this.print(node.exported, node);
}

function ExportAllDeclaration(node) {
  this.push("export *");
  if (node.exported) {
    this.push(" as ");
    this.print(node.exported, node);
  }
  this.push(" from ");
  this.print(node.source, node);
  this.semicolon();
}

function ExportNamedDeclaration() {
  this.push("export ");
  ExportDeclaration.apply(this, arguments);
}

function ExportDefaultDeclaration() {
  this.push("export default ");
  ExportDeclaration.apply(this, arguments);
}

function ExportDeclaration(node) {
  if (node.declaration) {
    var declar = node.declaration;
    this.print(declar, node);
    if (t.isStatement(declar) || t.isFunction(declar) || t.isClass(declar)) return;
  } else {
    if (node.exportKind === "type") {
      this.push("type ");
    }

    var specifiers = node.specifiers.slice(0);

    // print "special" specifiers first
    var hasSpecial = false;
    while (true) {
      var first = specifiers[0];
      if (t.isExportDefaultSpecifier(first) || t.isExportNamespaceSpecifier(first)) {
        hasSpecial = true;
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.push(", ");
        }
      } else {
        break;
      }
    }

    if (specifiers.length || !specifiers.length && !hasSpecial) {
      this.push("{");
      if (specifiers.length) {
        this.space();
        this.printJoin(specifiers, node, { separator: ", " });
        this.space();
      }
      this.push("}");
    }

    if (node.source) {
      this.push(" from ");
      this.print(node.source, node);
    }
  }

  this.ensureSemicolon();
}

function ImportDeclaration(node) {
  this.push("import ");

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.push(node.importKind + " ");
  }

  var specifiers = node.specifiers.slice(0);
  if (specifiers && specifiers.length) {
    // print "special" specifiers first
    while (true) {
      var first = specifiers[0];
      if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.push(", ");
        }
      } else {
        break;
      }
    }

    if (specifiers.length) {
      this.push("{");
      this.space();
      this.printJoin(specifiers, node, { separator: ", " });
      this.space();
      this.push("}");
    }

    this.push(" from ");
  }

  this.print(node.source, node);
  this.semicolon();
}

function ImportNamespaceSpecifier(node) {
  this.push("* as ");
  this.print(node.local, node);
}