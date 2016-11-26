#! /usr/bin/env node
'use strict'
import Program from 'commander'
import colors from 'colors/safe'
import pjson from './package.json'
import Shell from 'shelljs'
import spawn from 'cross-spawn'
import R from 'ramda'
import updateNotifier from 'update-notifier'
import exists from 'npm-exists'
import * as fs from 'fs'
import yeoman from 'yeoman-environment'
import readline from 'readline'

const FIRE = colors.red('FIRE!')
const igniteConfigPath = `${process.cwd()}/ignite/ignite.json`

// Optional - could be used for changes warnings
const detectedChanges = (oldObject, newObject) => {
  let oldKeys = R.keys(oldObject)
  let newKeys = R.keys(newObject)
  const inter = R.intersection(oldKeys, newKeys)
  return R.reduce((acc, k) => {
    if (oldObject[k] !== newObject[k]) {
      return R.concat([`'${k}'`], acc)
    }
    return acc
  }, [], inter)
}

const verifyAddedGenerators = (oldIgniteConfig, newIgniteConfig, callback) => {
  const changes = detectedChanges(oldIgniteConfig, newIgniteConfig)
  let pluginGood = true
  if (changes.length > 0) {
    console.log(colors.red(`The following generators would be changed: ${R.join(', ', changes)}`))

    var rl = readline.createInterface(process.stdin, process.stdout)
    rl.question('Do you want to proceed overwriting these generators? (y/n): ', (answer) => {
      if (answer.match(/n/ig)) pluginGood = false
      callback(pluginGood)
      rl.close()
    })
  } else {
    callback(pluginGood)
  }
}

const getIgniteConfig = (igniteConfigFilePath) => {
  try {
    return require(igniteConfigFilePath)
  } catch (e) {
    console.log(colors.red('No `./ignite/ignite.json` file found - This might affect your experience'))
    return {}
  }
}

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

  // 'React' is reserved
  if (project === 'React') {
    console.log(`"${project}" is not a valid name for a project. Please do not use the reserved word "React".`)
    Shell.exit(1)
  }
}

// Early exit if the project name already exists (#349)
const checkDir = (project) => {
  if (fs.existsSync(process.cwd() + '/' + project.toString())) {
    console.log(`Sorry, I couldn't create the directory for "${project}" - it already exists. :(`)
    Shell.exit(1)
  };

  if (fs.existsSync(process.cwd() + '/App')) {
    console.log('Sorry, I couldn\'t create a new app here, I\'m being run in an Ignite directory.')
    Shell.exit(1)
  }
}

// Ensure generators are in the correct directory (#129)
const checkIgniteDir = (type, name) => {
  if (!fs.existsSync(process.cwd() + '/App')) {
    console.log(`Sorry, I couldn't make your ${type} named ${name} - I'm not being run from an Ignite directory. :(`)
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

// Check update version
updateNotifier({ pkg: pjson }).notify()

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
  .option('--latest [true]', 'Optional bool to force RN version to be facebook master (for automated tests).')
  .action((project, options) => {
    checkYo()
    checkName(project)
    checkDir(project)
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
    // should we use Facebook master branch?
    if (options.latest) {
      spawnOptions.push('--latest')
      spawnOptions.push(options.latest)
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
    checkIgniteDir(type, name)
    const igniteConfig = getIgniteConfig(igniteConfigPath)
    const commandNamespace = `ignite:${type}`
    const command = igniteConfig.generators[type]
    if (command) {
      const env = yeoman.createEnv()
      const generatorModulePath = `${process.cwd()}/node_modules/${command}`
      env.register(generatorModulePath, commandNamespace)
      console.log(`Generate a new ${type} named ${name}`)
      env.run(`${commandNamespace} ${name}`, {}, err => {
        if (err) {
          console.log(err)
        } else {
          console.log('Time to get cooking! 🍽 ')
        }
      })
    } else {
      console.log(colors.yellow('DEPRECATED: Generator not found attempting older method.'))
      console.log('These generators will be removed in version 2.0')
      spawn('yo', [`react-native-ignite:${type}`, name], { shell: true, stdio: 'inherit' })
    }
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

// add plugin
Program
  .command('add <plugin>')
  .description('add a designated ignite plugin')
  .alias('a')
  .action((plugin) => {
    checkYo()
    const moduleName = `ignite-${plugin}`
    exists(moduleName)
      .then((moduleExists) => {
        if (moduleExists) {
          console.log(`Adding ${plugin}`)
          spawn('npm', ['i', `${moduleName}`, '--save-dev'], { shell: true, stdio: 'inherit' })
            .on('close', (retCode) => {
              const newModule = require(`${process.cwd()}/node_modules/${moduleName}`)
              const igniteConfig = getIgniteConfig(igniteConfigPath)
              // must clone at this level, bc object of objects is ref
              const originalGenerators = Object.assign({}, igniteConfig.generators)
              const updatedConfig = newModule.initialize(igniteConfig)
              verifyAddedGenerators(originalGenerators, updatedConfig.generators, (performUpdate) => {
                if (performUpdate) {
                  const newConfig = `module.exports = ${JSON.stringify(updatedConfig, null, 2)}`
                  // write updated file
                  const fs = require('fs')
                  fs.writeFile(igniteConfigPath, newConfig)
                  // apply any additional steps defined by the plugin
                  newModule.apply(() => {
                    console.log(`Added ${plugin}`)
                  })
                }
              })
            })
        } else {
          console.error(colors.red("We couldn't find that ignite plugin"))
          console.warn(`Please make sure ${moduleName} exists on the NPM registry`)
          Shell.exit(1)
        }
      })
  })

// spork!
Program
  .command('spork <generator>')
  .description('copies specified generator to ignite folder for modification')
  .alias('s')
  .action((generator) => {
    console.log(`⫚ Begin spork of ${generator} ⫚`)
    const igniteConfig = getIgniteConfig(igniteConfigPath)
    // look up generator in ignite config
    const genPath = igniteConfig.generators[generator]
    if (genPath) {
      console.log(`It is my ambition to spork ${genPath}`)
      // Copy over generator
      Shell.cp('-R', `${process.cwd()}/node_modules/${genPath}`, `${process.cwd()}/ignite/${generator}`)
      // Kill folders that cannot/should not come down with sporking
      Shell.rm('-rf', `${process.cwd()}/ignite/node_modules`)
      Shell.rm('-rf', `${process.cwd()}/ignite/package.json`)
      Shell.rm('-rf', `${process.cwd()}/ignite/.git`)
    } else {
      console.log(colors.red(`No generator named ${generator} was found.`))
      console.log('Please check your ignite.json file')
      Shell.exit(1)
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
