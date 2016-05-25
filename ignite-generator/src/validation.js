'use strict'

import colors from 'colors/safe'
import Shell from 'shelljs'

const showWarnings = () => {
  // Warn if outdated
  Shell.exec('npm outdated -g react-native-cli')
}

// These tools are slower to check
const verifyExtensiveTools = () => {
  // verify rnpm exists
  if (!Shell.which('rnpm')) {
    console.log(colors.red('This script requires rnpm to be installed.'))
    console.log(colors.green('Installing rnpm...'))
    Shell.exec('npm i -g rnpm')
  // Enforce latest rnpm -> line count of npm outdated should be zero
  } else if (!Shell.exec('npm outdated -g rnpm | wc -l | grep 0')) {
    console.log(colors.red('We depend on an updated rnpm.'))
    console.log(colors.yellow('Please update with ') + colors.green('npm i -g rnpm'))
    console.log(colors.red('Exiting!'))
    Shell.exit(1)
  }
}

module.exports = { showWarnings, verifyExtensiveTools }
