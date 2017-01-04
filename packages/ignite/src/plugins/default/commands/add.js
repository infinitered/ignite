// @cliDescription  Add a new thingy
// ----------------------------------------------------------------------------
const Exists = require('npm-exists')
const Toml = require('toml')
// Yeah, why would toml include this? :(
const json2toml = require('json2toml')
const R = require('ramda')

// used for changes warnings
const detectedChanges = (oldObject, newObject) => {
  let oldKeys = R.keys(oldObject)
  let newKeys = R.keys(newObject)
  const inter = R.intersection(oldKeys, newKeys)
  return R.reduce((acc, k) => {
    if (oldObject[k] !== newObject[k]) {
      return R.concat([`'${k}'`], acc)
    }
    return acc
  }, [], inter)
}

/**
 * Removes the ignite plugin.
 *
 * @param {string} moduleName The name of the ignite-* plugin.
 * @param {Object} context The gluegun context.
 */
const removeIgnitePlugin = async (moduleName, context) => {
  const { print, system, ignite } = context

  print.warning('Rolling back...')

  if (ignite.useYarn) {
    system.run(`yarn remove ${moduleName} --dev`)
  } else {
    system.run(`npm rm ${moduleName} --save-dev`)
  }
}

module.exports = async function (context) {
    // grab a fist-full of features...
  const { print, filesystem, parameters, prompt, ignite, system } = context
  const { info, warning, success, checkmark, error } = print

  // take the last parameter (because of https://github.com/infinitered/gluegun/issues/123)
  // prepend `ignite` as convention
  const moduleName = `ignite-${parameters.array.pop()}`
  info(`🔎    Finding ${moduleName} on npmjs.com`)
  const moduleExists = await Exists(moduleName)
  // it exists?  Let's install it else warn
  if (moduleExists) {
    info(`${checkmark}    Installing npm module`)

    // Let's install the `ignite-*` plugin.  These are dev dependencies.
    if (ignite.useYarn) {
      system.run(`yarn add ${moduleName} --dev`)
    } else {
      system.run(`npm i ${moduleName} --save-dev`)
    }

    // the full path to the module installed within node_modules
    const modulePath = `${process.cwd()}/node_modules/${moduleName}`

    // once installed, let's check on its toml
    const tomlFilePath = `${modulePath}/ignite.toml`
    if (!filesystem.exists(tomlFilePath)) {
      error('No `ignite.toml` file found in this node module, are you sure it is an Ignite plugin?')
      await removeIgnitePlugin(moduleName, context)
      return
    }
    const newConfig = Toml.parse(filesystem.read(tomlFilePath))

    const proposedGenerators = R.reduce((acc, k) => {
      acc[k] = moduleName
      return acc
    }, {}, newConfig.ignite.generators || [])

    // we compare the toml changes against ours
    const changes = detectedChanges(context.config.ignite.generators, proposedGenerators)
    if (changes.length > 0) {
      // we warn the user on changes
      warning(`The following generators would be changed: ${R.join(', ', changes)}`)
      const ok = await prompt.confirm('You ok with that?')
      // if they refuse, then npm/yarn uninstall
      if (!ok) {
        await removeIgnitePlugin(moduleName, context)
        return
      }
    }

    const combinedGenerators = Object.assign({}, context.config.ignite.generators, proposedGenerators)
    const updatedConfig = R.assocPath(['ignite', 'generators'], combinedGenerators, context.config)

    // We write the toml changes
    const localToml = `${process.cwd()}/ignite.toml`
    filesystem.write(localToml, json2toml(updatedConfig))

    // bring the ignite plugin to life
    const pluginModule = require(modulePath)

    // set the path to the current running ignite plugin
    ignite.setIgnitePluginPath(modulePath)

    try {
      // and then call the add function
      await pluginModule.add(context)
      success('Time to get cooking! 🍽 ')
    } catch (err) {
      // write the error message out
      error(err.message)
    }
  } else {
    error("We couldn't find that ignite plugin")
    warning(`Please make sure ${moduleName} exists on the npmjs.com`)
    process.exit(1)
  }
}
