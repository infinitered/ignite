// @cliDescription  Generates an opinionated container.
// ----------------------------------------------------------------------------
const generate = require('../shared/generate-utils')

module.exports = async function (context) {
  // grab some features
  const { parameters, print, strings } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate saga <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  const jobs = [
    {
      template: `screen.ejs`,
      target: `App/Containers/${name}Screen.js`
    },
    {
      template: `saga.ejs`,
      target: `App/Containers/Styles/${name}ScreenStyle.js`
    }
  ]

  // make the templates
  await generate(context, jobs, props)
}
