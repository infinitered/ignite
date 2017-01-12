// @cliDescription  Add a new thingy
// ----------------------------------------------------------------------------

const Toml = require('toml')
const json2toml = require('json2toml')
const R = require('ramda')
const { dotPath } = require('ramdasauce')
const detectedChanges = require('../../../lib/detectedChanges')
const detectInstall = require('./add/detectInstall')
const exitCodes = require('../../../lib/exitCodes')

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

/**
 * Install this module.
 *
 * @param {Object} context         The gluegun context
 * @param {Object} opts            The options used to install
 * @param {string} opts.moduleName The module to install
 */
async function importPlugin (context, opts) {
  const { moduleName, type, directory } = opts
  const { system, ignite } = context
  const target = type === 'directory' ? directory : moduleName

  if (ignite.useYarn) {
    await system.run(`yarn add ${target} --dev`)
  } else {
    await system.run(`npm i ${target} --save-dev`)
  }
}

module.exports = async function (context) {
    // grab a fist-full of features...
  const { print, filesystem, prompt, ignite, parameters, strings } = context
  const { info, warning, success, error } = print
  const currentGenerators = dotPath('config.ignite.generators', context) || {}

  // the thing we're trying to install
  if (strings.isBlank(parameters.second)) {
    const instructions = `An ignite plugin is required.

Examples:
  ignite add ignite-basic-structure
  ignite add ignite-basic-generators
  ignite add vector-icons
  ignite add gantman/ignite-react-native-config
  ignite add /path/to/plugin/you/are/building`
    info(instructions)
    process.exit(exitCodes.OK)
  }

  // find out the type of install
  const specs = detectInstall(context)
  const { moduleName } = specs

  // import the ignite plugin node module
  info(`🔥  installing ${print.colors.cyan(moduleName)}`)
  if (specs.type) {
    await importPlugin(context, specs)
  } else {
    error(`💩  invalid ignite plugin`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // the full path to the module installed within node_modules
  const modulePath = `${process.cwd()}/node_modules/${moduleName}`

  // once installed, let's check on its toml
  const tomlFilePath = `${modulePath}/ignite.toml`

  if (!filesystem.exists(tomlFilePath)) {
    error('💩  no `ignite.toml` file found in this node module, are you sure it is an Ignite plugin?')
    await removeIgnitePlugin(moduleName, context)
    process.exit(exitCodes.PLUGIN_INVALID)
  }
  const newConfig = Toml.parse(filesystem.read(tomlFilePath))

  const proposedGenerators = R.reduce((acc, k) => {
    acc[k] = moduleName
    return acc
  }, {}, newConfig.ignite.generators || [])

  // we compare the toml changes against ours
  const changes = detectedChanges(currentGenerators, proposedGenerators)
  if (changes.length > 0) {
      // we warn the user on changes
    warning(`🔥  The following generators would be changed: ${R.join(', ', changes)}`)
    const ok = await prompt.confirm('You ok with that?')
      // if they refuse, then npm/yarn uninstall
    if (!ok) {
      await removeIgnitePlugin(moduleName, context)
      process.exit(exitCodes.OK)
    }
  }

  // ok, are we ready?
  try {
    // bring the ignite plugin to life
    const pluginModule = require(modulePath)

    // set the path to the current running ignite plugin
    ignite.setIgnitePluginPath(modulePath)

    // now let's try to run it
    try {
      await pluginModule.add(context)

      // We write the toml changes
      const combinedGenerators = Object.assign({}, currentGenerators, proposedGenerators)
      const updatedConfig = R.assocPath(['ignite', 'generators'], combinedGenerators, context.config)
      const localToml = `${process.cwd()}/ignite.toml`
      filesystem.write(localToml, json2toml(updatedConfig))

      // Sweet! We did it!
      success('🍽  time to get cooking!')
      process.exit(exitCodes.OK)
    } catch (err) {
      // it's up to the throwers of this error to ensure the error message is human friendly.
      // to do this, we need to ensure all our core features like `addModule`, `addComponentExample`, etc
      // all play along nicely.
      error(err.message)
      process.exit(exitCodes.PLUGIN_INSTALL)
    }
  } catch (err) {
    // we couldn't require the plugin, it probably has some nasty js!
    error('💩  problem loading the plugin JS')
    await removeIgnitePlugin(moduleName, context)
    process.exit(exitCodes.PLUGIN_INVALID)
  }
}
