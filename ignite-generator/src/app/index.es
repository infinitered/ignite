#!/usr/bin/env node
'use strict'

import colors from 'colors/safe'
import Generators from 'yeoman-generator'
import Shell from 'shelljs'
import * as Utilities from '../utilities'
import ora from 'ora'
import semver from 'semver'

const igniteBase = 'ignite-base'

const emptyFolder = (folder) => {
  Shell.rm('-rf', folder)
  Shell.mkdir(folder)
}

/**
 * Doctors the AndroidManifest.xml to put in the stuff we need.
 */
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

/**
 * Doctors Info.plist to allow API examples to openweather.org
 */
const addAPITransportException = (name) => {
  const addEntry = `plutil -replace NSAppTransportSecurity -xml '<dict> <key>NSExceptionDomains</key> <dict> <key>localhost</key> <dict> <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key> <true/> </dict> <key>openweathermap.org</key> <dict> <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key> <true/> </dict> </dict> </dict>' ./${name}/ios/${name}/Info.plist`
  Shell.exec(addEntry)
}

/**
 * A green checkmark
 */
const check = colors.green('✔︎')

/**
 * A red x.
 */
const xmark = colors.red('𝗫')

/**
 * Is this command installed on ze computer?
 */
const isCommandInstalled = (command) => !!Shell.which(command)

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
export class AppGenerator extends Generators.Base {

  constructor (args, options) {
    super(args, options)
    this.argument('name', { type: String, required: true })
  }

  /**
   * Entry point.  Let's set this up.
   */
  initializing () {
    // this is a fresh install, so let's always clobber the destination.
    this.conflicter.force = true
    // prep our spinner
    this.spinner = ora('starting')

    this.log('-----------------------------------------------')
    this.log(colors.red('  (                  )   (                   '))
    this.log(colors.red('  )\\ )   (        ( /(   )\\ )    *   )       '))
    this.log(colors.red(' (()/(   )\\ )     )\\()) (()/(  ` )  /(   (   '))
    this.log(colors.red('  /(_)) (()/(    ((_)\\   /(_))  ( )(_))  )\\  '))
    this.log(colors.red(' (_))    /(_))_   _((_) (_))   (_(_())  ((_) '))
    this.log(' |_ _|  ' + colors.red('(_))') + ' __| | \\| | |_ _|  |_   _|  | __|')
    this.log('  | |     | (_ | | .` |  | |     | |    | _| ')
    this.log(' |___|     \\___| |_|\\_| |___|    |_|    |___|')
    this.log('-----------------------------------------------')
    this.log('')
    this.log('An unfair headstart for your React Native apps.')
    this.log(colors.yellow('https://infinite.red/ignite'))
    this.log('')
    this.log('-----------------------------------------------')

    this.log('Igniting ' + colors.yellow(this.name) + '\n')
  }

  /**
   * Check for react-native.
   */
  findReactNativeCli () {
    const status = 'Finding react-native'
    this.spinner.text = status
    this.spinner.start()
    if (!isCommandInstalled('react-native')) {
      this.log(`${xmark} Missing react-native - 'npm install -g react-native-cli'`)
      process.exit(1)
    }
    this.spinner.stop()
    this.log(`${check} Found react-native`)
  }

  /**
   * Check for git.
   */
  findGit () {
    const status = 'Finding git'
    this.spinner.text = status
    this.spinner.start()
    if (!isCommandInstalled('git')) {
      this.log(`${xmark} Missing git`)
      process.exit(1)
    }
    this.spinner.stop()
    this.log(`${check} Found git`)
  }

  /**
   * Check for rnpm.
   */
  findRnpm () {
    const status = 'Finding rnpm'
    this.spinner.text = status
    this.spinner.start()
    if (!isCommandInstalled('rnpm')) {
      this.log(`${xmark} Missing rnpm - 'npm install -g rnpm'`)
      process.exit(1)
    }
    const done = this.async()
    // check an outdated version of rnpm (< 1.7.0)
    const minimumRnpm = '1.7.0'
    Shell.exec('rnpm --version', {silent: true}, (code, stdout, stderr) => {
      const rnpmVersion = stdout.replace(/\s/, '')
      this.spinner.stop()
      if (semver.lt(rnpmVersion, minimumRnpm)) {
        this.log(`${xmark} rnpm ${minimumRnpm} required - 'npm install -g rnpm'`)
        process.exit(1)
      } else {
        this.log(`${check} Found rnpm`)
        done()
      }
    })
  }

  /**
   * Do a quick clean up of the template folder.
   */
  cleanBeforeRunning () {
    const status = 'Getting ready for guests'
    this.spinner.text = status
    this.spinner.start()
    emptyFolder(this.sourceRoot())
    this.spinner.stop()
    this.log(`${check} ${status}`)
  }

  /**
   * Run React Native init.
   */
  reactNativeInit () {
    const status = 'Running React Native setup (~ 1 minute)'
    this.spinner.start()
    this.spinner.text = status
    const done = this.async()
    const command = 'react-native'
    const commandOpts = ['init', this.name]
    this.spawnCommand(command, commandOpts, {stdio: 'ignore'})
      .on('close', () => {
        this.spinner.stop()
        this.log(`${check} ${status}`)
        done()
      })
  }

