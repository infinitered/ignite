const { test } = require('ramda')
const exitCodes = require('../lib/exitCodes')

// The default version of React Native to install. We will want to upgrade
// this when we test out new releases and they work well with our setup.
const REACT_NATIVE_VERSION = '0.41.2'

/**
 * Attach this extension to the context.
 *
 * @param   {any} plugin  - The current running plugin.
 * @param   {any} command - The current running command.
 * @param   {any} context - The active context.
 * @returns {any}         - The public-facing features this supports.
 */
function attach (plugin, command, context) {
  // fist-full o features
  const { parameters, print, system, filesystem, strings, ignite } = context
  const { log } = ignite

  /**
   * Installs React Native.
   *
   * @param {Object}  opts          - The options to pass to install react native.
   * @param {string}  opts.name     - What to call this project.
   * @param {string}  opts.version  - The React Native version to install (if we care).
   * @param {string}  opts.template - The template to pass to React Native (if any).
   * @param {boolean} opts.skipJest - Should we bypass jest?
   * @returns {number}              - The error code we should exit with if non-0.
   */
  async function install (opts = {}) {
    //  grab the name & version
    const name = opts.name || parameters.third
    const reactNativeVersion = opts.version || parameters.options['react-native-version'] || REACT_NATIVE_VERSION

    // jet if the version isn't available
    const versionCheck = await system.run(`npm info react-native@${reactNativeVersion}`)
    const versionAvailable = test(new RegExp(reactNativeVersion, ''), versionCheck || '')
    if (!versionAvailable) {
      print.error(`💩  react native version ${print.colors.yellow(reactNativeVersion)} not found on NPM -- ${print.colors.yellow(REACT_NATIVE_VERSION)} recommended`)
      return {
        exitCode: exitCodes.REACT_NATIVE_VERSION,
        version: reactNativeVersion
      }
    }

    // craft the additional options to pass to the react-native cli
    const rnOptions = [ '--version', reactNativeVersion ]
    if (!strings.isBlank(opts.template)) {
      rnOptions.push('--template')
      rnOptions.push(opts.template)
    }
    if (opts.skipJest) {
      rnOptions.push('--skip-jest')
    }

    // react-native init
    const cmd = `react-native init ${name} ${rnOptions.join(' ')}`
    log('initializing react native')
    log(cmd)
    const spinner = print.spin(`adding ${print.colors.cyan('React Native ' + reactNativeVersion)} ${print.colors.muted('(60 seconds-ish)')}`)
    if (parameters.options.debug) spinner.stop()

    // ok, let's do this
    const stdioMode = parameters.options.debug ? 'inherit' : 'ignore'
    await system.exec(cmd, { stdio: stdioMode })

    // good news everyone!
    const successMessage = `added ${print.colors.cyan('React Native ' + reactNativeVersion)}`
    spinner.succeed(successMessage)

    // jump immediately into the new directory
    process.chdir(name)
    log(`changed to directory ${process.cwd()}`)

    // Create ./ignite/plugins/.gitkeep
    filesystem.write(`${process.cwd()}/ignite/plugins/.gitkeep`, '')

    return {
      exitCode: exitCodes.OK,
      version: reactNativeVersion
    }
  }

  return {
    install
  }
}

module.exports = attach
