const { pipe, keys, filter, map } = require('ramda')
const exitCodes = require('./exitCodes')
const fetchPluginRegistry = require('./fetchPluginRegistry')

/**
 * Shows a list of known plugins.
 *
 * @param {Object} context The gluegun context.
 */
module.exports = async function (context) {
  const { print, parameters } = context
  const { colors, newline, info, table, error } = print
  const directory = await fetchPluginRegistry(context)
  const search = parameters.second

  const pluginTable = pipe(
    keys,
    filter((k) => {
      if (!search) return true
      return k.includes(search)
    }),
    map((k) => {
      const plugin = directory[k]
      return [k, plugin.author]
    })
  )(directory)

  newline()
  info(colors.highlight("Ignite Plugins"))
  newline()
  if (pluginTable.length > 0) {
    info(colors.muted("Install with `ignite add pluginname` and remove with `ignite remove pluginname`"))
    newline()
    table(pluginTable)
  } else {
    error(`No plugin with the search string '${search}'.`)
  }
  newline()

  process.exit(exitCodes.OK)
}
