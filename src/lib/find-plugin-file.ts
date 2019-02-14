import { IgniteToolbox } from '../types'

/**
 * Retrieves a plugin's entry point file, which is usually ./plugin.js.
 *
 * @param {Object} toolbox         The gluegun toolbox
 */

export default function findPluginFile(toolbox: IgniteToolbox, modulePath: string): string {
  const { filesystem, print } = toolbox

  // Look for plugin.js
  let pluginFile = filesystem.exists(modulePath + '/plugin.js') === 'file' && modulePath + '/plugin.js'

  if (!pluginFile) {
    // look for the old school style
    pluginFile = filesystem.exists(modulePath + '/index.js') === 'file' && modulePath + '/index.js'

    if (pluginFile) {
      // found the old school style, issue deprecation warning
      print.warning(
        'DEPRECATION WARNING: Heads up! `index.js` in plugins is deprecated. Please use `plugin.js` instead!',
      )
      print.warning(`Found in ${pluginFile}.`)
    }
  }

  return pluginFile
}
