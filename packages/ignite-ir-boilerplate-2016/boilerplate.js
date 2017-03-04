const Shell = require('shelljs')
const options = require('./options')
const { merge, pipe, assoc, omit, __ } = require('ramda')

const verifyAndroidInstalled = function (context) {
  let androidInstalled = true
  if (!context.system.which('android')) {
    console.log(`Unable to find 'android' in your PATH.`)
    androidInstalled = false
  }
  const androidPath = process.env['ANDROID_HOME']
  if (!androidPath || !Shell.test('-d', androidPath)) {
    console.log(`Unable to find 'ANDROID_HOME' environment variable.`)
    androidInstalled = false
  }
  return androidInstalled
}

const finish = async function (context) {
  const { parameters, system, print, ignite } = context
  const name = parameters.third

  // initial git
  if (system.which('git')) {
    const spinner = print.spin('configuring git')
    ignite.log('git init .')
    await system.run('git init .')
    ignite.log('git add .')
    await system.run('git add .')
    ignite.log('git commit')
    await system.run('git commit -m "Initial commit."')
    // setup husky git hooks
    spinner.text = 'setting up git hooks'
    system.run(`node node_modules/husky/bin/install .`)
    spinner.succeed('configured git')
  }

  // Wrap it up with our success message.
  print.info('')
  print.info('🍽 Time to get cooking!')
  print.info('')
  print.info('To run in iOS:')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  react-native run-ios'))
  print.info('')
  if (verifyAndroidInstalled(context)) {
    print.info('To run in Android:')
    print.info(print.colors.yellow(`  cd ${name}`))
    print.info(print.colors.yellow('  react-native run-android'))
  } else {
    print.info('Android not set up properly!')
    print.info(`Make sure you've followed the latest react-native setup instructions at https://facebook.github.io/react-native/docs/getting-started.html before using ignite.\nYou won't be able to run ${print.colors.yellow('react-native run-android')} successfully until you have.`)
  }
  print.info('')
  print.info('To see what ignite can do for you:')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  ignite'))
  print.info('')
}

/**
 * Let's install.
 *
 * @param {any} context - The gluegun context.
 */
async function install (context) {
  const {
    filesystem,
    parameters,
    ignite,
    reactNative,
    print,
    system,
    prompt,
    template
  } = context

  const name = parameters.third
  const spinner = print
    .spin(`using the ${print.colors.red('Infinite Red')} boilerplate`)
    .succeed()

  // attempt to install React Native or die trying
  const rnInstall = await reactNative.install({ name, skipJest: true })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // remove the __tests__ directory that come with React Native
  filesystem.remove('__tests__')

  // copy our App & Tests directories
  spinner.text = '▸ copying files'
  spinner.start()
  filesystem.copy(`${__dirname}/boilerplate/App`, `${process.cwd()}/App`, {
    overwrite: true
  })
  filesystem.copy(`${__dirname}/boilerplate/Tests`, `${process.cwd()}/Tests`, {
    overwrite: true
  })
  spinner.stop()

  // generate some templates
  spinner.text = '▸ generating files'
  const templates = [
    { template: 'index.js.ejs', target: 'index.ios.js' },
    { template: 'index.js.ejs', target: 'index.android.js' },
    { template: 'README.md', target: 'README.md' },
    { template: 'ignite.json.ejs', target: 'ignite/ignite.json' },
    { template: '.editorconfig', target: '.editorconfig' },
    {
      template: 'App/Config/AppConfig.js.ejs',
      target: 'App/Config/AppConfig.js'
    }
  ]
  const templateProps = {
    name,
    igniteVersion: ignite.version,
    reactNativeVersion: rnInstall.version
  }
  await ignite.copyBatch(context, templates, templateProps, {
    quiet: true,
    directory: `${ignite.ignitePluginPath()}/boilerplate`
  })

  /**
   * Merge the package.json from our template into the one provided from react-native init.
   */
  async function mergePackageJsons () {
    // transform our package.json incase we need to replace variables
    const rawJson = await template.generate({
      directory: `${ignite.ignitePluginPath()}/boilerplate`,
      template: 'package.json.ejs',
      props: templateProps
    })
    const newPackageJson = JSON.parse(rawJson)

    // read in the react-native created package.json
    const currentPackage = filesystem.read('package.json', 'json')

    // deep merge, lol
    const newPackage = pipe(
      assoc(
        'dependencies',
        merge(currentPackage.dependencies, newPackageJson.dependencies)
      ),
      assoc(
        'devDependencies',
        merge(currentPackage.devDependencies, newPackageJson.devDependencies)
      ),
      assoc('scripts', merge(currentPackage.scripts, newPackageJson.scripts)),
      merge(
        __,
        omit(['dependencies', 'devDependencies', 'scripts'], newPackageJson)
      )
    )(currentPackage)

    // write this out
    filesystem.write('package.json', newPackage, { jsonIndent: 2 })
  }
  await mergePackageJsons()

  spinner.stop()

  // --max, --min, interactive
  let answers
  if (parameters.options.max) {
    answers = options.answers.max
  } else if (parameters.options.min) {
    answers = options.answers.min
  } else {
    answers = await prompt.ask(options.questions)
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

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // NOTE(steve): I'm re-adding this here because boilerplates now hold permanent files
  // TODO(steve):
  //   * this needs to get planned a little better.
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  try {
    await system.spawn(`ignite add ir-boilerplate-2016 ${debugFlag}`, { stdio: 'inherit' })

    // now run install of Ignite Plugins
    if (answers['dev-screens'] === 'Yes') {
      await system.spawn(`ignite add dev-screens ${debugFlag}`, {
        stdio: 'inherit'
      })
    }

    if (answers['vector-icons'] === 'react-native-vector-icons') {
      await system.spawn(`ignite add vector-icons ${debugFlag}`, {
        stdio: 'inherit'
      })
    }

    if (answers['i18n'] === 'react-native-i18n') {
      await system.spawn(`ignite add i18n ${debugFlag}`, { stdio: 'inherit' })
    }

    if (answers['animatable'] === 'react-native-animatable') {
      await system.spawn(`ignite add animatable ${debugFlag}`, {
        stdio: 'inherit'
      })
    }
  } catch (e) {
    ignite.log(e)
    throw e
  }

  await finish(context)
}

module.exports = { install }
