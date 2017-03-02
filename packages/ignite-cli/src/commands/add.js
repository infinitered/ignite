// @cliDescription Adds an Ignite plugin.
// @cliAlias a
// ----------------------------------------------------------------------------

const R = require('ramda')
const detectedChanges = require('../lib/detectedChanges')
const detectInstall = require('../lib/detectInstall')
const isIgniteDirectory = require('../lib/isIgniteDirectory')
const exitCodes = require('../lib/exitCodes')
const path = require('path')

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
  const { ignite, system, filesystem } = context
  const { log } = ignite
  const isDirectory = type === 'directory'
  const target = isDirectory ? directory : moduleName

  // check to see if it exists first
  if (type === 'npm') {
    try {
      const json = JSON.parse(await system.run(`npm info ${target} --json`))
      log(`${json.name} ${json.version} on npm.`)
    } catch (e) {
      log(`unable to find ${target} on npm`)
      const boom = new Error(e.message)
      boom.unavailable = true
      boom.name = target
      throw boom
    }
  }

  if (ignite.useYarn) {
    if (isDirectory) {
      // where is the yarn cache?
      log(`checking for yarn cache`)
      const rawCacheDir = await system.exec('yarn cache dir')

      // look for a cached version of this
      const dirs = filesystem
        .cwd(rawCacheDir)
        .find({ matching: `npm-${moduleName}-*`, directories: true, recursive: false })

      // clear existing cache if we have one
      if (!R.isEmpty(dirs)) {
        R.forEach(
          dir => {
            log(`removing yarn cache ${rawCacheDir}/${dir}`)
            filesystem.remove(`${rawCacheDir}/${dir}`)
          },
          dirs
        )
      }
    }
    const cmd = isDirectory
      ? `yarn add file:${target} --force --dev`
      : `yarn add ${target} --dev`
    log(cmd)
    await system.exec(cmd, { stdio: 'pipe' })
    log('finished yarn command')
  } else {
    const cacheBusting = isDirectory ? '--cache-min=0' : ''
    const cmd = `npm i ${target} --save-dev ${cacheBusting}`
    log(cmd)
    await system.exec(cmd, { stdio: 'pipe' })
    log('finished npm command')
  }
}

module.exports = async function (context) {
  // grab a fist-full of features...
  const { print, filesystem, prompt, ignite, parameters, strings } = context
  const { info, warning, spin } = print
  const { log } = ignite

  log('running add command')
  const config = ignite.loadIgniteConfig()
  const currentGenerators = config.generators || {}

  // we need to know if this is an app template
  const isAppTemplate = parameters.options['is-app-template']

  // ensure we're in a supported directory
  if (!isIgniteDirectory(process.cwd()) && !isAppTemplate) {
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
    info(instructions)
    process.exit(exitCodes.OK)
  }

  // find out the type of install
  const specs = detectInstall(context)
  const { moduleName } = specs
  const modulePath = `${process.cwd()}/node_modules/${moduleName}`

  log(`installing ${modulePath} from source ${specs.type}`)

  // import the ignite plugin node module
  const spinner = spin(`adding ${print.colors.cyan(moduleName)}`)

  if (specs.type) {
    try {
      await importPlugin(context, specs)
    } catch (e) {
      if (e.unavailable) {
        spinner.fail(`${print.colors.bold(moduleName)} is not available on npm.`)
        print.info('')
        print.info(print.colors.muted('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'))
        print.error('  We also searched in these directories:\n')
        ignite.pluginOverrides.forEach(dir => {
          print.info(`    ▸ ${dir}`)
        })
        print.error('')
        print.error('  During Ignite 2 alpha, please consider setting this\n  environment variable:\n')
        print.info(`  export IGNITE_PLUGIN_PATH=${path.resolve(__dirname, '..', '..', '..')}`)
        print.info(print.colors.muted('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'))
      } else {
        spinner.fail(`${print.colors.red(moduleName)} was not able to be installed. Is it a valid NPM module?`)
        print.error('----------')
        print.error(e.message)
        print.error('----------')
      }
      process.exit(exitCodes.PLUGIN_INVALID)
    }
  } else {
    spinner.fail(`💩  invalid ignite plugin`)
    process.exit(exitCodes.PLUGIN_INVALID)
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
        // spinner.stopAndPersist({ symbol: '▸', text: `adding ${print.colors.cyan(moduleName)}` })
        await pluginModule.add(context)

        if (!isAppTemplate) {
          spinner.text = `added ${print.colors.cyan(moduleName)}`
          spinner.start()
          spinner.succeed()
        }

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
