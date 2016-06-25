#! /usr/bin/env node
'use strict'

import Generators from 'yeoman-generator'
import * as Utilities from '../utilities'

const copyOverMapviewContainer = (context) => {
  // copy mapview template
  context.fs.copyTpl(
    context.templatePath('mapview.js.template'),
    context.destinationPath(`./App/Containers/${context.name}.js`),
    { name: context.name }
  )

  // copy mapcallout template
  context.fs.copyTpl(
    context.templatePath('mapcallout.js.template'),
    context.destinationPath(`./App/Components/MapCallout.js`),
    { }
  )

  // copy maphelpers template
  context.fs.copyTpl(
    context.templatePath('maphelpers.js.template'),
    context.destinationPath(`./App/Lib/MapHelpers.js`),
    { }
  )

  // copy mapview style template
  context.fs.copyTpl(
    context.templatePath('mapview-style.js.template'),
    context.destinationPath(`./App/Containers/Styles/${context.name}Style.js`),
    { name: context.name }
  )

  // copy mapcallout style template
  context.fs.copyTpl(
    context.templatePath('mapcallout-style.js.template'),
    context.destinationPath(`./App/Components/Styles/MapCalloutStyle.js`),
    { name: context.name }
  )
}

const addToRoutes = (context) => {
  const newRoute = `  get ${context.name} () {
    return {
      title: '${context.name}',
      component: require('../Containers/${context.name}').default,
      leftButton: 'BACK'
    }
  }
`
  Utilities.insertInFile('App/Navigation/Routes.js', 'get ', newRoute, false)
}

class MapviewGenerator extends Generators.Base {

  constructor (args, options) {
    super(args, options)
    this.argument('name', { type: String, required: true })
  }

  generateApp () {
    // Copy over component files.
    copyOverMapviewContainer(this)
  }

  end () {
    // insert screen into routes file
    addToRoutes(this)

    console.log('Time to get cooking! 🍽 ')
  }
}

module.exports = MapviewGenerator
