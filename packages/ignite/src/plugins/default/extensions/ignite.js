const { pipe, prop, sortBy, propSatisfies, filter } = require('ramda')
const { startsWith } = require('ramdasauce')

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
    console.log(`I should be adding ${moduleName}`)
  }

  function removeModule (moduleName) {
    console.log(`I should be removing ${moduleName}`)
  }

  // send back the extension
  return {
    findIgnitePlugins,
    addModule,
    removeModule
  }
}

module.exports = attach
