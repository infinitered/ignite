/* global BabelFileResult, BabelParserOptions, BabelFileMetadata */
/* eslint max-len: 0 */

"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelHelpers = require("babel-helpers");

var _babelHelpers2 = _interopRequireDefault(_babelHelpers);

var _metadata = require("./metadata");

var metadataVisitor = _interopRequireWildcard(_metadata);

var _convertSourceMap = require("convert-source-map");

var _convertSourceMap2 = _interopRequireDefault(_convertSourceMap);

var _optionsOptionManager = require("./options/option-manager");

var _optionsOptionManager2 = _interopRequireDefault(_optionsOptionManager);

var _pluginPass = require("../plugin-pass");

var _pluginPass2 = _interopRequireDefault(_pluginPass);

var _shebangRegex = require("shebang-regex");

var _shebangRegex2 = _interopRequireDefault(_shebangRegex);

var _babelTraverse = require("babel-traverse");

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelCodeFrame = require("babel-code-frame");

var _babelCodeFrame2 = _interopRequireDefault(_babelCodeFrame);

var _lodashObjectDefaults = require("lodash/object/defaults");

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

var _store = require("../../store");

var _store2 = _interopRequireDefault(_store);

var _babylon = require("babylon");

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _internalPluginsBlockHoist = require("../internal-plugins/block-hoist");

var _internalPluginsBlockHoist2 = _interopRequireDefault(_internalPluginsBlockHoist);

var _internalPluginsShadowFunctions = require("../internal-plugins/shadow-functions");

var _internalPluginsShadowFunctions2 = _interopRequireDefault(_internalPluginsShadowFunctions);

var INTERNAL_PLUGINS = [[_internalPluginsBlockHoist2["default"]], [_internalPluginsShadowFunctions2["default"]]];

var errorVisitor = {
  enter: function enter(path, state) {
    var loc = path.node.loc;
    if (loc) {
      state.loc = loc;
      path.stop();
    }
  }
};

