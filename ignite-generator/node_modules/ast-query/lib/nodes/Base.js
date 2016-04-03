'use strict';
var Base = module.exports = function (nodes) {
  this.nodes = Array.isArray(nodes) ? nodes : [nodes];
  this.length = this.nodes.length;
  this.initialize.apply(this, arguments);
};

Base.prototype.initialize = function () {};
Base.extend = require('class-extend').extend;
