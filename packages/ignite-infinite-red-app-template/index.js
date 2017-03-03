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

const minOptions = {
  'dev-screens': 'No',
  'vector-icons': 'none',
  'i18n': 'none',
  'animatable': 'non'
}

const add = async function (context) {
  const { filesystem, parameters, ignite, reactNative, print, system, prompt, template } = context
  const name = parameters.third
  const spinner = print.spin(`using the ${print.colors.red('Infinite Red')} app template`).succeed()

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
  await ignite.copyBatch(context, templates, templateProps, { quiet: true })

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

  // --max, --min, interactive
  let answers
  if (parameters.options.max) {
    answers = maxOptions
  } else if (parameters.options.min) {
    answers = minOptions
  } else {
    answers = await prompt.ask(installQuestions)
  }

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
  const debugFlag = parameters.options.debug ? '--debug' : ''

  try {
    await system.spawn(`ignite add basic-generators ${debugFlag}`, { stdio: 'inherit' })

    // now run install of Ignite Plugins
    if (answers['dev-screens'] === 'Yes') {
      await system.spawn(`ignite add dev-screens ${debugFlag}`, { stdio: 'inherit' })
    }

    if (answers['vector-icons'] === 'react-native-vector-icons') {
      await system.spawn(`ignite add vector-icons ${debugFlag}`, { stdio: 'inherit' })
    }

    if (answers['i18n'] === 'react-native-i18n') {
      await system.spawn(`ignite add i18n ${debugFlag}`, { stdio: 'inherit' })
    }

    if (answers['animatable'] === 'react-native-animatable') {
      await system.spawn(`ignite add animatable ${debugFlag}`, { stdio: 'inherit' })
    }
  } catch (e) {
    ignite.log(e)
    throw e // rethrow
  }

  // initial git
  if (system.which('git')) {
    spinner.text = `setting up git`
    spinner.start()
    ignite.log('git init .')
    await system.run('git init .')
    ignite.log('git add .')
    await system.run('git add .')
    ignite.log('git commit')
    await system.run('git commit -m "Initial commit."')
    // setup husky git hooks
    spinner.text = 'setting up git hooks'
    system.run(`node node_modules/husky/bin/install .`)
    spinner.succeed()
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
