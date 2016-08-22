#! /usr/bin/env node
'use strict'
import Program from 'commander'
import colors from 'colors/safe'
import pjson from './package.json'
import Shell from 'shelljs'
import spawn from 'cross-spawn'
import R from 'ramda'

const FIRE = colors.red('FIRE!')

const checkYo = () => {
  if (!Shell.which('yo')) {
    console.log(colors.red('This command requires yo to be installed.'))
    console.log(colors.green('Installing yo...'))
    Shell.exec('CI=true npm i -g yo')
  }
}

const checkName = (project) => {
  // Only alphanumeric project names
  if (/[^a-z0-9]+/i.test(project)) {
    console.log(`"${project}" is not a valid name for a project. Please use a valid identifier name (alphanumeric).`)
    Shell.exit(1)
  }
}

const checkReactNative = () => {
  if (Shell.exec('npm -s -g ls --depth=0', { silent: true }).stdout.indexOf('react-native@') >= 0) {
    console.log(colors.red('Oops! Looks like react-native is installed globally when it should be react-native-cli.'))
    console.log(colors.green('Fixing issue...'))
    Shell.exec('npm uninstall -g react-native', { silent: true })
    Shell.exec('npm install -g react-native-cli', { silent: true })
  }
}

// version
Program
  .version(pjson.version)

// new
Program
  .command('new <project>')
  .description('ignite a new base project')
  .alias('n')
  .option('--repo [https://github.com/infinitered/ignite.git]', 'An optional git URL for Ignite source files.')
  .option('--branch [master]', 'An optional branch for Ignite source files.')
  .action((project, options) => {
    checkYo()
    checkName(project)
    checkReactNative()
    console.log(`🔥 Setting ${project} on ${FIRE} 🔥`)
    // the array of options fed into spawn
    const spawnOptions = []
    // start with the command line
    spawnOptions.push('react-native-ignite')
    // then add the project name
    spawnOptions.push(project)
    // should we use a different repo?
    if (options.repo) {
      spawnOptions.push('--repo')
      spawnOptions.push(options.repo)
    }
    // should we use a different branch?
    if (options.branch) {
      spawnOptions.push('--branch')
      spawnOptions.push(options.branch)
    }
    spawn('yo', spawnOptions, { shell: true, stdio: 'inherit' })
  })

// generate
Program
  .command('generate <type> <name>')
  .description('create a new component, container etc.')
  .alias('g')
  .action((type, name) => {
    checkYo()
    console.log(`Generate a new ${type} named ${name}`)
    spawn('yo', [`react-native-ignite:${type}`, name], { shell: true, stdio: 'inherit' })
  })

// Update
Program
  .command('update')
  .description('update Ignite to latest version')
  .action((type) => {
    checkYo()
    const updateCheck = Shell.exec('npm outdated react-native-ignite --global')

    if (updateCheck.output === '') {
      console.log('Ignite is already latest version')
    } else {
      console.log('Updating ' + colors.red('Ignite'))
      // RUN `npm i -g react-native-ignite --silent`
      spawn('npm', ['i', '-g', 'react-native-ignite', '--silent'], {shell: true, stdio: 'inherit'})
    }
  })

// import
Program
  .command('import <type>')
  .description('import data into existing structure')
  .alias('i')
  .action((type) => {
    checkYo()
    console.log(`Imported ${type}`)
    spawn('yo', [`react-native-ignite:${type}`], { shell: true, stdio: 'inherit' })
  })

Program
  .command('doctor')
  .description('shows your development environment settings')
  .action((type) => {
    const platform = process.platform
    const ignitePath = R.trim(Shell.which('ignite'))
    const igniteVersion = R.trim(Shell.exec('ignite -V', { silent: true }).stdout)
    const nodePath = R.trim(Shell.which('node'))
    const npmVersion = R.trim(Shell.exec('npm --version', { silent: true }).stdout)
    const npmPath = R.trim(Shell.which('npm'))
    const nodeVersion = R.trim(Shell.exec('node --version', { silent: true }).stdout)
    const yoVersion = R.trim(Shell.exec('yo --version', { silent: true }).stdout)
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

Yeoman
  Version: ${yoVersion}

React Native CLI
  Version: ${rnCli}

App
  React Native Version: ${appReactNativeVersion}
\`\`\`
`
    console.log(body)
  })

// parse params
Program.parse(process.argv)

// no params, print help
if (!Program.args.length) Program.help()
