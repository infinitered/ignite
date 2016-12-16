// @cliDescription  Generates a action/creator/reducer set for Redux.
// ----------------------------------------------------------------------------
const generate = require('../shared/generate-utils')

module.exports = async function (context) {
  // grab some features
  const { parameters, config, strings, print } = context
  const { isBlank, pascalCase } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate redux <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  const jobs = [
    { template: `redux.ejs`, target: `App/Redux/${name}Redux.js` }
  ]
  if (config.ignite.tests) {
    jobs.push({
      template: `redux-test-${config.ignite.tests}.ejs`,
      target: `Tests/Redux/${name}ReduxTest.js`
    })
  }

  // make the templates
  await generate(context, jobs, props)
}
