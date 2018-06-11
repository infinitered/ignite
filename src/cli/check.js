// NOTE:  this file is intentionally written with es3

var Sniff = require('gluegun/sniff')
var shell = require('shelljs')
var which = require('which')

// check the node version
if (!Sniff.isNewEnough) {
  console.log(
    'Node.js 7.6+ is required to run. You have ' +
      Sniff.nodeVersion +
      '. Womp, womp.'
  )
  process.exit(1)
}

// check for async and await
if (!Sniff.hasAsyncAwait) {
  console.log(
    'The async feature is not available. Please ensure your Node is up to date.'
  )
  process.exit(2)
}

// Quick n dirty dependency checking
// Saves us 0.350s on startup over full dependency checking
// cost: 0.010s
try {
  which.sync('react-native')
} catch (e) {
  console.log(
    'Missing react-native-cli. Install with `npm i -g react-native-cli` and try again.'
  )
  process.exit(3)
}

// Only check full dependencies if we're running in `--debug` or `--wtf` mode
var debugMode = (process.argv.indexOf('--debug') !== -1 || process.argv.indexOf('--wtf') !== -1)

if (debugMode) {
  // lets check our global dependencies
  var enforceGlobalDependency = require('./enforceGlobalDependency')
  var exitCodes = require('../lib/exitCodes')

  // react-native-cli
  // cost: 0.173s
  var rnCli = enforceGlobalDependency({
    optional: false,
    range: '>=2.0.0',
    which: 'react-native',
    packageName: 'react-native-cli',
    versionCommand: '--version',
    installMessage: 'To install: npm i -g react-native-cli'
  })

  if (!rnCli) {
    // If `react-native` is installed, it can cause problems with `react-native-cli`
    // and cause this to fail. Let's check for that potential issue.
    // This is very costly, so avoid it if possible!
    console.log('\nChecking for \'react-native\' npm package conflict...')
    var badRN = shell.exec(`npm list -g react-native`, { silent: true })
    if (badRN.code === 0) {
      console.log('\n' +
        'It appears you have the global npm package \'react-native\' installed. This causes problems\n' +
        'with Ignite CLI. You may have installed this by mistake. Instead, you probably want the\n' +
        'react-native-cli npm package.\n' +
        '\n' +
        'npm uninstall -g react-native\n' +
        'npm install -g react-native-cli\n'
      )
    }

    process.exit(exitCodes.INVALID_GLOBAL_DEPENDENCY)
  }

  // yarn
  // cost: 0.175s
  var yarn = enforceGlobalDependency({
    optional: true,
    range: '>=0.21.0',
    which: 'yarn',
    versionCommand: '--version',
    installMessage: 'See https://yarnpkg.com/en/docs/install on how to upgrade for your OS.'
  })

  if (!yarn) {
    process.exit(exitCodes.INVALID_GLOBAL_DEPENDENCY)
  }
}
