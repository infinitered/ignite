// @ts-nocheck
// NOTE:  this file is intentionally written with es3

var shell = require('shelljs')

// Only check full dependencies if we're running in `--debug` or `--wtf` mode
var debugMode = process.argv.indexOf('--debug') !== -1 || process.argv.indexOf('--wtf') !== -1

if (debugMode) {
  // lets check our global dependencies
  var enforceGlobalDependency = require('./enforce-global')
  var exitCodes = require('../lib/exit-codes').default

  // yarn
  // cost: 0.175s
  var yarn = enforceGlobalDependency({
    optional: true,
    range: '>=0.21.0',
    which: 'yarn',
    versionCommand: '--version',
    installMessage: 'See https://yarnpkg.com/en/docs/install on how to upgrade for your OS.',
  })

  if (!yarn) {
    process.exit(exitCodes.INVALID_GLOBAL_DEPENDENCY)
  }

  // If Mac OS, check if XCode is installed
  if (process.platform === 'darwin') {
    var xCodeVersion = shell.exec('xcode-select -v', { silent: true }).stdout
    var xCodeInstalled = RegExp(/xcode-select version \d+/).test(xCodeVersion)

    if (!xCodeInstalled) {
      console.log("We can't detect XCode installed on your machine. Check if XCode is installed and available in PATH")
      process.exit(exitCodes.INVALID_GLOBAL_DEPENDENCY)
    }
  }
}
