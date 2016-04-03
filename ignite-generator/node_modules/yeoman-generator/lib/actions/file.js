'use strict';
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var mkdirp = require('mkdirp');
var deprecate = require('../util/deprecate');

/**
 * @mixin
 * @alias actions/file
 */
var file = module.exports;

/**
 * Performs a glob search with the provided pattern and optional Hash of
 * options. Options can be any option supported by
 * [glob](https://github.com/isaacs/node-glob#options)
 *
 * @deprecated
 * @param {String} pattern
 * @param {Object} options
 */

file.expand = deprecate(
  '#expand() is deprecated. Use the glob module.',
  function (pattern, options) {
    return glob.sync(pattern, options);
  }
);

/**
 * Performs a glob search with the provided pattern and optional Hash of
 * options, filtering results to only return files (not directories). Options
 * can be any option supported by
 * [glob](https://github.com/isaacs/node-glob#options)
 *
 * @deprecated
 * @param {String} pattern
 * @param {Object} options
 */

file.expandFiles = deprecate(
  '#expandFiles() is deprecated. Use the glob module.',
  function (pattern, options) {
    options = options || {};
    var cwd = options.cwd || process.cwd();

    return this.expand(pattern, options).filter(function (filepath) {
      return fs.statSync(path.join(cwd, filepath)).isFile();
    });
  }
);

/**
 * Checks a given file path being absolute or not.
 * Borrowed from grunt's file API.
 * @deprecated
 */

file.isPathAbsolute = deprecate(
  '#isPathAbsolute() is deprecated.',
  function () {
    var filepath = path.join.apply(path, arguments);
    return path.resolve(filepath) === filepath;
  }
);

/** @deprecated */
file.mkdir = deprecate(
  '#mkdir() is deprecated. Use mkdirp module instead. https://www.npmjs.com/package/mkdirp',
  mkdirp.sync.bind(mkdirp)
);
