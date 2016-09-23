import Generators from 'yeoman-generator'
import R from 'ramda'
import { getConfig } from '../utilities'

const copyOverComponent = (context) => {
  const igniteConfig = getConfig()
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

  // create a component ava test
  if (R.pathEq(['options', 'testing'], 'ava', igniteConfig)) {
    context.fs.copyTpl(
      context.templatePath('component-test.js.template'),
      context.destinationPath(`./Tests/Components/${context.name}Test.js`),
      { name: context.name }
    )
  }
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
