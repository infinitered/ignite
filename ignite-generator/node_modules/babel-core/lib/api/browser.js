/* eslint max-len: 0 */
/* eslint no-new-func: 0 */

"use strict";

var _defaults = require("babel-runtime/helpers/defaults")["default"];

var _interopExportWildcard = require("babel-runtime/helpers/interop-export-wildcard")["default"];

exports.__esModule = true;
exports.run = run;
exports.load = load;

var _node = require("./node");

_defaults(exports, _interopExportWildcard(_node, _defaults));

function run(code) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return new Function(_node.transform(code, opts).code)();
}

function load(url, callback, opts, hold) {
  if (opts === undefined) opts = {};

  opts.filename = opts.filename || url;

  var xhr = global.ActiveXObject ? new global.ActiveXObject("Microsoft.XMLHTTP") : new global.XMLHttpRequest();
  xhr.open("GET", url, true);
  if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    var status = xhr.status;
    if (status === 0 || status === 200) {
      var param = [xhr.responseText, opts];
      if (!hold) run(param);
      if (callback) callback(param);
    } else {
      throw new Error("Could not load " + url);
    }
  };

  xhr.send(null);
}

function runScripts() {
  var scripts = [];
  var types = ["text/ecmascript-6", "text/6to5", "text/babel", "module"];
  var index = 0;

  /**
   * Transform and execute script. Ensures correct load order.
   */

  function exec() {
    var param = scripts[index];
    if (param instanceof Array) {
      run(param, index);
      index++;
      exec();
    }
  }

  /**
   * Load, transform, and execute all scripts.
   */

  function run(script, i) {
    var opts = {};

    if (script.src) {
      load(script.src, function (param) {
        scripts[i] = param;
        exec();
      }, opts, true);
    } else {
      opts.filename = "embedded";
      scripts[i] = [script.innerHTML, opts];
    }
  }

  // Collect scripts with Babel `types`.

  var _scripts = global.document.getElementsByTagName("script");

  for (var i = 0; i < _scripts.length; ++i) {
    var _script = _scripts[i];
    if (types.indexOf(_script.type) >= 0) scripts.push(_script);
  }

  for (var i = 0; i < scripts.length; i++) {
    run(scripts[i], i);
  }

  exec();
}

/**
 * Register load event to transform and execute scripts.
 */

if (global.addEventListener) {
  global.addEventListener("DOMContentLoaded", runScripts, false);
} else if (global.attachEvent) {
  global.attachEvent("onload", runScripts);
}