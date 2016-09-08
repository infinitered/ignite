#! /usr/bin/env node
'use strict'

import colors from 'colors/safe'
import Generators from 'yeoman-generator'
import * as Utilities from '../utilities'
import Shell from 'shelljs'
import ora from 'ora'

const copyOverMapviewFiles = (context) => {
  // copy mapview template
  context.fs.copyTpl(
    context.templatePath('mapview.js.template'),
    context.destinationPath(`./App/Containers/${context.name}.js`),
    { name: context.name }
  )

  // copy mapcallout template
  context.fs.copyTpl(
    context.templatePath('mapcallout.js.template'),
    context.destinationPath(`./App/Components/MapCallout.js`),
    { }
  )

  // copy maphelpers template
  context.fs.copyTpl(
    context.templatePath('maphelpers.js.template'),
    context.destinationPath(`./App/Lib/MapHelpers.js`),
    { }
  )

  // copy mapview style template
  context.fs.copyTpl(
    context.templatePath('mapview-style.js.template'),
    context.destinationPath(`./App/Containers/Styles/${context.name}Style.js`),
    { name: context.name }
  )

  // copy mapcallout style template
  context.fs.copyTpl(
    context.templatePath('mapcallout-style.js.template'),
    context.destinationPath(`./App/Components/Styles/MapCalloutStyle.js`),
    { name: context.name }
  )
}

const check = colors.green('✔︎')

/**
 * Doctors the AndroidManifest.xml to put in the stuff we need.
 */
const insertApiKey = () => {
  // Add Google Maps API key for Android.
  const metaData = `
      <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="AIzaSyBcCdKMCWtxN1mXHlVE6z5cLVXIPWaEcso"/>
  `

  const dir = `${Shell.pwd()}`
  if (!Utilities.isInFile(`${dir}/android/app/src/main/AndroidManifest.xml`, 'com.google.android.geo.API_KEY')) {
    Utilities.insertInFile(`${dir}/android/app/src/main/AndroidManifest.xml`, '</application>', metaData, false)
  }
}

class MapviewGenerator extends Generators.Base {

  constructor (args, options) {
    super(args, options)
    this.argument('name', { type: String, required: true })
  }

  generateMapview () {
    // Copy over component files.
    copyOverMapviewFiles(this)
  }

  /**
   * Let's hand tweak the the android manifest because rnpm doesn't support that just yet.
   */
  _updateAndroidManifest () {
    const status = 'Updating android manifest file'
    this.spinner.start()
    this.spinner.text = status
    insertApiKey()
    this.spinner.stop()
    this.log(`${check} ${status}`)
  }

  install () {
    this.spinner = ora('starting')
    const npmStatus = 'Installing react-native-maps'
    this.spinner.start()
    this.spinner.text = npmStatus
    const done = this.async()
    // run the npm command
    this.spawnCommand('npm', ['install', '--save', 'infinitered/react-native-maps\#master'], {stdio: 'ignore'})
      .on('close', () => {
        this.spinner.stop()
        this.log(`${check} ${npmStatus}`)

        // then run the rnpm command
        const rnpmStatus = 'Linking with react-native link'
        this.spinner.start()
        this.spinner.text = rnpmStatus
        this.spawnCommand('react-native', ['link', 'react-native-maps'], {stdio: 'ignore'})
          .on('close', () => {
            this.spinner.stop()
            this.log(`${check} ${rnpmStatus}`)

            // update the android manifest
            this._updateAndroidManifest()

            done()
          })
      })
  }

  end () {
    console.log('Time to get cooking! 🍽 ')
  }
}

module.exports = MapviewGenerator
