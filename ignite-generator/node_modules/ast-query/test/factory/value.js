var assert = require('assert');
var valueFactory = require('../../lib/factory/value.js');

describe('valueFactory', function () {
  it('generates a value AST (string)', function () {
    var value = valueFactory.create('"a"');
    assert.equal(value.type, 'Literal');
    assert.equal(value.value, 'a');
  });
});
