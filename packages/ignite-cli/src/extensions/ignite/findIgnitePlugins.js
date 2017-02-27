const { pipe, filter, propSatisfies, sortBy, prop } = require('ramda')
const { startsWith } = require('ramdasauce')

module.exports = (plugin, command, context) => {
  /**
   * Finds the gluegun plugins that are also ignite plugins.
   *
   * @returns {Plugin[]} - an array of ignite plugins
   */
  function findIgnitePlugins () {
    const { runtime } = context

    return pipe(
      filter(propSatisfies(startsWith('ignite-'), 'name')),
      sortBy(prop('name'))
    )(runtime.plugins)
  }

  return findIgnitePlugins
}
