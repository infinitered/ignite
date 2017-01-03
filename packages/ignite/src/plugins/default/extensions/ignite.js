const Shell = require('shelljs')

const { pipe, prop, sortBy, propSatisfies, filter } = require('ramda')
const { startsWith } = require('ramdasauce')

/**
 * Returns true if yarn is available on the system.
 */
const useYarn = Shell.which('yarn')

/**
 * Installs node module, using yarn if available
 */
function addModule (moduleName) {
  if (useYarn) {
    Shell.exec(`yarn add ${moduleName} --dev`, {silent: true})
  } else {
    Shell.exec(`npm i ${moduleName} --save-dev`, {silent: true})
  }

  Shell.exec(`react-native link ${moduleName}`)
}

/**
 * Uninstalls node module, using yarn if available
 */
function removeModule (moduleName) {
  Shell.exec(`react-native unlink ${moduleName}`)

  if (useYarn) {
    Shell.exec(`yarn remove ${moduleName}`, {silent: true})
  } else {
    Shell.exec(`npm rm ${moduleName}`, {silent: true})
  }
}

/**
 * Adds ignite goodies
 *
 * @return {Function} A function to attach to the context.
 */
function attach (plugin, command, context) {
  const { print, filesystem } = context
  const { error, warning } = print

  function findIgnitePlugins () {
    return pipe(
      filter(propSatisfies(startsWith('ignite-'), 'name')),
      sortBy(prop('name'))
    )(context.runtime.plugins)
  }

  // copies example usage file to project for use in dev screens
  async function addComponentExample (sourceFolder, fileName) {
    const { filesystem, patching } = context
    // make sure examples is set
    if (context.config.ignite.examples === 'classic') {
      // copy to Components/Examples folder
      // Should be using template.generate but we can't due to gluegun #126
      filesystem.copy(`${sourceFolder}${fileName}`, `${process.cwd()}/App/Components/Examples/${fileName}`, { overwrite: true })
      // adds reference to usage example screen (if it exists)
      const destinationPath = `${process.cwd()}/App/Containers/DevScreens/PluginExamples.js`
      if (filesystem.exists(destinationPath)) {
        patching.insertInFile(destinationPath, 'import ExamplesRegistry', `import '../Components/Examples/${fileName}`)
      }
    }
  }

  function removeComponentExample (fileName) {
    const { filesystem, patching } = context
    // remove file from Components/Examples folder
    filesystem.remove(`${process.cwd()}/App/Components/Examples/${fileName}`)
    // remove reference in usage example screen (if it exists)
    const destinationPath = `${process.cwd()}/App/Containers/DevScreens/PluginExamples.js`
    if (filesystem.exists(destinationPath)) {
      patching.replaceInFile(destinationPath, `import '../Components/Examples/${fileName}`, '')
    }
  }

  /**
   * Reverts module install and exits
   *
   * @param {string}  moduleName  Name(s) of module to be unistalled
   */
  const noMegusta = (moduleName) => {
    console.warn('Rolling back...')

    removeModule(moduleName)
    process.exit(1)
  }

  /**
   * Sets Global Config setting
   *
   * @param {string}  key             Key of setting to be defined
   * @param {string}  value           Value to be set
   * @param {bool}    isVariableName  Optional flag to set value as variable name instead of string
   */
  function setGlobalConfig (key, value, isVariableName = false) {
    const { patching } = context
    const globalToml = `${process.cwd()}/ignite.toml`

    if (!filesystem.exists(globalToml)) {
      error('No `ignite.toml` file found in this folder are you sure it is an Ignite project?')
      process.exit(1)
    }

    if (patching.isInFile(globalToml, key)) {
      if (isVariableName) patching.replaceInFile(globalToml, key, `${key} = ${value}`)
      if (!isVariableName) patching.replaceInFile(globalToml, key, `${key} = '${value}'`)
    } else {
      if (isVariableName) patching.insertInFile(globalToml, '[ignite.generators]', `${key} = ${value}`, false)
      if (!isVariableName) patching.insertInFile(globalToml, '[ignite.generators]', `${key} = '${value}'`, false)
    }
  }

  /**
   * Remove Global Config setting
   *
   * @param {string}  key Key of setting to be removed
   */
  function removeGlobalConfig (key) {
    const { patching } = context
    const globalToml = `${process.cwd()}/ignite.toml`

    if (!filesystem.exists(globalToml)) {
      error('No `ignite.toml` file found in this folder, are you sure it is an Ignite project?')
      process.exit(1)
    }

    if (patching.isInFile(globalToml, key)) {
      patching.replaceInFile(globalToml, key, '')
    } else {
      warning(`Global Config '${key}' not found.`)
    }
  }

  /**
   * Sets Debug Config setting
   *
   * @param {string}  key             Key of setting to be defined
   * @param {string}  value           Value to be set
   * @param {bool}    isVariableName  Optional flag to set value as variable name instead of string
   */
  function setDebugConfig (key, value, isVariableName = false) {
    const { patching } = context
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      error('No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an Ignite project?')
      process.exit(1)
    }

    if (patching.isInFile(debugConfig, key)) {
      if (isVariableName) patching.replaceInFile(debugConfig, key, `\t${key}: ${value}`)
      if (!isVariableName) patching.replaceInFile(debugConfig, key, `\t${key}: '${value}'`)
    } else {
      if (isVariableName) patching.insertInFile(debugConfig, 'const SETTINGS = {', `\t${key}: ${value}`)
      if (!isVariableName) patching.insertInFile(debugConfig, 'const SETTINGS = {', `\t${key}: '${value}'`)
    }
  }

  /**
   * Remove Debug Config setting
   *
   * @param {string}  key Key of setting to be removed
   */
  function removeDebugConfig (key) {
    const { patching } = context
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      error('No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an ignite project?')
      process.exit(1)
    }

    if (patching.isInFile(debugConfig, key)) {
      patching.replaceInFile(debugConfig, key, '')
    } else {
      warning(`Debug Setting ${key} not found.`)
    }
  }

  // send back the extension
  return {
    useYarn,
    findIgnitePlugins,
    addModule,
    removeModule,
    addComponentExample,
    removeComponentExample,
    setGlobalConfig,
    removeGlobalConfig,
    setDebugConfig,
    removeDebugConfig,
    noMegusta
  }
}

module.exports = attach
