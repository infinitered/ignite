import exitCodes from './exit-codes'
import fetchPluginRegistry from './fetch-plugin-registry'
import { IgniteToolbox } from '../types'

/**
 * Shows a list of known plugins.
 *
 * @param {Object} toolbox The gluegun toolbox.
 */
export default async function(toolbox: IgniteToolbox) {
  const { pipe, keys, filter, map } = require('ramda')

  const { print, parameters } = toolbox
  const { colors, newline, info, table, error } = print
  const directory = await fetchPluginRegistry(toolbox)
  const plugins = installedPlugins(toolbox)
  const search = parameters.first

  const pluginTable = pipe(
    keys,
    filter(k => {
      if (!search) return true
      return k.includes(search)
    }),
    map(k => {
      const plugin = directory[k]
      const installed = plugins.includes(k)
      return [k, plugin.author, installed ? '[Installed]' : '']
    }),
  )(directory)

  newline()
  info(colors.highlight('Ignite Plugins'))
  newline()
  if (pluginTable.length > 0) {
    info(colors.muted('Install with `ignite add pluginname` and remove with `ignite remove pluginname`'))
    newline()
    table(pluginTable)
  } else {
    error(`No plugin with the search string '${search}'.`)
  }
  newline()

  process.exit(exitCodes.OK)
}

/**
 * Return a list of installed Ignite plugins
 */
function installedPlugins(toolbox: IgniteToolbox) {
  const { keys, filter, pipe } = require('ramda')

  const packageJson = require(`${process.cwd()}/package.json`)
  return pipe(filter(key => /(ignite\-[\w\-\@]+)/gi.test(key)))([
    ...keys(packageJson.dependencies),
    ...keys(packageJson.devDependencies),
  ])
}
