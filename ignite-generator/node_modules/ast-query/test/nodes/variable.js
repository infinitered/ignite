/*globals describe, it, beforeEach */
var assert = require('assert');
var program = require('../..');

var ObjectExpression = require('../../lib/nodes/ObjectExpression.js');
var Literal = require('../../lib/nodes/Literal.js');

describe('Variable objects', function () {
  beforeEach(function () {
    this.tree1 = program('var a = 1;');
    this.tree2 = program('var a = 1, b = { a: "b" };');
    this.tree3 = program('var a = 1; (function () { var a = 2; }());');
  });

  describe('#tree.var()', function () {
    it('string', function () {
      assert.equal(this.tree1.var('a').length, 1);
      assert.equal(this.tree3.var('a').length, 2);
    });

    it('supports regex', function () {
      var multiVarTree = program(
        'var selectedVar = 1;' +
        'var selectedVar2 = 1;' +
        'var unSelectedVar1 = 1;' +
        'var unSelectedVar2 = 1;'
      );

      assert.equal(multiVarTree.var(/^selected[A-Z]+/).length, 2);
    });
  });

  describe('#value()', function () {
    it('update value', function () {
      this.tree1.var('a').value('3');
      assert.equal(this.tree1.toString(), 'var a = 3;');
    });

    it('update value (object)', function () {
      this.tree1.var('a').value('{ foo: "bar" }');
      assert.equal(this.tree1.toString(), 'var a = { foo: \'bar\' };');
    });

    it('update value when multiple declared var in a single block', function () {
      this.tree2.var('b').value('3');
      assert.equal(this.tree2.toString(), 'var a = 1, b = 3;');
    });

    it('update value of every matching variable', function () {
      this.tree3.var('a').value('3');
      assert.equal(this.tree3.toString(), 'var a = 3;\n(function () {\n    var a = 3;\n}());');
    });

    it('returns a wrapped value', function () {
      assert(this.tree1.var('a').value() instanceof Literal);
      assert(this.tree2.var('b').value() instanceof ObjectExpression);
    });
  });

  describe('#rename()', function () {
    it('rename the variable declaration', function () {
      this.tree1.var('a').rename('foo');
      assert.equal(this.tree1.toString(), 'var foo = 1;');
    });
  });

  describe('#toString()', function () {
    it('should preserve comments when assigning new values', function () {
      this.tree1.var('a').value('{/* some comments */ foo: "bar" }');
      assert.equal(this.tree1.toString().replace(/[\r\n\t\s]+/gm, ''), 'vara={/*somecomments*/foo:\'bar\'};');
    });
  });

});
