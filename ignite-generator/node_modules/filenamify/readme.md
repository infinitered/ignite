# filenamify [![Build Status](https://travis-ci.org/sindresorhus/filenamify.svg?branch=master)](https://travis-ci.org/sindresorhus/filenamify)

> Convert a string to a valid filename

On Unix-like systems `/` is reserved and [`<>:"/\|?*`](http://msdn.microsoft.com/en-us/library/aa365247%28VS.85%29#naming_conventions) on Windows.


## Install

```
$ npm install --save filenamify
```


## Usage

```js
var filenamify = require('filenamify');

filenamify('<foo/bar>');
//=> foo!bar

filenamify('foo:"bar"', {replacement: '🐴'});
//=> foo🐴bar
```


## API

### filenamify(input, [options])

Accepts a filename and returns a valid filename.

### filenamify.path(input, [options])

Accepts a path and returns the path with a valid filename.

#### input

*Required*  
Type: `string`

#### options

##### replacement

Type: `string`  
Default: `'!'`

String to use as replacement for reserved filename characters.

Cannot contain: `<` `>` `:` `"` `/` `\` `|` `?` `*`


## Related

- [filenamify-url](https://github.com/sindresorhus/filenamify-url) - Convert a URL to a valid filename
- [valid-filename](https://github.com/sindresorhus/valid-filename) - Check if a string is a valid filename


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
