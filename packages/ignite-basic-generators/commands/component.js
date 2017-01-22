// @cliDescription  Generates a component, styles, and an optional test.
// @cliExample  ignite generate component MyComponent # TODO: Add example?
// ----------------------------------------------------------------------------

module.exports = async function (context) {
  // grab some features
  const { parameters, config, strings, print } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate component <name>\n`)
    print.info('A name is required.')
    return
  }

  // read some configuration
  const { tests } = config.ignite
  const name = pascalCase(parameters.first)

  const copyJobs = [
    {
      template: 'component.ejs',
      target: `App/Components/${name}.js`
    },
    {
      template: 'component-style.ejs',
      target: `App/Components/Styles/${name}Style.js`
    },
    (tests === 'ava') && {
      template: 'component-test.ejs',
      target: `Test/Components/${name}Test.js`
    }
  ]

  // make the templates
  await ignite.copyBatch(context, copyJobs, {name})
}
