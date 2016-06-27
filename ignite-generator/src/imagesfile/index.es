#! /usr/bin/env node
'use strict'

import fs from 'fs'
import R from 'ramda'
import * as Utilities from '../utilities'

import Generators from 'yeoman-generator'

class ImagesFileGenerator extends Generators.Base {

  replaceFileContents (theFile, newContents) {
    fs.writeFileSync(theFile, newContents, 'utf-8')
  }

  generateImagesFile () {
    // Read files in Images folder
    fs.readdir('./App/Images', (err, files) => {
      if (err) {
        this.log(err, 'Error')
      } else {
        // Files need to be uniquely named before extention!  Otherwise, first come first serve
        // remove @1x, @2x, @3x
        const sizeCleaner = R.replace(/@\dx/, '')
        const prependPath = R.map(R.concat('../Images/'))
        const cleanFiles = R.pipe(R.map(sizeCleaner), R.uniq)(files)

        const camelize = (str) => {
          return str.toLowerCase()
            // Replaces any -,_, or %20 with space
            .replace(/([-_]|%20)+/g, ' ')
            // no extentions por favor
            .replace(/(\..+)/, '')
            // Uppercases the first character in each group immediately following a space
            .replace(/\s(.)/g, R.toUpper)
            // Removes spaces
            .replace(/\s+/g, '')
        }

        // Convert file names to camel case keys
        const imageKeys = R.map(camelize, cleanFiles)
        // strip extraneous keys and values
        const cleanedFiles = R.omit('', R.zipObj(imageKeys, prependPath(cleanFiles)))
        // Make new pairings into strings and with required syntax
        const stringify = (k) => `  ${k[0]}: require('${k[1]}')`
        const finalImages = R.join(',\n', R.map(stringify, R.toPairs(cleanedFiles))) + ','
        // Append and write new file pairings to current Images.js file
        Utilities.insertInFile('./App/Themes/Images.js', 'images ', finalImages)
      }
    })
  }

  end () {
    console.log('Pretty Pictures')
  }
}

module.exports = ImagesFileGenerator
