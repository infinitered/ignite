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
const checkName = (pluginName, context) => {
  const { strings, print, runtime, parameters } = context
  
  if (strings.isBlank(pluginName)) {
    print.info(`${runtime.brand} plugin new <${runtime.brand}-plugin-name>\n`)
    print.error('Plugin name is required')
    process.exit(exitCodes.PLUGIN_NAME)
    return false
  }

  if (pluginName.indexOf('ignite-') !== 0) {
    print.info(`Ignite plugins typically start with ignite-* -- but you do you.`)
  }

  // TODO: Make this better at detecting invalid plugin names
  if (!/^[a-z0-9].*/i.test(pluginName)) {
    print.error('Plugin name should be a valid folder name')
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
const createNewPlugin = async (context) => {
  const { parameters, print, ignite, strings, filesystem } = context

  const pluginName = parameters.third
  if (!checkName(pluginName, context)) { return }

  const name = strings.pascalCase(pluginName.replace(/^ignite-/, ""))

  print.info(`Creating new plugin: ${pluginName}`)

  // filesystem.dir(`${pluginName}/templates`)

  const copyJobs = [
    {
      template: 'plugin/index.js.ejs',
      target: `${pluginName}/index.js`
    },
    {
      template: 'plugin/templates/Example.js.ejs',
      target: `${pluginName}/templates/${name}Example.js`
    }
  ]

  // copy over the templates
  await ignite.copyBatch(context, copyJobs, {name, pluginName})
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
      await createNewPlugin(context)
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

