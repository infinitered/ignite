'use strict'

import Shell from 'shelljs'

const emptyFolder = (folder) => {
  Shell.rm('-rf', folder)
  Shell.mkdir(folder)
}

const verifyTools = () => {
  // verify react-native
  if (!Shell.which('react-native')) {
    console.log(colors.red('This script requires react-native to be installed first.'))
    Shell.exit(1)
  }

  // Warn if outdated
  Shell.exec(`npm outdated react-native-cli`)

  // verify git
  if (!Shell.which('git')) {
    console.log(colors.red('This script requires git to be installed first.'))
    Shell.exit(1)
  }

  // verify rnpm
  if (!Shell.which('rnpm')) {
    console.log(colors.red('This script requires rnpm to be installed.'))
    console.log(colors.green('Installing rnpm...'))
    Shell.exec('npm i -g rnpm')
  }

  // Warn if outdated
  Shell.exec(`npm outdated rnpm`)
}

module.exports = { verifyTools, emptyFolder }
