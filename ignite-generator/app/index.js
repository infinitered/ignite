#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _yeomanGenerator = require('yeoman-generator');

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _utilities = require('../utilities');

var Utilities = _interopRequireWildcard(_utilities);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

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

/**
 * Doctors the AndroidManifest.xml to put in the stuff we need.
 */
var performInserts = function performInserts(name) {
  // Add permissions for push notifications
  var pushPermissions = '\n    <permission\n        android:name="${applicationId}.permission.C2D_MESSAGE"\n        android:protectionLevel="signature" />\n    <uses-permission android:name="${applicationId}.permission.C2D_MESSAGE" />\n    <uses-permission android:name="android.permission.VIBRATE" />\n  ';

  var appEntries = '\n      <receiver\n          android:name="com.google.android.gms.gcm.GcmReceiver"\n          android:exported="true"\n          android:permission="com.google.android.c2dm.permission.SEND" >\n          <intent-filter>\n              <action android:name="com.google.android.c2dm.intent.RECEIVE" />\n              <category android:name="${applicationId}" />\n          </intent-filter>\n      </receiver>\n\n      <service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationRegistrationService"/>\n      <service\n          android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"\n          android:exported="false" >\n          <intent-filter>\n              <action android:name="com.google.android.c2dm.intent.RECEIVE" />\n          </intent-filter>\n      </service>\n  ';

  Utilities.insertInFile(name + '/android/app/src/main/AndroidManifest.xml', 'SYSTEM_ALERT_WINDOW', pushPermissions);
  Utilities.insertInFile(name + '/android/app/src/main/AndroidManifest.xml', 'android:theme', appEntries);
};

/**
 * A green checkmark
 */
var check = _safe2.default.green('✔︎');

/**
 * A red x.
 */
var xmark = _safe2.default.red('𝗫');

/**
 * Is this command installed on ze computer?
 */
var isCommandInstalled = function isCommandInstalled(command) {
  return !!_shelljs2.default.which(command);
};

/**
 * Behold.  The Yeoman generator to install Ignite.
 *
 * These methods get executed top-to-bottom.  The methods that start with an _ are not automatically run.
 * This is a Yeomanism.
 *
 * Also, a few of these functions like `initializing` and `end` are reserved lifecycle methods.
 * This too is a Yeomanism.
 *
 * Finally, if you want to ensure your task finishes before starting the next one, either return a
 * promise, or call `const done = this.async()` before and `done()` once you're finished your task.
 * And yes.  That too is a Yeomanism.
 */

