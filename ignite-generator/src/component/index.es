#! /usr/bin/env node
'use strict'

import Generators from 'yeoman-generator'

const copyOverComponent = (context) => {
  // copy component template
  context.fs.copyTpl(
    context.templatePath('component.js.template'),
    context.destinationPath(`./App/Components/${context.name}.js`),
    { name: context.name }
  )

  // copy component style template
  context.fs.copyTpl(
    context.templatePath('component-style.js.template'),
    context.destinationPath(`./App/Components/Styles/${context.name}Style.js`),
    { name: context.name }
  )
}

class ComponentGenerator extends Generators.Base {

  constructor (args, options) {
    super(args, options)
    this.argument('name', { type: String, required: true })
  }

  generateComponent () {
    // Copy over component files.
    copyOverComponent(this)
  }

  end () {
    console.log('Time to get cooking! 🍽 ')
  }
}

module.exports = ComponentGenerator
