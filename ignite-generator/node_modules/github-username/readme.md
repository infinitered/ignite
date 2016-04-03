# github-username [![Build Status](https://travis-ci.org/sindresorhus/github-username.svg?branch=master)](https://travis-ci.org/sindresorhus/github-username)

> Get a GitHub username from an email address

*Only works for users that have their email publicly listed on their profile.*


## Install

```
$ npm install --save github-username
```


## Usage

```js
var githubUsername = require('github-username');

githubUsername('sindresorhus@gmail.com', function (err, username) {
	console.log(username);
	//=> 'sindresorhus'
});
```


## API

### githubUsername(email, [token], callback)

#### email

*Required*  
Type: `string`

Email address for the user of whom you want the username.

#### token

Type: `string`  

GitHub [personal access token](https://github.com/settings/tokens/new).

#### callback(err, username)


## CLI

```
$ npm install --global github-username
```

```
$ github-username --help

  Usage
    github-username <email> [--token OAUTH-TOKEN]
    echo <email> | github-username

  Example
    github-username sindresorhus@gmail.com
    sindresorhus
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
