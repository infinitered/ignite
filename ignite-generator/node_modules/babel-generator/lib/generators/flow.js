/* eslint max-len: 0 */

"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.AnyTypeAnnotation = AnyTypeAnnotation;
exports.ArrayTypeAnnotation = ArrayTypeAnnotation;
exports.BooleanTypeAnnotation = BooleanTypeAnnotation;
exports.BooleanLiteralTypeAnnotation = BooleanLiteralTypeAnnotation;
exports.NullLiteralTypeAnnotation = NullLiteralTypeAnnotation;
exports.DeclareClass = DeclareClass;
exports.DeclareFunction = DeclareFunction;
exports.DeclareInterface = DeclareInterface;
exports.DeclareModule = DeclareModule;
exports.DeclareTypeAlias = DeclareTypeAlias;
exports.DeclareVariable = DeclareVariable;
exports.ExistentialTypeParam = ExistentialTypeParam;
exports.FunctionTypeAnnotation = FunctionTypeAnnotation;
exports.FunctionTypeParam = FunctionTypeParam;
exports.InterfaceExtends = InterfaceExtends;
exports._interfaceish = _interfaceish;
exports.InterfaceDeclaration = InterfaceDeclaration;
exports.IntersectionTypeAnnotation = IntersectionTypeAnnotation;
exports.MixedTypeAnnotation = MixedTypeAnnotation;
exports.NullableTypeAnnotation = NullableTypeAnnotation;
exports.NumberTypeAnnotation = NumberTypeAnnotation;
exports.StringLiteralTypeAnnotation = StringLiteralTypeAnnotation;
exports.StringTypeAnnotation = StringTypeAnnotation;
exports.ThisTypeAnnotation = ThisTypeAnnotation;
exports.TupleTypeAnnotation = TupleTypeAnnotation;
exports.TypeofTypeAnnotation = TypeofTypeAnnotation;
exports.TypeAlias = TypeAlias;
exports.TypeAnnotation = TypeAnnotation;
exports.TypeParameterInstantiation = TypeParameterInstantiation;
exports.ObjectTypeAnnotation = ObjectTypeAnnotation;
exports.ObjectTypeCallProperty = ObjectTypeCallProperty;
exports.ObjectTypeIndexer = ObjectTypeIndexer;
exports.ObjectTypeProperty = ObjectTypeProperty;
exports.QualifiedTypeIdentifier = QualifiedTypeIdentifier;
exports.UnionTypeAnnotation = UnionTypeAnnotation;
exports.TypeCastExpression = TypeCastExpression;
exports.VoidTypeAnnotation = VoidTypeAnnotation;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function AnyTypeAnnotation() {
  this.push("any");
}

function ArrayTypeAnnotation(node) {
  this.print(node.elementType, node);
  this.push("[");
  this.push("]");
}

function BooleanTypeAnnotation() {
  this.push("bool");
}

function BooleanLiteralTypeAnnotation(node) {
  this.push(node.value ? "true" : "false");
}

function NullLiteralTypeAnnotation() {
  this.push("null");
}

function DeclareClass(node) {
  this.push("declare class ");
  this._interfaceish(node);
}

function DeclareFunction(node) {
  this.push("declare function ");
  this.print(node.id, node);
  this.print(node.id.typeAnnotation.typeAnnotation, node);
  this.semicolon();
}

function DeclareInterface(node) {
  this.push("declare ");
  this.InterfaceDeclaration(node);
}

function DeclareModule(node) {
  this.push("declare module ");
  this.print(node.id, node);
  this.space();
  this.print(node.body, node);
}

function DeclareTypeAlias(node) {
  this.push("declare ");
  this.TypeAlias(node);
}

function DeclareVariable(node) {
  this.push("declare var ");
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  this.semicolon();
}

function ExistentialTypeParam() {
  this.push("*");
}

function FunctionTypeAnnotation(node, parent) {
  this.print(node.typeParameters, node);
  this.push("(");
  this.printList(node.params, node);

  if (node.rest) {
    if (node.params.length) {
      this.push(",");
      this.space();
    }
    this.push("...");
    this.print(node.rest, node);
  }

  this.push(")");

  // this node type is overloaded, not sure why but it makes it EXTREMELY annoying
  if (parent.type === "ObjectTypeProperty" || parent.type === "ObjectTypeCallProperty" || parent.type === "DeclareFunction") {
    this.push(":");
  } else {
    this.space();
    this.push("=>");
  }

  this.space();
  this.print(node.returnType, node);
}

