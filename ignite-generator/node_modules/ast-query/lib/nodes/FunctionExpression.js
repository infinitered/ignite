'use strict';
var _ = require('lodash');
var valueFactory = require('../factory/value');
var Base = require('./Base');
var Body = require('./Body');

/**
 * Constructor for an FunctionExpression
 * @constructor
 * @param  {Object} node
 */
var FunctionExpression = module.exports = Base.extend({
  constructor: function (node) {
    this.node = node;
    this.type = 'FunctionExpression';
    this.body = new Body(this.node.body.body);
  }
});
