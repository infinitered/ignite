const { pipe, prop, sortBy, propSatisfies, filter } = require('ramda')
const { startsWith } = require('ramdasauce')
const Shell = require('shelljs')

/**
 * The current executing ignite plugin path.
 */
let pluginPath = null

/**
 * Set the current executing ignite plugin path.
 */
function setIgnitePluginPath (path) { pluginPath = path }

/**
 * Gets the path to the current running ignite plugin.
 */
function ignitePluginPath () { return pluginPath }

/**
 * Adds ignite goodies
 *
 * @return {Function} A function to attach to the context.
 */
function attach (plugin, command, context) {
  const { template, config, runtime, system, parameters, print, filesystem } = context
  const { error, warning } = print

  // determine which package manager to use
  const forceNpm = parameters.options.npm
  const useYarn = !forceNpm && Shell.which('yarn')

  /**
   * Finds the gluegun plugins that are also ignite plugins.
   *
   * @returns {Plugin[]} - an array of ignite plugins
   */
  function findIgnitePlugins () {
    return pipe(
      filter(propSatisfies(startsWith('ignite-'), 'name')),
      sortBy(prop('name'))
    )(runtime.plugins)
  }

  /**
   * Adds a npm-based module to the project.
   *
   * @param {string}  moduleName - The module name as found on npm.
   * @param {Object}  options - Various installing flags.
   * @param {boolean} options.link - Should we run `react-native link`?
   * @param {boolean} options.dev - Should we install as a dev-dependency?
   */
  async function addModule (moduleName, options = {}) {
    // install the module
    if (useYarn) {
      const addSwitch = options.dev ? '--dev' : ''
      await system.run(`yarn add ${moduleName} ${addSwitch}`)
    } else {
      const installSwitch = options.dev ? '--save-dev' : '--save'
      await system.run(`npm i ${moduleName} ${installSwitch}`)
    }

    // should we react-native link?
    if (options.link) {
      try {
        await system.run(`react-native link ${moduleName}`)
      } catch (err) {
        throw new Error(`Error running: react-native link ${moduleName}.\n${err.stderr}`)
      }
    }
  }

  /**
   * Removes a npm-based module from the project.
   *
   * @param {string}  moduleName - The module name to remove.
   * @param {Object}  options - Various uninstalling flags.
   * @param {boolean} options.unlink - Should we unlink?
   * @param {boolean} options.dev - is this a dev dependency?
   */
  async function removeModule (moduleName, options = {}) {
    // unlink
    if (options.unlink) {
      await system.run(`react-native unlink ${moduleName}`)
    }

    // uninstall
    if (useYarn) {
      const addSwitch = options.dev ? '--dev' : ''
      await system.run(`yarn remove ${moduleName} ${addSwitch}`)
    } else {
      const uninstallSwitch = options.dev ? '--save-dev' : '--save'
      await system.run(`npm rm ${moduleName} ${uninstallSwitch}`)
    }
  }

  async function copyBatch (context, jobs, props) {
    // grab some features
    const { config, template, prompt, filesystem, print } = context
    const { generate } = template
    const { confirm } = prompt

    // read some configuration
    const { askToOverwrite } = config.ignite

    // If the file exists
    const shouldGenerate = async (target) => {
      if (!askToOverwrite) return true
      if (!filesystem.exists(target)) return true
      return await confirm(`overwrite ${target}`)
    }

    // old school loop because of async stuff
    for (let index = 0; index < jobs.length; index++) {
      // grab the current job
      const job = jobs[index]
      // safety check
      if (!job) continue

      // generate the React component
      if (await shouldGenerate(job.target)) {
        await generate({
          directory: `${ignitePluginPath()}/templates`,
          template: job.template,
          target: job.target,
          props
        })
        print.info(`${print.checkmark} ${job.target}`)
      }
    }
  }

  /**
   * Generates an example for use with the dev screens.
   *
   * @param {string} fileName - The js file to create. (.ejs will be appended to pick up the template.)
   * @param {Object} props - The properties to use for template expansion.
   */
  async function addComponentExample (fileName, props = {}) {
    const { filesystem, patching } = context

    // do we want to use examples in the classic format?
    if (config.ignite.examples === 'classic') {
      // NOTE(steve): would make sense here to detect the template to generate or fall back to a file.
      // generate the file
      template.generate({
        directory: `${ignitePluginPath()}/templates`,
        template: `${fileName}.ejs`,
        target: `App/Components/Examples/${fileName}`,
        props
      })

      // adds reference to usage example screen (if it exists)
      const destinationPath = `${process.cwd()}/App/Containers/DevScreens/PluginExamples.js`
      if (filesystem.exists(destinationPath)) {
        patching.insertInFile(destinationPath, 'import ExamplesRegistry', `import '../Components/Examples/${fileName}`)
      }
    }
  }

  /**
   * Removes the component example.
   */
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
   * Sets Global Config setting
   *
   * @param {string}  key             Key of setting to be defined
   * @param {string}  value           Value to be set
   * @param {bool}    isVariableName  Optional flag to set value as variable name instead of string
   */
  function setGlobalConfig (key, value, isVariableName = false) {
    const { patching, filesystem } = context
    const globalToml = `${process.cwd()}/ignite.toml`

    if (!filesystem.exists(globalToml)) {
      error('No `ignite.toml` file found in this folder are you sure it is an Ignite project?')
      process.exit(1)
    }

    if (patching.isInFile(globalToml, key)) {
      if (isVariableName) {
        patching.replaceInFile(globalToml, key, `${key} = ${value}`)
      } else {
        patching.replaceInFile(globalToml, key, `${key} = '${value}'`)
      }
    } else {
      if (isVariableName) {
        patching.insertInFile(globalToml, '[ignite]', `${key} = ${value}`, false)
      } else {
        patching.insertInFile(globalToml, '[ignite]', `${key} = '${value}'`, false)
      }
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
    ignitePluginPath,
    setIgnitePluginPath,
    useYarn,
    findIgnitePlugins,
    addModule,
    removeModule,
    copyBatch,
    addComponentExample,
    removeComponentExample,
    setGlobalConfig,
    removeGlobalConfig,
    setDebugConfig,
    removeDebugConfig
  }
}

module.exports = attach
