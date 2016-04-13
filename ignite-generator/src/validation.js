'use strict'

import colors from 'colors/safe'
import Shell from 'shelljs'

const showWarnings = () => {
  // Warn if outdated
  Shell.exec(`npm outdated -g react-native-cli`)
}

// keep this one fast
const verifyTools = () => {
  // verify react-native
  if (!Shell.which('react-native')) {
    console.log(colors.red('This script requires react-native to be installed first.'))
    Shell.exit(1)
  }
}

// These tools are slower to check
const verifyExtensiveTools = () => {
  // verify git
  if (!Shell.which('git')) {
    console.log(colors.red('This script requires git to be installed first.'))
    Shell.exit(1)
  }

  // verify rnpm exists
  if (!Shell.which('rnpm')) {
    console.log(colors.red('This script requires rnpm to be installed.'))
    console.log(colors.green('Installing rnpm...'))
    Shell.exec('npm i -g rnpm')
  // Enforce latest rnpm -> line count of npm outdated should be zero
  } else if (!Shell.exec(`npm outdated -g rnpm | wc -l | grep 0`)) {
    console.log(colors.red('We depend on an updated rnpm.'))
    console.log(colors.yellow('Please update with ') + colors.green('npm i -g rnpm'))
    console.log(colors.red('Exiting!'))
    Shell.exit(1)
  }
}

module.exports = { showWarnings, verifyTools, verifyExtensiveTools }
