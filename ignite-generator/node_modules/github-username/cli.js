#!/usr/bin/env node
'use strict';
var meow = require('meow');
var githubUsername = require('./');

var cli = meow([
	'Usage',
	'  $ github-username <email> [--token=<token>]',
	'',
	'Example',
	'  $ github-username sindresorhus@gmail.com',
	'  sindresorhus'
]);

var email = cli.input[0];

if (!email) {
	console.error('Please specify an email');
	process.exit(1);
}

githubUsername(email, cli.flags.token, function (err, username) {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(username);
});
