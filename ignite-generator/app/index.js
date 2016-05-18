#! /usr/bin/env node

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _yeomanGenerator = require('yeoman-generator');

var _validation = require('../validation');

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _utilities = require('../utilities');

var Utilities = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var igniteBase = 'ignite-base';

var emptyFolder = function emptyFolder(folder) {
  _shelljs2.default.rm('-rf', folder);
  _shelljs2.default.mkdir(folder);
};

var copyOverBase = function copyOverBase(context) {
  // copy New project Readme
  context.fs.copyTpl(context.templatePath(igniteBase + '/README.md.template'), context.destinationPath(context.name + '/README.md'), { name: context.name });

  // copy package.json
  context.fs.copyTpl(context.templatePath(igniteBase + '/package.json.template'), context.destinationPath(context.name + '/package.json'), { name: context.name });

  // copy template of index.ios.js
  context.fs.copyTpl(context.templatePath(igniteBase + '/index.js.template'), context.destinationPath(context.name + '/index.ios.js'), { name: context.name });

  // copy template of index.android.js
  context.fs.copyTpl(context.templatePath(igniteBase + '/index.js.template'), context.destinationPath(context.name + '/index.android.js'), { name: context.name });

  // copy git_hooks/
  context.directory(context.templatePath(igniteBase + '/git_hooks'), context.destinationPath(context.name + '/git_hooks'));

  // copy Tests/
  context.directory(context.templatePath(igniteBase + '/Tests'), context.destinationPath(context.name + '/Tests'));

  // copy App/
  context.directory(context.templatePath(igniteBase + '/App'), context.destinationPath(context.name + '/App'));
};

var performInserts = function performInserts(name) {
  // Add permissions for push notifications
  var pushPermissions = '\n    <permission\n        android:name="${applicationId}.permission.C2D_MESSAGE"\n        android:protectionLevel="signature" />\n    <uses-permission android:name="${applicationId}.permission.C2D_MESSAGE" />\n    <uses-permission android:name="android.permission.VIBRATE" />\n  ';

  var appEntries = '\n      <receiver\n          android:name="com.google.android.gms.gcm.GcmReceiver"\n          android:exported="true"\n          android:permission="com.google.android.c2dm.permission.SEND" >\n          <intent-filter>\n              <action android:name="com.google.android.c2dm.intent.RECEIVE" />\n              <category android:name="${applicationId}" />\n          </intent-filter>\n      </receiver>\n\n      <service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationRegistrationService"/>\n      <service\n          android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"\n          android:exported="false" >\n          <intent-filter>\n              <action android:name="com.google.android.c2dm.intent.RECEIVE" />\n          </intent-filter>\n      </service>\n  ';

  Utilities.insertInFile(name + '/android/app/src/main/AndroidManifest.xml', 'SYSTEM_ALERT_WINDOW', pushPermissions);
  Utilities.insertInFile(name + '/android/app/src/main/AndroidManifest.xml', 'android:theme', appEntries);
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
      console.log(_safe2.default.yellow('generate app -> ') + this.name + ' ☕️  This will take a while ☕️ ');
      // force overwrite on conflicts (default is ask user)
      this.conflicter.force = true;

      (0, _validation.showWarnings)();
      // Fail if tools are missing
      (0, _validation.verifyTools)();
      (0, _validation.verifyExtensiveTools)();

      this.templateFolder = this.sourceRoot();
      // Clean template folder
      emptyFolder(this.templateFolder);
    }
  }, {
    key: 'generateApp',
    value: function generateApp() {
      // Create latest RN project
      this.spawnCommandSync('react-native', ['init', this.name, '--verbose']);

      // Grab latest RNBase into templates folder
      _shelljs2.default.exec('git clone git@github.com:infinitered/ignite.git ' + this.templateFolder);

      // Copy over files from RN Base that apply
      copyOverBase(this);
    }
  }, {
    key: 'install',
    value: function install() {
      // npm install copied package.json via `npm --prefix ./some_project install ./some_project`
      this.spawnCommandSync('npm', ['--prefix', './' + this.name, 'install', './' + this.name]);
      // Do rnpm link
      // Separate process now, due to hang - Shell.exec(`cd ${this.name} && rnpm link`)
      _shelljs2.default.exec('cd ' + this.name + ' && rnpm link &', { async: true, silent: true });
    }
  }, {
    key: 'end',
    value: function end() {
      // Clean template folder
      emptyFolder(this.templateFolder);

      // Things rnmp didn't do
      performInserts(this.name);

      console.log('Time to get cooking! 🍽 ');
    }
  }]);

  return AppGenerator;
}(_yeomanGenerator.NamedBase);

module.exports = AppGenerator;