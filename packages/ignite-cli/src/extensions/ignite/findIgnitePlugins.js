const {
  contains,
  anyPass,
  pipe,
  filter,
  propSatisfies,
  sortBy,
  prop
} = require('ramda')
const { startsWith } = require('ramdasauce')

module.exports = (plugin, command, context) => {
  // gluegun stuff
  const { runtime, filesystem: { separator } } = context

  // how to identify ignite plugins
  const ignitePrefixed = propSatisfies(startsWith('ignite-'), 'name')
  const isInRightLocation = contains(`ignite${separator}plugins`)
  const inProjectPlugins = propSatisfies(isInRightLocation, 'directory')
  const onlyIgnitePlugins = filter(anyPass([ignitePrefixed, inProjectPlugins]))
  const getIgnitePlugins = pipe(onlyIgnitePlugins, sortBy(prop('name')))

  /**
   * Finds the gluegun plugins that are also ignite plugins.  These are
   * plugins which have 1 of the following:
   *
   *   - the name starts with "ignite-"
   *   - the directory contains "ignite/plugins"
   *
   * @returns {Plugin[]} - an array of ignite plugins
   */
  return () => getIgnitePlugins(runtime.plugins)
}
