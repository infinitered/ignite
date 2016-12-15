const R = require('ramda')
const Shell = require('shelljs')

module.exports = async function (context) {
  const { filesystem: { exists, read } } = context
  const { debug } = context.print

  // ... be the CLI you wish to see in the world
  const platform = process.platform
  const ignitePath = R.trim(Shell.which('ignite') || '')
  const igniteVersion = R.trim(Shell.exec('ignite -V', { silent: true }).stdout)
  const nodePath = R.trim(Shell.which('node'))
  const npmVersion = R.trim(Shell.exec('npm --version', { silent: true }).stdout)
  const npmPath = R.trim(Shell.which('npm'))
  const nodeVersion = R.trim(Shell.exec('node --version', { silent: true }).stdout)
  const ggPackageFile = `${process.cwd()}/node_modules/gluegun/package.json`
  const ggVersion = exists(ggPackageFile) ? read(ggPackageFile, 'json').version : '¯\\_(ツ)_/¯'

  const rnCli = R.split(/\s/, R.trim(Shell.exec('react-native --version', { silent: true }).stdout))[1] // lulz

  const rnPackageFile = `${process.cwd()}/node_modules/react-native/package.json`
  const appReactNativeVersion = Shell.test('-f', rnPackageFile) ? require(rnPackageFile).version : '¯\\_(ツ)_/¯'

  const body = `
\`\`\`
Computer
  Platform: ${platform}
Ignite
  Version: ${igniteVersion}
  Path: ${ignitePath}
Node
  Version: ${nodeVersion}
  Path: ${nodePath}
NPM
  Version: ${npmVersion}
  Path: ${npmPath}
Gluegun
  Version: ${ggVersion}
React Native CLI
  Version: ${rnCli}
App
  React Native Version: ${appReactNativeVersion}
\`\`\`
`
  debug(body, 'Ignite Info')
}
