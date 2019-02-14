// This is the Ignite CLI extension. It gets parked on `toolbox.ignite` and each
// of the functions defined here are available as functions on that.

// bring in each of the constituents
import * as shell from 'shelljs'
import ignitePluginPathExt from './ignite/ignite-plugin-path'
import igniteConfigExt from './ignite/ignite-config'
import findIgnitePluginsExt from './ignite/find-ignite-plugins'
import addModuleExt from './ignite/add-module'
import addAndroidPermissionExt from './ignite/add-android-permission'
import removeModuleExt from './ignite/remove-module'
import addPluginScreenExamplesExt from './ignite/add-plugin-screen-examples'
import removePluginScreenExamplesExt from './ignite/remove-plugin-screen-examples'
import copyBatchExt from './ignite/copy-batch'
import addPluginComponentExampleExt from './ignite/add-plugin-component-example'
import removePluginComponentExampleExt from './ignite/remove-plugin-component-example'
import removeAndroidPermissionExt from './ignite/remove-android-permission'
import setDebugConfigExt from './ignite/set-debug-config'
import removeDebugConfigExt from './ignite/remove-debug-config'
import patchInFileExt from './ignite/patch-in-file'
import patchingExt from './ignite/patching'
import logExt from './ignite/log'
import pluginOverridesExt from './ignite/plugin-overrides'
import { IgniteToolbox } from '../types'

/**
 * Adds ignite goodies
 */
module.exports = (toolbox: IgniteToolbox) => {
  const { parameters } = toolbox

  // determine which package manager to use
  const forceNpm = parameters.options.npm

  // should we be using yarn?
  const useYarn = !forceNpm && Boolean(shell.which('yarn'))

  // the ignite plugin path
  const { ignitePluginPath, setIgnitePluginPath } = ignitePluginPathExt(toolbox)

  // a 4-pack of ignite config
  const { loadIgniteConfig, saveIgniteConfig, setIgniteConfig, removeIgniteConfig } = igniteConfigExt(toolbox)

  // here's the extension's abilities
  toolbox.ignite = {
    ignitePluginPath,
    setIgnitePluginPath,
    useYarn,
    loadIgniteConfig,
    saveIgniteConfig,
    setIgniteConfig,
    removeIgniteConfig,
    findIgnitePlugins: findIgnitePluginsExt(toolbox),
    addModule: addModuleExt(toolbox),
    addAndroidPermission: addAndroidPermissionExt(toolbox),
    removeModule: removeModuleExt(toolbox),
    copyBatch: copyBatchExt(toolbox),
    addPluginComponentExample: addPluginComponentExampleExt(toolbox),
    removePluginComponentExample: removePluginComponentExampleExt(toolbox),
    addPluginScreenExamples: addPluginScreenExamplesExt(toolbox),
    removePluginScreenExamples: removePluginScreenExamplesExt(toolbox),
    removeAndroidPermission: removeAndroidPermissionExt(toolbox),
    setDebugConfig: setDebugConfigExt(toolbox),
    removeDebugConfig: removeDebugConfigExt(toolbox),
    patchInFile: patchInFileExt(toolbox),
    log: logExt(toolbox),
    pluginOverrides: pluginOverridesExt(toolbox),
    patching: patchingExt(toolbox),
  }
}
