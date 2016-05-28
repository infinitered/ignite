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

// version
Program
  .version(pjson.version)

// new
Program
  .command('new <project>')
  .description('ignite a new base project')
  .alias('n')
  .action((project) => {
    checkYo()
    console.log(`🔥 Setting ${project} on ${FIRE} 🔥`)
    spawn('yo', ['react-native-ignite', project], { shell: true, stdio: 'inherit' })
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
