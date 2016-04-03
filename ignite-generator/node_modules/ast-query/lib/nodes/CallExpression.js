'use strict';
var valueFactory = require('../factory/value.js');
var ArrayExpression = require('./ArrayExpression.js');
var Base = require('./Base');

/**
 * Constructor for a function call/invocation
 * @constructor
 * @param  {Array(Object)} nodes
 */
var CallExpression = module.exports = Base.extend({
  initialize: function () {
    this.type = 'CallExpression';

    var args = this.nodes[0] ? this.nodes[0].arguments : [];
    this.arguments = new ArrayExpression({ elements: args });
  },

  filter: function (iterator) {
    return new CallExpression(this.nodes.filter(iterator));
  }
});
