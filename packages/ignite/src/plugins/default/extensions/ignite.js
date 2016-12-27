const { pipe, prop, sortBy, propSatisfies, filter } = require('ramda')
const { startsWith } = require('ramdasauce')
const Shell = require('shelljs')

const useYarn = Shell.which('yarn')

/**
 * Adds ignite goodies
 *
 * @return {Function} A function to attach to the context.
 */
function attach (plugin, command, context) {
  function findIgnitePlugins () {
    return pipe(
      filter(propSatisfies(startsWith('ignite-'), 'name')),
      sortBy(prop('name'))
    )(context.runtime.plugins)
  }

  function addModule (moduleName) {
    if (useYarn) {
      Shell.exec(`yarn add ${moduleName} --dev`, {silent: true})
    } else {
      Shell.exec(`npm i ${moduleName} --save-dev`, {silent: true})
    }

    Shell.exec(`react-native link ${moduleName}`)
  }

  function removeModule (moduleName) {
    Shell.exec(`react-native unlink ${moduleName}`)

    if (useYarn) {
      Shell.exec(`yarn remove ${moduleName}`, {silent: true})
    } else {
      Shell.exec(`npm rm ${moduleName}`, {silent: true})
    }
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

  // send back the extension
  return {
    useYarn,
    findIgnitePlugins,
    addModule,
    removeModule,
    addComponentExample,
    removeComponentExample
  }
}

module.exports = attach
