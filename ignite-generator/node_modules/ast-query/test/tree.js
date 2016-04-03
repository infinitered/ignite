var assert = require('assert');
var program = require('..');
var Body = require('../lib/nodes/Body');

describe('Tree', function () {
  describe('#toString()', function () {
    it('return the generated source code', function () {
      var tree = program('var a = 1');
      assert.equal(tree.toString(), 'var a = 1;');
    });
  });

  describe('#toString() - with comments', function () {
    it('return the generated source code', function () {
      var tree = program('/* comment */var a = 1');
      assert.equal(tree.toString().replace(/[\r\n\t\s]+/gm, ''), '/*comment*/vara=1;');

      tree = program('var a = {\n/* comment */a:1};');
      assert.equal(tree.toString().replace(/[\r\n\t\s]+/gm, ''), 'vara={/*comment*/a:1};');
    });
  });

  describe('#body', function () {
    it('is a Body node instance', function () {
      var tree = program('var a = 1');
      assert(tree.body instanceof Body);
    });
  });

  describe('created with default escodegen options', function () {
    it('return the generated source code', function () {
      var tree = program('(function () {\n\tconsole.log("foo");\n\tconsole.log("bar");\n})();');
      assert.equal(tree.toString().charAt(15), ' ');
    });
  });

  describe('created with tab formatting escodegen option', function () {
    it('return the generated source code', function () {
      var tree = program('(function () {\n  console.log("foo");\n  console.log("bar");\n})();', {
        format: {
          indent: {
            style: '\t'
          }
        }
      });
      assert.equal(tree.toString().charAt(15), '\t');
    });
  });

  describe('created with default esprima options', function () {
    it('parses the source code as a script', function () {
      assert.doesNotThrow(function () {
        program('var a = 1;');
      }, Error);
    });
    it('does not parse the source code as a module', function () {
      assert.throws(function() {
        program('var a = 1;\nexport default a;');
      }, Error);
    });
  });

  describe('created with es2015 module esprima options', function () {
    it('does not parse the module source code when the sourceType configuration is missing', function () {
      assert.throws(function() {
        program('var a = 1;\nexport default a;');
      }, Error);
    });

    it('parses the source code as a module when the sourceType configuration is present', function () {
      assert.doesNotThrow(function () {
        program('var a = 1;\nexport default a;', {}, { sourceType: 'module'});
      });
    });
  });
});
