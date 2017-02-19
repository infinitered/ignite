// @cliDescription Adds an Ignite plugin.
// @cliAlias a
// ----------------------------------------------------------------------------

const Toml = require('toml')
const R = require('ramda')
const detectedChanges = require('../lib/detectedChanges')
const detectInstall = require('../lib/detectInstall')
const exitCodes = require('../lib/exitCodes')

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
  const { ignite, system } = context
  const isDirectory = type === 'directory'
  const target = isDirectory ? directory : moduleName

  try {
    // yarn caches wierd for file-based deps, lets use npm for these.... gah!
    if (ignite.useYarn && !isDirectory) {
      await system.run(`yarn add ${target} --dev`)
    } else {
      const cacheBusting = isDirectory ? '--cache-min=0' : ''
      await system.run(`npm i ${target} --save-dev ${cacheBusting}`)
    }
  } catch (e) {
    context.print.error(`💩  ${target} does not appear to be an NPM module. Does it exist and have a valid package.json?`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }
}

module.exports = async function (context) {
  // grab a fist-full of features...
  const { print, filesystem, prompt, ignite, parameters, strings } = context
  const { info, warning, error, spin } = print
  const config = ignite.loadIgniteConfig()
  const currentGenerators = config.generators || {}

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
  const spinner = spin(`adding ${print.colors.cyan(moduleName)}`)

  if (specs.type) {
    await importPlugin(context, specs)
  } else {
    spinner.fail(`💩  invalid ignite plugin`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // the full path to the module installed within node_modules
  const modulePath = `${process.cwd()}/node_modules/${moduleName}`

  // once installed, let's check on its toml
  const tomlFilePath = `${modulePath}/ignite.toml`

  if (!filesystem.exists(tomlFilePath)) {
    spinner.fail('no `ignite.toml` file found in this node module, are you sure it is an Ignite plugin?')
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
    spinner.stop()
      // we warn the user on changes
    warning(`🔥  The following generators would be changed: ${R.join(', ', changes)}`)
    const ok = await prompt.confirm('You ok with that?')
      // if they refuse, then npm/yarn uninstall
    if (!ok) {
      await removeIgnitePlugin(moduleName, context)
      process.exit(exitCodes.OK)
    }
    spinner.text = `adding ${print.colors.cyan(moduleName)}`
    spinner.start()
  }

  // ok, are we ready?
  try {
    if (filesystem.exists(modulePath + '/index.js') === 'file') {
      // bring the ignite plugin to life
      const pluginModule = require(modulePath)

      if (!pluginModule.hasOwnProperty('add') || !pluginModule.hasOwnProperty('remove')) {
        spinner.fail(`'add' or 'remove' method missing.`)
        process.exit(exitCodes.PLUGIN_INVALID)
      }

      // set the path to the current running ignite plugin
      ignite.setIgnitePluginPath(modulePath)

      // now let's try to run it
      try {
        // save new ignite config if something changed
        if (proposedGenerators !== {}) {
          const combinedGenerators = Object.assign({}, currentGenerators, proposedGenerators)
          const updatedConfig = R.assoc('generators', combinedGenerators, ignite.loadIgniteConfig())
          ignite.saveIgniteConfig(updatedConfig)
        }

        spinner.stop()
        // spinner.stopAndPersist({ symbol: '▸', text: `adding ${print.colors.cyan(moduleName)}` })
        await pluginModule.add(context)
        spinner.text = `added ${print.colors.cyan(moduleName)}`
        spinner.start()
        spinner.succeed()

        // Sweet! We did it!
        return
      } catch (err) {
        // it's up to the throwers of this error to ensure the error message is human friendly.
        // to do this, we need to ensure all our core features like `addModule`, `addComponentExample`, etc
        // all play along nicely.
        spinner.fail(err.message)
        process.exit(exitCodes.PLUGIN_INSTALL)
      }
    }
  } catch (err) {
    // we couldn't require the plugin, it probably has some nasty js!
    spinner.fail('problem loading the plugin JS')
    await removeIgnitePlugin(moduleName, context)
    process.exit(exitCodes.PLUGIN_INVALID)
  }
}
