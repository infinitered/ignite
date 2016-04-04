#! /usr/bin/env node
'use strict'

import colors from 'colors/safe'
import { NamedBase } from 'yeoman-generator'
import Shell from 'shelljs'

const igniteBase = 'ignite-base'

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

const copyOverBase = (context) => {
  // copy New project Readme
  context.fs.copyTpl(
    context.templatePath(`${igniteBase}/README.md.template`),
    context.destinationPath(`${context.name}/README.md`),
    { name: context.name }
  )

  // copy package.json
  context.fs.copyTpl(
    context.templatePath(`${igniteBase}/package.json.template`),
    context.destinationPath(`${context.name}/package.json`),
    { name: context.name }
  )

  // copy template of index.ios.js
  context.fs.copyTpl(
    context.templatePath(`${igniteBase}/index.js.template`),
    context.destinationPath(`${context.name}/index.ios.js`),
    { name: context.name }
  )

  // copy template of index.android.js
  context.fs.copyTpl(
    context.templatePath(`${igniteBase}/index.js.template`),
    context.destinationPath(`${context.name}/index.android.js`),
    { name: context.name }
  )

  // copy git_hooks/
  context.directory(
    context.templatePath(`${igniteBase}/git_hooks`),
    context.destinationPath(`${context.name}/git_hooks`)
  )

  // copy Tests/
  context.directory(
    context.templatePath(`${igniteBase}/Tests`),
    context.destinationPath(`${context.name}/Tests`)
  )

  // copy App/
  context.directory(
    context.templatePath(`${igniteBase}/App`),
    context.destinationPath(`${context.name}/App`)
  )
}

const emptyFolder = (folder) => {
  Shell.rm('-rf', folder)
  Shell.mkdir(folder)
}

class AppGenerator extends NamedBase {
  initializing () {
    console.log(colors.yellow('irrigate app -> ') + this.name + ' ☕️  This will take a while ☕️ ')
    // force overwrite on conflicts (default is ask user)
    this.conflicter.force = true

    // Fail if tools are missing
    verifyTools()

    this.templateFolder = this.sourceRoot()
    // Clean template folder
    emptyFolder(this.templateFolder)
  }

  generateApp () {
    // Create latest RN project
    this.spawnCommandSync('react-native', ['init', this.name])

    // Grab latest RNBase into templates folder
    Shell.exec(`git clone git@github.com:infinitered/react_native_base.git ${this.templateFolder}`)

    // Copy over files from RN Base that apply
    copyOverBase(this)
  }

  install () {
    // npm install copied package.json via `npm --prefix ./some_project install ./some_project`
    this.spawnCommandSync('npm', ['--prefix', `./${this.name}`, 'install', `./${this.name}`])
    // Do rnpm link
    Shell.exec(`cd ${this.name} && rnpm link`)
  }

  end () {
    // Clean template folder
    emptyFolder(this.templateFolder)

    console.log('Time to get cooking! 🍽 ' + colors.red('IR') + colors.green('rigate is Done! 💦'))
  }
}

module.exports = AppGenerator
