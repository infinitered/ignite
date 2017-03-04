// @cliDescription  Generates a action/creator/reducer set for Redux.

module.exports = async function (context) {
  // grab some features
  const { parameters, ignite, strings, print } = context
  const { isBlank, pascalCase } = strings
  const config = ignite.loadIgniteConfig()

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate redux <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  const jobs = [{ template: `redux.ejs`, target: `App/Redux/${name}Redux.js` }]
  if (config.tests) {
    jobs.push({
      template: `redux-test-${config.tests}.ejs`,
      target: `Tests/Redux/${name}ReduxTest.js`
    })
  }

  await ignite.copyBatch(context, jobs, props)
}
