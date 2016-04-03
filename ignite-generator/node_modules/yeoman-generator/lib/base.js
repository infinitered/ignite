'use strict';
var util = require('util');
var path = require('path');
var events = require('events');
var assert = require('assert');
var _ = require('lodash');
var _s = require('underscore.string');
var async = require('async');
var findUp = require('find-up');
var readPkgUp = require('read-pkg-up');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var nopt = require('nopt');
var through = require('through2');
var userHome = require('user-home');
var GruntfileEditor = require('gruntfile-editor');
var FileEditor = require('mem-fs-editor');
var wiring = require('html-wiring');
var pathIsAbsolute = require('path-is-absolute');
var pathExists = require('path-exists');
var Conflicter = require('./util/conflicter');
var Storage = require('./util/storage');
var deprecate = require('./util/deprecate');
var promptSuggestion = require('./util/prompt-suggestion');
var debug = require('debug')('yeoman:generator');

/**
 * The `Base` class provides the common API shared by all generators.
 * It define options, arguments, hooks, file, prompt, log, API, etc.
 *
 * It mixes into its prototype all the methods found in the `actions/` mixins.
 *
 * Every generator should extend this base class.
 *
 * @constructor
 * @mixes actions/actions
 * @mixes actions/fetch
 * @mixes actions/file
 * @mixes actions/install
 * @mixes actions/invoke
 * @mixes actions/spawn_command
 * @mixes actions/string
 * @mixes actions/remote
 * @mixes actions/user
 * @mixes actions/help
 * @mixes nodejs/EventEmitter
 *
 * @param {String|Array} args
 * @param {Object} options
 *
 * @property {Object}   env         - the current Environment being run
 * @property {Object}   args        - Provide arguments at initialization
 * @property {String}   resolved    - the path to the current generator
 * @property {String}   description - Used in `--help` output
 * @property {String}   appname     - The application name
 * @property {Storage}  config      - `.yo-rc` config file manager
 * @property {Object}   fs          - An instance of {@link https://github.com/SBoudrias/mem-fs-editor Mem-fs-editor}
 * @property {Function} log         - Output content through Interface Adapter
 *
 * @example
 * var generator = require('yeoman-generator');
 * var MyGenerator = generator.Base.extend({
 *   writing: function() {
 *     this.fs.write('var foo = 1;', this.destinationPath('index.js'));
 *   }
 * });
 */

