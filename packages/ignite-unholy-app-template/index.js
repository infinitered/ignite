const { merge, pipe, assoc, omit, __ } = require('ramda')

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
  const { filesystem, parameters, ignite, reactNative, print, system, prompt, template } = context
  const name = parameters.third
  const igniteDevPackagePrefix = parameters.options['ignite-dev-package-prefix'] // NOTE(steve): going away soon
  const spinner = print.spin(`using Infinite Red's ${print.colors.cyan('unholy')} app template`).succeed()

  // attempt to install React Native or die trying
  const rnInstall = await reactNative.install({ name, skipJest: true })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // remove the __tests__ directory that come with React Native
  filesystem.remove('__tests__')

  // copy our App & Tests directories
  spinner.text = '▸ copying files'
  spinner.start()
  filesystem.copy(`${__dirname}/templates/App`, `${process.cwd()}/App`, { overwrite: true })
  filesystem.copy(`${__dirname}/templates/Tests`, `${process.cwd()}/Tests`, { overwrite: true })
  spinner.stop()

  // generate some templates
  spinner.text = '▸ generating files'
  const templates = [
    { template: 'index.js.ejs', target: 'index.ios.js' },
    { template: 'index.js.ejs', target: 'index.android.js' },
    { template: 'README.md', target: 'README.md' },
    { template: 'ignite.json.ejs', target: 'ignite/ignite.json' },
    { template: '.editorconfig', target: '.editorconfig' },
    { template: 'App/Config/AppConfig.js.ejs', target: 'App/Config/AppConfig.js' }
  ]
  const templateProps = { name, igniteVersion: ignite.version, reactNativeVersion: rnInstall.version }
  await ignite.copyBatch(context, templates, templateProps)

  /**
   * Merge the package.json from our template into the one provided from react-native init.
   */
  async function mergePackageJsons () {
    // transform our package.json incase we need to replace variables
    const rawJson = await template.generate({
      directory: `${ignite.ignitePluginPath()}/templates`,
      template: 'package.json.ejs',
      props: templateProps
    })
    const newPackageJson = JSON.parse(rawJson)

    // read in the react-native created package.json
    const currentPackage = filesystem.read('package.json', 'json')

    // deep merge, lol
    const newPackage = pipe(
      assoc('dependencies', merge(currentPackage.dependencies, newPackageJson.dependencies)),
      assoc('devDependencies', merge(currentPackage.devDependencies, newPackageJson.devDependencies)),
      assoc('scripts', merge(currentPackage.scripts, newPackageJson.scripts)),
      merge(__, omit(['dependencies', 'devDependencies', 'scripts'], newPackageJson))
    )(currentPackage)

    // write this out
    filesystem.write('package.json', newPackage, { jsonIndent: 2 })
  }
  await mergePackageJsons()

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

  // pass long the debug flag if we're running in that mode
  const debugFlag = parameters.options.debug ? '--debug' : 'p'

  await system.spawn(`ignite add ${igniteDevPackagePrefix}basic-generators ${debugFlag}`, { stdio: 'inherit' })

  // now run install of Ignite Plugins
  if (answers['dev-screens'] === 'Yes') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}dev-screens ${debugFlag}`, { stdio: 'inherit' })
  }

  if (answers['vector-icons'] === 'react-native-vector-icons') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}vector-icons ${debugFlag}`, { stdio: 'inherit' })
  }

  if (answers['i18n'] === 'react-native-i18n') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}i18n ${debugFlag}`, { stdio: 'inherit' })
  }

  if (answers['animatable'] === 'react-native-animatable') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}animatable ${debugFlag}`, { stdio: 'inherit' })
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
