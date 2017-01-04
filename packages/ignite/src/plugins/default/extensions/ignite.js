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
  const { template, config, runtime, system, parameters } = context

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

  // send back the extension
  return {
    ignitePluginPath,
    setIgnitePluginPath,
    useYarn,
    findIgnitePlugins,
    addModule,
    removeModule,
    addComponentExample,
    removeComponentExample
  }
}

module.exports = attach
