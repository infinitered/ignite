#! /usr/bin/env node
'use strict'

import Generator from '../Generator'
import { NamedBase } from 'yeoman-generator'

class ContainerGenerator extends NamedBase {

  generateFile () {
    console.log('IRrigate container - ' + this.name)
    Generator.hydrateComponent('Containers', this.name)
  }
}

module.exports = ContainerGenerator
