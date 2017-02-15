// @cliDescription  Generate a new React Native project with Ignite.
// @cliAlias n
// ----------------------------------------------------------------------------
const { test } = require('ramda')
const exitCodes = require('../lib/exitCodes')
const path = require('path')

// The default version of React Native to install. We will want to upgrade
// this when we test out new releases and they work well with our setup.
const REACT_NATIVE_VERSION = '0.41.2'

// Questions to ask during install if the chatty route is chosen.
const installWalkthrough = [
  {
    name: 'dev-screens',
    message: 'Would you like Ignite Development Screens?',
    type: 'list',
    choices: ['No', 'Yes']
  }, {
    name: 'vector-icons',
    message: 'What vector icon library will you use?',
    type: 'list',
    choices: ['none', 'react-native-vector-icons']
  }, {
    name: 'i18n',
    message: 'What internationalization library will you use?',
    type: 'list',
    choices: ['none', 'react-native-i18n']
  }, {
    name: 'animatable',
    message: 'What animation library will you use?',
    type: 'list',
    choices: ['none', 'react-native-animatable']
  }
]

const minOptions = {
  'dev-screens': 'No',
  'vector-icons': 'none',
  'i18n': 'none',
  'animatable': 'none'
}
const maxOptions = {
  'dev-screens': 'Yes',
  'vector-icons': 'react-native-vector-icons',
  'i18n': 'react-native-i18n',
  'animatable': 'react-native-animatable'
}

const walkthrough = async (context) => {
  if (context.parameters.options.min) { return minOptions }
  if (context.parameters.options.max) { return maxOptions }
  return await context.prompt.ask(installWalkthrough)
}

module.exports = async function (context) {
  const { parameters, strings, print, system } = context
  const { isBlank } = strings
  const { info, colors, spin } = print

  // validation
  const projectName = parameters.second
  if (isBlank(projectName)) {
    print.info(`${context.runtime.brand} new <projectName>\n`)
    print.error('Project name is required')
    process.exit(exitCodes.PROJECT_NAME)
    return
  }

  // Install the ignite-* packages from the local dev directory.
  //
  // This is pretty much always what we while we dev.
  //
  // To test what live is like, you can run `ignite new FooTown --live`.
  //
  // TODO(steve): Don't forget to remove this when we launch... open to better ways of handling it.
  const igniteDevPackagePrefix = parameters.options.live || path.resolve(`${__dirname}/../../..`) + '/ignite-'

  // First we ask!
  const answers = await walkthrough(context)

  // we need to lock the RN version here
  // TODO make sure `react-native --version has react-native-cli 2.x otherwise failure`
  const reactNativeVersion = parameters.options['react-native-version'] || REACT_NATIVE_VERSION
  info(`🔥 igniting ${print.colors.yellow(projectName)}`)
  info('')

  // Check the version number and bail if we don't have it.
  const versionCheck = await system.run(`npm info react-native@${reactNativeVersion}`)
  const versionAvailable = test(new RegExp(reactNativeVersion, ''), versionCheck || '')
  if (!versionAvailable) {
    print.error(`💩  react native version ${reactNativeVersion} not found on NPM.  We recommend ${REACT_NATIVE_VERSION}.`)
    process.exit(exitCodes.REACT_NATIVE_VERSION)
  }
  const spinner = spin(`adding ${print.colors.cyan('React Native ' + reactNativeVersion)}`)

  await system.run(`react-native init ${projectName} --version ${reactNativeVersion}`)
  spinner.succeed(`added ${print.colors.cyan('React Native ' + reactNativeVersion)}`)

  // switch to the newly created project directory to continue the rest of these commands
  process.chdir(projectName)

  await system.spawn(`ignite add ${igniteDevPackagePrefix}basic-structure ${projectName} --unholy --react-native-version ${reactNativeVersion}`, { stdio: 'inherit' })

  spinner.text = `▸ installing ignite dependencies`
  spinner.start()
  if (context.ignite.useYarn) {
    await system.run('yarn')
  } else {
    await system.run('npm i')
  }
  spinner.stop()

  // react native link -- must use spawn & stdio: ignore or it hangs!! :(
  spinner.text = `▸ linking native libraries`
  spinner.start()
  await system.spawn('react-native link', { stdio: 'ignore' })
  spinner.stop()

  await system.spawn(`ignite add ${igniteDevPackagePrefix}basic-generators`, { stdio: 'inherit' })

  // now run install of Ignite Plugins
  if (answers['dev-screens'] === 'Yes') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}dev-screens`, { stdio: 'inherit' })
  }

  if (answers['vector-icons'] === 'react-native-vector-icons') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}vector-icons`, { stdio: 'inherit' })
  }

  if (answers['i18n'] === 'react-native-i18n') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}i18n`, { stdio: 'inherit' })
  }

  if (answers['animatable'] === 'react-native-animatable') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}animatable`, { stdio: 'inherit' })
  }

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
