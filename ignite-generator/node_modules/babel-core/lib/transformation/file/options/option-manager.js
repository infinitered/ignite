/* eslint max-len: 0 */

"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _apiNode = require("../../../api/node");

var context = _interopRequireWildcard(_apiNode);

var _plugin2 = require("../../plugin");

var _plugin3 = _interopRequireDefault(_plugin2);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _index = require("./index");

var _helpersResolve = require("../../../helpers/resolve");

var _helpersResolve2 = _interopRequireDefault(_helpersResolve);

var _json5 = require("json5");

var _json52 = _interopRequireDefault(_json5);

var _pathIsAbsolute = require("path-is-absolute");

var _pathIsAbsolute2 = _interopRequireDefault(_pathIsAbsolute);

var _pathExists = require("path-exists");

var _pathExists2 = _interopRequireDefault(_pathExists);

var _lodashLangCloneDeep = require("lodash/lang/cloneDeep");

var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

var _helpersMerge = require("../../../helpers/merge");

var _helpersMerge2 = _interopRequireDefault(_helpersMerge);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _removed = require("./removed");

var _removed2 = _interopRequireDefault(_removed);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var existsCache = {};
var jsonCache = {};

var BABELIGNORE_FILENAME = ".babelignore";
var BABELRC_FILENAME = ".babelrc";
var PACKAGE_FILENAME = "package.json";

function exists(filename) {
  var cached = existsCache[filename];
  if (cached == null) {
    return existsCache[filename] = _pathExists2["default"].sync(filename);
  } else {
    return cached;
  }
}

