#!/usr/bin/env node
'use strict';
var getStdin = require('get-stdin');
var meow = require('meow');
var prettyBytes = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ pretty-bytes <number>',
		'  $ echo <number> | pretty-bytes',
		'',
		'Example',
		'  $ pretty-bytes 1337',
		'  1.34 kB'
	].join('\n')
});

function init(data) {
	console.log(prettyBytes(Number(data)));
}

if (process.stdin.isTTY) {
	if (!cli.input[0]) {
		console.error('Number required');
		process.exit(1);
	}

	init(cli.input[0]);
} else {
	getStdin(init);
}
