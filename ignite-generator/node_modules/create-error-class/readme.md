# create-error-class [![Build Status](https://travis-ci.org/floatdrop/create-error-class.svg?branch=master)](https://travis-ci.org/floatdrop/create-error-class)

> Create error class


## Install

```
$ npm install --save create-error-class
```


## Usage

```js
var createErrorClass = require('create-error-class');

var HTTPError = createErrorClass('HTTPError', function (props) {
	this.message = 'Status code is ' + props.statusCode;
});

throw new HTTPError({statusCode: 404});
```


## API

### createErrorClass(className, [setup])

Return constructor of Errors with `className`.

#### className

*Required*  
Type: `string`

Class name of Error Object. Should contain characters, validated by this regex: `[^0-9a-zA-Z_$]`.

#### setup
Type: `function`

Setup function, that will be called after each Error object is created from constructor with context of Error object.

## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