var Base = module.exports = function Base(args, options) {
  events.EventEmitter.call(this);

  if (!Array.isArray(args)) {
    options = args;
    args = [];
  }

  this.options = options || {};
  this._args = args || [];
  this._options = {};
  this._arguments = [];
  this._hooks = [];
  this._composedWith = [];
  this._transformStreams = [];

  this.option('help', {
    alias: 'h',
    desc: 'Print the generator\'s options and usage'
  });

  this.option('skip-cache', {
    type: Boolean,
    desc: 'Do not remember prompt answers',
    defaults: false
  });

  this.option('skip-install', {
    type: Boolean,
    desc: 'Do not automatically install dependencies',
    defaults: false
  });

  // checks required paramaters
  assert(this.options.env, 'You must provide the environment object. Use env#create() to create a new generator.');
  assert(this.options.resolved, 'You must provide the resolved path value. Use env#create() to create a new generator.');
  this.env = this.options.env;
  this.resolved = this.options.resolved;

  // Ensure the environment support features this yeoman-generator version require.
  require('yeoman-environment').enforceUpdate(this.env);

  this.description = this.description || '';

  this.async = function () {
    return function () {};
  };

  this.conflicter = new Conflicter(this.env.adapter, this.options.force);

  // Mirror the adapter log method on the generator.
  //
  // example:
  // this.log('foo');
  // this.log.error('bar');
  this.log = this.env.adapter.log;

  // determine the app root
  var rootPath = findUp.sync('.yo-rc.json');
  rootPath = rootPath ? path.dirname(rootPath) : process.cwd();

  if (rootPath !== process.cwd()) {
    this.log([
      '',
      'Just found a `.yo-rc.json` in a parent directory.',
      'Setting the project root at: ' + rootPath
    ].join('\n'));
    process.chdir(rootPath);
  }

  var deprecatedFileUtils = deprecate.log.bind(null, [
    '#src() and #dest() are deprecated. Please read the documentation to learn about',
    'the new ways of handling files. http://yeoman.io/authoring/file-system.html'
  ].join('\n'));

  Object.defineProperty(this, 'src', { get: deprecatedFileUtils });
  Object.defineProperty(this, 'dest', { get: deprecatedFileUtils });
  Object.defineProperty(this, '_', {
    get: deprecate.log.bind(null, [
      '#_ is deprecated. Require your own version of', chalk.cyan('Lodash'), 'or', chalk.cyan('underscore.string')
    ].join(' '))
  });

  this.fs = FileEditor.create(this.env.sharedFs);
  this.appname = this.determineAppname();
  this.config = this._getStorage();
  this._globalConfig = this._getGlobalStorage();

  // ensure source/destination path, can be configured from subclasses
  this.sourceRoot(path.join(path.dirname(this.resolved), 'templates'));

  // Only instantiate the Gruntfile API when requested
  Object.defineProperty(this, 'gruntfile', {
    get: function () {
      if (!this.env.gruntfile) {
        var gruntfile = '';
        var gruntPath = this.destinationPath('Gruntfile.js');

        if (this.fs.exists(gruntPath)) {
          gruntfile = this.fs.read(gruntPath);
        }

        this.env.gruntfile = new GruntfileEditor(gruntfile);
      }

      // Schedule the creation/update of the Gruntfile
      this.env.runLoop.add('writing', function (done) {
        this.fs.write(
          this.destinationPath('Gruntfile.js'),
          this.env.gruntfile.toString()
        );
        done();
      }.bind(this), { once: 'gruntfile:write' });

      return this.env.gruntfile;
    }
  });
};

util.inherits(Base, events.EventEmitter);

// Mixin the actions modules
_.extend(Base.prototype, require('./actions/actions'));
_.extend(Base.prototype, require('./actions/fetch'));
_.extend(Base.prototype, require('./actions/file'));
_.extend(Base.prototype, require('./actions/install'));
_.extend(Base.prototype, require('./actions/remote'));
_.extend(Base.prototype, deprecate.object('this.<%= name %>() is deprecated. Use require("html-wiring").<%= name %>() instead.', wiring));
_.extend(Base.prototype, require('./actions/help'));
_.extend(Base.prototype, require('./actions/spawn_command'));

Base.prototype.user = require('./actions/user');
Base.prototype.invoke = deprecate(
  'generator#invoke() is deprecated. Use generator#composeWith() - see http://yeoman.io/authoring/composability.html',
  require('./actions/invoke')
);

// TODO: Remove before 1.0.0
// DEPRECATED: Use the module directly
Base.prototype.welcome = deprecate(
  'Generator#welcome() is deprecated. Instead, `require("yeoman-welcome")` directly.',
  function () { console.log(require('yeoman-welcome')); }
);

/**
 * Prompt user to answer questions. The signature of this method is the same as {@link https://github.com/SBoudrias/Inquirer.js Inquirer.js}
 *
 * On top of the Inquirer.js API, you can provide a `{cache: true}` property for
 * every question descriptor. When set to true, Yeoman will store/fetch the
 * user's answers as defaults.
 *
 * @param  {array} questions  Array of question descriptor objects. See {@link https://github.com/SBoudrias/Inquirer.js/blob/master/README.md Documentation}
 * @param  {Function} callback  Receive a question object
 * @return {this}
 */

