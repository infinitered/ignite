'use strict';
var zlib = require('zlib');

module.exports = function (res) {
	if (['gzip', 'deflate'].indexOf(res.headers['content-encoding']) !== -1) {
		var unzip = zlib.createUnzip();

		unzip.httpVersion = res.httpVersion;
		unzip.headers = res.headers;
		unzip.rawHeaders = res.rawHeaders;
		unzip.trailers = res.trailers;
		unzip.rawTrailers = res.rawTrailers;
		unzip.setTimeout = res.setTimeout.bind(res);
		unzip.statusCode = res.statusCode;
		unzip.statusMessage = res.statusMessage;
		unzip.socket = res.socket;

		res.on('close', function () {
			unzip.emit('close');
		});

		res = res.pipe(unzip);
	}

	return res;
};
