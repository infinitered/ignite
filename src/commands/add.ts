import { IgniteConfig, IgniteToolbox } from '../types'
import * as R from 'ramda'
import detectedChanges from '../lib/detected-changes'
import detectInstall from '../lib/detect-install'
import importPlugin from '../lib/import-plugin'
import isIgniteDirectory from '../lib/is-ignite-directory'
import findPluginFile from '../lib/find-plugin-file'
import exitCodes from '../lib/exit-codes'

/**
 * Removes the ignite plugin.
 */
const rollbackFailedIgnitePlugin = async (moduleName: string, toolbox: IgniteToolbox) => {
  const { print, system, ignite } = toolbox

  print.warning('Rolling back...run with --debug to see more info')

  if (ignite.useYarn) {
    await system.run(`yarn remove ${moduleName} --dev`)
  } else {
    await system.run(`npm rm ${moduleName} --save-dev`)
  }
}

module.exports = {
  description: 'Adds a plugin to your Ignited project',
  alias: ['a'],
  run: async function(toolbox: IgniteToolbox) {
    // grab a fist-full of features...
    const { print, filesystem, prompt, ignite, parameters, strings } = toolbox
    const { log } = ignite

    const perfStart = new Date().getTime()

    log('running add command')
    const config = ignite.loadIgniteConfig()
    const currentGenerators = config.generators || {}

    // ensure we're in a supported directory
    if (!isIgniteDirectory(process.cwd())) {
      toolbox.print.error(
        'The `ignite add` command must be run in an ignite-compatible directory.\nUse `ignite attach` to make compatible.',
      )
      process.exit(exitCodes.NOT_IGNITE_PROJECT)
    }

    // the thing we're trying to install
    if (strings.isBlank(parameters.first)) {
      const instructions = `An ignite plugin is required.

Examples:
  ignite add i18n
  ignite add vector-icons
  ignite add maps
  ignite add gantman/ignite-react-native-config
  ignite add /path/to/plugin/you/are/building`
      print.info(instructions)
      process.exit(exitCodes.OK)
    }

    // find out the type of install
    const specs = detectInstall(parameters.first, toolbox)
    const moduleName = specs.moduleName
    const modulePath = `${process.cwd()}/node_modules/${moduleName}`

    log(`installing ${modulePath} from source ${specs.type}`)

    // import the ignite plugin node module
    // const spinner = spin(`adding ${print.colors.cyan(moduleName)}`)
    const spinner = print.spin('')

    const exitCode = await importPlugin(toolbox, specs)
    if (exitCode) {
      spinner.stop()
      process.exit(exitCode)
    }

    // optionally load some configuration from the ignite.json from the plugin.
    const ignitePluginConfigPath = `${modulePath}/ignite.json`
    const newConfig: IgniteConfig = filesystem.exists(ignitePluginConfigPath)
      ? filesystem.read(ignitePluginConfigPath, 'json')
      : {}

    const proposedGenerators = (newConfig.generators || []).reduce((acc, k) => {
      acc[k] = moduleName
      return acc
    }, {})

    // we compare the generator config changes against ours
    const changes = detectedChanges(currentGenerators, proposedGenerators)
    if (changes.length > 0) {
      spinner.stop()
      // we warn the user on changes
      print.warning(`🔥  The following generators would be changed: ${R.join(', ', changes)}`)
      const ok = await prompt.confirm('You ok with that?')
      // if they refuse, then npm/yarn uninstall
      if (!ok) {
        await rollbackFailedIgnitePlugin(moduleName, toolbox)
        process.exit(exitCodes.OK)
      }
      spinner.text = `adding ${print.colors.cyan(moduleName)}`
      spinner.start()
    }

    // ok, are we ready?
    try {
      let pluginFile: string = findPluginFile(toolbox, modulePath)
      if (pluginFile) {
        // bring the ignite plugin to life
        log(`requiring ignite plugin from ${modulePath}`)
        const pluginModule = require(pluginFile)

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
          await pluginModule.add(toolbox)

          const perfDuration = parseInt(((new Date().getTime() - perfStart) / 10).toString(), 10) / 100

          spinner.text = `added ${print.colors.cyan(moduleName)} in ${perfDuration}s`
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
        spinner.fail(`${modulePath}/plugin.js does not exist.  skipping.`)
        spinner.stop()
      }
    } catch (err) {
      // we couldn't require the plugin, it probably has some nasty js!
      spinner.fail('problem loading the plugin JS')
      await rollbackFailedIgnitePlugin(moduleName, toolbox)
      log(err)
      process.exit(exitCodes.PLUGIN_INVALID)
    }
  },
}