Base.prototype.prompt = function (questions, callback) {
  questions = promptSuggestion.prefillQuestions(this._globalConfig, questions);

  this.env.adapter.prompt(questions, function (answers) {
    if (!this.options['skip-cache']) {
      promptSuggestion.storeAnswers(this._globalConfig, questions, answers);
    }

    if (_.isFunction(callback)) {
      callback(answers);
    }
  }.bind(this));

  return this;
};

/**
 * Adds an option to the set of generator expected options, only used to
 * generate generator usage. By default, generators get all the cli options
 * parsed by nopt as a `this.options` hash object.
 *
 * ### Options:
 *
 *   - `desc` Description for the option
 *   - `type` Either Boolean, String or Number
 *   - `defaults` Default value
 *   - `hide` Boolean whether to hide from help
 *
 * @param {String} name
 * @param {Object} config
 */

Base.prototype.option = function option(name, config) {
  config = config || {};
  _.defaults(config, {
    name: name,
    desc: 'Description for ' + name,
    type: Boolean,
    defaults: undefined,
    hide: false
  });

  if (this._options[name] == null) {
    this._options[name] = config;
  }

  if (this.options[name] == null) {
    this.options[name] = config.defaults;
  }

  this.parseOptions();
  return this;
};

/**
 * Adds an argument to the class and creates an attribute getter for it.
 *
 * Arguments are different from options in several aspects. The first one
 * is how they are parsed from the command line, arguments are retrieved
 * based on their position.
 *
 * Besides, arguments are used inside your code as a property (`this.argument`),
 * while options are all kept in a hash (`this.options`).
 *
 * ### Options:
 *
 *   - `desc` Description for the argument
 *   - `required` Boolean whether it is required
 *   - `optional` Boolean whether it is optional
 *   - `type` String, Number, Array, or Object
 *   - `defaults` Default value for this argument
 *
 * @param {String} name
 * @param {Object} config
 */

Base.prototype.argument = function argument(name, config) {
  config = config || {};
  _.defaults(config, {
    name: name,
    required: config.defaults == null,
    type: String
  });

  var position = this._arguments.length;
  this._arguments.push({
    name: name,
    config: config
  });

  Object.defineProperty(this, name, {
    configurable: true,
    enumerable: true,
    get: function () {
      // a bit of coercion and type handling, to be improved
      // just dealing with Array/String, default is assumed to be String
      var value = config.type === Array ? this.args.slice(position) : this.args[position];
      return position >= this.args.length ? config.defaults : value;
    },
    set: function (value) {
      this.args[position] = value;
    }
  });

  this.checkRequiredArgs();
  return this;
};

Base.prototype.parseOptions = function () {
  var opts = {};
  var shortOpts = {};

  _.each(this._options, function (option) {
    opts[option.name] = option.type;

    if (option.alias) {
      shortOpts[option.alias] = '--' + option.name;
    }
  });

  opts = nopt(opts, shortOpts, this._args, 0);
  _.extend(this.options, opts);

  this.args = this.arguments = opts.argv.remain;
  this.checkRequiredArgs();
};

Base.prototype.checkRequiredArgs = function () {
  // If the help option was provided, we don't want to check for required
  // arguments, since we're only going to print the help message anyway.
  if (this.options.help) {
    return;
  }

  // Bail early if it's not possible to have a missing required arg
  if (this.args.length > this._arguments.length) {
    return;
  }

  this._arguments.forEach(function (arg, position) {
    // If the help option was not provided, check whether the argument was
    // required, and whether a value was provided.
    if (arg.config.required && position >= this.args.length) {
      return this.emit('error', new Error('Did not provide required argument ' + chalk.bold(arg.name) + '!'));
    }
  }, this);
};

/**
 * Runs the generator, scheduling prototype methods on a run queue. Method names
 * will determine the order each method is run. Methods without special names
 * will run in the default queue.
 *
 * Any method named `constructor` and any methods prefixed by a `_` won't be scheduled.
 *
 * You can also supply the arguments for the method to be invoked. If none are
 * provided, the same values used to initialize the invoker are used to
 * initialize the invoked.
 *
 * @param {Function} [cb]
 */

