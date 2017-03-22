// NOTE:  this file is intentionally written with es3

// check the node version
var Sniff = require('gluegun/sniff')

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

// lets check our global dependencies
var enforceGlobalDependency = require('./enforceGlobalDependency')
var exitCodes = require('../lib/exitCodes')

// react-native-cli
var rnCli = enforceGlobalDependency({
  optional: false,
  range: '>=2.0.0',
  which: 'react-native',
  package: 'react-native-cli',
  versionCommand: 'react-native --version',
  installMessage: 'To install: npm i -g react-native-cli'
})

if (!rnCli) {
  process.exit(exitCodes.INVALID_GLOBAL_DEPENDENCY)
}

// yarn
var yarn = enforceGlobalDependency({
  optional: true,
  range: '>=0.21.0',
  which: 'yarn',
  versionCommand: 'yarn --version',
  installMessage: 'See https://yarnpkg.com/en/docs/install on how to upgrade for your OS.'
})

if (!yarn) {
  process.exit(exitCodes.INVALID_GLOBAL_DEPENDENCY)
}
