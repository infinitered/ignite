'use strict';
var _ = require('lodash');
var valueFactory = require('../factory/value.js');
var Base = require('./Base');

/**
 * Variable node object abstraction
 * @constructor
 * @param  {Array(object)} nodes
 */
var Variable = module.exports = Base.extend({

  /**
   * Change or get the variable value
   *
   * @param  {String} value  New value string
   * @return {Object}        Wrapped value
   *
   * @or
   * @return {Object}        Wrapped value
   */
  value: function (val) {
    if (_.isString(val)) {
      this.nodes.forEach(function (node) {
        node.init = valueFactory.create(val);
      });
    }
    return valueFactory.wrap(this.nodes[0].init);
  },

  /**
   * Rename the variable
   * @param  {string} name  New variable name
   * @return {null}
   */
  rename: function (name) {
    this.nodes.forEach(function (node) {
      node.id.name = name;
    });
    return this;
  }

});
