'use strict';
var path = require('path');
var fs = require('graceful-fs');
var stripBom = require('strip-bom');
var stripBomStream = require('strip-bom-stream');
var File = require('vinyl');

exports.read = function (pth, opts, cb) {
	opts = opts || {};

	if (typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	var cwd = opts.cwd || process.cwd();
	var base = opts.base || cwd;

	pth = path.resolve(cwd, pth);

	fs.stat(pth, function (err, stat) {
		if (err) {
			cb(err);
			return;
		}

		var file = new File({
			cwd: cwd,
			base: base,
			path: pth,
			stat: stat
		});

		if (opts.read === false) {
			cb(null, file);
			return;
		}

		if (opts.buffer === false) {
			file.contents = fs.createReadStream(pth).pipe(stripBomStream());
			cb(null, file);
			return;
		}

		fs.readFile(pth, function (err, buf) {
			if (err) {
				cb(err);
				return;
			}

			file.contents = stripBom(buf);
			cb(null, file);
		});
	});
};

exports.readSync = function (pth, opts) {
	opts = opts || {};

	var cwd = opts.cwd || process.cwd();
	var base = opts.base || cwd;

	pth = path.resolve(cwd, pth);

	var contents;

	if (opts.read !== false) {
		contents = opts.buffer === false ?
			fs.createReadStream(pth).pipe(stripBomStream()) :
			stripBom(fs.readFileSync(pth));
	}

	return new File({
		cwd: cwd,
		base: base,
		path: pth,
		stat: fs.statSync(pth),
		contents: contents
	});
};
