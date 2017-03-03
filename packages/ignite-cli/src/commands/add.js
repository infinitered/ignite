// @cliDescription Adds an Ignite plugin.
// @cliAlias a
// ----------------------------------------------------------------------------

const R = require('ramda')
const detectedChanges = require('../lib/detectedChanges')
const detectInstall = require('../lib/detectInstall')
const importPlugin = require('../lib/importPlugin')
const isIgniteDirectory = require('../lib/isIgniteDirectory')
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

module.exports = async function (context) {
  // grab a fist-full of features...
  const { print, filesystem, prompt, ignite, parameters, strings } = context
  const { log } = ignite

  log('running add command')
  const config = ignite.loadIgniteConfig()
  const currentGenerators = config.generators || {}

  // ensure we're in a supported directory
  if (!isIgniteDirectory(process.cwd())) {
    context.print.error('The `ignite add` command must be run in an ignite-compatible directory.')
    process.exit(exitCodes.NOT_IGNITE_PROJECT)
  }

  // the thing we're trying to install
  if (strings.isBlank(parameters.second)) {
    const instructions = `An ignite plugin is required.

Examples:
  ignite add ignite-basic-structure
  ignite add ignite-basic-generators
  ignite add vector-icons
  ignite add gantman/ignite-react-native-config
  ignite add /path/to/plugin/you/are/building`
    print.info(instructions)
    process.exit(exitCodes.OK)
  }

  // find out the type of install
  const specs = detectInstall(context)
  const { moduleName } = specs
  const modulePath = `${process.cwd()}/node_modules/${moduleName}`

  log(`installing ${modulePath} from source ${specs.type}`)

  // import the ignite plugin node module
  // const spinner = spin(`adding ${print.colors.cyan(moduleName)}`)
  const spinner = print.spin('')

  const exitCode = await importPlugin(context, specs)
  if (exitCode) {
    process.exist(exitCode)
  }

  // optionally load some configuration from the ignite.json from the plugin.
  const ignitePluginConfigPath = `${modulePath}/ignite.json`
  const newConfig = filesystem.exists(ignitePluginConfigPath)
    ? filesystem.read(ignitePluginConfigPath, 'json')
    : {}

  const proposedGenerators = R.reduce((acc, k) => {
    acc[k] = moduleName
    return acc
  }, {}, newConfig.generators || [])

  // we compare the generator config changes against ours
  const changes = detectedChanges(currentGenerators, proposedGenerators)
  if (changes.length > 0) {
    spinner.stop()
      // we warn the user on changes
    print.warning(`🔥  The following generators would be changed: ${R.join(', ', changes)}`)
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
      log(`requiring ignite plugin from ${modulePath}`)
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
        log(`running add() on ignite plugin`)
        await pluginModule.add(context)

        spinner.text = `added ${print.colors.cyan(moduleName)}`
        spinner.start()
        spinner.succeed()

        // Sweet! We did it!
        return exitCodes.OK
      } catch (err) {
        // it's up to the throwers of this error to ensure the error message is human friendly.
        // to do this, we need to ensure all our core features like `addModule`, `addPluginComponentExample`, etc
        // all play along nicely.
        spinner.fail(err.message)
        process.exit(exitCodes.PLUGIN_INSTALL)
      }
    } else {
      log(`${modulePath}/index.js does not exist.  skipping.`)
      spinner.stop()
    }
  } catch (err) {
    // we couldn't require the plugin, it probably has some nasty js!
    spinner.fail('problem loading the plugin JS')
    await removeIgnitePlugin(moduleName, context)
    process.exit(exitCodes.PLUGIN_INVALID)
  }
}
