#! /usr/bin/env node

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _utilities = require('../utilities');

var Utilities = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var copyOverScreenContainer = function copyOverScreenContainer(context) {
  // copy screen template
  context.fs.copyTpl(context.templatePath('screen.js.template'), context.destinationPath('./App/Containers/' + context.name + '.js'), { name: context.name });

  // copy screen style template
  context.fs.copyTpl(context.templatePath('screen-style.js.template'), context.destinationPath('./App/Containers/Styles/' + context.name + 'Style.js'), { name: context.name });
};

var addToRoutes = function addToRoutes(context) {
  var newRoute = '  get ' + context.name + ' () {\n    return {\n      title: \'' + context.name + '\',\n      component: require(\'../Containers/' + context.name + '\').default,\n      leftButton: \'BACK\'\n    }\n  }\n';
  Utilities.insertInFile('App/Navigation/Routes.js', 'get ', newRoute, false);
};

var ScreenGenerator = function (_NamedBase) {
  _inherits(ScreenGenerator, _NamedBase);

  function ScreenGenerator() {
    _classCallCheck(this, ScreenGenerator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenGenerator).apply(this, arguments));
  }

  _createClass(ScreenGenerator, [{
    key: 'generateApp',
    value: function generateApp() {
      // Copy over component files.
      copyOverScreenContainer(this);
    }
  }, {
    key: 'end',
    value: function end() {
      // insert screen into routes file
      addToRoutes(this);

      console.log('Time to get cooking! 🍽 ');
    }
  }]);

  return ScreenGenerator;
}(_yeomanGenerator.NamedBase);

module.exports = ScreenGenerator;