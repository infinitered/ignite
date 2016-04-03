# unzip-response [![Build Status](https://travis-ci.org/sindresorhus/unzip-response.svg?branch=master)](https://travis-ci.org/sindresorhus/unzip-response)

> Unzip a HTTP response if needed

Unzips the response from `http.request` if it's gzipped/deflated, otherwise just passes it through.


## Install

```
$ npm install --save unzip-response
```


## Usage

```js
var http = require('http');
var unzipResponse = require('unzip-response');

http.get('http://sindresorhus.com', function (res) {
	res = unzipResponse(res);
});
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
