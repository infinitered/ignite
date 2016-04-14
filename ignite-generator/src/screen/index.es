#! /usr/bin/env node
'use strict'

import { NamedBase } from 'yeoman-generator'

class ScreenGenerator extends NamedBase {

  generateFile () {
    console.log('Coming soon generate screen - ' + this.name)
  }
}

module.exports = ScreenGenerator
