'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.hydrateComponent = exports.fileSign = undefined

var _safe = require('colors/safe')

var _safe2 = _interopRequireDefault(_safe)

var _fs = require('fs')

var _fs2 = _interopRequireDefault(_fs)

var _ramda = require('ramda')

var _ramda2 = _interopRequireDefault(_ramda)

var _mkdirp = require('mkdirp')

var _mkdirp2 = _interopRequireDefault(_mkdirp)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

var baseName = _ramda2.default.when(function (x) {
  return _ramda2.default.eqBy(_ramda2.default.toLower, _ramda2.default.takeLast(3, x), '.js')
}, function (y) {
  return _ramda2.default.take(_ramda2.default.length(y) - 3, y)
})
var folderError = "\n Are you sure you're in an IR project?"

var baseComponentContent = function baseComponentContent (name) {
  return `'use strict'

import React, { ScrollView, View, Text } from 'react-native'
var styles = require('../Styles/${name}Style')

export default class ${name} extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>Some Component</Text>
      </ScrollView>
    )
  }
}

${name}.propTypes = {
  navigator: React.PropTypes.object
}
`
}

var baseComponentStyle = function baseComponentStyle (name) {
  return `'use strict'

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  }
})
`
}

var createFile = function createFile (path, contents) {
  _fs2.default.writeFile(path, contents, function (err) {
    if (err) {
      return console.log(err)
    }
    fileSign(path)
  })
}

var fileSign = exports.fileSign = function fileSign (path) {
  var separator = _safe2.default.rainbow('!-=-=-=-=-=-=-!')
  console.log(separator + _safe2.default.yellow(' "') + _safe2.default.underline(path) + _safe2.default.yellow('" was saved ') + separator)
}

var hydrateComponent = exports.hydrateComponent = function hydrateComponent (folder, fileName) {
  // Folders first
  (0, _mkdirp2.default)('./App/' + folder, function (err) {
    if (err) console.log(err + folderError); else console.log('Assured Folder ./App/' + folder)
  });
  (0, _mkdirp2.default)('./App/' + folder + '/Styles', function (err) {
    if (err) console.log(err + folderError); else console.log('Assured Folder ./App/' + folder + '/Styles')
  })

  var baseFileName = baseName(fileName)
  var fullFile = './App/' + folder + '/' + baseFileName + '.js'
  var fullStyleFile = './App/' + folder + '/Styles/' + baseFileName + 'Style.js'

  createFile(fullFile, baseComponentContent(fileName))
  createFile(fullStyleFile, baseComponentStyle(fileName))
}

exports.default = {
  fileSign: fileSign,
  hydrateComponent: hydrateComponent
}
