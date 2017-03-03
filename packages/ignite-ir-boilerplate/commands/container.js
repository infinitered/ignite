// @cliDescription  Generates a redux smart component.

module.exports = async function (context) {
  // grab some features
  const { parameters, strings, print, ignite } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate container <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  const jobs = [
    {
      template: 'container.ejs',
      target: `App/Containers/${name}.js`
    },
    {
      template: 'container-style.ejs',
      target: `App/Containers/Styles/${name}Style.js`
    }
  ]

  await ignite.copyBatch(context, jobs, props)
}
