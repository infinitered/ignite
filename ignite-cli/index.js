#! /usr/bin/env node

'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// version
_commander2.default.version(_package2.default.version);

// new
_commander2.default.command('new <project>').description('ignite a new base project').alias('n').action(function (project) {
  console.log('🔥 Setting ' + project + ' on fire 🔥');
});

// generate
_commander2.default.command('generate <type> <name>').description('create a new component, container etc.').alias('g').action(function (type, name) {
  console.log('You would like to generate a new ' + type + ' named ' + name);
});

// parse params
_commander2.default.parse(process.argv);

// no params, print help
if (!_commander2.default.args.length) _commander2.default.help();