Base.prototype.run = function run(cb) {
  cb = cb || function () {};

  var self = this;
  this._running = true;
  this.emit('run');

  var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
  var validMethods = methods.filter(methodIsValid);
  assert(validMethods.length, 'This Generator is empty. Add at least one method for it to run.');

  this.env.runLoop.once('end', function () {
    this.emit('end');
    cb();
  }.bind(this));

  // Ensure a prototype method is a candidate run by default
  function methodIsValid(name) {
    return name.charAt(0) !== '_' && name !== 'constructor';
  }

  function addMethod(method, methodName, queueName) {
    queueName = queueName || 'default';
    debug('Queueing ' + methodName + ' in ' + queueName);
    self.env.runLoop.add(queueName, function (completed) {
      debug('Running ' + methodName);
      var done = function (err) {
        if (err) {
          self.emit('error', err);
        }

        completed();
      };

      var running = false;
      self.async = function () {
        running = true;
        return done;
      };

      self.emit('method:' + methodName);

      try {
        method.apply(self, self.args);

        if (!running) {
          done();
          return;
        }
      } catch (err) {
        debug('An error occured while running ' + methodName, err);
        self.emit('error', err);
      }
    });
  }

  function addInQueue(name) {
    var item = Object.getPrototypeOf(self)[name];
    var queueName = self.env.runLoop.queueNames.indexOf(name) !== -1 ? name : null;

    // Name points to a function; run it!
    if (_.isFunction(item)) {
      return addMethod(item, name, queueName);
    }

    // Not a queue hash; stop
    if (!queueName) {
      return;
    }

    // Run each queue items
    _.each(item, function (method, methodName) {
      if (!_.isFunction(method) || !methodIsValid(methodName)) {
        return;
      }

      addMethod(method, methodName, queueName);
    });
  }

  validMethods.forEach(addInQueue);

  var writeFiles = function () {
    this.env.runLoop.add('conflicts', this._writeFiles.bind(this), {
      once: 'write memory fs to disk'
    });
  }.bind(this);

  this.env.sharedFs.on('change', writeFiles);
  writeFiles();

  // Add the default conflicts handling
  this.env.runLoop.add('conflicts', function (done) {
    this.conflicter.resolve(function (err) {
      if (err) {
        this.emit('error', err);
      }

      done();
    }.bind(this));
  }.bind(this));

  this.on('end', function () {
    debug('Running the hooked generators');
    this.runHooks();
  });

  _.invoke(this._composedWith, 'run');
  return this;
};

/**
 * Goes through all registered hooks, invoking them in series.
 *
 * @param {Function} [cb]
 */

Base.prototype.runHooks = function runHooks(cb) {
  cb = _.isFunction(cb) ? cb : function () {};

  var setupInvoke = function (hook) {
    var resolved = this.defaultFor(hook.name);
    var options = _.clone(hook.options || this.options);
    options.args = _.clone(hook.args || this.args);

    return function (next) {
      this.invoke(resolved + (hook.as ? ':' + hook.as : ''), options, next);
    }.bind(this);
  }.bind(this);

  async.series(this._hooks.map(setupInvoke), cb);
  return this;
};

