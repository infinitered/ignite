'use strict';
var _ = require('lodash');
var valueFactory = require('../factory/value.js');
var Base = require('./Base');

/**
 * Object expression token (e.g. `{ a: "foo"}`)
 * @class
 * @param  {Object} node AST ObjectExpression token
 */
var ObjectExpression = module.exports = Base.extend({
  constructor: function (node) {
    this.type = 'ObjectExpression';
    this.node = node;
  },

  /**
   * Get a key value object or create a blank placeholder
   * @param  {String} name key name
   * @return {Object}      value
   */
  key: function (name) {
    var node = _.filter(this.node.properties, function (prop) {
      return prop.key.name === name || prop.key.raw === name;
    })[0];
    // If key doesn't exist, create one
    if (!node) {
      node = {
        type: 'Property',
        key: { type: 'Identifier', name: name },
        value: { type: 'ObjectExpression', properties: [] },
        kind: 'init',
        TEMP: true
      };
      Object.defineProperty(node.value, 'TEMP', {
        get: function () {
          return true;
        },
        set: function () {
          delete node.TEMP;
        }
      });
      this.node.properties.push(node);
    }

    return valueFactory.wrap(node.value);
  },

  /**
   * Replace node with new value
   * @param  {String} value
   * @return {Object} New value object
   */
  value: function (value) {
    var val = valueFactory.create(value);

    // As we don't keep reference to the parent, just update properties so the object stay
    // the same reference.
    delete this.node.properties;
    delete this.node.type;
    this.node.TEMP = false;
    _.extend(this.node, val);

    return valueFactory.wrap(this.node);
  }

});


