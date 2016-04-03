"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

var _interopRequire = require("babel-runtime/helpers/interop-require")["default"];

exports.__esModule = true;
exports.Plugin = Plugin;
exports.transformFile = transformFile;
exports.transformFileSync = transformFileSync;

var _lodashLangIsFunction = require("lodash/lang/isFunction");

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

//

//

var _util = require("../util");

var util = _interopRequireWildcard(_util);

var _babelMessages = require("babel-messages");

var messages = _interopRequireWildcard(_babelMessages);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _transformationFileOptionsOptionManager = require("../transformation/file/options/option-manager");

var _transformationFileOptionsOptionManager2 = _interopRequireDefault(_transformationFileOptionsOptionManager);

//

var _transformationPipeline = require("../transformation/pipeline");

var _transformationPipeline2 = _interopRequireDefault(_transformationPipeline);

var _transformationFile = require("../transformation/file");

exports.File = _interopRequire(_transformationFile);

var _transformationFileOptionsConfig = require("../transformation/file/options/config");

exports.options = _interopRequire(_transformationFileOptionsConfig);

var _toolsBuildExternalHelpers = require("../tools/build-external-helpers");

exports.buildExternalHelpers = _interopRequire(_toolsBuildExternalHelpers);

var _babelTemplate = require("babel-template");

exports.template = _interopRequire(_babelTemplate);

var _package = require("../../package");

exports.version = _package.version;
exports.util = util;
exports.messages = messages;
exports.types = t;
exports.traverse = _babelTraverse2["default"];
exports.OptionManager = _transformationFileOptionsOptionManager2["default"];

function Plugin(alias) {
  throw new Error("The (" + alias + ") Babel 5 plugin is being run with Babel 6.");
}

exports.Pipeline = _transformationPipeline2["default"];

var pipeline = new _transformationPipeline2["default"]();
var analyse = pipeline.analyse.bind(pipeline);
exports.analyse = analyse;
var transform = pipeline.transform.bind(pipeline);
exports.transform = transform;
var transformFromAst = pipeline.transformFromAst.bind(pipeline);

exports.transformFromAst = transformFromAst;
//

function transformFile(filename, opts, callback) {
  if (_lodashLangIsFunction2["default"](opts)) {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;

  _fs2["default"].readFile(filename, function (err, code) {
    var result = undefined;

    if (!err) {
      try {
        result = transform(code, opts);
      } catch (_err) {
        err = _err;
      }
    }

    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

function transformFileSync(filename) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  opts.filename = filename;
  return transform(_fs2["default"].readFileSync(filename, "utf8"), opts);
}