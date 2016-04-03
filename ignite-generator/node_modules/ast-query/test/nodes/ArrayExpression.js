var assert = require('assert');
var program = require('../../');
var valueFactory = require('../../lib/factory/value.js');

var ObjectExpression = require('../../lib/nodes/ObjectExpression.js');
var ArrayExpression = require('../../lib/nodes/ArrayExpression.js');
var Literal = require('../../lib/nodes/Literal.js');

describe('ArrayExpression objects', function () {
  beforeEach(function () {
    this.arr = new ArrayExpression(valueFactory.create('[1, [2, 3], "a", {"foo":"bar"}, ]'));
  });

  it('#type equal ArrayExpression', function () {
    assert.equal(this.arr.type, 'ArrayExpression');
  });

  describe('#push()', function () {
    it('adds a new value to the end of the array', function () {
      this.arr.at(1).push('"a"');
      assert.equal(this.arr.at(1).at(1).value(), 3);
      assert.equal(this.arr.at(1).at(2).value(), 'a');
    });
  });

  describe('#unshift()', function () {
    it('adds a new value to the start of the array', function () {
      this.arr.at(1).unshift('"a"');
      assert.equal(this.arr.at(1).at(0).value(), 'a');
      assert.equal(this.arr.at(1).at(2).value(), 3);
    });
  });

  describe('#at()', function () {
    it('returns a wrapped value', function () {
      assert(this.arr.at(0) instanceof Literal);
      assert(this.arr.at(1) instanceof ArrayExpression);
      assert(this.arr.at(1).at(0) instanceof Literal);
      assert(this.arr.at(2) instanceof Literal);
      assert(this.arr.at(3) instanceof ObjectExpression);

      assert.equal(this.arr.at(0).value(), 1);
      assert.equal(this.arr.at(1).at(0).value(), 2);
      assert.equal(this.arr.at(2).value(), 'a');
    });
  });

  describe('#value()', function () {
    it('replace itself with new value', function () {
      var tree = program('var b = ["a"];');
      tree.var('b').value('[1]');
      assert.equal(tree.toString(), 'var b = [1];');
    });

    it('replaces itself with a different type of node', function () {
      var tree = program('var b = ["a"];');
      tree.var('b').value('"this is literal"');
      assert.equal(tree.toString(), 'var b = \'this is literal\';');
    });

    it('return the new value', function () {
      var val = this.arr.at(1).value('"a"');
      assert(val instanceof Literal);
      assert.equal(val.value(), 'a');
    });
  });
});
