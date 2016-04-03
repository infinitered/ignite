'use strict'

import colors from 'colors/safe'
import fs from 'fs'
import R from 'ramda'
import mkdirp from 'mkdirp'

const baseName = R.when(
  (x) => R.eqBy(R.toLower, R.takeLast(3, x), '.js'),
  (y) => R.take(R.length(y) - 3, y)
)
const folderError = "\n Are you sure you're in an IR project?"

const baseComponentContent = (name) => {
  return `'use strict'

import React, { ScrollView, View, Text } from 'react-native'
var styles = require('../Styles/${name}Style')

export default class ${name} extends React.Component {

  static propTypes = {
    navigator: React.PropTypes.object
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>Some Component</Text>
      </ScrollView>
    )
  }
}
`
}

const baseComponentStyle = (name) => {
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

const createFile = (path, contents) => {
  fs.writeFile(path, contents, function (err) {
    if (err) {
      return console.log(err)
    }
    fileSign(path)
  })
}

export const fileSign = (path) => {
  const separator = colors.rainbow('!-=-=-=-=-=-=-!')
  console.log(separator + colors.yellow(' "') + colors.underline(path) + colors.yellow('" was saved ') + separator)
}

export const hydrateComponent = (folder, fileName) => {
  // Folders first
  mkdirp(`./App/${folder}`, (err) => {
    if (err) console.log(err + folderError)
    else console.log(`Assured Folder ./App/${folder}`)
  })
  mkdirp(`./App/${folder}/Styles`, (err) => {
    if (err) console.log(err + folderError)
    else console.log(`Assured Folder ./App/${folder}/Styles`)
  })

  let baseFileName = baseName(fileName)
  let fullFile = `./App/${folder}/${baseFileName}.js`
  let fullStyleFile = `./App/${folder}/Styles/${baseFileName}Style.js`

  createFile(fullFile, baseComponentContent(fileName))
  createFile(fullStyleFile, baseComponentStyle(fileName))
}

export default {
  fileSign,
  hydrateComponent
}
