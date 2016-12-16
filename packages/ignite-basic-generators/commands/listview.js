// @cliDescription  Generates a screen with a ListView + walkthrough.
// ----------------------------------------------------------------------------
const generate = require('../shared/generate-utils')

module.exports = async function (context) {
  // grab some features
  const { print, parameters, strings } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate listview <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  // which type of grid?
  const message = 'What kind of ListView would you like to generate?'
  const choices = ['Row', 'With Sections', 'Grid']

  // pick one
  let type = parameters.options.type
  if (!type) {
    const answers = await context.prompt.ask({ name: 'type', type: 'list', message, choices })
    type = answers.type
  }

  // set appropriate templates to generate
  const componentTemplate = type === 'With Sections' ? 'listview-sections' : 'listview'
  const styleTemplate = type === 'Grid' ? 'listview-grid-style' : 'listview-style'

  const jobs = [
    { template: `${componentTemplate}.ejs`, target: `App/Containers/${name}.js` },
    { template: `${styleTemplate}.ejs`, target: `App/Containers/Styles/${name}Style.js` }
  ]

  // make the templates
  await generate(context, jobs, props)
}
