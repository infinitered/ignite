/**
 * Fires when the ignite plugin is added.
 *
 * @param {Object} context - The ignite context.
 */
const add = async function (context) {
  const { filesystem, parameters, ignite, print, reactNative } = context
  const name = parameters.third
  const spinner = print.spin(`using an ${print.colors.cyan('empty')} app template`).succeed()

  // attempt to install React Native or die trying
  const rnExitCode = await reactNative.install({ name })
  if (rnExitCode > 0) process.exit(rnExitCode)

  // ignite/ignite.json
  const igniteJson = {
    'createdWith': ignite.version,
    'examples': 'none'
  }
  filesystem.write(`ignite/ignite.json`, igniteJson)
  spinner.stop()

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
}

module.exports = { add, remove }
