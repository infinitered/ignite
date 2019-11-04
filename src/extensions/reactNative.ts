import { trim } from 'ramda'
import exitCodes from '../lib/exit-codes'
import { IgniteToolbox, IgniteRNInstallResult } from '../types'

// DEPRECATED: Please specify React Native version when invoking install
// Example: const rnInstall = await reactNative.install({ name, version: '0.42.0' })
const REACT_NATIVE_VERSION = '0.58.0'

/**
 * Attach this extension to the toolbox.
 */
function attach(toolbox: IgniteToolbox) {
  // fist-full o features
  const { parameters, print, system, filesystem, strings, ignite } = toolbox
  const { log } = ignite

  /**
   * Installs React Native.
   */
  async function install(
    opts: { name?: string; version?: string; template?: string; skipJest?: boolean; useNpm?: boolean } = {},
  ): Promise<IgniteRNInstallResult> {
    //  grab the name & version
    const name = opts.name || parameters.first
    let reactNativeVersion = opts.version || parameters.options['react-native-version']
    if (!reactNativeVersion) {
      print.warning(`💩  unspecified react native version in ignite cli has been deprecated `)
      print.warning(`   please use version property in project's boilerplate file to set a react native version`)
      print.warning(`   falling back to react native version: ${REACT_NATIVE_VERSION}`)
      reactNativeVersion = REACT_NATIVE_VERSION
    }
    const reactNativeTemplate = opts.template || parameters.options['react-native-template']

    const perfStart = new Date().getTime()

    // craft the additional options to pass to the react-native cli
    const rnOptions = ['--version', reactNativeVersion]
    if (!strings.isBlank(reactNativeTemplate)) {
      rnOptions.push('--template')
      rnOptions.push(reactNativeTemplate)
    }
    if (opts.skipJest) {
      rnOptions.push('--skip-jest')
    }
    if (opts.useNpm) {
      rnOptions.push('--npm')
    }

    // react-native init
    const cmd = trim(`npx react-native init ${name} ${rnOptions.join(' ')}`)
    log('initializing react native')
    log(cmd)
    const withTemplate = reactNativeTemplate ? ` with ${print.colors.cyan(reactNativeTemplate)} template` : ''
    const spinner = print.spin(
      `adding ${print.colors.cyan('React Native ' + reactNativeVersion)}${withTemplate} ${print.colors.muted(
        '(30 seconds-ish)',
      )}`,
    )
    if (parameters.options.debug) spinner.stop()

    // ok, let's do this
    // react-native init takes about 20s to execute
    const stdioMode = parameters.options.debug ? 'inherit' : 'ignore'
    try {
      log('initializing react native project')
      log(`command: ${cmd}`)
      await system.exec(cmd, { stdio: stdioMode })
      log('done initializing react native project')
    } catch (e) {
      spinner.fail(`failed to add ${print.colors.cyan('React Native ' + reactNativeVersion)}${withTemplate}`)
      if (reactNativeTemplate) {
        // TODO: we can totally check, just stopping here until while https://github.com/facebook/react-native/pull/12548 settles in.
        const fullTemplateName = `react-native-template-${reactNativeTemplate}`
        spinner.fail(`Does ${print.colors.cyan(fullTemplateName)} exist on npm?`)
      }
      return {
        exitCode: exitCodes.REACT_NATIVE_INSTALL,
        version: reactNativeVersion,
        template: reactNativeTemplate,
      }
    }

    const perfDuration = parseInt(((new Date().getTime() - perfStart) / 10).toString(), 10) / 100

    // good news everyone!
    const successMessage = `added ${print.colors.cyan(
      'React Native ' + reactNativeVersion,
    )}${withTemplate} in ${perfDuration}s`
    spinner.succeed(successMessage)

    // jump immediately into the new directory
    process.chdir(name)
    log(`changed to directory ${process.cwd()}`)

    // Create ./ignite/plugins/.gitkeep
    filesystem.write(`${process.cwd()}/ignite/plugins/.gitkeep`, '')

    return {
      exitCode: exitCodes.OK,
      version: reactNativeVersion,
      template: reactNativeTemplate,
    }
  }

  toolbox.reactNative = { install }
}

module.exports = attach
