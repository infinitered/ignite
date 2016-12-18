// @cliDescription  Add a new thingy
// ----------------------------------------------------------------------------
const Shell = require('shelljs')
const Exists = require('npm-exists')
const Toml = require('toml')

// use yarn or use npm? hardcode for now
const useYarn = false

module.exports = async function (context) {
    // grab a fist-full of features...
  const { system, print, filesystem, strings, parameters } = context
  const { trim, kebabCase } = strings
  const { info, warning, success, debug, checkmark, error } = print

  // /////////////////////////////////////////////////////////////////////////
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

      if (useYarn) {
        Shell.exec(`yarn add ${moduleName} --dev`, {silent: true})
      } else {
        Shell.exec(`npm i ${moduleName} --save-dev`, {silent: true})
      }

      // once installed, let's check on its toml
      info('grab expected toml file')
      const tomlFilePath = `${process.cwd()}/node_modules/${moduleName}/ignite.toml`
      if (!filesystem.exists(tomlFilePath)) {
        error('No `ignite.toml` file found in this node module, are you sure it is an Ignite plugin?')
        Shell.exit(1)
      }
      const newConfig = Toml.parse(filesystem.read(tomlFilePath))
      debug(newConfig, 'Toml Config from Module')
    } else {
      error("We couldn't find that ignite plugin")
      warning(`Please make sure ${moduleName} exists on the NPM registry`)
    }
  })

  // we compare the toml changes against ours
  // we warn the user on changes
  // if they refuse, then npm/yarn uninstall
  // if they accept we write the toml changes
  // and then call the add function

  // get cooking message!
}