/**
 * Registers a hook to invoke when this generator runs.
 *
 * A generator with a namespace based on the value supplied by the user
 * to the given option named `name`. An option is created when this method is
 * invoked and you can set a hash to customize it.
 *
 * Must be called prior to running the generator (shouldn't be called within
 * a generator "step" - top-level methods).
 *
 * ### Options:
 *
 *   - `as`      The context value to use when runing the hooked generator
 *   - `args`    The array of positional arguments to init and run the generator with
 *   - `options` An object containing a nested `options` property with the hash of options
 *               to use to init and run the generator with
 *
 * ### Examples:
 *
 *     // $ yo webapp --test-framework jasmine
 *     this.hookFor('test-framework');
 *     // => registers the `jasmine` hook
 *
 *     // $ yo mygen:subgen --myargument
 *     this.hookFor('mygen', {
 *       as: 'subgen',
 *       options: {
 *         options: {
 *           'myargument': true
 *         }
 *       }
 *     }
 *
 * @deprecated use `#composeWith()` instead.
 * @param {String} name
 * @param {Object} config
 */

Base.prototype.hookFor = deprecate(
  'generator#hookFor() is deprecated. Use generator#composeWith() - see http://yeoman.io/authoring/composability.html',
  function (name, config) {
    config = config || {};

    // enforce use of hookFor during instantiation
    assert(!this._running, 'hookFor can only be used inside the constructor function');

    // add the corresponding option to this class, so that we output these hooks
    // in help
    this.option(name, {
      desc: _s.humanize(name) + ' to be invoked',
      defaults: this.options[name] || ''
    });

    this._hooks.push(_.defaults(config, {
      name: name
    }));

    return this;
  }
);

/**
 * Return the default value for the option name.
 *
 * @deprecated
 * @param {String} name
 */

Base.prototype.defaultFor = function defaultFor(name) {
  return this.options[name] || name;
};

/**
 * Compose this generator with another one.
 * @param  {String} namespace  The generator namespace to compose with
 * @param  {Object} options    The options passed to the Generator
 * @param  {Object} [settings] Settings hash on the composition relation
 * @param  {string} [settings.local]        Path to a locally stored generator
 * @param  {String} [settings.link="weak"]  If "strong", the composition will occured
 *                                          even when the composition is initialized by
 *                                          the end user
 * @return {this}
 *
 * @example <caption>Using a peerDependency generator</caption>
 * this.composeWith('bootstrap', { options: { sass: true } });
 *
 * @example <caption>Using a direct dependency generator</caption>
 * this.composeWith('bootstrap', { options: { sass: true } }, {
 *   local: require.resolve('generator-bootstrap/app/main.js')
 * });
 */

Base.prototype.composeWith = function composeWith(namespace, options, settings) {
  settings = settings || {};
  var generator;

  if (settings.local) {
    var Generator = require(settings.local);
    Generator.resolved = require.resolve(settings.local);
    Generator.namespace = namespace;
    generator = this.env.instantiate(Generator, options);
  } else {
    generator = this.env.create(namespace, options);
  }

  if (this._running) {
    generator.run();
  } else {
    this._composedWith.push(generator);
  }

  return this;
};

/**
 * Determine the root generator name (the one who's extending Base).
 * @return {String} The name of the root generator
 */

Base.prototype.rootGeneratorName = function () {
  var pkg = readPkgUp.sync({cwd: this.resolved}).pkg;
  return pkg ? pkg.name : '*';
};

/**
 * Determine the root generator version (the one who's extending Base).
 * @return {String} The version of the root generator
 */

Base.prototype.rootGeneratorVersion = function () {
  var pkg = readPkgUp.sync({cwd: this.resolved}).pkg;
  return pkg ? pkg.version : '0.0.0';
};

/**
 * Return a storage instance.
 * @return {Storage} Generator storage
 * @private
 */

Base.prototype._getStorage = function () {
  var storePath = path.join(this.destinationRoot(), '.yo-rc.json');
  return new Storage(this.rootGeneratorName(), this.fs, storePath);
};

/**
 * Setup a globalConfig storage instance.
 * @return {Storage} Global config storage
 * @private
 */

Base.prototype._getGlobalStorage = function () {
  var storePath = path.join(userHome, '.yo-rc-global.json');
  var storeName = util.format('%s:%s', this.rootGeneratorName(), this.rootGeneratorVersion());
  return new Storage(storeName, this.fs, storePath);
};

