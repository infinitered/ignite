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

  // send back the extension
  return {
    findIgnitePlugins
  }
}

module.exports = attach
