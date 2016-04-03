# semver-truncate [![Build Status](https://travis-ci.org/sindresorhus/semver-truncate.svg?branch=master)](https://travis-ci.org/sindresorhus/semver-truncate)

> Truncate a semver version: `1.2.3` → `1.2.0`


## Install

```sh
$ npm install --save semver-truncate
```


## Usage

```js
var semverTruncate = require('semver-truncate');

semverTruncate('1.2.3-foo', 'patch');
//=> '1.2.3'

semverTruncate('1.2.3', 'minor');
//=> '1.2.0'

semverTruncate('1.2.3', 'major');
//=> '1.0.0'
```


## API

### truncateSemver(version, type)

#### version

*Required*  
Type: `string`

Semver version.

#### type

*Required*  
Type: `string`  
Values: `'patch'`, `'minor'`, `'major'`

The version type you want to truncate to.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
