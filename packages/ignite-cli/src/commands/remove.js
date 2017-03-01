// @cliDescription Removes an Ignite plugin.
// @cliAlias r
// ----------------------------------------------------------------------------

const Shell = require('shelljs')
const { reduce, concat, keys, pathOr, join, map, assoc } = require('ramda')
const isIgniteDirectory = require('../lib/isIgniteDirectory')
const prependIgnite = require('../lib/prependIgnite')
const exitCodes = require('../lib/exitCodes')

// use yarn or use npm? hardcode for now
const useYarn = false

const detectRemovals = (configObject, moduleName) => {
  return reduce((acc, k) => {
    if (configObject[k] === moduleName) {
      return concat([`${k}`], acc)
    }
    return acc
  }, [], keys(configObject))
}

const existsLocally = (moduleName) => {
  // we take a look at the local package.json
  const pack = require(`${process.cwd()}/package.json`)
  return pathOr(null, ['devDependencies', moduleName], pack)
}

const removeDependency = (moduleName) => {
  console.warn('Removing dev module')

  if (useYarn) {
    Shell.exec(`yarn remove ${moduleName}`, {silent: true})
  } else {
    Shell.exec(`npm rm ${moduleName} --save-dev`, {silent: true})
  }
}

module.exports = async function (context) {
  // ensure we're in a supported directory
  if (!isIgniteDirectory(process.cwd())) {
    context.print.error('The `ignite remove` command must be run in an ignite-compatible directory.')
    process.exit(exitCodes.NOT_IGNITE_PROJECT)
  }

  // grab a fist-full of features...
  const { print, parameters, prompt, filesystem, ignite } = context
  const { info, warning, xmark, error, success } = print
  const { options } = parameters

  // take the last parameter (because of https://github.com/infinitered/gluegun/issues/123)
  const moduleParam = parameters.array.pop()

  // Check if they used a directory path instead of a plugin name
  if (moduleParam.includes('/')) {
    error(`💩 When removing a package, you shouldn't use a path.
    Try ${ context.print.color.highlight(`ignite remove ${moduleParam.split('/').pop()}`) } instead.`)
    process.exit(exitCodes.PLUGIN_NAME)
  }

  // prepend `ignite` as convention
  const moduleName = prependIgnite(moduleParam)

  info(`🔎    Verifying Plugin`)

  // Make sure what they typed, exists locally
  if (existsLocally(moduleName)) {
    const config = ignite.loadIgniteConfig()
    // Detect generator changes
    const changes = detectRemovals(config.generators, moduleName)
    // Ask user if they are sure.
    if (changes.length > 0) {
      // we warn the user on changes
      let ok
      if (options.y || options.yes || options.confirm) {
        ok = true
      } else {
        warning(`The following generators would be removed: ${join(', ', changes)}`)
        ok = await prompt.confirm('You ok with that?')
      }
      
      if (ok) {
        const generatorsList = Object.assign({}, config.generators)
        map((k) => delete generatorsList[k], changes)
        const updatedConfig = assoc('generators', generatorsList, config)
        ignite.saveIgniteConfig(updatedConfig)
      } else {
        process.exit(exitCodes.GENERIC)
      }
    }

    const modulePath = `${process.cwd()}/node_modules/${moduleName}`
    if (filesystem.exists(modulePath + '/index.js') === 'file') {
      // Call remove functionality
      const pluginModule = require(modulePath)
      // set the path to the current running ignite plugin
      ignite.setIgnitePluginPath(modulePath)

      if (pluginModule.hasOwnProperty('remove')) {
        await pluginModule.remove(context)
      } else {
        error(`💩  'remove' method missing.`)
        process.exit(exitCodes.PLUGIN_INVALID)
      }
    }

    // Uninstall dep from node modules
    removeDependency(moduleName)
    success(`${xmark}    Removed`)
  } else {
    error("💩  We couldn't find that ignite plugin")
    warning(`Please make sure ${moduleName} exists in package.json`)
    process.exit(1)
  }
}
