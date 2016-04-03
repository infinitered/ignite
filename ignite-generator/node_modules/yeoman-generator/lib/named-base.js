'use strict';
var Base = require('./base');

/**
 * The `NamedBase` object is only dealing with one argument: `name`.
 *
 * You can use it whenever you need at least one **required** positional
 * argument for your generator (which is a fairly common use case).
 *
 * @constructor
 * @augments Base
 * @alias NamedBase
 * @param {String|Array} args [description]
 * @param {Object} options [description]
 */

module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  }
});
