// @cliDescription  Generates an set of helpful dev screens
// ----------------------------------------------------------------------------
const generate = require('../shared/generate-utils')


module.exports = async function (context) {
  // grab some features
  const { parameters, print, strings } = context
  const { pascalCase, isBlank } = strings

  const name = pascalCase(parameters.first)
  const props = { name }

  const screens = ["AllComponentsScreen", "APITestingScreen", "DeviceInfoScreen", "PresentationScreen", "ThemeScreen", "UsageExamplesScreen"]

  const jobs = []

  screens.each((screen) => {
    jobs.merge([
      {
        template: `${screen}.ejs`,
        target: `App/Containers/DevScreens/${screen}.js`
      },
      {
        template: `${screen}Style.ejs`,
        target: `App/Containers/DevScreens/Styles/${screen}Style.js`
      }
    ])
  })

  // make the templates
  await generate(context, jobs, props)
}
