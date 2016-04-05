#! /usr/bin/env node
'use strict'
import Program from 'commander'
import colors from 'colors/safe'
import pjson from './package.json'
import Shell from 'shelljs'

const FIRE = colors.red('FIRE!')

// version
Program
  .version(pjson.version)

// new
Program
  .command('new <project>')
  .description('ignite a new base project')
  .alias('n')
  .action((project) => {
    console.log(`🔥 Setting ${project} on ${FIRE} 🔥`)
    Shell.exec(`yo react-native-ignite ${project}`)
  })

// generate
Program
  .command('generate <type> <name>')
  .description('create a new component, container etc.')
  .alias('g')
  .action((type, name) => {
    console.log(`You would like to generate a new ${type} named ${name}`)
  })

// parse params
Program.parse(process.argv)

// no params, print help
if (!Program.args.length) Program.help()
