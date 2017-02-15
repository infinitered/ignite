// @cliDescription  Generate a new React Native project with Ignite.
// @cliAlias n
// ----------------------------------------------------------------------------
const { test } = require('ramda')
const exitCodes = require('../lib/exitCodes')
const path = require('path')
const header = require('../brand/header')

// The default version of React Native to install. We will want to upgrade
// this when we test out new releases and they work well with our setup.
const REACT_NATIVE_VERSION = '0.41.2'

module.exports = async function (context) {
  const { parameters, strings, print, system, filesystem } = context
  const { isBlank } = strings
  const { info, colors, spin } = print

  // are we looking for a minimal template?
  const isMinimalAppTemplate =
    context.parameters.template === 'min' ||
    context.parameters.options.min ||
    context.parameters.options.m

  // pick an app template and run with it
  const appTemplate = isMinimalAppTemplate ? 'minimal' : 'unholy'

  // validation
  const projectName = parameters.second
  if (isBlank(projectName)) {
    print.info(`${context.runtime.brand} new <projectName>\n`)
    print.error('Project name is required')
    process.exit(exitCodes.PROJECT_NAME)
    return
  }

  header()
  print.newline()

  // Install the ignite-* packages from the local dev directory.
  //
  // This is pretty much always what we while we dev.
  //
  // To test what live is like, you can run `ignite new FooTown --live`.
  //
  // TODO(steve): Don't forget to remove this when we launch... open to better ways of handling it.
  const igniteDevPackagePrefix = parameters.options.live || path.resolve(`${__dirname}/../../..`) + '/ignite-'

  // we need to lock the RN version here
  // TODO make sure `react-native --version has react-native-cli 2.x otherwise failure`
  const reactNativeVersion = parameters.options['react-native-version'] || REACT_NATIVE_VERSION
  info(`🔥 igniting app ${print.colors.yellow(projectName)}`)

  // Check the version number and bail if we don't have it.
  const versionCheck = await system.run(`npm info react-native@${reactNativeVersion}`)
  const versionAvailable = test(new RegExp(reactNativeVersion, ''), versionCheck || '')
  if (!versionAvailable) {
    print.error(`💩  react native version ${print.colors.yellow(reactNativeVersion)} not found on NPM -- ${print.colors.yellow(REACT_NATIVE_VERSION)} recommended`)
    process.exit(exitCodes.REACT_NATIVE_VERSION)
  }

  const spinner = spin(`using ${print.colors.cyan(appTemplate)} app template`).succeed()
  // install React Native
  // NOTE(steve):
  //   I'd like to move this to a new command when we promote app-templates to a full feature.
  spinner.text = `adding ${print.colors.cyan('React Native ' + reactNativeVersion)}`
  spinner.start()
  await system.run(`react-native init ${projectName} --version ${reactNativeVersion}`)
  spinner.succeed(`added ${print.colors.cyan('React Native ' + reactNativeVersion)}`)

  // switch to the newly created project directory to continue the rest of these commands
  process.chdir(projectName)

  // Create ./ignite/plugins/.gitkeep
  filesystem.write(`${process.cwd()}/ignite/plugins/.gitkeep`, '')

  // some extra options we'll be passing through to the `ignite add <app-template>`
  const extraAddOptions = []
  extraAddOptions.push(`--react-native-version ${reactNativeVersion}`)

  // pass along the ignite prefix if we have it
  if (!parameters.options.live) {
    extraAddOptions.push(`--ignite-dev-package-prefix ${igniteDevPackagePrefix}`)
  }

  // pass through the --max flag
  // NOTE(steve):
  //   I'd like to see this go away by introducing a new addTemplate command... baby steps though.
  //   Another thing to consider is just passing through *all* options.
  if (parameters.options.max) {
    extraAddOptions.push('--max')
  }

  // let's kick off the template
  const command = `ignite add ${igniteDevPackagePrefix}${appTemplate}-app-template ${projectName} ${extraAddOptions.join(' ')}`
  await system.spawn(command, { stdio: 'inherit' })

  // Wrap it up with our success message.
  info('')
  info('🍽 Time to get cooking!')
  info('')
  info('To run in iOS:')
  info(colors.yellow(`  cd ${projectName}`))
  info(colors.yellow('  react-native run-ios'))
  info('')
  info('To run in Android:')
  info(colors.yellow(`  cd ${projectName}`))
  info(colors.yellow('  react-native run-android'))
  info('')
  info('To see what ignite can do for you:')
  info(colors.yellow(`  cd ${projectName}`))
  info(colors.yellow('  ignite'))
  info('')
}
