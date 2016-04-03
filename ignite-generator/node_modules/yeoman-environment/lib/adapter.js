'use strict';

var inquirer = require('inquirer');
var diff = require('diff');
var chalk = require('chalk');
var logger = require('./util/log');

/**
 * `TerminalAdapter` is the default implementation of `Adapter`, an abstraction
 * layer that defines the I/O interactions.
 *
 * It provides a CLI interaction
 *
 * @constructor
 */
var TerminalAdapter = module.exports = function TerminalAdapter() {
  this.prompt = inquirer.createPromptModule();
};

TerminalAdapter.prototype._colorDiffAdded = chalk.black.bgGreen;
TerminalAdapter.prototype._colorDiffRemoved = chalk.bgRed;
TerminalAdapter.prototype._colorLines = function colorLines(name, str) {
  return str.split('\n').map(function (str) {
    return this['_colorDiff' + name](str);
  }, this).join('\n');
};

/**
 * Prompt a user for one or more questions and pass
 * the answer(s) to the provided callback.
 *
 * It shares its interface with `Base.prompt`
 *
 * (Defined inside the constructor to keep interfaces separated between
 * instances)
 *
 * @param {Array} questions
 * @param {Function} callback
 */
TerminalAdapter.prototype.prompt = function () {};

/**
 * Shows a color-based diff of two strings
 *
 * @param {string} actual
 * @param {string} expected
 */
TerminalAdapter.prototype.diff = function _diff(actual, expected) {
  var msg = diff.diffLines(actual, expected).map(function (str) {
    if (str.added) {
      return this._colorLines('Added', str.value);
    }

    if (str.removed) {
      return this._colorLines('Removed', str.value);
    }

    return str.value;
  }, this).join('');

  // legend
  msg = '\n' +
    this._colorDiffRemoved('removed') +
    ' ' +
    this._colorDiffAdded('added') +
    '\n\n' +
    msg +
    '\n';

  console.log(msg);
  return msg;
};

/**
 * Logging utility
 * @type {env/log}
 */
TerminalAdapter.prototype.log = logger();
