const prependIgnite = require('./prependIgnite')

/**
 * Checks whether a plugin name was given and errors if not.
 * Also prepends `ignite-*` if plugin name didn't include it.
 *
 * @param {String} pluginName The provided plugin name.
 * @param {Object} context The gluegun context.
 * @returns {String} The normalized name.
 */
const validateName = (pluginName, context) => {
  const { strings, print } = context

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

module.exports = validateName
