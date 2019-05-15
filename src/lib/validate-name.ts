import exitCodes from './exit-codes'
import prependIgnite from './prepend-ignite'
import { IgniteToolbox } from '../types'

/**
 * Checks whether a plugin name was given and errors if not.
 * Also prepends `ignite-*` if plugin name didn't include it.
 */
export default (pluginName: string, toolbox: IgniteToolbox): string => {
  const { strings, print } = toolbox

  pluginName = pluginName.toLowerCase()

  if (strings.isBlank(pluginName)) {
    print.info(`ignite plugin new ignite-foo\n`)
    print.error('Plugin name is required')
    process.exit(exitCodes.PLUGIN_NAME)
  }

  // TODO: Make this better at detecting invalid plugin names
  if (!/^[a-z0-9].*/i.test(pluginName)) {
    print.error('Plugin name should be a valid folder name')
    process.exit(exitCodes.PLUGIN_NAME)
  }

  // Force prepend `ignite-*` to plugin name
  return prependIgnite(pluginName)
}
