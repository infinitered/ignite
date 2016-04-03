/**
 * Collection of unit test helpers. (mostly related to Mocha syntax)
 * @module test/helpers
 */

'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-environment');
var assert = require('yeoman-assert');
var generators = require('../..');
var RunContext = require('../test/run-context');
var adapter = require('../test/adapter');

/**
 * Create a function that will clean up the test directory,
 * cd into it, and create a dummy gruntfile inside. Intended for use
 * as a callback for the mocha `before` hook.
 *
 * @param {String} dir - path to the test directory
 * @returns {Function} mocha callback
 */

exports.setUpTestDirectory = function before(dir) {
  return function (done) {
    exports.testDirectory(dir, function () {
      exports.gruntfile({ dummy: true }, done);
    });
  };
};

/**
 *
 * Generates a new Gruntfile.js in the current working directory based on
 * options hash passed in.
 *
 * @param {Object} options - Grunt configuration
 * @param {Function} done  - callback to call on completion
 * @example
 * before(helpers.gruntfile({
 *   foo: {
 *     bar: '<config.baz>'
 *   }
 * }));
 *
 */

exports.gruntfile = function (options, done) {
  var config = 'grunt.initConfig(' + JSON.stringify(options, null, 2) + ');';

  config = config.split('\n').map(function (line) {
    return '  ' + line;
  }).join('\n');

  var out = [
    'module.exports = function (grunt) {',
    config,
    '};'
  ];

  fs.writeFile('Gruntfile.js', out.join('\n'), done);
};

/**
 * Clean-up the test directory and cd into it.
 * Call given callback after entering the test directory.
 * @param {String} dir - path to the test directory
 * @param {Function} cb - callback executed after setting working directory to dir
 * @example
 * testDirectory(path.join(__dirname, './temp'), function () {
 *   fs.writeFileSync('testfile', 'Roses are red.');
 * );
 */

exports.testDirectory = function (dir, cb) {
  if (!dir) {
    throw new Error('Missing directory');
  }

  dir = path.resolve(dir);

  // Make sure we're not deleting CWD by moving to top level folder. As we `cd` in the
  // test dir after cleaning up, this shouldn't be perceivable.
  process.chdir('/');

  rimraf(dir, function (err) {
    if (err) {
      return cb(err);
    }

    mkdirp.sync(dir);
    process.chdir(dir);
    cb();
  });
};

/**
 * Answer prompt questions for the passed-in generator
 * @param {Generator} generator - a Yeoman generator
 * @param {Object} answers - an object where keys are the
 *   generators prompt names and values are the answers to
 *   the prompt questions
 * @example
 * mockPrompt(angular, {'bootstrap': 'Y', 'compassBoostrap': 'Y'});
 */

exports.mockPrompt = function (generator, answers) {
  var promptModule = generator.env.adapter.prompt;
  answers = answers || {};
  var DummyPrompt = adapter.DummyPrompt;

  Object.keys(promptModule.prompts).forEach(function (name) {
    promptModule.registerPrompt(name, DummyPrompt.bind(DummyPrompt, answers));
  });
};

/**
 * Restore defaults prompts on a generator.
 * @param {Generator} generator
 */
exports.restorePrompt = function (generator) {
  generator.env.adapter.prompt.restoreDefaultPrompts();
};

/**
 * Provide mocked values to the config
 * @param  {Generator} generator - a Yeoman generator
 * @param  {Ojbect} localConfig - localConfig - should look just like if called config.getAll()
 */
exports.mockLocalConfig = function (generator, localConfig) {
  generator.config.defaults(localConfig);
};

/**
 * Create a simple, dummy generator
 */

exports.createDummyGenerator = function () {
  return generators.Base.extend({
    test: function () {
      this.shouldRun = true;
    }
  });
};

/**
 * Create a generator, using the given dependencies and controller arguments
 * Dependecies can be path (autodiscovery) or an array [<generator>, <name>]
 *
 * @param {String} name - the name of the generator
 * @param {Array} dependencies - paths to the generators dependencies
 * @param {Array|String} args - arguments to the generator;
 *   if String, will be split on spaces to create an Array
 * @param {Object} options - configuration for the generator
 * @example
 *  var deps = ['../../app',
 *              '../../common',
 *              '../../controller',
 *              '../../main',
 *              [createDummyGenerator(), 'testacular:app']
 *            ];
 * var angular = createGenerator('angular:app', deps);
 */

exports.createGenerator = function (name, dependencies, args, options) {
  var env = yeoman.createEnv();
  this.registerDependencies(env, dependencies);

  return env.create(name, { arguments: args, options: options });
};

/**
 * Register a list of dependent generators into the provided env.
 * Dependecies can be path (autodiscovery) or an array [<generator>, <name>]
 *
 * @param {Array} dependencies - paths to the generators dependencies
 */

exports.registerDependencies = function (env, dependencies) {
  dependencies.forEach(function (dependency) {
    if (_.isArray(dependency)) {
      env.registerStub.apply(env, dependency);
    } else {
      env.register(dependency);
    }
  });
};

/**
 * Run the provided Generator
 * @param  {String|Function} Generator - Generator constructor or namespace
 * @return {RunContext}
 */

exports.run = function (Generator, settings) {
  return new RunContext(Generator, settings);
};
