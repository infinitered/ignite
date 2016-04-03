/**
 * Collection of test assertions helpers
 *
 * It mixes in the native node.js `assert` module. So you can just use this module as a
 * drop-in replacement.
 *
 * @mixes nodejs/assert
 * @example
 *   var assert = require('yeoman-assert');
 */
'use strict';

var fs = require('fs');
var _ = require('lodash');
var pathExists = require('path-exists');

function extractMethods(methods) {
  return _.isArray(methods) ? methods : Object.keys(methods).filter(function (method) {
    return _.isFunction(methods[method]);
  });
}

// Extend the native assert module
var assert = module.exports = require('assert');

/**
 * Assert that a file exists
 * @param  {String}       path     - path to a file
 * @example
 * assert.file('templates/user.hbs');
 *
 * @also
 *
 * Assert that each files in the array exists
 * @param {Array}         paths    - an array of paths to files
 * @example
 * assert.file(['templates/user.hbs', 'templates/user/edit.hbs']);
 */

assert.file = function () {
  var args = _.toArray(arguments);
  args = _.isString(args[0]) ? args : args[0];

  args.forEach(function (file) {
    var here = pathExists.sync(file);
    assert.ok(here, file + ', no such file or directory');
  });
};

/**
 * Assert that a file doesn't exist
 * @param  {String}       file     - path to a file
 * @example
 * assert.noFile('templates/user.hbs');
 *
 * @also
 *
 * Assert that each of an array of files doesn't exist
 * @param {Array}         pairs    - an array of paths to files
 * @example
 * assert.noFile(['templates/user.hbs', 'templates/user/edit.hbs']);
 */

assert.noFile = function () {
  var args = _.toArray(arguments);
  args = _.isString(args[0]) ? args : args[0];

  args.forEach(function (file) {
    var here = pathExists.sync(file);
    assert.ok(!here, file + ' exists');
  });
};

/**
 * Assert that a file's content matches a regex or string
 * @param  {String}       file     - path to a file
 * @param  {Regex|String} reg      - regex / string that will be used to search the file
 * @example
 * assert.fileContent('models/user.js', /App\.User = DS\.Model\.extend/);
 * assert.fileContent('models/user.js', 'App.User = DS.Model.extend');
 *
 * @also
 *
 * Assert that each file in an array of file-regex pairs matches its corresponding regex
 * @param {Array}         pairs    - an array of arrays, where each subarray is a [String, RegExp] pair
 * @example
 * var arg = [
 *   [ 'models/user.js', /App\.User = DS\.Model\.extend/ ],
 *   [ 'controllers/user.js', /App\.UserController = Ember\.ObjectController\.extend/ ]
 * ]
 * assert.fileContent(arg);
 */

assert.fileContent = function () {
  var args = _.toArray(arguments);
  var pairs = _.isString(args[0]) ? [args] : args[0];

  pairs.forEach(function (pair) {
    var file = pair[0];
    var regex = pair[1];
    assert.file(file);
    var body = fs.readFileSync(file, 'utf8');

    var match = false;
    if (typeof regex === 'string') {
      match = body.indexOf(regex) > -1;
    } else {
      match = regex.test(body);
    }

    assert(match, file + ' did not match \'' + regex + '\'. Contained:\n\n' + body);
  });
};

/**
 * Assert that a file's content does not match a regex / string
 * @param  {String}       file     - path to a file
 * @param  {Regex|String} reg      - regex / string that will be used to search the file
 * @example
 * assert.noFileContent('models/user.js', /App\.User = DS\.Model\.extend/);
 * assert.noFileContent('models/user.js', 'App.User = DS.Model.extend');
 *
 * @also
 *
 * Assert that each file in an array of file-regex pairs does not match its corresponding regex
 * @param {Array}         pairs    - an array of arrays, where each subarray is a [String, RegExp] pair
 * var arg = [
 *   [ 'models/user.js', /App\.User \ DS\.Model\.extend/ ],
 *   [ 'controllers/user.js', /App\.UserController = Ember\.ObjectController\.extend/ ]
 * ]
 * assert.noFileContent(arg);
 */

assert.noFileContent = function () {
  var args = _.toArray(arguments);
  var pairs = _.isString(args[0]) ? [args] : args[0];

  pairs.forEach(function (pair) {
    var file = pair[0];
    var regex = pair[1];
    assert.file(file);
    var body = fs.readFileSync(file, 'utf8');

    if (typeof regex === 'string') {
      assert.ok(body.indexOf(regex) === -1, file + ' matched \'' + regex + '\'.');
      return;
    }

    assert.ok(!regex.test(body), file + ' matched \'' + regex + '\'.');
  });
};

/**
 * Assert that two strings are equal after standardization of newlines
 * @param {String} value - a string
 * @param {String} expected - the expected value of the string
 * @example
 * assert.textEqual('I have a yellow cat', 'I have a yellow cat');
 */

assert.textEqual = function (value, expected) {
  function eol(str) {
    return str.replace(/\r\n/g, '\n');
  }

  assert.equal(eol(value), eol(expected));
};

/**
 * Assert an Object implements an interface
 * @param  {Object}       subject - subject implementing the façade
 * @param  {Object|Array} methods - a façace, hash or array of keys to be implemented
 */

assert.implement = function (subject, methods) {
  methods = extractMethods(methods);

  var pass = methods.filter(function (method) {
    return !_.isFunction(subject[method]);
  });

  assert.ok(pass.length === 0, 'expected object to implement methods named: ' + pass.join(', '));
};

/**
 * Assert an Object doesn't implements any method of an interface
 * @param  {Object}       subject - subject not implementing the methods
 * @param  {Object|Array} methods - hash or array of method names to be implemented
 */

assert.notImplement = function (subject, methods) {
  methods = extractMethods(methods);

  var pass = methods.filter(function (method) {
    return _.isFunction(subject[method]);
  });

  assert.ok(pass.length === 0, 'expected object to not implement any methods named: ' + pass.join(', '));
};

/**
 * Assert an object contains the provided keys
 * @param {Object} obj Object that should match the given pattern
 * @param {Object} content An object of key/values the object should contains
 */

assert.objectContent = function (obj, content) {
  Object.keys(content).forEach(function (key) {
    if (typeof content[key] === 'object') {
      assert.objectContent(obj[key], content[key]);
      return;
    }

    assert.equal(content[key], obj[key]);
  });
};

/**
 * Assert a JSON file contains the provided keys
 * @param {String} filename
 * @param {Object} content An object of key/values the file should contains
 */

assert.JSONFileContent = assert.jsonFileContent = function (filename, content) {
  var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
  assert.objectContent(obj, content);
};