var AppGenerator = exports.AppGenerator = function (_NamedBase) {
  _inherits(AppGenerator, _NamedBase);

  function AppGenerator() {
    _classCallCheck(this, AppGenerator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppGenerator).apply(this, arguments));
  }

  _createClass(AppGenerator, [{
    key: 'initializing',


    /**
     * Entry point.  Let's set this up.
     */
    value: function initializing() {
      // this is a fresh install, so let's always clobber the destination.
      this.conflicter.force = true;
      // prep our spinner
      this.spinner = (0, _ora2.default)('starting');

      this.log('-----------------------------------------------');
      this.log(_safe2.default.red('  (                  )   (                   '));
      this.log(_safe2.default.red('  )\\ )   (        ( /(   )\\ )    *   )       '));
      this.log(_safe2.default.red(' (()/(   )\\ )     )\\()) (()/(  ` )  /(   (   '));
      this.log(_safe2.default.red('  /(_)) (()/(    ((_)\\   /(_))  ( )(_))  )\\  '));
      this.log(_safe2.default.red(' (_))    /(_))_   _((_) (_))   (_(_())  ((_) '));
      this.log(' |_ _|  ' + _safe2.default.red('(_))') + ' __| | \\| | |_ _|  |_   _|  | __|');
      this.log('  | |     | (_ | | .` |  | |     | |    | _| ');
      this.log(' |___|     \\___| |_|\\_| |___|    |_|    |___|');
      this.log('-----------------------------------------------');
      this.log('');
      this.log('An unfair headstart for your React Native apps.');
      this.log(_safe2.default.yellow('https://ignite.infinite.red'));
      this.log('');
      this.log('-----------------------------------------------');

      this.log('Igniting ' + _safe2.default.yellow(this.name) + '\n');
    }

    /**
     * Check for react-native.
     */

  }, {
    key: 'findReactNativeCli',
    value: function findReactNativeCli() {
      var status = 'Finding react-native';
      this.spinner.text = status;
      this.spinner.start();
      if (!isCommandInstalled('react-native')) {
        this.log(xmark + ' Missing react-native - \'npm install -g react-native-cli\'');
        process.exit(1);
      }
      this.spinner.stop();
      this.log(check + ' Found react-native');
    }

    /**
     * Check for git.
     */

  }, {
    key: 'findGit',
    value: function findGit() {
      var status = 'Finding git';
      this.spinner.text = status;
      this.spinner.start();
      if (!isCommandInstalled('git')) {
        this.log(xmark + ' Missing git');
        process.exit(1);
      }
      this.spinner.stop();
      this.log(check + ' Found git');
    }

    /**
     * Check for rnpm.
     */

  }, {
    key: 'findRnpm',
    value: function findRnpm() {
      var _this2 = this;

      var status = 'Finding rnpm';
      this.spinner.text = status;
      this.spinner.start();
      if (!isCommandInstalled('rnpm')) {
        this.log(xmark + ' Missing rnpm - \'npm install -g rnpm\'');
        process.exit(1);
      }
      var done = this.async();
      // check an outdated version of rnpm (< 1.7.0)
      var minimumRnpm = '1.7.0';
      _shelljs2.default.exec('rnpm --version', { silent: true }, function (code, stdout, stderr) {
        var rnpmVersion = stdout.replace(/\s/, '');
        _this2.spinner.stop();
        if (_semver2.default.lt(rnpmVersion, minimumRnpm)) {
          _this2.log(xmark + ' rnpm ' + minimumRnpm + ' required - \'npm install -g rnpm\'');
          process.exit(1);
        } else {
          _this2.log(check + ' Found rnpm');
          done();
        }
      });
    }

    /**
     * Do a quick clean up of the template folder.
     */

  }, {
    key: 'cleanBeforeRunning',
    value: function cleanBeforeRunning() {
      var status = 'Getting ready for guests';
      this.spinner.text = status;
      this.spinner.start();
      emptyFolder(this.sourceRoot());
      this.spinner.stop();
      this.log(check + ' ' + status);
    }

    /**
     * Run React Native init.
     */

  }, {
    key: 'reactNativeInit',
    value: function reactNativeInit() {
      var _this3 = this;

      var status = 'Running React Native setup (~ 1 minute)';
      this.spinner.start();
      this.spinner.text = status;
      var done = this.async();
      var command = 'react-native';
      var commandOpts = ['init', this.name];
      this.spawnCommand(command, commandOpts, { stdio: 'ignore' }).on('close', function () {
        _this3.spinner.stop();
        _this3.log(check + ' ' + status);
        done();
      });
    }

    /**
     * Ensure we have the latest Ignite templates.
     */

  }, {
    key: 'downloadLatestIgnite',
    value: function downloadLatestIgnite() {
      var _this4 = this;

      var status = 'Downloading latest Ignite files';
      this.spinner.start();
      this.spinner.text = status;
      var done = this.async();
      var command = 'git';
      var commandOpts = ['clone', 'https://github.com/infinitered/ignite.git', this.sourceRoot()];
      this.spawnCommand(command, commandOpts, { stdio: 'ignore' }).on('close', function () {
        _this4.spinner.stop();
        _this4.log(check + ' ' + status);
        done();
      });
    }

    /**
     * Helper to copy a file to the destination.
     */

  }, {
    key: '_cpFile',
    value: function _cpFile(fromFilename, toFilename) {
      var from = this.templatePath(igniteBase + '/' + fromFilename);
      var to = this.destinationPath(this.name + '/' + toFilename);
      this.fs.copyTpl(from, to, { name: this.name });
    }

    /**
     * Helper to copy a template to the destination.
     */

  }, {
    key: '_cpTemplate',
    value: function _cpTemplate(filename) {
      this._cpFile(filename + '.template', filename);
    }

    /**
     * Helper to copy a directory to the destination.
     */

  }, {
    key: '_cpDirectory',
    value: function _cpDirectory(directory) {
      this.directory(this.templatePath(igniteBase + '/' + directory), this.destinationPath(this.name + '/' + directory));
    }

    /**
     * Let's ignite all up in hurrr.
     */

  }, {
    key: 'copyExistingStuff',
    value: function copyExistingStuff() {
      var status = 'Copying Ignite goodies';
      this.spinner.start();
      this.spinner.text = status;

      this._cpTemplate('README.md');
      this._cpTemplate('package.json');
      this._cpFile('index.js.template', 'index.ios.js');
      this._cpFile('index.js.template', 'index.android.js');
      this._cpDirectory('git_hooks');
      this._cpDirectory('Tests');
      this._cpDirectory('App');

      this.spinner.stop();
      this.log(check + ' ' + status);
    }

    /**
     * Let's hand tweak the the android manifest because rnpm doesn't support that just yet.
     */

  }, {
    key: '_updateAndroidManifest',
    value: function _updateAndroidManifest() {
      var status = 'Updating android manifest file';
      this.spinner.start();
      this.spinner.text = status;
      performInserts(this.name);
      this.spinner.stop();
      this.log(check + ' ' + status);
    }

    /**
     * Let's clean up any temp files.
     */

  }, {
    key: '_cleanAfterRunning',
    value: function _cleanAfterRunning() {
      var status = 'Cleaning up after messy guests';
      this.spinner.text = status;
      this.spinner.start();
      emptyFolder(this.sourceRoot());
      this.spinner.stop();
      this.log(check + ' ' + status);
    }

    /**
     * Installs npm then rnpm ...
     * Also, sadly, we need this install the install() function due to how
     * Yeoman times its template copies.  :(
     */

  }, {
    key: 'install',
    value: function install() {
      var _this5 = this;

      var npmStatus = 'Installing Ignite dependencies (~30 seconds-ish)';
      this.spinner.start();
      this.spinner.text = npmStatus;
      var done = this.async();
      var dir = _shelljs2.default.pwd() + '/' + this.name;
      // run the npm command
      this.spawnCommand('npm', ['install'], { cwd: dir, stdio: 'ignore' }).on('close', function () {
        _this5.spinner.stop();
        _this5.log(check + ' ' + npmStatus);

        // then run the rnpm command
        var rnpmStatus = 'Linking with rnpm';
        _this5.spinner.start();
        _this5.spinner.text = rnpmStatus;
        _this5.spawnCommand('rnpm', ['link'], { cwd: dir, stdio: 'ignore' }).on('close', function () {
          _this5.spinner.stop();
          _this5.log(check + ' ' + rnpmStatus);

          // then update the android manifest
          _this5._updateAndroidManifest();
          done();
        });
      });
    }

    /**
     * Hold for applause.
     */

  }, {
    key: 'end',
    value: function end() {
      this._cleanAfterRunning();
      this.spinner.stop();
      this.log('');
      this.log('Time to get cooking! 🍽 ');
      this.log('');
      this.log('To run in iOS:');
      this.log(_safe2.default.yellow('  cd ' + this.name));
      this.log(_safe2.default.yellow('  react-native run-ios'));
      this.log('');
      this.log('To run in Android:');
      this.log(_safe2.default.yellow('  cd ' + this.name));
      this.log(_safe2.default.yellow('  react-native run-android'));
      this.log('');
    }
  }]);

  return AppGenerator;
}(_yeomanGenerator.NamedBase);

module.exports = AppGenerator;