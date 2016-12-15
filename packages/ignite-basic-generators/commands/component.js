// @cliDescription  Generates a component, styles, and an optional test.
// ----------------------------------------------------------------------------
const generate = require('../shared/generate-utils')

module.exports = async function (context) {
  // grab some features
  const { parameters, config, strings, print } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate component <name>\n`)
    print.info('A component name is required.')
    return
  }

  // read some configuration
  const { tests } = config.generate

  // make a name that's FriendlyLikeThis and not-like-this
  const name = pascalCase(parameters.first)
  const props = { name }

  const component = {
    template: 'component.ejs',
    target: `App/Components/${name}.js`
  }
  const style = {
    template: 'component-style.ejs',
    target: `App/Components/Styles/${name}Style.js`
  }
  const test = {
    template: 'component.ejs',
    target: `Test/Components/${name}Test.js`
  }
  const jobs = [component, style, tests === 'ava' && test]

  // make the templates
  await generate(context, jobs, props)
}
