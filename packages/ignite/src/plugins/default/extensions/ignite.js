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
  }

  function removeModule (moduleName) {
    if (useYarn) {
      Shell.exec(`yarn remove ${moduleName}`, {silent: true})
    } else {
      Shell.exec(`npm rm ${moduleName}`, {silent: true})
    }
  }

  // copies example usage file to project for use in dev screens
  async function addComponentExample (sourceFolder, fileName) {
    // make sure examples is set
    if (context.config.ignite.examples === 'classic') {
      // copy to components/examples folder
      // Should be using template.generate but we can't due to gluegun #126
      context.filesystem.copy(`${sourceFolder}${fileName}`, `${process.cwd()}/App/Components/Examples/${fileName}`)
      // adds reference to usage example screen (if it exists)
    }
  }

  function removeComponentExample (exampleFile) {
    // remove file from components/examples folder
    // remove reference in usage example screen (if it exists)
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
