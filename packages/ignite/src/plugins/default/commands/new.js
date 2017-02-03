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
  if (!parameters.options.min && !parameters.options.max) {
    answers = await context.prompt.ask(installWalkthrough)
  }

  // we need to lock the RN version here
  // TODO make sure `react-native --version has react-native-cli 2.x otherwise failure`
  const reactNativeVersion = '0.40.0'
  info('')
  info(`🔥  igniting ${print.colors.yellow(projectName)} using ${print.colors.cyan('React Native ' + reactNativeVersion)}`)
  await system.run(`react-native init ${projectName} --version ${reactNativeVersion}`)

  // switch to the newly created project directory to continue the rest of these commands
  process.chdir(projectName)

  await system.spawn(`ignite add ${igniteDevPackagePrefix}basic-structure ${projectName} --unholy`, { stdio: 'inherit' })

  info(`🔥  installing ignite dependencies`)
  if (context.ignite.useYarn) {
    await system.run('yarn')
  } else {
    await system.run('npm i')
  }

  // react native link -- must use spawn & stdio: ignore or it hangs!! :(
  info(`🔥  linking native libraries`)
  await system.spawn('react-native link', { stdio: 'ignore' })

  await system.spawn(`ignite add ${igniteDevPackagePrefix}basic-generators`, { stdio: 'inherit' })

  // now run install of Ignite Plugins
  if (answers['dev-screens'] === 'Yes' || parameters.options.max) {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}dev-screens`, { stdio: 'inherit' })
  }

  if (answers['vector-icons'] === 'react-native-vector-icons' || parameters.options.max) {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}vector-icons`, { stdio: 'inherit' })
  }

  if (answers['i18n'] === 'react-native-i18n' || parameters.options.max) {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}i18n`, { stdio: 'inherit' })
  }

  if (answers['animatable'] === 'react-native-animatable' || parameters.options.max) {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}animatable`, { stdio: 'inherit' })
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
  info('To see what ignite can do for you:')
  info(colors.yellow(`  cd ${projectName}`))
  info(colors.yellow('  ignite'))
  info('')
}
