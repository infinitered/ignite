#! /usr/bin/env node

'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIRE = _safe2.default.red('FIRE!');

var checkYo = function checkYo() {
  if (!_shelljs2.default.which('yo')) {
    console.log(_safe2.default.red('This command requires yo to be installed.'));
    console.log(_safe2.default.green('Installing yo...'));
    _shelljs2.default.exec('npm i -g yo');
  }
};

// version
_commander2.default.version(_package2.default.version);

// new
_commander2.default.command('new <project>').description('ignite a new base project').alias('n').action(function (project) {
  checkYo();
  console.log('🔥 Setting ' + project + ' on ' + FIRE + ' 🔥');
  _shelljs2.default.exec('yo react-native-ignite ' + project);
});

// generate
_commander2.default.command('generate <type> <name>').description('create a new component, container etc.').alias('g').action(function (type, name) {
  checkYo();
  console.log('Generate a new ' + type + ' named ' + name);
  _shelljs2.default.exec('yo react-native-ignite:' + type + ' ' + name);
});

// parse params
_commander2.default.parse(process.argv);

// no params, print help
if (!_commander2.default.args.length) _commander2.default.help();