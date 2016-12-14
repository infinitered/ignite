// @cliDescription  Generates a screen with a ListView + walkthrough.
// ----------------------------------------------------------------------------
const { isNilOrEmpty } = require('ramdasauce')

module.exports = async function (context) {
  // grab some features
  const { parameters, template, strings } = context
  const { generate } = template
  const { pascalCase } = strings

  // TODO: validation
  if (isNilOrEmpty(parameters.string)) return

  // make a name that's FriendlyLikeThis and not-like-this
  const name = pascalCase(parameters.first)
  const props = { name }

  // which type of grid?
  const message = 'What kind of ListView would you like to generate?'
  const choices = [
    { name: 'Row', value: 'row' },
    { name: 'With Sections', value: 'sections' },
    { name: 'Grid', value: 'grid' }
  ]

  // pick one
  let type = parameters.options.type
  if (isNilOrEmpty(type)) {
    type = context.prompt.ask([{
      name: 'type',
      message,
      choices
    }]).type
  }

  // set appropriate templates to generate
  const componentTemplate = type === 'sections' ? 'listview-sections' : 'listview'
  const styleTemplate = type === 'grid' ? 'listview-grid-style' : 'listview-style'

  // generate the React component
  await generate({
    template: `${componentTemplate}.ejs`,
    target: `App/Containers/${name}.js`,
    props
  })

  // generate the style
  await generate({
    template: `${styleTemplate}.ejs`,
    target: `App/Containers/Styles/${name}Style.js`,
    props
  })
}
