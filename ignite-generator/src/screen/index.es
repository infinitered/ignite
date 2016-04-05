#! /usr/bin/env node
'use strict'

import Generator from '../Generator'
import { NamedBase } from 'yeoman-generator'

class ScreenGenerator extends NamedBase {

  generateFile () {
    console.log('generate screen - ' + this.name)
    Generator.hydrateComponent('Containers', this.name)
  }
}

module.exports = ScreenGenerator
