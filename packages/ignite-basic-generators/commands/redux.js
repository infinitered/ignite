// @cliDescription  Generates a action/creator/reducer set for Redux.
// ----------------------------------------------------------------------------
const { isNilOrEmpty } = require('ramdasauce')

module.exports = async function (context) {
  // grab some features
  const { parameters, config, template, strings } = context
  const { generate } = template
  const { pascalCase } = strings

  // TODO: validation
  if (isNilOrEmpty(parameters.string)) return

  // read some configuration
  const { tests } = config.ignite

  // make a name that's FriendlyLikeThis and not-like-this
  const name = pascalCase(parameters.first)
  const props = { name }

  // generate the React component
  await generate({
    template: 'redux.ejs',
    target: `App/Redux/${name}Redux.js`,
    props
  })

  // generate the appropriate test
  if (tests) {
    await generate({
      template: `redux-test-${tests}.ejs`,
      target: `Tests/Redux/${name}ReduxTest.js`,
      props
    })
  }
}
