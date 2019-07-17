// @ts-nocheck
// NOTE:  this file is intentionally written with es3

var shell = require('shelljs')
var which = require('which')

// Quick n dirty dependency checking
// Saves us 0.350s on startup over full dependency checking
// cost: 0.010s
try {
  which.sync('react-native')
} catch (e) {
  console.log('Missing react-native-cli. Install with `npm i -g react-native-cli` and try again.')
  process.exit(3)
}

// Only check full dependencies if we're running in `--debug` or `--wtf` mode
var debugMode = process.argv.indexOf('--debug') !== -1 || process.argv.indexOf('--wtf') !== -1

if (debugMode) {
  // lets check our global dependencies
  var enforceGlobalDependency = require('./enforce-global')
  var exitCodes = require('../lib/exit-codes').default

  // react-native-cli
  // cost: 0.173s
  var rnCli = enforceGlobalDependency({
    optional: false,
    range: '>=2.0.0',
    which: 'react-native',
    packageName: 'react-native-cli',
    versionCommand: '--version',
    installMessage: 'To install: npm i -g react-native-cli',
  })

  if (!rnCli) {
    // If `react-native` is installed, it can cause problems with `react-native-cli`
    // and cause this to fail. Let's check for that potential issue.
    // This is very costly, so avoid it if possible!
    console.log("\nChecking for 'react-native' npm package conflict...")
    var badRN = shell.exec(`npm list -g react-native`, { silent: true })
    if (badRN.code === 0) {
      console.log(
        '\n' +
          "It appears you have the global npm package 'react-native' installed. This causes problems\n" +
          'with Ignite CLI. You may have installed this by mistake. Instead, you probably want the\n' +
          'react-native-cli npm package.\n' +
          '\n' +
          'npm uninstall -g react-native\n' +
          'npm install -g react-native-cli\n',
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
    installMessage: 'See https://yarnpkg.com/en/docs/install on how to upgrade for your OS.',
  })

  if (!yarn) {
    process.exit(exitCodes.INVALID_GLOBAL_DEPENDENCY)
  }
  
  // If Mac OS, check if XCode is installed
  if (process.platform === "darwin") {
    var xCodeVersion = shell.exec('xcode-select -v',{silent:true}).stdout;
    var xCodeInstalled = RegExp(/xcode-select version \d+/).test(xCodeVersion);
  
    if(!xCodeInstalled) {
      console.log('We can\'t detect XCode installed on your machine. Check if XCode is installed and available in PATH');
      process.exit(exitCodes.INVALID_GLOBAL_DEPENDENCY);
    }
  }
  
}
