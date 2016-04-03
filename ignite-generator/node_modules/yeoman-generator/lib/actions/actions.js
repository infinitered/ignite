'use strict';
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var glob = require('glob');
var istextorbinary = require('istextorbinary');
var mkdirp = require('mkdirp');
var readChunk = require('read-chunk');
var xdgBasedir = require('xdg-basedir');

/**
 * @mixin
 * @alias actions/actions
 */
var actions = module.exports;

/**
 * Stores and return the cache root for this class. The cache root is used to
 * `git clone` repositories from github by `.remote()` for example.
 */

actions.cacheRoot = function cacheRoot() {
  return path.join(xdgBasedir.cache, 'yeoman');
};

/**
 * Make some of the file API aware of our source/destination root paths.
 * `copy`, `template` (only when could be applied/required by legacy code),
 * `write` and alike consider.
 *
 * @param {String} source      Source file to copy from. Relative to this.sourceRoot()
 * @param {String} destination Destination file to write to. Relative to this.destinationRoot()
 */

actions.copy = function copy(source, dest) {
  dest = dest || source;
  source = this.templatePath(source);
  var headers = readChunk.sync(source, 0, 512);

  if (istextorbinary.isBinarySync(undefined, headers)) {
    this.fs.copy(source, this.destinationPath(dest));
  } else {
    this.template(source, dest);
  }

  return this;
};

/**
 * Bulk copy
 * https://github.com/yeoman/generator/pull/359
 * https://github.com/yeoman/generator/issues/350
 *
 * A copy method skipping templating and conflict checking. It will allow copying
 * a large amount of files without causing too many recursion errors. You should
 * never use this method, unless there's no other solution.
 *
 * @param {String} source      Source file to copy from. Relative to this.sourceRoot()
 * @param {String} destination Destination file to write to. Relative to this.destinationRoot()
 */

actions.bulkCopy = function bulkCopy(source, dest) {
  source = this.templatePath(source);
  dest = this.destinationPath(dest);
  var body = fs.readFileSync(source);

  mkdirp.sync(path.dirname(dest));
  fs.writeFileSync(dest, body);

  // synchronize stats and modification times from the original file.
  var stats = fs.statSync(source);

  try {
    fs.chmodSync(dest, stats.mode);
    fs.utimesSync(dest, stats.atime, stats.mtime);
  } catch (err) {
    this.log.error('Error setting permissions of "' + chalk.bold(dest) + '" file: ' + err);
  }

  this.log.create(dest);
  return this;
};

/**
 * A simple method to read the content of a file.
 *
 * The encoding is `utf8` by default, to read binary files, pass the proper
 * encoding or null. Non absolute path are prefixed by the source root.
 *
 * @param {String} filepath
 * @param {String} [encoding="utf-8"] Character encoding.
 */

actions.read = function read(filepath, encoding) {
  var contents = this.fs.read(this.templatePath(filepath), { raw: true });
  return contents.toString(encoding || 'utf8');
};

/**
 * Writes a chunk of data to a given `filepath`, checking for collision prior
 * to the file write.
 *
 * @param {String} filepath
 * @param {String} content
 */

actions.write = function write(filepath, content) {
  this.fs.write(this.destinationPath(filepath), content);
  return this;
};

/**
 * Gets a template at the relative source, executes it and makes a copy
 * at the relative destination. If the destination is not given it's assumed
 * to be equal to the source relative to destination.
 *
 * The template engine processing the file is [ejs](http://ejs.co)
 *
 * use options to pass parameters to engine (ejs options)
 *
 * @param {String} source      Source file to read from. Relative to this.sourceRoot()
 * @param {String} destination Destination file to write to. Relative to this.destinationRoot().
 * @param {Object} data        Hash to pass to the template. Leave undefined to use the generator instance context.
 * @param {Object} options
 */

actions.template = function template(source, dest, data, options) {
  if (typeof dest !== 'string') {
    options = data;
    data = dest;
    dest = source;
  }

  this.fs.copyTpl(
    this.templatePath(source),
    this.destinationPath(dest),
    data || this,
    options
  );
  return this;
};

// Shared directory method
actions._directory = function _directory(source, destination, process, bulk) {
  // Only add sourceRoot if the path is not absolute
  var root = this.templatePath(source);
  var files = glob.sync('**', { dot: true, nodir: true, cwd: root });

  destination = destination || source;

  if (typeof destination === 'function') {
    process = destination;
    destination = source;
  }

  var cp = this.copy;

  if (bulk) {
    cp = this.bulkCopy;
  }

  // get the path relative to the template root, and copy to the relative destination
  for (var i in files) {
    var dest = path.join(destination, files[i]);
    cp.call(this, path.join(root, files[i]), dest, process);
  }

  return this;
};

/**
 * Copies recursively the files from source directory to root directory.
 *
 * @param {String} source      Source directory to copy from. Relative to this.sourceRoot()
 * @param {String} destination Directory to copy the source files into. Relative to this.destinationRoot().
 * @param {Function} process Receive in order: the body, the source path, the destination
 *                           path and a list of options containing the encoding. It should
 *                           return the new body.
 */

actions.directory = function directory(source, destination, process) {
  return this._directory(source, destination, process);
};

/**
 * Copies recursively the files from source directory to root directory.
 *
 * A copy method skiping templating and conflict checking. It will allow copying
 * a large amount of files without causing too much recursion errors. You should
 * never use this method, unless there's no other solution.
 *
 * @param {String} source      Source directory to copy from. Relative to this.sourceRoot()
 * @param {String} destination Directory to copy the source files into.Relative to this.destinationRoot().
 * @param {Function} process
 */

actions.bulkDirectory = function directory(source, destination, process) {
  // Join the source here because the conflicter will not run
  // until next tick, which resets the source root on remote
  // bulkCopy operations
  source = path.join(this.sourceRoot(), source);

  this.conflicter.checkForCollision(destination, null, function (err, status) {
    // create or force means file write, identical or skip prevent the
    // actual write.
    if (/force|create/.test(status)) {
      this._directory(source, destination, process, true);
    }
  }.bind(this));

  return this;
};
