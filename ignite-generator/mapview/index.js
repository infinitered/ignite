#! /usr/bin/env node

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _utilities = require('../utilities');

var Utilities = _interopRequireWildcard(_utilities);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var copyOverMapviewFiles = function copyOverMapviewFiles(context) {
  // copy mapview template
  context.fs.copyTpl(context.templatePath('mapview.js.template'), context.destinationPath('./App/Containers/' + context.name + '.js'), { name: context.name });

  // copy mapcallout template
  context.fs.copyTpl(context.templatePath('mapcallout.js.template'), context.destinationPath('./App/Components/MapCallout.js'), {});

  // copy maphelpers template
  context.fs.copyTpl(context.templatePath('maphelpers.js.template'), context.destinationPath('./App/Lib/MapHelpers.js'), {});

  // copy mapview style template
  context.fs.copyTpl(context.templatePath('mapview-style.js.template'), context.destinationPath('./App/Containers/Styles/' + context.name + 'Style.js'), { name: context.name });

  // copy mapcallout style template
  context.fs.copyTpl(context.templatePath('mapcallout-style.js.template'), context.destinationPath('./App/Components/Styles/MapCalloutStyle.js'), { name: context.name });
};

var addToRoutes = function addToRoutes(context) {
  var newRoute = '  get ' + context.name + ' () {\n    return {\n      title: \'' + context.name + '\',\n      component: require(\'../Containers/' + context.name + '\').default,\n      leftButton: \'BACK\'\n    }\n  }\n';
  Utilities.insertInFile('App/Navigation/Routes.js', 'get ', newRoute, false);
};

var check = _safe2.default.green('✔︎');

/**
 * Doctors the AndroidManifest.xml to put in the stuff we need.
 */
var insertApiKey = function insertApiKey() {
  // Add Google Maps API key for Android.
  var metaData = '\n      <meta-data\n        android:name="com.google.android.geo.API_KEY"\n        android:value="AIzaSyBcCdKMCWtxN1mXHlVE6z5cLVXIPWaEcso"/>\n  ';

  var dir = '' + _shelljs2.default.pwd();
  Utilities.insertInFile(dir + '/android/app/src/main/AndroidManifest.xml', '</application>', metaData, false);
};

var MapviewGenerator = function (_Generators$Base) {
  _inherits(MapviewGenerator, _Generators$Base);

  function MapviewGenerator(args, options) {
    _classCallCheck(this, MapviewGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapviewGenerator).call(this, args, options));

    _this.argument('name', { type: String, required: true });
    return _this;
  }

  _createClass(MapviewGenerator, [{
    key: 'generateMapview',
    value: function generateMapview() {
      // Copy over component files.
      copyOverMapviewFiles(this);
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
      insertApiKey();
      this.spinner.stop();
      this.log(check + ' ' + status);
    }
  }, {
    key: 'install',
    value: function install() {
      var _this2 = this;

      this.spinner = (0, _ora2.default)('starting');
      var npmStatus = 'Installing react-native-maps';
      this.spinner.start();
      this.spinner.text = npmStatus;
      var done = this.async();
      // run the npm command
      this.spawnCommand('npm', ['install', '--save', 'skellock/react-native-maps\#friends-with-28'], { stdio: 'ignore' }).on('close', function () {
        _this2.spinner.stop();
        _this2.log(check + ' ' + npmStatus);

        // then run the rnpm command
        var rnpmStatus = 'Linking with rnpm';
        _this2.spinner.start();
        _this2.spinner.text = rnpmStatus;
        _this2.spawnCommand('rnpm', ['link', 'react-native-maps'], { stdio: 'ignore' }).on('close', function () {
          _this2.spinner.stop();
          _this2.log(check + ' ' + rnpmStatus);

          // update the android manifest
          _this2._updateAndroidManifest();

          done();
        });
      });
    }
  }, {
    key: 'end',
    value: function end() {
      // insert screen into routes file
      addToRoutes(this);

      console.log('Time to get cooking! 🍽 ');
    }
  }]);

  return MapviewGenerator;
}(_yeomanGenerator2.default.Base);

module.exports = MapviewGenerator;