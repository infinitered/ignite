module.exports = async function (context) {
  const { filesystem, parameters, ignite, print, reactNative } = context
  const name = parameters.second
  const spinner = print.spin(`skipping boilerplate`).succeed()

  // attempt to install React Native or die trying
  const rnInstall = await reactNative.install({ name })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // ignite/ignite.json
  const igniteJson = {
    'createdWith': ignite.version,
    'boilerplate': 'empty',
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
