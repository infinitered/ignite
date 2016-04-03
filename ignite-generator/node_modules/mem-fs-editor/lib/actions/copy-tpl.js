'use strict';

var path = require('path');
var extend = require('deep-extend');
var ejs = require('ejs');

module.exports = function (from, to, context, tplSettings) {
  context = context || {};
  // Setting filename by default allow including partials.
  tplSettings = extend({filename: from}, tplSettings || {});

  this.copy(from, to, {
    process: function (contents) {
      return ejs.render(contents.toString(), context, tplSettings);
    }
  });
};
