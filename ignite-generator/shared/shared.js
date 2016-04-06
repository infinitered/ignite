'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyFolder = function emptyFolder(folder) {
  _shelljs2.default.rm('-rf', folder);
  _shelljs2.default.mkdir(folder);
};

var verifyTools = function verifyTools() {
  // verify react-native
  if (!_shelljs2.default.which('react-native')) {
    console.log(colors.red('This script requires react-native to be installed first.'));
    _shelljs2.default.exit(1);
  }

  // Warn if outdated
  _shelljs2.default.exec('npm outdated react-native-cli');

  // verify git
  if (!_shelljs2.default.which('git')) {
    console.log(colors.red('This script requires git to be installed first.'));
    _shelljs2.default.exit(1);
  }

  // verify rnpm
  if (!_shelljs2.default.which('rnpm')) {
    console.log(colors.red('This script requires rnpm to be installed.'));
    console.log(colors.green('Installing rnpm...'));
    _shelljs2.default.exec('npm i -g rnpm');
  }

  // Warn if outdated
  _shelljs2.default.exec('npm outdated rnpm');
};

module.exports = { verifyTools: verifyTools, emptyFolder: emptyFolder };