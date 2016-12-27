const Shell = require('shelljs')
const Toml = require('toml')
const json2toml = require('json2toml')

const { pipe, prop, sortBy, propSatisfies, filter } = require('ramda')
const { startsWith } = require('ramdasauce')

/**
 * Adds ignite goodies
 *
 * @return {Function} A function to attach to the context.
 */
function attach (plugin, command, context) {
  const { print, filesystem } = context
  const { error } = print

  function findIgnitePlugins () {
    return pipe(
      filter(propSatisfies(startsWith('ignite-'), 'name')),
      sortBy(prop('name'))
    )(context.runtime.plugins)
  }

  const yarnAvailable = () => {
    !!Shell.exec('which yarn')
  }

  const noMegusta = (moduleName) => {
    console.warn('Rolling back...')

    if (yarnAvailable()) {
      Shell.exec(`yarn remove ${moduleName}`, {silent: true})
    } else {
      Shell.exec(`npm rm ${moduleName}`, {silent: true})
    }
    process.exit(1)
  }

  function setGlobalConfig (key, value) {
    const globalToml = `${process.cwd()}/ignite.toml`

    if (!filesystem.exists(globalToml)) {
      error('No `ignite.toml` file found in this folder are you sure it is an Ignite project?')
      process.exit(1)
    }
    const oldConfig = Toml.parse(filesystem.read(globalToml))
    const ignite = oldConfig.ignite
    ignite[key] = value

    const updatedConfig = oldConfig.merge(ignite)

    filesystem.write(globalToml, json2toml(updatedConfig))
  }

  function removeGlobalConfig (key) {
    const globalToml = `${process.cwd()}/ignite.toml`

    if (!filesystem.exists(globalToml)) {
      error('No `ignite.toml` file found in this folder, are you sure it is an Ignite project?')
      process.exit(1)
    }
    const oldConfig = Toml.parse(filesystem.read(globalToml))

    const ignite = oldConfig.ignite
    if (ignite[key]) {
      delete ignite[key]
    }

    const updatedConfig = oldConfig
    delete updatedConfig.ignite
    updatedConfig.ignite = ignite

    filesystem.write(globalToml, json2toml(updatedConfig))
  }

  function setDebugConfig (key, value) {
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      error('No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an Ignite project?')
      process.exit(1)
    }

    const config = require(debugConfig)
    config[key] = value

    filesystem.write(debugConfig, `module.exports = ${JSON.stringify(config, null, 2)}`)
  }

  function removeDebugConfig (key) {
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      error('No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an ignite project?')
      process.exit(1)
    }

    const config = require(debugConfig)
    delete config[key]

    filesystem.write(debugConfig, `module.exports = ${JSON.stringify(config, null, 2)}`)
  }

  // send back the extension
  return {
    findIgnitePlugins,
    yarnAvailable,
    noMegusta,
    setGlobalConfig,
    removeGlobalConfig,
    setDebugConfig,
    removeDebugConfig
  }
}

module.exports = attach
