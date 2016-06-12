#! /usr/bin/env node
'use strict'

import { NamedBase } from 'yeoman-generator'

const copyOverListView = (context) => {
  // copy listview template
  context.fs.copyTpl(
    context.templatePath('listview.js.template'),
    context.destinationPath(`./App/Containers/${context.name}.js`),
    { name: context.name }
  )

  // copy listview style template
  context.fs.copyTpl(
    context.templatePath('listview-style.js.template'),
    context.destinationPath(`./App/Containers/Styles/${context.name}Style.js`),
    { name: context.name }
  )
}

class ContainerGenerator extends NamedBase {
  generateApp () {
    // Copy over component files.
    copyOverListView(this)
  }

  end () {
    console.log('Time to get cooking! 🍽 ')
  }
}

module.exports = ContainerGenerator
