// @cliDescription  Generates a redux smart component.
// @cliExample  ignite generate container MyContainer
// ----------------------------------------------------------------------------
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

  const copyJobs = [{
    template: 'container.ejs',
    target: `App/Containers/${name}.js`
  }, {
    template: 'container-style.ejs',
    target: `App/Containers/Styles/${name}Style.js`
  }]

  // make the templates
  await ignite.copyBatch(context, copyJobs, {name})
}