var OptionManager = (function () {
  function OptionManager(log) {
    _classCallCheck(this, OptionManager);

    this.resolvedConfigs = [];
    this.options = OptionManager.createBareOptions();
    this.log = log;
  }

  OptionManager.memoisePluginContainer = function memoisePluginContainer(fn, loc, i, alias) {
    var _arr = OptionManager.memoisedPlugins;

    for (var _i = 0; _i < _arr.length; _i++) {
      var cache = _arr[_i];
      if (cache.container === fn) return cache.plugin;
    }

    var obj = undefined;

    if (typeof fn === "function") {
      obj = fn(context);
    } else {
      obj = fn;
    }

    if (typeof obj === "object") {
      var _plugin = new _plugin3["default"](obj, alias);
      OptionManager.memoisedPlugins.push({
        container: fn,
        plugin: _plugin
      });
      return _plugin;
    } else {
      throw new TypeError(messages.get("pluginNotObject", loc, i, typeof obj) + loc + i);
    }
  };

  OptionManager.createBareOptions = function createBareOptions() {
    var opts = {};

    for (var _key in _config2["default"]) {
      var opt = _config2["default"][_key];
      opts[_key] = _lodashLangClone2["default"](opt["default"]);
    }

    return opts;
  };

  OptionManager.normalisePlugin = function normalisePlugin(plugin, loc, i, alias) {
    plugin = plugin.__esModule ? plugin["default"] : plugin;

    if (!(plugin instanceof _plugin3["default"])) {
      // allow plugin containers to be specified so they don't have to manually require
      if (typeof plugin === "function" || typeof plugin === "object") {
        plugin = OptionManager.memoisePluginContainer(plugin, loc, i, alias);
      } else {
        throw new TypeError(messages.get("pluginNotFunction", loc, i, typeof plugin));
      }
    }

    plugin.init(loc, i);

    return plugin;
  };

  OptionManager.normalisePlugins = function normalisePlugins(loc, dirname, plugins) {
    return plugins.map(function (val, i) {
      var plugin = undefined,
          options = undefined;

      if (!val) {
        throw new TypeError("Falsy value found in plugins");
      }

      // destructure plugins
      if (Array.isArray(val)) {
        plugin = val[0];
        options = val[1];
      } else {
        plugin = val;
      }

      var alias = typeof plugin === "string" ? plugin : loc + "$" + i;

      // allow plugins to be specified as strings
      if (typeof plugin === "string") {
        var pluginLoc = _helpersResolve2["default"]("babel-plugin-" + plugin, dirname) || _helpersResolve2["default"](plugin, dirname);
        if (pluginLoc) {
          plugin = require(pluginLoc);
        } else {
          throw new ReferenceError(messages.get("pluginUnknown", plugin, loc, i, dirname));
        }
      }

      plugin = OptionManager.normalisePlugin(plugin, loc, i, alias);

      return [plugin, options];
    });
  };

  OptionManager.prototype.addConfig = function addConfig(loc, key) {
    var json = arguments.length <= 2 || arguments[2] === undefined ? _json52["default"] : arguments[2];

    if (this.resolvedConfigs.indexOf(loc) >= 0) {
      return false;
    }

    var content = _fs2["default"].readFileSync(loc, "utf8");
    var opts = undefined;

    try {
      opts = jsonCache[content] = jsonCache[content] || json.parse(content);
      if (key) opts = opts[key];
    } catch (err) {
      err.message = loc + ": Error while parsing JSON - " + err.message;
      throw err;
    }

    this.mergeOptions({
      options: opts,
      alias: loc,
      dirname: _path2["default"].dirname(loc)
    });
    this.resolvedConfigs.push(loc);

    return !!opts;
  };

  /**
   * This is called when we want to merge the input `opts` into the
   * base options (passed as the `extendingOpts`: at top-level it's the
   * main options, at presets level it's presets options).
   *
   *  - `alias` is used to output pretty traces back to the original source.
   *  - `loc` is used to point to the original config.
   *  - `dirname` is used to resolve plugins relative to it.
   */

  OptionManager.prototype.mergeOptions = function mergeOptions(_ref) {
    // istanbul ignore next

    var _this = this;

    var rawOpts = _ref.options;
    var extendingOpts = _ref.extending;
    var alias = _ref.alias;
    var loc = _ref.loc;
    var dirname = _ref.dirname;

    alias = alias || "foreign";
    if (!rawOpts) return;

    //
    if (typeof rawOpts !== "object" || Array.isArray(rawOpts)) {
      this.log.error("Invalid options type for " + alias, TypeError);
    }

    //
    var opts = _lodashLangCloneDeep2["default"](rawOpts, function (val) {
      if (val instanceof _plugin3["default"]) {
        return val;
      }
    });

    //
    dirname = dirname || process.cwd();
    loc = loc || alias;

    for (var _key2 in opts) {
      var option = _config2["default"][_key2];

      // check for an unknown option
      if (!option && this.log) {
        var pluginOptsInfo = "Check out http://babeljs.io/docs/usage/options/ for more info";

        if (_removed2["default"][_key2]) {
          this.log.error("Using removed Babel 5 option: " + alias + "." + _key2 + " - " + _removed2["default"][_key2].message, ReferenceError);
        } else {
          this.log.error("Unknown option: " + alias + "." + _key2 + ". " + pluginOptsInfo, ReferenceError);
        }
      }
    }

    // normalise options
    _index.normaliseOptions(opts);

    // resolve plugins
    if (opts.plugins) {
      opts.plugins = OptionManager.normalisePlugins(loc, dirname, opts.plugins);
    }

    // add extends clause
    if (opts["extends"]) {
      var extendsLoc = _helpersResolve2["default"](opts["extends"], dirname);
      if (extendsLoc) {
        this.addConfig(extendsLoc);
      } else {
        if (this.log) this.log.error("Couldn't resolve extends clause of " + opts["extends"] + " in " + alias);
      }
      delete opts["extends"];
    }

    // resolve presets
    if (opts.presets) {
      // If we're in the "pass per preset" mode, we resolve the presets
      // and keep them for further execution to calculate the options.
      if (opts.passPerPreset) {
        opts.presets = this.resolvePresets(opts.presets, dirname, function (preset, presetLoc) {
          _this.mergeOptions({
            options: preset,
            extending: preset,
            alias: presetLoc,
            loc: presetLoc,
            dirname: dirname
          });
        });
      } else {
        // Otherwise, just merge presets options into the main options.
        this.mergePresets(opts.presets, dirname);
        delete opts.presets;
      }
    }

    // env
    var envOpts = undefined;
    var envKey = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
    if (opts.env) {
      envOpts = opts.env[envKey];
      delete opts.env;
    }

    // Merge them into current extending options in case of top-level
    // options. In case of presets, just re-assign options which are got
    // normalized during the `mergeOptions`.
    if (rawOpts === extendingOpts) {
      _Object$assign(extendingOpts, opts);
    } else {
      _helpersMerge2["default"](extendingOpts || this.options, opts);
    }

    // merge in env options
    this.mergeOptions({
      options: envOpts,
      extending: extendingOpts,
      alias: alias + ".env." + envKey,
      dirname: dirname
    });
  };

  /**
   * Merges all presets into the main options in case we are not in the
   * "pass per preset" mode. Otherwise, options are calculated per preset.
   */

  OptionManager.prototype.mergePresets = function mergePresets(presets, dirname) {
    // istanbul ignore next

    var _this2 = this;

    this.resolvePresets(presets, dirname, function (presetOpts, presetLoc) {
      _this2.mergeOptions({
        options: presetOpts,
        alias: presetLoc,
        loc: presetLoc,
        dirname: _path2["default"].dirname(presetLoc)
      });
    });
  };

  /**
   * Resolves presets options which can be either direct object data,
   * or a module name to require.
   */

  OptionManager.prototype.resolvePresets = function resolvePresets(presets, dirname, onResolve) {
    return presets.map(function (val) {
      if (typeof val === "string") {
        var presetLoc = _helpersResolve2["default"]("babel-preset-" + val, dirname) || _helpersResolve2["default"](val, dirname);
        if (presetLoc) {
          var _val = require(presetLoc);
          onResolve && onResolve(_val, presetLoc);
          return _val;
        } else {
          throw new Error("Couldn't find preset " + JSON.stringify(val) + " relative to directory " + JSON.stringify(dirname));
        }
      } else if (typeof val === "object") {
        onResolve && onResolve(val);
        return val;
      } else {
        throw new Error("Unsupported preset format: " + val + ".");
      }
    });
  };

  OptionManager.prototype.addIgnoreConfig = function addIgnoreConfig(loc) {
    var file = _fs2["default"].readFileSync(loc, "utf8");
    var lines = file.split("\n");

    lines = lines.map(function (line) {
      return line.replace(/#(.*?)$/, "").trim();
    }).filter(function (line) {
      return !!line;
    });

    this.mergeOptions({
      options: { ignore: lines },
      loc: loc
    });
  };

  OptionManager.prototype.findConfigs = function findConfigs(loc) {
    if (!loc) return;

    if (!_pathIsAbsolute2["default"](loc)) {
      loc = _path2["default"].join(process.cwd(), loc);
    }

    var foundConfig = false;
    var foundIgnore = false;

    while (loc !== (loc = _path2["default"].dirname(loc))) {
      if (!foundConfig) {
        var configLoc = _path2["default"].join(loc, BABELRC_FILENAME);
        if (exists(configLoc)) {
          this.addConfig(configLoc);
          foundConfig = true;
        }

        var pkgLoc = _path2["default"].join(loc, PACKAGE_FILENAME);
        if (!foundConfig && exists(pkgLoc)) {
          foundConfig = this.addConfig(pkgLoc, "babel", JSON);
        }
      }

      if (!foundIgnore) {
        var ignoreLoc = _path2["default"].join(loc, BABELIGNORE_FILENAME);
        if (exists(ignoreLoc)) {
          this.addIgnoreConfig(ignoreLoc);
          foundIgnore = true;
        }
      }

      if (foundIgnore && foundConfig) return;
    }
  };

  OptionManager.prototype.normaliseOptions = function normaliseOptions() {
    var opts = this.options;

    for (var _key3 in _config2["default"]) {
      var option = _config2["default"][_key3];
      var val = opts[_key3];

      // optional
      if (!val && option.optional) continue;

      // aliases
      if (option.alias) {
        opts[option.alias] = opts[option.alias] || val;
      } else {
        opts[_key3] = val;
      }
    }
  };

  OptionManager.prototype.init = function init() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var filename = opts.filename;

    // resolve all .babelrc files
    if (opts.babelrc !== false) {
      this.findConfigs(filename);
    }

    // merge in base options
    this.mergeOptions({
      options: opts,
      alias: "base",
      dirname: filename && _path2["default"].dirname(filename)
    });

    // normalise
    this.normaliseOptions(opts);

    return this.options;
  };

  return OptionManager;
})();

exports["default"] = OptionManager;

OptionManager.memoisedPlugins = [];
module.exports = exports["default"];