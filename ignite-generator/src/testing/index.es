#! /usr/bin/env node
'use strict'

import Generators from 'yeoman-generator'
import * as Utilities from '../utilities'

class TestGenerator extends Generators.Base {

  constructor (args, options) {
    super(args, options)
    this.argument('name', { type: String, required: true })
  }

  initializing () {
  }

  generateApp () {
    Utilities.insertInFile('file.txt', 'taco', 'I am a new line')
  }

  install () {
  }

  end () {
    console.log('Time to get cooking! 🍽 ')
  }
}

module.exports = TestGenerator
