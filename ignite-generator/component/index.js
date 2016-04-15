#! /usr/bin/env node

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _validation = require('../validation');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var copyOverCompoment = function copyOverCompoment(context) {
  // copy component template
  context.fs.copyTpl(context.templatePath('component.js.template'), context.destinationPath('./App/Components/' + context.name + '.js'), { name: context.name });

  // copy component style template
  context.fs.copyTpl(context.templatePath('component-style.js.template'), context.destinationPath('./App/Components/Styles/' + context.name + 'Style.js'), { name: context.name });
};

var ComponentGenerator = function (_NamedBase) {
  _inherits(ComponentGenerator, _NamedBase);

  function ComponentGenerator() {
    _classCallCheck(this, ComponentGenerator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ComponentGenerator).apply(this, arguments));
  }

  _createClass(ComponentGenerator, [{
    key: 'initializing',
    value: function initializing() {
      // Fail if tools are missing
      (0, _validation.verifyTools)();
    }
  }, {
    key: 'generateApp',
    value: function generateApp() {
      // Copy over component files.
      copyOverCompoment(this);
    }
  }, {
    key: 'end',
    value: function end() {
      console.log('Time to get cooking! 🍽 ');
    }
  }]);

  return ComponentGenerator;
}(_yeomanGenerator.NamedBase);

module.exports = ComponentGenerator;