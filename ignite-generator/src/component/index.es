#! /usr/bin/env node
'use strict'

import Generator from '../Generator'
import { NamedBase } from 'yeoman-generator'

class ComponentGenerator extends NamedBase {

  generateFile () {
    console.log('generate component - ' + this.name)
    Generator.hydrateComponent('Components', this.name)
  }
}

module.exports = ComponentGenerator