function FunctionTypeParam(node) {
  this.print(node.name, node);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  this.print(node.typeAnnotation, node);
}

function InterfaceExtends(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
}

exports.ClassImplements = InterfaceExtends;
exports.GenericTypeAnnotation = InterfaceExtends;

function _interfaceish(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  if (node["extends"].length) {
    this.push(" extends ");
    this.printJoin(node["extends"], node, { separator: ", " });
  }
  if (node.mixins && node.mixins.length) {
    this.push(" mixins ");
    this.printJoin(node.mixins, node, { separator: ", " });
  }
  this.space();
  this.print(node.body, node);
}

function InterfaceDeclaration(node) {
  this.push("interface ");
  this._interfaceish(node);
}

function IntersectionTypeAnnotation(node) {
  this.printJoin(node.types, node, { separator: " & " });
}

function MixedTypeAnnotation() {
  this.push("mixed");
}

function NullableTypeAnnotation(node) {
  this.push("?");
  this.print(node.typeAnnotation, node);
}

var _types = require("./types");

exports.NumericLiteralTypeAnnotation = _types.NumericLiteral;

function NumberTypeAnnotation() {
  this.push("number");
}

function StringLiteralTypeAnnotation(node) {
  this.push(this._stringLiteral(node.value));
}

function StringTypeAnnotation() {
  this.push("string");
}

function ThisTypeAnnotation() {
  this.push("this");
}

function TupleTypeAnnotation(node) {
  this.push("[");
  this.printJoin(node.types, node, { separator: ", " });
  this.push("]");
}

function TypeofTypeAnnotation(node) {
  this.push("typeof ");
  this.print(node.argument, node);
}

function TypeAlias(node) {
  this.push("type ");
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  this.space();
  this.push("=");
  this.space();
  this.print(node.right, node);
  this.semicolon();
}

function TypeAnnotation(node) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  this.print(node.typeAnnotation, node);
}

function TypeParameterInstantiation(node) {
  // istanbul ignore next

  var _this = this;

  this.push("<");
  this.printJoin(node.params, node, {
    separator: ", ",
    iterator: function iterator(node) {
      _this.print(node.typeAnnotation, node);
    }
  });
  this.push(">");
}

exports.TypeParameterDeclaration = TypeParameterInstantiation;

function ObjectTypeAnnotation(node) {
  // istanbul ignore next

  var _this2 = this;

  this.push("{");
  var props = node.properties.concat(node.callProperties, node.indexers);

  if (props.length) {
    this.space();

    this.printJoin(props, node, {
      separator: false,
      indent: true,
      iterator: function iterator() {
        if (props.length !== 1) {
          _this2.semicolon();
          _this2.space();
        }
      }
    });

    this.space();
  }

  this.push("}");
}

function ObjectTypeCallProperty(node) {
  if (node["static"]) this.push("static ");
  this.print(node.value, node);
}

function ObjectTypeIndexer(node) {
  if (node["static"]) this.push("static ");
  this.push("[");
  this.print(node.id, node);
  this.push(":");
  this.space();
  this.print(node.key, node);
  this.push("]");
  this.push(":");
  this.space();
  this.print(node.value, node);
}

function ObjectTypeProperty(node) {
  if (node["static"]) this.push("static ");
  this.print(node.key, node);
  if (node.optional) this.push("?");
  if (!t.isFunctionTypeAnnotation(node.value)) {
    this.push(":");
    this.space();
  }
  this.print(node.value, node);
}

function QualifiedTypeIdentifier(node) {
  this.print(node.qualification, node);
  this.push(".");
  this.print(node.id, node);
}

function UnionTypeAnnotation(node) {
  this.printJoin(node.types, node, { separator: " | " });
}

function TypeCastExpression(node) {
  this.push("(");
  this.print(node.expression, node);
  this.print(node.typeAnnotation, node);
  this.push(")");
}

function VoidTypeAnnotation() {
  this.push("void");
}