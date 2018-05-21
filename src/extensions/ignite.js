// This is the Ignite CLI extension. It gets parked on `context.ignite` and each
// of the functions defined here are available as functions on that.

// bring in each of the constituents
const shell = require('shelljs')
const ignitePluginPathExt = require('./ignite/ignitePluginPath')
const igniteConfigExt = require('./ignite/igniteConfig')
const findIgnitePluginsExt = require('./ignite/findIgnitePlugins')
const addModuleExt = require('./ignite/addModule')
const addAndroidPermissionExt = require('./ignite/addAndroidPermission')
const removeModuleExt = require('./ignite/removeModule')
const addScreenExamplesExt = require('./ignite/addScreenExamples') // Deprecated 3/2/17, Ignite CLI Beta
const addPluginScreenExamplesExt = require('./ignite/addPluginScreenExamples')
const removeScreenExamplesExt = require('./ignite/removeScreenExamples') // Deprecated 3/2/17, Ignite CLI Beta
const removePluginScreenExamplesExt = require('./ignite/removePluginScreenExamples')
const copyBatchExt = require('./ignite/copyBatch')
const addComponentExampleExt = require('./ignite/addComponentExample') // Deprecated 3/2/17, Ignite CLI Beta
const addPluginComponentExampleExt = require('./ignite/addPluginComponentExample')
const removeComponentExampleExt = require('./ignite/removeComponentExample') // Deprecated 3/2/17, Ignite CLI Beta
const removePluginComponentExampleExt = require('./ignite/removePluginComponentExample')
const removeAndroidPermissionExt = require('./ignite/removeAndroidPermission')
const setDebugConfigExt = require('./ignite/setDebugConfig')
const removeDebugConfigExt = require('./ignite/removeDebugConfig')
const patchInFileExt = require('./ignite/patchInFile')
const generateExt = require('./ignite/generate')
const logExt = require('./ignite/log')
const versionExt = require('./ignite/version')
const pluginOverridesExt = require('./ignite/pluginOverrides')

/**
 * Adds ignite goodies
 *
 * @return {Function} A function to attach to the context.
 */
function attach (plugin, command, context) {
  const { parameters } = context

  // determine which package manager to use
  const forceNpm = parameters.options.npm

  // should we be using yarn?
  const useYarn = !forceNpm && Boolean(shell.which('yarn'))

  // the ignite plugin path
  const {
    ignitePluginPath,
    setIgnitePluginPath
  } = ignitePluginPathExt(plugin, command, context)

  // a 4-pack of ignite config
  const {
    loadIgniteConfig,
    saveIgniteConfig,
    setIgniteConfig,
    removeIgniteConfig
  } = igniteConfigExt(plugin, command, context)

  // here's the extension's abilities
  return {
    ignitePluginPath,
    setIgnitePluginPath,
    useYarn,
    loadIgniteConfig,
    saveIgniteConfig,
    setIgniteConfig,
    removeIgniteConfig,
    findIgnitePlugins: findIgnitePluginsExt(plugin, command, context),
    addModule: addModuleExt(plugin, command, context),
    addAndroidPermission: addAndroidPermissionExt(plugin, command, context),
    removeModule: removeModuleExt(plugin, command, context),
    copyBatch: copyBatchExt(plugin, command, context),
    addComponentExample: addComponentExampleExt(plugin, command, context), // Deprecated 3/2/17, Ignite CLI Beta
    addPluginComponentExample: addPluginComponentExampleExt(plugin, command, context),
    removeComponentExample: removeComponentExampleExt(plugin, command, context), // Deprecated 3/2/17, Ignite CLI Beta
    removePluginComponentExample: removePluginComponentExampleExt(plugin, command, context),
    addScreenExamples: addScreenExamplesExt(plugin, command, context), // Deprecated 3/2/17, Ignite CLI Beta
    addPluginScreenExamples: addPluginScreenExamplesExt(plugin, command, context),
    removeScreenExamples: removeScreenExamplesExt(plugin, command, context), // Deprecated 3/2/17, Ignite CLI Beta
    removePluginScreenExamples: removePluginScreenExamplesExt(plugin, command, context),
    removeAndroidPermission: removeAndroidPermissionExt(plugin, command, context),
    setDebugConfig: setDebugConfigExt(plugin, command, context),
    removeDebugConfig: removeDebugConfigExt(plugin, command, context),
    patchInFile: patchInFileExt(plugin, command, context),
    generate: generateExt(plugin, command, context),
    log: logExt(plugin, command, context),
    version: versionExt(plugin, command, context),
    pluginOverrides: pluginOverridesExt(plugin, command, context)
  }
}

module.exports = attach
