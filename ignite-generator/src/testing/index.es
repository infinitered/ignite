#! /usr/bin/env node
'use strict'

import { NamedBase } from 'yeoman-generator'
import * as Utilities from '../utilities'

class TestGenerator extends NamedBase {
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
