// @cliDescription  Generates a redux smart component.
// ----------------------------------------------------------------------------
const generate = require('../shared/generate-utils')

module.exports = async function (context) {
  // grab some features
  const { parameters, strings, print } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate container <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  const component = {
    template: 'container.ejs',
    target: `App/Containers/${name}.js`
  }
  const style = {
    template: 'container-style.ejs',
    target: `App/Containers/Styles/${name}Style.js`
  }
  const jobs = [component, style]

  // make the templates
  await generate(context, jobs, props)
}
