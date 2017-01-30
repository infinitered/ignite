// @cliDescription  Generate a new React Native project with Ignite.
// @cliAlias n
// ----------------------------------------------------------------------------

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

module.exports = async function (context) {
  const { parameters, strings, print, system } = context
  const { isBlank } = strings
  const { info, colors } = print

  // validation
  const projectName = parameters.second
  if (isBlank(projectName)) {
    print.info(`${context.runtime.brand} new <projectName>\n`)
    print.error('Project name is required')
    process.exit(1)
    return
  }

  // Install the ignite-* packages from the local dev directory.
  //
  // This is pretty much always what we while we dev.
  //
  // To test what live is like, you can run `ignite new FooTown --live`.
  //
  // TODO(steve): Don't forget to remove this when we launch... open to better ways of handling it.
  const igniteDevPackagePrefix = parameters.options.live || `${__dirname}/../../../../../ignite-`

  // First we ask!
  let answers = {}
  if (!parameters.options.min) {
    answers = await context.prompt.ask(installWalkthrough)
  }
  // then we kick off (TODO: Would be awesome to have this kick off during questions)
  // we need to lock the RN version here
  info('Creating new RN project')
  // TODO make sure `react-antive --version has react-native-cli 2.x otherwise failure`
  const reactNativeVersion = '0.40.0'
  await system.run(`react-native init ${projectName} --version ${reactNativeVersion}`)

  // switch to the newly created project directory to continue the rest of these commands
  process.chdir(projectName)

  info('Add ignite basic structure with unholy')
  await system.run(`ignite add ${igniteDevPackagePrefix}basic-structure ${projectName} --unholy`)

  info('Install all those unholy goodies')
  await system.run('yarn || npm i')

  // info('Link up all those unholy goodies')
  // the following never returns - without await it keeps the shell forever!
  system.run('react-native link &')

  info('Add ignite basic generators')
  await system.run(`ignite add ${igniteDevPackagePrefix}basic-generators`)

  // now run install of Ignite Plugins
  if (answers['dev-screens'] === 'Yes' || parameters.options.max) {
    info('Add ignite dev screens')
    await system.run(`ignite add ${igniteDevPackagePrefix}dev-screens`)
  }

  if (answers['vector-icons'] === 'react-native-vector-icons' || parameters.options.max) {
    info('Add ignite vector icons')
    await system.run(`ignite add ${igniteDevPackagePrefix}vector-icons`)
  }

  if (answers['i18n'] === 'react-native-i18n' || parameters.options.max) {
    info('Add ignite i18n')
    await system.run(`ignite add ${igniteDevPackagePrefix}i18n`)
  }

  if (answers['animatable'] === 'react-native-animatable' || parameters.options.max) {
    info('Add ignite animatable')
    await system.run(`ignite add ${igniteDevPackagePrefix}animatable`)
  }

  info('')
  info('Time to get cooking! 🍽 ')
  info('')
  info('To run in iOS:')
  info(colors.yellow(`  cd ${projectName}`))
  info(colors.yellow('  react-native run-ios'))
  info('')
  info('To run in Android:')
  info(colors.yellow(`  cd ${projectName}`))
  info(colors.yellow('  react-native run-android'))
  info('')
}
