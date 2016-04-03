'use strict';
var _ = require('lodash');
var valueFactory = require('../../lib/factory/value.js');
var Base = require('./Base');

/**
 * Literal node type wrapper
 * @class
 * @param  {Object} node
 */
var Literal = module.exports = Base.extend({
  constructor: function (node) {
    this.node = node;
    this.type = 'Literal';
  },

  /**
   * Update or get node value
   *
   * @param  {String} val Value code string
   * @return {mixed}      new Value object
   *
   * @or
   * @return {mixed}      Value
   */
  value: function (value) {
    if (_.isString(value)) {
      var val = valueFactory.create(value);

      // As we don't keep reference to the parent, just update properties so the object stay
      // the same reference.
      delete this.node.value;
      delete this.node.type;
      _.extend(this.node, val);
      return valueFactory.wrap(this.node);
    }

    return this.node.value;
  }

});

