// @cliDescription  Generates an opinionated container.
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

  // generate the smart component
  await generate({
    template: 'screen.ejs',
    target: `App/Containers/${name}Screen.js`,
    props
  })

  // generate the style
  await generate({
    template: 'screen-style.ejs',
    target: `App/Containers/Styles/${name}ScreenStyle.js`,
    props
  })
}
