const { startsWith } = require('ramdasauce')
const { unless, concat } = require('ramda')
const exitCodes = require('../../../../lib/exitCodes')

/**
 * Ensures the given string starts with 'ignite-'.
 *
 * @param {string} value The string to check.
 * @returns {string} The same string, but better.
 */
const alwaysStartWithIgnite = function (value) {
  return unless(
    startsWith('ignite-'),
    concat('ignite-')
  )(value)
}

/**
 * Detects the type of install the user is requesting for this plugin.
 *
 * @param {object} context - A gluegun context
 * @returns {object} specs about the type of install
 */
function detectInstall (context) {
  // grab some gluegun goodies
  const { filesystem, parameters, print } = context

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
  } else {
    print.error(`💩  ${thing} does not appear to be an NPM module. Does it exist and have a valid package.json?`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // this is a npmjs module
  return {
    moduleName: alwaysStartWithIgnite(thing),
    type: 'npm'
  }
}

module.exports = detectInstall
