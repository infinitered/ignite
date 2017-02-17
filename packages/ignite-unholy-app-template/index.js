// Questions to ask during install if the chatty route is chosen.
const installQuestions = [
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

const maxOptions = {
  'dev-screens': 'Yes',
  'vector-icons': 'react-native-vector-icons',
  'i18n': 'react-native-i18n',
  'animatable': 'react-native-animatable'
}

const add = async function (context) {
  const { filesystem, parameters, ignite, reactNative, print, system, prompt } = context
  const name = parameters.third
  const igniteDevPackagePrefix = parameters.options['ignite-dev-package-prefix'] // NOTE(steve): going away soon
  const spinner = print.spin(`using ${print.colors.cyan('unholy')} app template`).succeed()

  // attempt to install React Native or die trying
  const rnExitCode = await reactNative.install({ name, skipJest: true })
  if (rnExitCode > 0) process.exit(rnExitCode)

  // copy our App directory
  spinner.text = '▸ copying files'
  spinner.start()
  filesystem.copy(`${__dirname}/templates/App`, `${process.cwd()}/App`, { overwrite: true })
  spinner.stop()

  // generate some templates
  spinner.text = '▸ generating files'
  const templates = [
    { template: 'index.js.ejs', target: 'index.ios.js' },
    { template: 'index.js.ejs', target: 'index.android.js' },
    { template: 'README.md', target: 'README.md' },
    { template: 'ignite.json.ejs', target: 'ignite/ignite.json' },
    { template: '.editorconfig', target: '.editorconfig' },
    { template: 'App/Config/AppConfig.js.ejs', target: 'App/Config/AppConfig.js' },
    { template: 'package.json.ejs', target: 'package.json' } // TODO: merge this, don't copy like we are
  ]
  const templateProps = { name, igniteVersion: ignite.version }
  await ignite.copyBatch(context, templates, templateProps)
  spinner.stop()

  // figure out which parts of unholy to install
  const answers = parameters.options.max
    ? maxOptions
    : await prompt.ask(installQuestions)

  spinner.text = '▸ installing ignite dependencies'
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

  // Wrap it up with our success message.
  print.info('')
  print.info('🍽 Time to get cooking!')
  print.info('')
  print.info('To run in iOS:')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  react-native run-ios'))
  print.info('')
  print.info('To run in Android:')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  react-native run-android'))
  print.info('')
  print.info('To see what ignite can do for you:')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  ignite'))
  print.info('')
}

// TODO
const remove = async function (context) {
}

module.exports = { add, remove }
