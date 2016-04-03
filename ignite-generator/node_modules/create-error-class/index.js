'use strict';

var inherits = require('inherits');
var captureStackTrace = require('capture-stack-trace');

module.exports = function createErrorClass(className, setup) {
	if (typeof className !== 'string') {
		throw new TypeError('Expected className to be a string');
	}

	if (/[^0-9a-zA-Z_$]/.test(className)) {
		throw new Error('className contains invalid characters');
	}

	setup = setup || function () {};

	/* jshint evil:true */
	var ErrorClass = eval('(function ' + className + '() { captureStackTrace(this, this.constructor); setup.apply(this, arguments); })');

	inherits(ErrorClass, Error);
	ErrorClass.prototype.name = className;

	return ErrorClass;
};
