const prependIgnite = require('./prependIgnite')

/**
 * Detects the type of install the user is requesting for this plugin.
 *
 * @param {object} context - A gluegun context
 * @returns {object} specs about the type of install
 */
function detectInstall (context) {
  // grab some gluegun goodies
  const { filesystem, parameters } = context

  /**
   * Is this a valid ignite plugin?
   *
   * @param {string} candidate The potential directory to check.
   * @returns {boolean} True if this is valid; otherwise false.
   */
  const isValidIgnitePluginDirectory = candidate =>
    filesystem.exists(candidate) === 'dir' &&
    filesystem.exists(`${candidate}/package.json`) === 'file'

  // the thing we're trying to install
  const thing = parameters.second

  // is this a directory?
  if (isValidIgnitePluginDirectory(thing)) {
    const json = filesystem.read(`${thing}/package.json`, 'json') || {}
    return {
      directory: thing,
      moduleName: json.name,
      type: 'directory'
    }
  }

  // this is a npmjs module
  return {
    moduleName: prependIgnite(thing),
    type: 'npm'
  }
}

module.exports = detectInstall
