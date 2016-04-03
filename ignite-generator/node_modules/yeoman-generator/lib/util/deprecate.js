'use strict';
var _ = require('lodash');
var chalk = require('chalk');

var deprecate = function (message, fn) {
  return function () {
    deprecate.log(message);
    return fn.apply(this, arguments);
  };
};

deprecate.log = function (message) {
  console.log(chalk.yellow('(!) ') + message);
};

deprecate.object = function (message, object) {
  var msgTpl = _.template(message);
  var mirror = [];

  Object.keys(object).forEach(function (name) {
    var func = object[name];

    if (!_.isFunction(func)) {
      mirror[name] = func;
      return;
    }

    mirror[name] = deprecate(msgTpl({ name: name }), func);
  });

  return mirror;
};

module.exports = deprecate;
