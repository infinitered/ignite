#! /usr/bin/env node
'use strict'

import Generators from 'yeoman-generator'

class ListviewGenerator extends Generators.Base {

  constructor (args, options) {
    super(args, options)
    this.argument('name', { type: String, required: true })
  }

  _copyOverListView (type) {
    // copy listview template
    this.fs.copyTpl(
      this.templatePath('listview.js.template'),
      this.destinationPath(`./App/Containers/${this.name}.js`),
      { name: this.name }
    )

    if (type === 'Row List') {
      // copy row style template
      this.fs.copyTpl(
        this.templatePath('listview-style.js.template'),
        this.destinationPath(`./App/Containers/Styles/${this.name}Style.js`),
        { name: this.name }
      )
    } else {
      // copy grid style template
      this.fs.copyTpl(
        this.templatePath('gridlistview-style.js.template'),
        this.destinationPath(`./App/Containers/Styles/${this.name}Style.js`),
        { name: this.name }
      )
    }
  }

  prompting () {
    let prompts = [{
      type: 'list',
      name: 'listviewtype',
      message: 'What kind of listview would you like to generate?',
      choices: ['Row List', 'Grid List'],
      store: true
    }]

    return this.prompt(prompts).then((answers) => {
      this._copyOverListView(answers.listviewtype)
    })
  }

  end () {
    this.log('Time to get cooking! 🍽 ')
  }
}

module.exports = ListviewGenerator
