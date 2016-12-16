// @cliDescription  Generates a saga with an optional test.
// ----------------------------------------------------------------------------
const generate = require('../shared/generate-utils')

module.exports = async function (context) {
  // grab some features
  const { parameters, config, print, strings } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate saga <name>\n`)
    print.info('A name is required.')
    return
  }

  const { tests } = config.ignite
  const name = pascalCase(parameters.first)
  const props = { name }

  const jobs = [
    { template: `saga.ejs`, target: `App/Sagas/${name}Sagas.js` }
  ]
  if (tests) {
    jobs.push({
      template: `saga-test-${tests}.ejs`,
      target: `Tests/Saga/${name}SagaTest.js`
    })
  }

  // make the templates
  await generate(context, jobs, props)
}
