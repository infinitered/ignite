'use strict';
var got = require('got');
var objectAssign = require('object-assign');
var Promise = require('pinkie-promise');

function ghGot(path, opts) {
	if (typeof path !== 'string') {
		return Promise.reject(new TypeError('Path should be a string'));
	}

	opts = objectAssign({json: true, endpoint: 'https://api.github.com/'}, opts);

	opts.headers = objectAssign({
		'accept': 'application/vnd.github.v3+json',
		'user-agent': 'https://github.com/sindresorhus/gh-got'
	}, opts.headers);

	var env = process.env;
	var token = env.GITHUB_TOKEN || opts.token;

	if (token) {
		opts.headers.authorization = 'token ' + token;
	}

	// https://developer.github.com/v3/#http-verbs
	if (opts.method && opts.method.toLowerCase() === 'put' && !opts.body) {
		opts.headers['content-length'] = 0;
	}

	var endpoint = env.GITHUB_ENDPOINT ? env.GITHUB_ENDPOINT.replace(/[^/]$/, '$&/') : opts.endpoint;
	var url = /https?/.test(path) ? path : endpoint + path;

	if (opts.stream) {
		return got.stream(url, opts);
	}

	return got(url, opts);
}

var helpers = [
	'get',
	'post',
	'put',
	'patch',
	'head',
	'delete'
];

helpers.forEach(function (el) {
	ghGot[el] = function (url, opts) {
		return ghGot(url, objectAssign({}, opts, {method: el.toUpperCase()}));
	};
});

ghGot.stream = function (url, opts) {
	return ghGot(url, objectAssign({}, opts, {json: false, stream: true}));
};

helpers.forEach(function (el) {
	ghGot.stream[el] = function (url, opts) {
		return ghGot.stream(url, objectAssign({}, opts, {method: el.toUpperCase()}));
	};
});

module.exports = ghGot;