  /**
   * Ensure we have the latest Ignite templates.
   */
  downloadLatestIgnite () {
    // the default repo
    const defaultRepo = 'https://github.com/infinitered/ignite.git'
    // the repo the user might have asked for via a command line
    const requestedRepo = this.options['repo']
    // did the user actually ask for a custom repo?
    const useCustomRepo = typeof requestedRepo !== 'undefined' && requestedRepo !== null && requestedRepo !== ''
    // the right repo to use
    const repo = useCustomRepo ? requestedRepo : defaultRepo

    const status = `Downloading latest Ignite files from ${repo}`
    this.spinner.start()
    this.spinner.text = status
    const done = this.async()
    const command = 'git'
    const commandOpts = ['clone', repo, this.sourceRoot()]
    this.spawnCommand(command, commandOpts, {stdio: 'ignore'})
      .on('close', () => {
        this.spinner.stop()
        this.log(`${check} ${status}`)
        done()
      })
  }

  /**
   * We might need to switch to a new branch if we're testing a ignite feature.
   */
  checkoutDifferentBranch () {
    // read the user's choice from the source-branch command line option
    const branch = this.options['branch']
    // should we be using master?
    const useMasterBranch = typeof branch === 'undefined' || branch === null || branch === 'master' || branch === ''
    // jet if we're using the default behaviour
    if (useMasterBranch) return

    const status = `Using ignite branch ${branch}`
    this.spinner.start()
    this.spinner.text = status
    const done = this.async()
    const command = 'git'
    const commandOpts = ['checkout', branch]
    this.spawnCommand(command, commandOpts, {stdio: 'ignore', cwd: this.sourceRoot()})
      .on('close', () => {
        this.spinner.stop()
        this.log(`${check} ${status}`)
        done()
      })
  }

  /**
   * Helper to copy a file to the destination.
   */
  _cpFile (fromFilename, toFilename) {
    const from = this.templatePath(`${igniteBase}/${fromFilename}`)
    const to = this.destinationPath(`${this.name}/${toFilename}`)
    this.fs.copyTpl(from, to, { name: this.name })
  }

  /**
   * Helper to copy a template to the destination.
   */
  _cpTemplate (filename) {
    this._cpFile(`${filename}.template`, filename)
  }

  /**
   * Helper to copy a directory to the destination.
   */
  _cpDirectory (directory) {
    this.directory(
      this.templatePath(`${igniteBase}/${directory}`),
      this.destinationPath(`${this.name}/${directory}`)
    )
  }

  /**
   * Let's ignite all up in hurrr.
   */
  copyExistingStuff () {
    const status = 'Copying Ignite goodies'
    this.spinner.start()
    this.spinner.text = status

    this._cpTemplate('README.md')
    this._cpTemplate('package.json')
    this._cpTemplate('.babelrc')
    this._cpFile('index.js.template', 'index.ios.js')
    this._cpFile('index.js.template', 'index.android.js')
    this._cpDirectory('git_hooks')
    this._cpDirectory('Tests')
    this._cpDirectory('App')

    this.spinner.stop()
    this.log(`${check} ${status}`)
  }

  /**
   * Let's hand tweak the the android manifest because rnpm doesn't support that just yet.
   */
  _updateAndroidManifest () {
    const status = 'Updating android manifest file'
    this.spinner.start()
    this.spinner.text = status
    performInserts(this.name)
    this.spinner.stop()
    this.log(`${check} ${status}`)
  }

  /**
   * Let's hand tweak PList to allow our API example to work with Transport Security
   */
  _updatePList () {
    const status = 'Updating PList file'
    this.spinner.start()
    this.spinner.text = status
    addAPITransportException(this.name)
    this.spinner.stop()
    this.log(`${check} ${status}`)
  }

  /**
   * Let's clean up any temp files.
   */
  _cleanAfterRunning () {
    const status = 'Cleaning up after messy guests'
    this.spinner.text = status
    this.spinner.start()
    emptyFolder(this.sourceRoot())
    this.spinner.stop()
    this.log(`${check} ${status}`)
  }

  /**
   * Installs npm then rnpm ...
   * Also, sadly, we need this install the install() function due to how
   * Yeoman times its template copies.  :(
   */
  install () {
    const npmStatus = 'Installing Ignite dependencies (~30 seconds-ish)'
    this.spinner.start()
    this.spinner.text = npmStatus
    const done = this.async()
    const dir = `${Shell.pwd()}/${this.name}`
    // run the npm command
    this.spawnCommand('npm', ['install'], {cwd: dir, stdio: 'ignore'})
      .on('close', () => {
        this.spinner.stop()
        this.log(`${check} ${npmStatus}`)

        // then run the rnpm command
        const rnpmStatus = 'Linking with rnpm'
        this.spinner.start()
        this.spinner.text = rnpmStatus
        this.spawnCommand('rnpm', ['link'], {cwd: dir, stdio: 'ignore'})
          .on('close', () => {
            this.spinner.stop()
            this.log(`${check} ${rnpmStatus}`)

            // then update the android manifest
            this._updateAndroidManifest()
            // then update Plist
            this._updatePList()
            done()
          })
      })
  }

  /**
   * Hold for applause.
   */
  end () {
    this._cleanAfterRunning()
    this.spinner.stop()
    this.log('')
    this.log('Time to get cooking! 🍽 ')
    this.log('')
    this.log('To run in iOS:')
    this.log(colors.yellow(`  cd ${this.name}`))
    this.log(colors.yellow('  react-native run-ios'))
    this.log('')
    this.log('To run in Android:')
    this.log(colors.yellow(`  cd ${this.name}`))
    this.log(colors.yellow('  react-native run-android'))
    this.log('')
  }
}

module.exports = AppGenerator
