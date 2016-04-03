'use strict';
var assert = require('assert');
var _ = require('lodash');
var dargs = require('dargs');
var async = require('async');
var chalk = require('chalk');

/**
 * @mixin
 * @alias actions/install
 */
var install = module.exports;

/**
 * Combine package manager cmd line arguments and run the `install` command.
 *
 * During the `install` step, every command will be scheduled to run once, on the run loop. (So don't combine the callback with `this.async()`)
 *
 * @param {String} installer Which package manager to use
 * @param {String|Array} [paths] Packages to install.Use an empty string for `npm install`
 * @param {Object} [options] Options to pass to `dargs` as arguments, then to `child_process.spawn`
 * @param {Function} [cb]
 */

install.runInstall = function (installer, paths, options, cb) {
  if (!cb && _.isFunction(options)) {
    cb = options;
    options = {};
  }

  options = options || {};
  cb = cb || function () {};
  paths = Array.isArray(paths) ? paths : (paths && paths.split(' ') || []);

  var args = ['install'].concat(paths).concat(dargs(options));

  // Return early if we're skipping installation.
  if (this.options.skipInstall) {
    cb();
    return this;
  }

  this.env.runLoop.add('install', function (done) {
    this.emit(installer + 'Install', paths);
    this.spawnCommand(installer, args, options)
      .on('error', cb)
      .on('exit', function (err) {
        if (err === 127) {
          this.log.error(
            'Could not find ' + installer + '. Please install with ' +
            '`npm install -g ' + installer + '`.'
          );
        }

        this.emit(installer + 'Install:end', paths);
        cb(err);
        done();
      }.bind(this));
  }.bind(this), { once: installer + ' ' + args.join(' '), run: false });

  return this;
};

/**
 * Runs `npm` and `bower`, in sequence, in the generated directory and prints a
 * message to let the user know.
 *
 * @example
 * this.installDependencies({
 *   bower: true,
 *   npm: true,
 *   callback: function () {
 *     console.log('Everything is ready!');
 *   }
 * });
 *
 * @param {Object} [options]
 * @param {Boolean} [options.npm=true] - whether to run `npm install`
 * @param {Boolean} [options.bower=true] - whether to run `bower install`
 * @param {Boolean} [options.skipMessage=false] - whether to log the used commands
 * @param {Function} [options.callback] - call once all commands have run
 */

install.installDependencies = function (options) {
  var commands = [];
  var msg = {
    commands: [],
    template: _.template('\n\nI\'m all done. ' +
    '<%= skipInstall ? "Just run" : "Running" %> <%= commands %> ' +
    '<%= skipInstall ? "" : "for you " %>to install the required dependencies.' +
    '<% if (!skipInstall) { %> If this fails, try running the command yourself.<% } %>\n\n')
  };

  if (_.isFunction(options)) {
    options = {
      callback: options
    };
  }

  options = _.defaults(options || {}, {
    bower: true,
    npm: true,
    skipMessage: false,
    callback: function () {}
  });

  if (options.npm) {
    msg.commands.push('npm install');
    commands.push(function (cb) {
      this.npmInstall(null, null, cb);
    }.bind(this));
  }

  if (options.bower) {
    msg.commands.push('bower install');
    commands.push(function (cb) {
      this.bowerInstall(null, null, cb);
    }.bind(this));
  }

  assert(msg.commands.length, 'installDependencies needs at least one of `npm` or `bower` to run.');

  if (!options.skipMessage) {
    var tplValues = _.extend({
      skipInstall: false
    }, this.options, {
      commands: chalk.yellow.bold(msg.commands.join(' & '))
    });
    this.log(msg.template(tplValues));
  }

  async.parallel(commands, options.callback);
};

/**
 * Receives a list of `components` and an `options` object to install through bower.
 *
 * The installation will automatically run during the run loop `install` phase.
 *
 * @param {String|Array} [cmpnt] Components to install
 * @param {Object} [options] Options to pass to `child_process.spawn` when invoking bower.
 * @param {Function} [cb]
 */

install.bowerInstall = function install(cmpnt, options, cb) {
  return this.runInstall('bower', cmpnt, options, cb);
};

/**
 * Receives a list of `packages` and an `options` object to install through npm.
 *
 * The installation will automatically run during the run loop `install` phase.
 *
 * @param {String|Array} [pkgs] Packages to install
 * @param {Object} [options] Options to pass to `child_process.spawn` when invoking npm.
 * @param {Function} [cb]
 */

install.npmInstall = function install(pkgs, options, cb) {
  return this.runInstall('npm', pkgs, options, cb);
};