var File = (function (_Store) {
  _inherits(File, _Store);

  function File(opts, pipeline) {
    // istanbul ignore next

    var _this = this;

    if (opts === undefined) opts = {};

    _classCallCheck(this, File);

    _Store.call(this);

    this.pipeline = pipeline;

    this.log = new _logger2["default"](this, opts.filename || "unknown");
    this.opts = this.initOptions(opts);

    this.parserOpts = {
      highlightCode: this.opts.highlightCode,
      nonStandard: this.opts.nonStandard,
      sourceType: this.opts.sourceType,
      filename: this.opts.filename,
      plugins: []
    };

    this.pluginVisitors = [];
    this.pluginPasses = [];

    // Plugins for top-level options.
    this.buildPluginsForOptions(this.opts);

    // If we are in the "pass per preset" mode, build
    // also plugins for each preset.
    if (this.opts.passPerPreset) {
      // All the "per preset" options are inherited from the main options.
      this.perPresetOpts = [];
      this.opts.presets.forEach(function (presetOpts) {
        var perPresetOpts = _Object$assign(_Object$create(_this.opts), presetOpts);
        _this.perPresetOpts.push(perPresetOpts);
        _this.buildPluginsForOptions(perPresetOpts);
      });
    }

    this.metadata = {
      usedHelpers: [],
      marked: [],
      modules: {
        imports: [],
        exports: {
          exported: [],
          specifiers: []
        }
      }
    };

    this.dynamicImportTypes = {};
    this.dynamicImportIds = {};
    this.dynamicImports = [];
    this.declarations = {};
    this.usedHelpers = {};

    this.path = null;
    this.ast = {};

    this.code = "";
    this.shebang = "";

    this.hub = new _babelTraverse.Hub(this);
  }

  File.prototype.getMetadata = function getMetadata() {
    var has = false;
    var _arr = this.ast.program.body;
    for (var _i = 0; _i < _arr.length; _i++) {
      var node = _arr[_i];
      if (t.isModuleDeclaration(node)) {
        has = true;
        break;
      }
    }
    if (has) {
      this.path.traverse(metadataVisitor, this);
    }
  };

  File.prototype.initOptions = function initOptions(opts) {
    opts = new _optionsOptionManager2["default"](this.log, this.pipeline).init(opts);

    if (opts.inputSourceMap) {
      opts.sourceMaps = true;
    }

    if (opts.moduleId) {
      opts.moduleIds = true;
    }

    opts.basename = _path2["default"].basename(opts.filename, _path2["default"].extname(opts.filename));

    opts.ignore = util.arrayify(opts.ignore, util.regexify);

    if (opts.only) opts.only = util.arrayify(opts.only, util.regexify);

    _lodashObjectDefaults2["default"](opts, {
      moduleRoot: opts.sourceRoot
    });

    _lodashObjectDefaults2["default"](opts, {
      sourceRoot: opts.moduleRoot
    });

    _lodashObjectDefaults2["default"](opts, {
      filenameRelative: opts.filename
    });

    var basenameRelative = _path2["default"].basename(opts.filenameRelative);

    _lodashObjectDefaults2["default"](opts, {
      sourceFileName: basenameRelative,
      sourceMapTarget: basenameRelative
    });

    return opts;
  };

  File.prototype.buildPluginsForOptions = function buildPluginsForOptions(opts) {
    if (!Array.isArray(opts.plugins)) {
      return;
    }

    var plugins = opts.plugins.concat(INTERNAL_PLUGINS);
    var currentPluginVisitors = [];
    var currentPluginPasses = [];

    // init plugins!
    for (var _i2 = 0; _i2 < plugins.length; _i2++) {
      var ref = plugins[_i2];var plugin = ref[0];
      var pluginOpts = ref[1];
      // todo: fix - can't embed in loop head because of flow bug

      currentPluginVisitors.push(plugin.visitor);
      currentPluginPasses.push(new _pluginPass2["default"](this, plugin, pluginOpts));

      if (plugin.manipulateOptions) {
        plugin.manipulateOptions(opts, this.parserOpts, this);
      }
    }

    this.pluginVisitors.push(currentPluginVisitors);
    this.pluginPasses.push(currentPluginPasses);
  };

  File.prototype.getModuleName = function getModuleName() {
    var opts = this.opts;
    if (!opts.moduleIds) {
      return null;
    }

    // moduleId is n/a if a `getModuleId()` is provided
    if (opts.moduleId != null && !opts.getModuleId) {
      return opts.moduleId;
    }

    var filenameRelative = opts.filenameRelative;
    var moduleName = "";

    if (opts.moduleRoot != null) {
      moduleName = opts.moduleRoot + "/";
    }

    if (!opts.filenameRelative) {
      return moduleName + opts.filename.replace(/^\//, "");
    }

    if (opts.sourceRoot != null) {
      // remove sourceRoot from filename
      var sourceRootRegEx = new RegExp("^" + opts.sourceRoot + "\/?");
      filenameRelative = filenameRelative.replace(sourceRootRegEx, "");
    }

    // remove extension
    filenameRelative = filenameRelative.replace(/\.(\w*?)$/, "");

    moduleName += filenameRelative;

    // normalize path separators
    moduleName = moduleName.replace(/\\/g, "/");

    if (opts.getModuleId) {
      // If return is falsy, assume they want us to use our generated default name
      return opts.getModuleId(moduleName) || moduleName;
    } else {
      return moduleName;
    }
  };

  File.prototype.resolveModuleSource = function resolveModuleSource(source) {
    var resolveModuleSource = this.opts.resolveModuleSource;
    if (resolveModuleSource) source = resolveModuleSource(source, this.opts.filename);
    return source;
  };

  File.prototype.addImport = function addImport(source, imported) {
    var name = arguments.length <= 2 || arguments[2] === undefined ? imported : arguments[2];
    return (function () {
      var alias = source + ":" + imported;
      var id = this.dynamicImportIds[alias];

      if (!id) {
        source = this.resolveModuleSource(source);
        id = this.dynamicImportIds[alias] = this.scope.generateUidIdentifier(name);

        var specifiers = [];

        if (imported === "*") {
          specifiers.push(t.importNamespaceSpecifier(id));
        } else if (imported === "default") {
          specifiers.push(t.importDefaultSpecifier(id));
        } else {
          specifiers.push(t.importSpecifier(id, t.identifier(imported)));
        }

        var declar = t.importDeclaration(specifiers, t.stringLiteral(source));
        declar._blockHoist = 3;

        this.path.unshiftContainer("body", declar);
      }

      return id;
    }).apply(this, arguments);
  };

  File.prototype.addHelper = function addHelper(name) {
    var declar = this.declarations[name];
    if (declar) return declar;

    if (!this.usedHelpers[name]) {
      this.metadata.usedHelpers.push(name);
      this.usedHelpers[name] = true;
    }

    var generator = this.get("helperGenerator");
    var runtime = this.get("helpersNamespace");
    if (generator) {
      var res = generator(name);
      if (res) return res;
    } else if (runtime) {
      return t.memberExpression(runtime, t.identifier(name));
    }

    var ref = _babelHelpers2["default"](name);
    var uid = this.declarations[name] = this.scope.generateUidIdentifier(name);

    if (t.isFunctionExpression(ref) && !ref.id) {
      ref.body._compact = true;
      ref._generated = true;
      ref.id = uid;
      ref.type = "FunctionDeclaration";
      this.path.unshiftContainer("body", ref);
    } else {
      ref._compact = true;
      this.scope.push({
        id: uid,
        init: ref,
        unique: true
      });
    }

    return uid;
  };

  File.prototype.addTemplateObject = function addTemplateObject(helperName, strings, raw) {
    // Generate a unique name based on the string literals so we dedupe
    // identical strings used in the program.
    var stringIds = raw.elements.map(function (string) {
      return string.value;
    });
    var name = helperName + "_" + raw.elements.length + "_" + stringIds.join(",");

    var declar = this.declarations[name];
    if (declar) return declar;

    var uid = this.declarations[name] = this.scope.generateUidIdentifier("templateObject");

    var helperId = this.addHelper(helperName);
    var init = t.callExpression(helperId, [strings, raw]);
    init._compact = true;
    this.scope.push({
      id: uid,
      init: init,
      _blockHoist: 1.9 // This ensures that we don't fail if not using function expression helpers
    });
    return uid;
  };

  File.prototype.buildCodeFrameError = function buildCodeFrameError(node, msg) {
    var Error = arguments.length <= 2 || arguments[2] === undefined ? SyntaxError : arguments[2];

    var loc = node && (node.loc || node._loc);

    var err = new Error(msg);

    if (loc) {
      err.loc = loc.start;
    } else {
      _babelTraverse2["default"](node, errorVisitor, this.scope, err);

      err.message += " (This is an error on an internal node. Probably an internal error";

      if (err.loc) {
        err.message += ". Location has been estimated.";
      }

      err.message += ")";
    }

    return err;
  };

  File.prototype.mergeSourceMap = function mergeSourceMap(map) {
    var inputMap = this.opts.inputSourceMap;

    if (inputMap) {
      var _ret = (function () {
        var inputMapConsumer = new _sourceMap2["default"].SourceMapConsumer(inputMap);
        var outputMapConsumer = new _sourceMap2["default"].SourceMapConsumer(map);

        var mergedGenerator = new _sourceMap2["default"].SourceMapGenerator({
          file: inputMapConsumer.file,
          sourceRoot: inputMapConsumer.sourceRoot
        });

        // This assumes the output map always has a single source, since Babel always compiles a single source file to a
        // single output file.
        var source = outputMapConsumer.sources[0];

        inputMapConsumer.eachMapping(function (mapping) {
          var generatedPosition = outputMapConsumer.generatedPositionFor({
            line: mapping.generatedLine,
            column: mapping.generatedColumn,
            source: source
          });
          if (generatedPosition.column != null) {
            mergedGenerator.addMapping({
              source: mapping.source,

              original: {
                line: mapping.originalLine,
                column: mapping.originalColumn
              },

              generated: generatedPosition
            });
          }
        });

        var mergedMap = mergedGenerator.toJSON();
        inputMap.mappings = mergedMap.mappings;
        return {
          v: inputMap
        };
      })();

      // istanbul ignore next
      if (typeof _ret === "object") return _ret.v;
    } else {
      return map;
    }
  };

  File.prototype.parse = function parse(code) {
    this.log.debug("Parse start");
    var ast = _babylon.parse(code, this.parserOpts);
    this.log.debug("Parse stop");
    return ast;
  };

  File.prototype._addAst = function _addAst(ast) {
    this.path = _babelTraverse.NodePath.get({
      hub: this.hub,
      parentPath: null,
      parent: ast,
      container: ast,
      key: "program"
    }).setContext();
    this.scope = this.path.scope;
    this.ast = ast;
    this.getMetadata();
  };

  File.prototype.addAst = function addAst(ast) {
    this.log.debug("Start set AST");
    this._addAst(ast);
    this.log.debug("End set AST");
  };

  File.prototype.transform = function transform() {
    // istanbul ignore next

    var _this2 = this;

    // In the "pass per preset" mode, we have grouped passes.
    // Otherwise, there is only one plain pluginPasses array.
    this.pluginPasses.forEach(function (pluginPasses, index) {
      _this2.call("pre", pluginPasses);
      _this2.log.debug("Start transform traverse");
      _babelTraverse2["default"](_this2.ast, _babelTraverse2["default"].visitors.merge(_this2.pluginVisitors[index], pluginPasses), _this2.scope);
      _this2.log.debug("End transform traverse");
      _this2.call("post", pluginPasses);
    });

    return this.generate();
  };

  File.prototype.wrap = function wrap(code, callback) {
    code = code + "";

    try {
      if (this.shouldIgnore()) {
        return this.makeResult({ code: code, ignored: true });
      } else {
        return callback();
      }
    } catch (err) {
      if (err._babel) {
        throw err;
      } else {
        err._babel = true;
      }

      var message = err.message = this.opts.filename + ": " + err.message;

      var loc = err.loc;
      if (loc) {
        err.codeFrame = _babelCodeFrame2["default"](code, loc.line, loc.column + 1, this.opts);
        message += "\n" + err.codeFrame;
      }

      if (process.browser) {
        // chrome has it's own pretty stringifier which doesn't use the stack property
        // https://github.com/babel/babel/issues/2175
        err.message = message;
      }

      if (err.stack) {
        var newStack = err.stack.replace(err.message, message);
        err.stack = newStack;
      }

      throw err;
    }
  };

  File.prototype.addCode = function addCode(code) {
    code = (code || "") + "";
    code = this.parseInputSourceMap(code);
    this.code = code;
  };

  File.prototype.parseCode = function parseCode() {
    this.parseShebang();
    var ast = this.parse(this.code);
    this.addAst(ast);
  };

  File.prototype.shouldIgnore = function shouldIgnore() {
    var opts = this.opts;
    return util.shouldIgnore(opts.filename, opts.ignore, opts.only);
  };

  File.prototype.call = function call(key, pluginPasses) {
    for (var _i3 = 0; _i3 < pluginPasses.length; _i3++) {
      var pass = pluginPasses[_i3];
      var plugin = pass.plugin;
      var fn = plugin[key];
      if (fn) fn.call(pass, this);
    }
  };

  File.prototype.parseInputSourceMap = function parseInputSourceMap(code) {
    var opts = this.opts;

    if (opts.inputSourceMap !== false) {
      var inputMap = _convertSourceMap2["default"].fromSource(code);
      if (inputMap) {
        opts.inputSourceMap = inputMap.toObject();
        code = _convertSourceMap2["default"].removeComments(code);
      }
    }

    return code;
  };

  File.prototype.parseShebang = function parseShebang() {
    var shebangMatch = _shebangRegex2["default"].exec(this.code);
    if (shebangMatch) {
      this.shebang = shebangMatch[0];
      this.code = this.code.replace(_shebangRegex2["default"], "");
    }
  };

  File.prototype.makeResult = function makeResult(_ref) {
    var code = _ref.code;
    var map = _ref.map;
    var ast = _ref.ast;
    var ignored = _ref.ignored;

    var result = {
      metadata: null,
      options: this.opts,
      ignored: !!ignored,
      code: null,
      ast: null,
      map: map || null
    };

    if (this.opts.code) {
      result.code = code;
    }

    if (this.opts.ast) {
      result.ast = ast;
    }

    if (this.opts.metadata) {
      result.metadata = this.metadata;
    }

    return result;
  };

  File.prototype.generate = function generate() {
    var opts = this.opts;
    var ast = this.ast;

    var result = { ast: ast };
    if (!opts.code) return this.makeResult(result);

    this.log.debug("Generation start");

    var _result = _babelGenerator2["default"](ast, opts, this.code);
    result.code = _result.code;
    result.map = _result.map;

    this.log.debug("Generation end");

    if (this.shebang) {
      // add back shebang
      result.code = this.shebang + "\n" + result.code;
    }

    if (result.map) {
      result.map = this.mergeSourceMap(result.map);
    }

    if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
      result.code += "\n" + _convertSourceMap2["default"].fromObject(result.map).toComment();
    }

    if (opts.sourceMaps === "inline") {
      result.map = null;
    }

    return this.makeResult(result);
  };

  return File;
})(_store2["default"]);

exports["default"] = File;
exports.File = File;