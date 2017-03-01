/**
 * Fires when the ignite plugin is added.
 *
 * @param {Object} context - The ignite context.
 */
const add = async function (context) {
  const { filesystem, system, parameters, ignite, print, reactNative } = context
  const name = parameters.third
  const spinner = print.spin(`using Infinite Red's ${print.colors.cyan('minimal')} app template`).succeed()

  // attempt to install React Native or die trying
  const rnInstall = await reactNative.install({ name })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // copy the App folder
  spinner.text = '▸ copying files'
  spinner.start()
  filesystem.copy(
    `${__dirname}/templates/App`, // from my templates/App
    `${process.cwd()}/App`,       // to your ignited project's App
    { overwrite: true }           // clobber any existing files
  )

  // copy Jest tests
  filesystem.copy(
    `${__dirname}/templates/__tests__`, // from my templates/App
    `${process.cwd()}/__tests__`,       // to your ignited project's App
    { overwrite: true }           // clobber any existing files
  )

  // generate some files from templates
  spinner.text = '▸ generating files'
  const templates = [
    { template: 'index.js.ejs', target: 'index.ios.js' },
    { template: 'index.js.ejs', target: 'index.android.js' },
    { template: 'App/Config/AppConfig.js.ejs', target: 'App/Config/AppConfig.js' },
    { template: 'ignite.json.ejs', target: 'ignite/ignite.json' }
  ]
  const templateProps = { name, igniteVersion: ignite.version }
  await ignite.copyBatch(context, templates, templateProps, { quiet: true })
  spinner.stop()

  // install the ignite-basic-generators
  const debugFlag = parameters.options.debug ? '--debug' : 'p'
  const basicGeneratorsCommand = `ignite add basic-generators ${debugFlag}`
  await system.spawn(basicGeneratorsCommand, { stdio: 'inherit' })

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

/**
 * Fires when the ignite plugin is removed.
 *
 * @param {Object} context - The ignite context.
 */
const remove = async function (context) {
  const { print, filesystem, prompt } = context
  const ok = await prompt.confirm('Are you sure you want to delete your App directory?')
  if (ok) {
    filesystem.remove(`${process.cwd()}/App`) // RIP
  } else {
    print.info('Whew. That was a close one.')
  }
}

module.exports = { add, remove }
