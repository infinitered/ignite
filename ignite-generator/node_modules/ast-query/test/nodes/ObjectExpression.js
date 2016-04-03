var assert = require('assert');
var program = require('../../');
var valueFactory = require('../../lib/factory/value.js');

var ObjectExpression = require('../../lib/nodes/ObjectExpression.js');
var Literal = require('../../lib/nodes/Literal.js');

describe('ObjectExpression objects', function () {
  beforeEach(function () {
    this.obj = new ObjectExpression(valueFactory.create('{ a: "b", foo: 1, bar: { sub: 1 }, "special-key":"foo" }'));
  });

  it('#type equal ObjectExpression', function () {
    assert.equal(this.obj.type, 'ObjectExpression');
  });

  describe('#key()', function () {
    it('get key value', function () {
      assert.equal(this.obj.key('a').value(), 'b');
    });

    it('returns a wrapped value', function () {
      assert(this.obj.key('a') instanceof Literal);
      assert(this.obj.key('bar') instanceof ObjectExpression);
      assert(this.obj.key('bar').key('sub') instanceof Literal);
    });

    it('create a placeholder object if key doesn\'t exist', function () {
      var obj = program('var b = { a: null };');
      obj.var('b').value().key('c').value('1');
      assert.equal(obj.toString(), 'var b = {\n    a: null,\n    c: 1\n};');
    });

    it('doesn\'t render the placeholder if no value is assigned', function () {
      var obj = program('var b = { a: null };');
      obj.var('b').value().key('c');
      assert.equal(obj.toString(), 'var b = { a: null };');
    });

    it('can search for special keys',function(){
      assert(this.obj.key('"special-key"')  instanceof Literal);
    });
  });

  describe('#value()', function () {
    it('replace itself with new value', function () {
      var tree = program('var b = { a: "b" };');
      tree.var('b').value().value('1');
      assert.equal(tree.toString(), 'var b = 1;');
    });

    it('return the new value', function () {
      var obj = this.obj.key('bar').value('"a"');
      assert(obj instanceof Literal);
    });
  });
});
