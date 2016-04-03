/**
 * @module yeoman-generator
 */

'use strict';
var Environment = require('yeoman-environment');

/**
 * The generator system is a framework for node to author reusable and
 * composable Generators, for a vast majority of use-case.
 *
 * Inspired and based off the work done on Thor and Rails 3 Generators, we try
 * to provide the same kind of infrastructure.
 *
 * Generators are registered by namespace, where namespaces are mapping the
 * structure of the file system with `:` being simply converted to `/`.
 *
 * Generators are standard node modules, they are simply required as usual, and
 * they can be shipped into reusable npm packages.
 *
 * The lookup is done depending on the configured load path, which is by
 * default `lib/generators` in every generators package installed (ie.
 * `node_modules/yeoman-backbone/lib/generators`)
 *
 * @example
 *    var yeoman = require('yeoman-generators');
 *
 *    var env = yeoman('angular:model')
 *      .run(function(err) {
 *        console.log('done!');
 *      });
 *
 * @alias module:yeoman-generator
 */

var yeoman = module.exports = function createEnv() {
  return Environment.createEnv.apply(Environment, arguments);
};

// hoist up top level class the generator extend
yeoman.Base = require('./lib/base');
yeoman.NamedBase = require('./lib/named-base');

/**
 * Test helpers
 * {@link module:test/helpers}
 */
yeoman.test = require('./lib/test/helpers');

/**
 * Test assertions helpers
 * {@link https://github.com/yeoman/yeoman-assert}
 */
yeoman.assert = require('yeoman-assert');

/**
 * Yeoman base's generators
 * @enum generators
 */
yeoman.generators = {
  /**
   * Base Generator
   * {@link Base}
   */
  Base: yeoman.Base,

  /**
   * Named Base Generator
   * {@link NamedBase}
   */
  NamedBase: yeoman.NamedBase
};
