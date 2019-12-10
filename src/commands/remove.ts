import { concat, pathOr, join, map, assoc } from 'ramda'
import prependIgnite from '../lib/prepend-ignite'
import findPluginFile from '../lib/find-plugin-file'
import exitCodes from '../lib/exit-codes'
import * as path from 'path'
import { IgniteToolbox } from '../types'

// use yarn or use npm? hardcode for now
const useYarn = false

const detectRemovals = (configObject, moduleName) => {
  return Object.keys(configObject).reduce((acc, k) => {
    if (configObject[k] === moduleName) {
      return concat([`${k}`], acc)
    }
    return acc
  }, [])
}

const existsLocally = moduleName => {
  // we take a look at the local package.json
  const pack = require(`${process.cwd()}/package.json`)
  return pathOr(null, ['devDependencies', moduleName], pack)
}

module.exports = {
  alias: ['r'],
  description: 'Removes an Ignite CLI plugin.',
  run: async function(toolbox: IgniteToolbox) {
    // grab a fist-full of features...
    const { print, parameters, prompt, ignite, system } = toolbox
    const { info, warning, xmark, error, success } = print
    const { options } = parameters

    // take the last parameter (because of https://github.com/infinitered/gluegun/issues/123)
    const moduleParam = parameters.array.pop()

    const isScoped = moduleParam.startsWith('@')

    // Check if they used a directory path instead of a plugin name
    if (moduleParam.includes(path.sep) && !isScoped) {
      error(`💩 When removing a package, you shouldn't use a path.
    Try ${toolbox.print.colors.highlight(`ignite remove ${moduleParam.split(path.sep).pop()}`)} instead.`)
      process.exit(exitCodes.PLUGIN_NAME)
    }

    // prepend `ignite` as convention
    let moduleName = moduleParam
    if (!isScoped) {
      moduleName = prependIgnite(moduleParam)
    }

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
          map(k => delete generatorsList[k], changes)
          const updatedConfig = assoc('generators', generatorsList, config)
          ignite.saveIgniteConfig(updatedConfig)
        } else {
          process.exit(exitCodes.GENERIC)
        }
      }

      const modulePath = `${process.cwd()}/node_modules/${moduleName}`
      let pluginFile = findPluginFile(toolbox, modulePath)
      if (pluginFile) {
        // Call remove functionality
        const pluginModule = require(pluginFile)

        // set the path to the current running ignite plugin
        ignite.setIgnitePluginPath(modulePath)

        if (pluginModule.hasOwnProperty('remove')) {
          try {
            await pluginModule.remove(toolbox)
          } catch (e) {
            ignite.log(e)
            process.exit(exitCodes.GENERIC)
          }
        } else {
          error(`💩  'remove' method missing from plugin file.`)
          process.exit(exitCodes.PLUGIN_INVALID)
        }
      }

      // remove via yarn or npm
      const removeCommand = useYarn ? `yarn remove ${moduleName}` : `npm rm ${moduleName} --save-dev`
      print.warning('Removing dev module')
      await system.exec(removeCommand, { silent: true })

      success(`${xmark}    Removed`)
    } else {
      error("💩  We couldn't find that ignite plugin")
      warning(`Please make sure ${moduleName} exists in package.json`)
      process.exit(1)
    }
  },
}
