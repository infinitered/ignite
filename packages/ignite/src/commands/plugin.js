// @cliDescription Manages ignite plugins
// @cliAlias p
// ----------------------------------------------------------------------------

const exitCodes = require('../lib/exitCodes')

/**
 * Checks whether a plugin name was given and errors if not.
 *
 * @param {Object} context The gluegun context.
 * @returns {Boolean}
 */
const checkName = (context) => {
  const { strings, print, runtime, parameters } = context
  
  if (strings.isBlank(parameters.third)) {
    print.info(`${runtime.brand} plugin new <${runtime.brand}-plugin-name>\n`)
    print.error('Plugin name is required')
    process.exit(exitCodes.PLUGIN_NAME)
    return false
  }
  return true
}

/**
 * Creates a new folder with the plugin files.
 *
 * @param {Object} context The gluegun context.
 */
const createNewPlugin = (context) => {
  if (!checkName(context)) { return }

  context.print.error(`not done yet`)
}

/**
 * Shows the command help.
 *
 * @param {Object} context The gluegun context.
 */
const showHelp = (context) => {
    const instructions = `
Generates an Ignite-compatible plugin in the current folder.
Generally, you would run this from ./YourApp/ignite/plugins/

Commands:
  ignite plugin help
  ignite plugin new <your-plugin>

Examples:
  ignite plugin new ignite-my-plugin
  ignite plugin new ignite-mobx`
    context.print.info(instructions)
    process.exit(exitCodes.OK)
}

module.exports = async function (context) {
  // They need to be in the folder /ignite or /packages to create plugins

  // const { parameters, strings, print, system } = context
  const { parameters, print } = context
  // const { debug, info, error } = print

  // context.print.debug(context.parameters)
  switch (parameters.second) {
    case 'new':
      createNewPlugin(context)
      break;

    case 'list':
      print.error(`ignite plugin list is not implemented yet.`)
      break;

    case 'help':
    default:
      showHelp(context)
      break;
  }
}

