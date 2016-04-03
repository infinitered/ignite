'use strict';
var _ = require('lodash');
var valueFactory = require('../factory/value.js');
var Base = require('./Base');

var ArrayExpression = module.exports = Base.extend({
  initialize: function () {
    this.type = 'ArrayExpression';
  },

  /**
   * push a new value in the array
   * @param  {String} arg New value as a string
   * @return {this}
   */
  push: function (arg) {
    arg = valueFactory.create(arg);
    this.nodes.forEach(function (node) {
      node.elements.push(arg);
    });
    return this;
  },

  /**
   * unshift a new value in the array
   * @param  {String} arg New value as a string
   * @return {this}
   */
  unshift: function (arg) {
    arg = valueFactory.create(arg);
    this.nodes.forEach(function (node) {
      node.elements.unshift(arg);
    });
    return this;
  },

  /**
   * Return the value at given index (only target the first node occurence)
   * @param  {Number}  index
   * @return {Literal} Value reference as a literal type
   */
  at: function (index) {
    return valueFactory.wrap(this.nodes[0].elements[index]);
  },

  /**
   * Replace node with new value
   * @param {String} value
   * @return this
   */
  value: function (value) {
    var val = valueFactory.create(value);
    this.nodes.forEach(function (node) {
      delete node.type;
      delete node.elements;
      _.extend(node, val);
    });
    return valueFactory.wrap(this.nodes[0]);
  }

});

