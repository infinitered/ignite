#! /usr/bin/env node

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _yeomanGenerator = require('yeoman-generator');

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var verifyTools = function verifyTools() {
  // verify react-native
  if (!_shelljs2.default.which('react-native')) {
    console.log(_safe2.default.red('This script requires react-native to be installed first.'));
    _shelljs2.default.exit(1);
  }

  // Warn if outdated
  _shelljs2.default.exec('npm outdated react-native-cli');

  // verify git
  if (!_shelljs2.default.which('git')) {
    console.log(_safe2.default.red('This script requires git to be installed first.'));
    _shelljs2.default.exit(1);
  }

  // verify rnpm
  if (!_shelljs2.default.which('rnpm')) {
    console.log(_safe2.default.red('This script requires rnpm to be installed.'));
    _shelljs2.default.exec('npm i -g rnpm');
  }

  // Warn if outdated
  _shelljs2.default.exec('npm outdated rnpm');
};

var copyOverBase = function copyOverBase(context) {
  // copy New project Readme
  context.fs.copyTpl(context.templatePath('README.md.template'), context.destinationPath(context.name + '/README.md'), { name: context.name });

  // copy package.json
  context.fs.copyTpl(context.templatePath('package.json.template'), context.destinationPath(context.name + '/package.json'), { name: context.name });

  // copy template of index.ios.js
  context.fs.copyTpl(context.templatePath('index.js.template'), context.destinationPath(context.name + '/index.ios.js'), { name: context.name });

  // copy template of index.android.js
  context.fs.copyTpl(context.templatePath('index.js.template'), context.destinationPath(context.name + '/index.android.js'), { name: context.name });

  // copy git_hooks/
  context.directory(context.templatePath('git_hooks'), context.destinationPath(context.name + '/git_hooks'));

  // copy Tests/
  context.directory(context.templatePath('Tests'), context.destinationPath(context.name + '/Tests'));

  // copy App/
  context.directory(context.templatePath('App'), context.destinationPath(context.name + '/App'));
};

var emptyFolder = function emptyFolder(folder) {
  _shelljs2.default.rm('-rf', folder);
  _shelljs2.default.mkdir(folder);
};

var AppGenerator = function (_NamedBase) {
  _inherits(AppGenerator, _NamedBase);

  function AppGenerator() {
    _classCallCheck(this, AppGenerator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppGenerator).apply(this, arguments));
  }

  _createClass(AppGenerator, [{
    key: 'initializing',
    value: function initializing() {
      console.log(_safe2.default.yellow('irrigate app -> ') + this.name + ' ☕️ This will take a while ☕️ ');
      // force overwrite on conflicts (default is ask user)
      this.conflicter.force = true;

      // Fail if tools are missing
      verifyTools();

      this.templateFolder = this.sourceRoot();
      // Clean template folder
      emptyFolder(this.templateFolder);
    }
  }, {
    key: 'generateApp',
    value: function generateApp() {
      // Create latest RN project
      this.spawnCommandSync('react-native', ['init', this.name]);

      // Grab latest RNBase into templates folder
      _shelljs2.default.exec('git clone git@github.com:infinitered/react_native_base.git ' + this.templateFolder);

      // Copy over files from RN Base that apply
      copyOverBase(this);
    }
  }, {
    key: 'install',
    value: function install() {
      // npm install copied package.json via `npm --prefix ./some_project install ./some_project`
      this.spawnCommandSync('npm', ['--prefix', './' + this.name, 'install', './' + this.name]);
      // Do rnpm link
      _shelljs2.default.exec('cd ' + this.name + ' && rnpm link');
    }
  }, {
    key: 'end',
    value: function end() {
      // Clean template folder
      emptyFolder(this.templateFolder);

      console.log('Time to get cooking! ' + _safe2.default.red('IRrigate is Done!'));
    }
  }]);

  return AppGenerator;
}(_yeomanGenerator.NamedBase);

module.exports = AppGenerator;