/**
 * Change the generator destination root directory.
 * This path is used to find storage, when using a file system helper method (like
 * `this.write` and `this.copy`)
 * @param  {String} rootPath new destination root path
 * @return {String}          destination root path
 */

Base.prototype.destinationRoot = function (rootPath) {
  if (_.isString(rootPath)) {
    this._destinationRoot = path.resolve(rootPath);

    if (!pathExists.sync(rootPath)) {
      mkdirp.sync(rootPath);
    }

    process.chdir(rootPath);

    // Reset the storage
    this.config = this._getStorage();
  }

  return this._destinationRoot || process.cwd();
};

/**
 * Change the generator source root directory.
 * This path is used by multiples file system methods like (`this.read` and `this.copy`)
 * @param  {String} rootPath new source root path
 * @return {String}          source root path
 */

Base.prototype.sourceRoot = function (rootPath) {
  if (_.isString(rootPath)) {
    this._sourceRoot = path.resolve(rootPath);
  }

  return this._sourceRoot;
};

/**
 * Join a path to the source root.
 * @param  {...String} path
 * @return {String}    joined path
 */

Base.prototype.templatePath = function () {
  var filepath = path.join.apply(path, arguments);

  if (!pathIsAbsolute(filepath)) {
    filepath = path.join(this.sourceRoot(), filepath);
  }

  return filepath;
};

/**
 * Join a path to the destination root.
 * @param  {...String} path
 * @return {String}    joined path
 */

Base.prototype.destinationPath = function () {
  var filepath = path.join.apply(path, arguments);

  if (!pathIsAbsolute(filepath)) {
    filepath = path.join(this.destinationRoot(), filepath);
  }

  return filepath;
};

/**
 * Determines the name of the application.
 *
 * First checks for name in bower.json.
 * Then checks for name in package.json.
 * Finally defaults to the name of the current directory.
 * @return {String} The name of the application
 */
Base.prototype.determineAppname = function () {
  var appname = this.fs.readJSON(this.destinationPath('bower.json'), {}).name;

  if (!appname) {
    appname = this.fs.readJSON(this.destinationPath('package.json'), {}).name;
  }

  if (!appname) {
    appname = path.basename(this.destinationRoot());
  }

  return appname.replace(/[^\w\s]+?/g, ' ');
};

Base.prototype.registerTransformStream = function (stream) {
  assert(stream, 'expected to receive a transform stream as parameter');
  this._transformStreams.push(stream);
  return this;
};

/**
 * Write memory fs file to disk and logging results
 * @param {Function} done - callback once files are written
 */
Base.prototype._writeFiles = function (done) {
  var self = this;

  var conflictChecker = through.obj(function (file, enc, cb) {
    var stream = this;

    // If the file has no state requiring action, move on
    if (file.state === null) {
      return cb();
    }

    // Config file should not be processed by the conflicter. Just pass through
    var filename = path.basename(file.path);

    if (filename === '.yo-rc.json' || filename === '.yo-rc-global.json') {
      this.push(file);
      return cb();
    }

    self.conflicter.checkForCollision(file.path, file.contents, function (err, status) {
      if (err) {
        cb(err);
        return;
      }

      if (status === 'skip') {
        delete file.state;
      } else {
        stream.push(file);
      }

      cb();
    });
    self.conflicter.resolve();
  });

  var transformStreams = this._transformStreams.concat([conflictChecker]);
  this.fs.commit(transformStreams, function () {
    done();
  });
};

/**
 * Extend this Class to create a new one inherithing this one.
 * Also add a helper \_\_super__ object pointing to the parent prototypes methods
 * @param  {Object} protoProps  Prototype properties (available on the instances)
 * @param  {Object} staticProps Static properties (available on the contructor)
 * @return {Object}             New sub class
 */
Base.extend = require('class-extend').extend;
