'use strict';
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var table = require('text-table');
var pathExists = require('path-exists');

/**
 * @mixin
 * @alias actions/help
 */
var help = module.exports;

/**
 * Tries to get the description from a USAGE file one folder above the
 * source root otherwise uses a default description.
 */

help.help = function help() {
  var filepath = path.join(this.sourceRoot(), '../USAGE');
  var exists = pathExists.sync(filepath);
  var out = [
    'Usage:',
    '  ' + this.usage(),
    ''
  ];

  // build options
  if (Object.keys(this._options).length) {
    out = out.concat([
      'Options:',
      this.optionsHelp(),
      ''
    ]);
  }

  // build arguments
  if (this._arguments.length) {
    out = out.concat([
      'Arguments:',
      this.argumentsHelp(),
      ''
    ]);
  }

  // append USAGE file is any
  if (exists) {
    out.push(fs.readFileSync(filepath, 'utf8'));
  }

  return out.join('\n');
};

function formatArg(argItem) {
  var arg = '<' + argItem.name + '>';

  if (!argItem.config.required) {
    arg = '[' + arg + ']';
  }

  return arg;
}

/**
 * Output usage information for this given generator, depending on its arguments,
 * options or hooks.
 */

help.usage = function usage() {
  var options = Object.keys(this._options).length ? '[options]' : '';
  var name = ' ' + this.options.namespace;
  var args = '';

  if (this._arguments.length) {
    args = this._arguments.map(formatArg).join(' ');
  }

  name = name.replace(/^yeoman:/, '');
  var out = 'yo' + name + ' ' + options + ' ' + args;

  if (this.description) {
    out += '\n\n' + this.description;
  }

  return out;
};

/**
 * Simple setter for custom `description` to append on help output.
 *
 * @param {String} description
 */

help.desc = function desc(description) {
  this.description = description || '';
  return this;
};

/**
 * Get help text for arguments
 * @returns {String} Text of options in formatted table
 */
help.argumentsHelp = function argumentsHelp() {
  var rows = this._arguments.map(function (arg) {
    var config = arg.config;

    return [
      '',
      arg.name ? arg.name : '',
      config.desc ? '# ' + config.desc : '',
      config.type ? 'Type: ' + config.type.name : '',
      'Required: ' + config.required
    ];
  });

  return table(rows);
};

/**
 * Get help text for options
 * @returns {String} Text of options in formatted table
 */
help.optionsHelp = function optionsHelp() {
  var options = _.reject(this._options, function (el) {
    return el.hide;
  });

  var hookOpts = this._hooks.map(function (hook) {
    return hook.generator && hook.generator._options;
  }).reduce(function (a, b) {
    a = a.concat(b);
    return a;
  }, []).filter(function (opts) {
    return opts && opts.name !== 'help';
  });

  var rows = options.concat(hookOpts).map(function (opt) {
    var defaults = opt.defaults;

    return [
      '',
      opt.alias ? '-' + opt.alias + ', ' : '',
      '--' + opt.name,
      opt.desc ? '# ' + opt.desc : '',
      defaults == null || defaults === '' ? '' : 'Default: ' + defaults
    ];
  });

  return table(rows);
};
