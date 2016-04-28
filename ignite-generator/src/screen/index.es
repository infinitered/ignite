#! /usr/bin/env node
'use strict'

import { NamedBase } from 'yeoman-generator'
import { verifyTools } from '../validation'

const copyOverScreenContainer = (context) => {
  // copy screen template
  context.fs.copyTpl(
    context.templatePath('screen.js.template'),
    context.destinationPath(`./App/Containers/${context.name}.js`),
    { name: context.name }
  )

  // copy screen style template
  context.fs.copyTpl(
    context.templatePath('screen-style.js.template'),
    context.destinationPath(`./App/Containers/Styles/${context.name}Style.js`),
    { name: context.name }
  )
}

class ScreenGenerator extends NamedBase {
  initializing () {
    // Fail if tools are missing
    verifyTools()
  }

  generateApp () {
    // Copy over component files.
    copyOverScreenContainer(this)
  }

  end () {
    console.log('Time to get cooking! 🍽 ')
  }
}

module.exports = ScreenGenerator
