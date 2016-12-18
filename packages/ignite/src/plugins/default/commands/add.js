// @cliDescription  Add a new thingy
// ----------------------------------------------------------------------------
const Shell = require('shelljs')
const Exists = require('npm-exists')

module.exports = async function (context) {
    // grab a fist-full of features...
  const { system, print, filesystem, strings, parameters } = context
  const { trim, kebabCase } = strings
  const { info, warning, success, debug, checkmark, error } = print


  ///////////////////////////////////////////////////////////////////////////
  // ...and be the CLI you wish to see in the world
  debug(context.config)
  warning('capture params')
  debug(parameters, 'Captured parameters')

  info('Does it exist?')
  // take the last parameter (because of https://github.com/infinitered/gluegun/issues/123)
  // prepend `ignite` as convention
  const moduleName = `ignite-${parameters.array.pop()}`
  Exists(moduleName).then(moduleExists => {
  // it exists?  Let's install it else warn
    if (moduleExists) {
      success(`Found plugin ${moduleName}`)
      // use yarn or use npm?
    } else {
      warning()
      error("We couldn't find that ignite plugin")
      warning(`Please make sure ${moduleName} exists on the NPM registry`)
    }
  })


  // once installed, let's check on its toml
  // we compare the toml changes against ours
  // we warn the user on changes
  // if they refuse, then npm/yarn uninstall
  // if they accept we write the toml changes
  // and then call the add function

  // get cooking message!
}
