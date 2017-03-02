// @cliDescription  Generates a component, styles, and an optional test.

module.exports = async function (context) {
  // grab some features
  const { parameters, strings, print, ignite } = context
  const { pascalCase, isBlank } = strings
  const config = ignite.loadIgniteConfig()
  const { tests } = config

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate component <name>\n`)
    print.info('A name is required.')
    return
  }

  // read some configuration
  const name = pascalCase(parameters.first)
  const props = { name }
  const jobs = [
    {
      template: 'component.ejs',
      target: `App/Components/${name}.js`
    },
    {
      template: 'component-style.ejs',
      target: `App/Components/Styles/${name}Style.js`
    },
    tests === 'ava' &&
      {
        template: 'component-test.ejs',
        target: `Test/Components/${name}Test.js`
      }
  ]

  await ignite.copyBatch(context, jobs, props)
}
