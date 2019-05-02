import { IgniteToolbox, IgniteRNInstallResult } from '../types'

export default async function(toolbox: IgniteToolbox) {
  const { filesystem, parameters, meta, print, reactNative } = toolbox
  const name = parameters.first
  const spinner = print.spin(`skipping boilerplate`).succeed()

  // attempt to install React Native or die trying
  const rnInstall: IgniteRNInstallResult = await reactNative.install({ name })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  // ignite/ignite.json
  const igniteJson = {
    createdWith: meta.version(),
    boilerplate: 'empty',
    examples: 'none',
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
