'use strict';

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showWarnings = function showWarnings() {
  // Warn if outdated
  _shelljs2.default.exec('npm outdated -g react-native-cli');
};

// These tools are slower to check
var verifyExtensiveTools = function verifyExtensiveTools() {
  // verify rnpm exists
  if (!_shelljs2.default.which('rnpm')) {
    console.log(_safe2.default.red('This script requires rnpm to be installed.'));
    console.log(_safe2.default.green('Installing rnpm...'));
    _shelljs2.default.exec('npm i -g rnpm');
    // Enforce latest rnpm -> line count of npm outdated should be zero
  } else if (!_shelljs2.default.exec('npm outdated -g rnpm | wc -l | grep 0')) {
      console.log(_safe2.default.red('We depend on an updated rnpm.'));
      console.log(_safe2.default.yellow('Please update with ') + _safe2.default.green('npm i -g rnpm'));
      console.log(_safe2.default.red('Exiting!'));
      _shelljs2.default.exit(1);
    }
};

module.exports = { showWarnings: showWarnings, verifyExtensiveTools: verifyExtensiveTools };