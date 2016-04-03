'use strict';
var fs = require('fs');
var path = require('path');
var _s = require('underscore.string');
var rimraf = require('rimraf');
var glob = require('glob');
var deprecate = require('../util/deprecate');

/**
 * @mixin
 * @alias actions/remote
 */
var remote = module.exports;

/**
 * Remotely fetch a package from github (or an archive), store this into a _cache
 * folder, and provide a "remote" object as a facade API to ourself (part of
 * generator API, copy, template, directory). It's possible to remove local cache,
 * and force a new remote fetch of the package.
 *
 * ### Examples:
 *
 *     this.remote('user', 'repo', function(err, remote) {
 *       remote.copy('.', 'vendors/user-repo');
 *     });
 *
 *     this.remote('user', 'repo', 'branch', function(err, remote) {
 *       remote.copy('.', 'vendors/user-repo');
 *     });
 *
 *     this.remote('http://foo.com/bar.zip', function(err, remote) {
 *       remote.copy('.', 'vendors/user-repo');
 *     });
 *
 * When fetching from Github
 * @param {String} username
 * @param {String} repo
 * @param {String} branch
 * @param {Function} cb
 * @param {Boolean} refresh
 *
 * @also
 * When fetching an archive
 * @param {String} url
 * @param {Function} cb
 * @param {Boolean} refresh
 */

remote.remote = function () {
  var username;
  var repo;
  var branch;
  var cb;
  var refresh;
  var url;
  var cache;

  if (arguments.length <= 3 && typeof arguments[2] !== 'function') {
    url = arguments[0];
    cb = arguments[1];
    refresh = arguments[2];
    cache = path.join(this.cacheRoot(), _s.slugify(url));
  } else {
    username = arguments[0];
    repo = arguments[1];
    branch = arguments[2];
    cb = arguments[3];
    refresh = arguments[4];

    if (!cb) {
      cb = branch;
      branch = 'master';
    }

    cache = path.join(this.cacheRoot(), username, repo, branch);
    url = 'https://github.com/' + [username, repo, 'archive', branch].join('/') + '.tar.gz';
  }

  var done = function (err) {
    if (err) {
      cb(err);
      return;
    }

    this.remoteDir(cache, cb);
  }.bind(this);

  fs.stat(cache, function (err) {
    // already cached
    if (err) {
      this.extract(url, cache, { strip: 1 }, done);
      return;
    }

    // no refresh, so we can use this cache
    if (!refresh) {
      done();
      return;
    }

    // otherwise, we need to remove it, to fetch it again
    rimraf(cache, function (err) {
      if (err) {
        cb(err);
        return;
      }

      this.extract(url, cache, { strip: 1 }, done);
    }.bind(this));
  }.bind(this));

  return this;
};

/**
 * Retrieve a stored directory and use as a remote reference. This is handy if
 * you have files you want to move that may have been downloaded differently to
 * using `this.remote()` (eg such as `node_modules` installed via `package.json`)
 * @param  {String}   cache
 * @param  {Function} cb
 * @example
 *  ### Examples
 *
 *     this.remoteDir('foo/bar', function(err, remote) {
 *       remote.copy('.', 'vendors/user-repo');
 *     });
 */
remote.remoteDir = function (cache, cb) {
  var self = this;
  var files = glob.sync('**', { cwd: cache, nodir: true, dot: true });

  var remoteFs = {};
  remoteFs.cachePath = cache;

  // simple proxy to `.copy(source, destination)`
  remoteFs.copy = function copy(source, destination) {
    source = path.join(cache, source);
    self.copy(source, destination);
    return this;
  };

  // simple proxy to `.bulkCopy(source, destination)`
  remoteFs.bulkCopy = function copy(source, destination) {
    source = path.join(cache, source);
    self.bulkCopy(source, destination);
    return this;
  };

  // same as `.template(source, destination, data)`
  remoteFs.template = function template(source, destination, data) {
    data = data || self;
    destination = destination || source;
    source = path.join(cache, source);

    var body = self.engine(self.read(source), data);
    self.write(destination, body);
  };

  // same as `.template(source, destination)`
  remoteFs.directory = function directory(source, destination) {
    var root = self.sourceRoot();
    self.sourceRoot(cache);
    self.directory(source, destination);
    self.sourceRoot(root);
  };

  // simple proxy to `.bulkDirectory(source, destination)`
  remoteFs.bulkDirectory = function directory(source, destination) {
    var root = self.sourceRoot();
    self.sourceRoot(cache);
    self.bulkDirectory(source, destination);
    self.sourceRoot(root);
  };

  var deprecatedFileUtils = deprecate.log.bind(null, [
    '#src() and #dest() are deprecated. Please read the documentation to learn about',
    'the new ways of handling files. http://yeoman.io/authoring/file-system.html'
  ].join('\n'));

  Object.defineProperty(remoteFs, 'src', { get: deprecatedFileUtils });
  Object.defineProperty(remoteFs, 'dest', { get: deprecatedFileUtils });

  cb(null, remoteFs, files);
};
