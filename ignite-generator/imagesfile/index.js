#! /usr/bin/env node

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _utilities = require('../utilities');

var Utilities = _interopRequireWildcard(_utilities);

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImagesFileGenerator = function (_Generators$Base) {
  _inherits(ImagesFileGenerator, _Generators$Base);

  function ImagesFileGenerator() {
    _classCallCheck(this, ImagesFileGenerator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ImagesFileGenerator).apply(this, arguments));
  }

  _createClass(ImagesFileGenerator, [{
    key: 'replaceFileContents',
    value: function replaceFileContents(theFile, newContents) {
      _fs2.default.writeFileSync(theFile, newContents, 'utf-8');
    }
  }, {
    key: 'generateImagesFile',
    value: function generateImagesFile() {
      var _this2 = this;

      // Copy over component files.
      _fs2.default.readdir('./App/Images', function (err, files) {
        if (err) {
          _this2.log(err, 'Error');
        } else {
          // Files need to be uniquely named before extention!  Otherwise, first come first serve

          // remove @1x, @2x, @3x
          var sizeCleaner = _ramda2.default.replace(/@\dx/, '');
          var prependPath = _ramda2.default.map(_ramda2.default.concat('../Images/'));
          var cleanFiles = _ramda2.default.pipe(_ramda2.default.map(sizeCleaner), _ramda2.default.uniq)(files);

          var camelize = function camelize(str) {
            return str.toLowerCase()
            // Replaces any -,_, or %20 with space
            .replace(/([-_]|%20)+/g, ' ')
            // no extentions por favor
            .replace(/(\..+)/, '')
            // Uppercases the first character in each group immediately following a space
            .replace(/\s(.)/g, _ramda2.default.toUpper)
            // Removes spaces
            .replace(/\s+/g, '');
          };

          var imageKeys = _ramda2.default.map(camelize, cleanFiles);
          // strip extraneous data
          var cleanedFiles = _ramda2.default.omit('', _ramda2.default.zipObj(imageKeys, prependPath(cleanFiles)));
          // Put new pairings into our expected structure and as strings
          var stringify = function stringify(k) {
            return '  ' + k[0] + ': require(\'' + k[1] + '\')';
          };
          // Append new files to current files
          var finalImages = _ramda2.default.join(',\n', _ramda2.default.map(stringify, _ramda2.default.toPairs(cleanedFiles))) + ',';
          // Write new images into file
          Utilities.insertInFile('./App/Themes/Images.js', 'images ', finalImages);
        }
      });
    }
  }, {
    key: 'end',
    value: function end() {
      console.log('Pretty Pictures');
    }
  }]);

  return ImagesFileGenerator;
}(_yeomanGenerator2.default.Base);

module.exports = ImagesFileGenerator;