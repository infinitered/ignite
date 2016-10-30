#!/usr/bin/env node
'use strict'

/*
* The 8 stages of yeoman generators
* Not all used here, but documented for quick reference
*
* 1. initializing - Your initialization methods (checking current project state, getting configs, etc)
* 2. prompting - Where you prompt users for options (where you'd call this.prompt())
* 3. configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
* 4. default - If the method name doesn't match a priority, it will be pushed to this group.
* 5. writing - Where you write the generator specific files (routes, controllers, etc)
* 6. conflicts - Where conflicts are handled (used internally)
* 7. install - Where installation are run (npm, bower)
* 8. end - Called last, cleanup, say good bye, etc
*/

import colors from 'colors/safe'
import Generators from 'yeoman-generator'
import Shell from 'shelljs'
import * as Utilities from '../utilities'
import ora from 'ora'

const igniteBase = 'ignite-base'
const lockedReactNativeVersion = '0.35.0'
const lockedIgniteVersion = '1.10.1'

const emptyFolder = (folder) => {
  Shell.rm('-rf', folder)
  Shell.mkdir(folder)
}

// This step needed as of Ignite 1.7.0 and RN 0.33.0
// This wasn't necessary before, might need to be removed at some point
const cleanAndroid = (projectFolder) => {
  Shell.cd(`${projectFolder}/android`)
  if (/^win/.test(process.platform)) {
    Shell.exec('gradlew.bat clean')
  } else {
    Shell.exec('./gradlew clean > /dev/null')
  }
  Shell.cd('../..')
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
  const addEntry = `plutil -replace NSAppTransportSecurity -xml '<dict> <key>NSExceptionDomains</key> <dict> <key>localhost</key> <dict> <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key> <true/> </dict> <key>api.openweathermap.org</key> <dict> <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key> <true/> </dict> </dict> </dict>' ./${name}/ios/${name}/Info.plist`
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

    this.option('latest', {
      desc: 'Use cutting edge React Native Master',
      type: Boolean,
      defaults: false
    })
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
    const animation = Utilities.startStep('Finding react-native', this)

    if (!isCommandInstalled('react-native')) {
      this._logAndExit(`${xmark} Missing react-native - 'npm install -g react-native-cli'`)
    }

    const rnCli = Shell.exec('react-native --version', { silent: true }).stdout
    // verify 1.x.x or higher (we need react-native link)
    if (!rnCli.match(/react-native-cli:\s[1-9]\d*\.\d+\.\d+/)) {
      this._logAndExit(`${xmark} Must have at least version 1.x - 'npm install -g react-native-cli'`)
    }

    animation.finish()
  }

  /**
   * Check if Android is good
   */
  checkAndroid () {
    const animation = Utilities.startStep('Finding android', this)

    if (isCommandInstalled('android')) {
      const androidVersions = Shell.exec('android list', { silent: true }).stdout
      if (androidVersions.match(/android-23/)) {
        animation.finish()
      } else {
        this.spinner.stop()
        this.log(`${xmark} Missing android SDK 23`)
      }
    } else {
      this.spinner.stop()
      this.log(`${xmark} Missing android!`)
    }
  }

  /**
   * Check for git.
   */
  findGit () {
    const animation = Utilities.startStep('Finding git', this)

    if (!isCommandInstalled('git')) {
      this._logAndExit(`${xmark} Missing git`)
    }

    animation.finish()
  }

  /**
   * Do a quick clean up of the template folder.
   */
  cleanBeforeRunning () {
    const animation = Utilities.startStep('Getting ready for guests', this)

    emptyFolder(this.sourceRoot())

    animation.finish()
  }

  /**
   * Run React Native init.
   */
  reactNativeInit () {
    const rnVersion = (this.options.latest) ? 'facebook/react-native' : lockedReactNativeVersion
    const animation = Utilities.startStep(`Running React Native setup version ${rnVersion} (~ 2 minutes-ish)`, this)
    const done = this.async()
    const command = 'react-native'
    // use Master if latest flag was set to true - used for early warning tests
    // package.json will be overwritten with package.json.template -> so follow through is needed there
    // Build base project using RN generator
    const commandOpts = ['init', this.name, '--version', rnVersion]
    this.spawnCommand(command, commandOpts, {stdio: 'ignore'})
      .on('close', (retCode) => {
        animation.finish(retCode)
        done()
      })
  }

  /**
   * Get the git branch or tag that we should check out.
   */
  _getGitBranch () {
    const tag = this.options['tag'] || lockedIgniteVersion
    // read the user's choice from the source-branch command line option
    const branch = this.options['branch']
    // check if the user specified a branch
    const isBranchUndefined = typeof branch === 'undefined' || branch === null || branch === 'master' || branch === ''
    // return branch if its defined
    if (!isBranchUndefined) {
      return branch
    }
    // otherwise return specified tag, or lockedIgniteVersion
    return tag
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
    const branch = this._getGitBranch()
    // start spinner and message
    const animation = Utilities.startStep(`Downloading latest Ignite files from ${repo}#${branch}`, this)

    const done = this.async()
    const command = 'git'
    const commandOpts = ['clone', '--depth', '1', '--branch', branch, repo, this.sourceRoot()]
    this.spawnCommand(command, commandOpts, {stdio: 'ignore'})
      .on('close', (retCode) => {
        animation.finish(retCode)
        if (retCode === 0) {
          done()
        } else {
          this._logAndExit(`Failed to clone ${repo} with branch ${branch}`)
        }
      })
  }

  /**
   * Helper to copy a file to the destination.
   */
  _cpFile (fromFilename, toFilename) {
    const from = this.templatePath(`${igniteBase}/${fromFilename}`)
    const to = this.destinationPath(`${this.name}/${toFilename}`)
    this.fs.copyTpl(from, to, { name: this.name, reactNativeVersion: lockedReactNativeVersion, igniteVersion: lockedIgniteVersion })
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

  preRinse () {
    const animation = Utilities.startStep('Pre-rinse', this)

    // Been having reported issues
    //with Multidex still so extra scrubbing!
    Shell.rm('-rf', 'android/app/build')
    Shell.rm('-rf', 'node_modules/')

    animation.finish()
  }

  /**
   * Let's ignite all up in hurrr.
   */
  copyExistingStuff () {
    const animation = Utilities.startStep('Copying Ignite goodies', this)

    this._cpTemplate('README.md')
    this._cpTemplate('package.json')
    this._cpTemplate('.babelrc')
    this._cpTemplate('.env')
    this._cpFile('.ignite.template', '.ignite')
    this._cpFile('index.js.template', 'index.ios.js')
    this._cpFile('index.js.template', 'index.android.js')
    this._cpFile('index.js.template', 'index.android.js')
    this._cpFile('.editorconfig.template', '.editorconfig')
    this._cpDirectory('git_hooks')
    this._cpDirectory('Tests')
    this._cpDirectory('App')
    this._cpDirectory('fastlane')

    animation.finish()
  }

  /**
   * Let's hand tweak the the android manifest,
   */
  _updateAndroidManifest () {
    const animation = Utilities.startStep('Updating android manifest file', this)

    performInserts(this.name)

    animation.finish()
  }

  /**
   * Let's hand tweak PList to allow our API example to work with Transport Security
   */
  _updatePList () {
    const animation = Utilities.startStep('Updating PList file', this)

    addAPITransportException(this.name)

    animation.finish()
  }

  /**
   * Let's clean up any temp files.
   */
  _cleanAfterRunning () {
    const animation = Utilities.startStep('Cleaning up after messy guests', this)

    emptyFolder(this.sourceRoot())
    cleanAndroid(this.name)

    animation.finish()
  }

  /**
   * Log an error and exit gracefully.
   */
  _logAndExit (finalMessage) {
    this.spinner.stop()
    this.log(finalMessage)
    process.exit(1)
  }

  /**
   * Installs npm then links (old rnpm style)
   * Also, sadly, we need this install the install() function due to how
   * Yeoman times its template copies.  :(
   */
  install () {
    // overwrite RN version if we're testing bleeding edge
    if (this.options.latest) {
      this.log(`${check} Force RN Master`)
      Utilities.replaceInFile(`${this.name}/package.json`, '"react-native":', '    "react-native": "github:facebook/react-native",')
    }

    const animation = Utilities.startStep('Installing Ignite dependencies (~ 1 minute-ish)', this)

    const done = this.async()
    const dir = `${Shell.pwd()}/${this.name}`
    let command = ''
    let commandOpts = []

    // Use Yarn if it is installed
    if (!Shell.which('yarn')) {
      command = 'npm'
      commandOpts.push('install')
      this.log(`\n➟ Package manager:\t[${check}]︎ npm  |  [ ]︎ yarn`)
    } else {
      command = 'yarn'
      commandOpts.push('install')
      this.log(`\n➟ Package manager:\t[ ]︎ npm  |  [${check}]︎ yarn`)
    }

    // Install node modules
    this.spawnCommand(command, commandOpts, {cwd: dir, stdio: 'ignore'})
      .on('close', (retCode) => {
        animation.finish(retCode)

        // then run the `react-native link` (old rnpm) command
        const linkAnimation = Utilities.startStep('Linking external libs', this)
        this.spawnCommand('react-native', ['link'], {cwd: dir, stdio: 'ignore'})
          .on('close', (linkReturnCode) => {
            linkAnimation.finish(linkReturnCode)

            // Push notifications code, disabled for now
            // Causing issues :(
            // update the android manifest
            // this._updateAndroidManifest()

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
