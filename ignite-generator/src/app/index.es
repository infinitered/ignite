#! /usr/bin/env node
'use strict'

import colors from 'colors/safe'
import { NamedBase } from 'yeoman-generator'
import { showWarnings, verifyTools, verifyExtensiveTools } from '../validation'
import Shell from 'shelljs'
import * as Utilities from '../utilities'

const igniteBase = 'ignite-base'

const emptyFolder = (folder) => {
  Shell.rm('-rf', folder)
  Shell.mkdir(folder)
}

const copyOverBase = (context) => {
  // copy New project Readme
  context.fs.copyTpl(
    context.templatePath(`${igniteBase}/README.md.template`),
    context.destinationPath(`${context.name}/README.md`),
    { name: context.name }
  )

  // copy package.json
  context.fs.copyTpl(
    context.templatePath(`${igniteBase}/package.json.template`),
    context.destinationPath(`${context.name}/package.json`),
    { name: context.name }
  )

  // copy template of index.ios.js
  context.fs.copyTpl(
    context.templatePath(`${igniteBase}/index.js.template`),
    context.destinationPath(`${context.name}/index.ios.js`),
    { name: context.name }
  )

  // copy template of index.android.js
  context.fs.copyTpl(
    context.templatePath(`${igniteBase}/index.js.template`),
    context.destinationPath(`${context.name}/index.android.js`),
    { name: context.name }
  )

  // copy git_hooks/
  context.directory(
    context.templatePath(`${igniteBase}/git_hooks`),
    context.destinationPath(`${context.name}/git_hooks`)
  )

  // copy Tests/
  context.directory(
    context.templatePath(`${igniteBase}/Tests`),
    context.destinationPath(`${context.name}/Tests`)
  )

  // copy App/
  context.directory(
    context.templatePath(`${igniteBase}/App`),
    context.destinationPath(`${context.name}/App`)
  )
}

const performInserts = (name) => {
  // Add permissions for push notifications
  const pushPermissions = `
    <permission
        android:name="\${applicationId}.permission.C2D_MESSAGE"
        android:protectionLevel="signature" />
    <uses-permission android:name="\${applicationId}.permission.C2D_MESSAGE" />
    <uses-permission android:name="android.permission.VIBRATE" />
  `

  const appEntries = `
      <receiver
          android:name="com.google.android.gms.gcm.GcmReceiver"
          android:exported="true"
          android:permission="com.google.android.c2dm.permission.SEND" >
          <intent-filter>
              <action android:name="com.google.android.c2dm.intent.RECEIVE" />
              <category android:name="\${applicationId}" />
          </intent-filter>
      </receiver>

      <service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationRegistrationService"/>
      <service
          android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
          android:exported="false" >
          <intent-filter>
              <action android:name="com.google.android.c2dm.intent.RECEIVE" />
          </intent-filter>
      </service>
  `

  Utilities.insertInFile(`${name}/android/app/src/main/AndroidManifest.xml`, 'SYSTEM_ALERT_WINDOW', pushPermissions)
  Utilities.insertInFile(`${name}/android/app/src/main/AndroidManifest.xml`, 'android:theme', appEntries)
}

class AppGenerator extends NamedBase {
  initializing () {
    console.log(colors.yellow('generate app -> ') + this.name + ' ☕️  This will take a while ☕️ ')
    // force overwrite on conflicts (default is ask user)
    this.conflicter.force = true

    showWarnings()
    // Fail if tools are missing
    verifyTools()
    verifyExtensiveTools()

    this.templateFolder = this.sourceRoot()
    // Clean template folder
    emptyFolder(this.templateFolder)
  }

  generateApp () {
    // Create latest RN project
    this.spawnCommandSync('react-native', ['init', this.name, '--verbose'])

    // Grab latest RNBase into templates folder
    Shell.exec(`git clone git@github.com:infinitered/ignite.git ${this.templateFolder}`)

    // Copy over files from RN Base that apply
    copyOverBase(this)
  }

  install () {
    // npm install copied package.json via `npm --prefix ./some_project install ./some_project`
    this.spawnCommandSync('npm', ['--prefix', `./${this.name}`, 'install', `./${this.name}`])
    // Do rnpm link
    // Separate process now, due to hang - Shell.exec(`cd ${this.name} && rnpm link`)
    Shell.exec(`cd ${this.name} && rnpm link &`, {async: true, silent: true})
  }

  end () {
    // Clean template folder
    emptyFolder(this.templateFolder)

    // Things rnmp didn't do
    performInserts(this.name)

    console.log('Time to get cooking! 🍽 ')
  }
}

module.exports = AppGenerator
