'use strict';
var _ = require('lodash');
var valueFactory = require('../factory/value.js');
var Base = require('./Base');

/**
 * Constructor for an AssignmentExpression
 * @constructor
 * @param  {Array(Object)} nodes
 */
var AssignmentExpression = module.exports = Base.extend({

  /**
   * Set or return value
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
        node.right = valueFactory.create(val);
      });
    }
    return valueFactory.wrap(this.nodes[0].right);
  }

});
