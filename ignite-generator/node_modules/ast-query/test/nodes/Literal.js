var assert = require('assert');
var program = require('../../');
var valueFactory = require('../../lib/factory/value.js');

var Literal = require('../../lib/nodes/Literal.js');

describe('Literal nodes', function () {
  beforeEach(function () {
    this.tree = program('var a = 2;');
  });

  describe('#value', function () {
    it('overwrite value', function () {
      var literal = this.tree.var('a').value();
      literal.value('{ a: 2 }');
      assert.equal(this.tree.toString(), 'var a = { a: 2 };');
    });
  });
});
