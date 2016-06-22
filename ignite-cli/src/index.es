#! /usr/bin/env node
'use strict'
import Program from 'commander'
import colors from 'colors/safe'
import pjson from './package.json'
import Shell from 'shelljs'
import spawn from 'cross-spawn'

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

// parse params
Program.parse(process.argv)

// no params, print help
if (!Program.args.length) Program.help()
