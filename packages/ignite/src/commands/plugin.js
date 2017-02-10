// @cliDescription Manages ignite plugins
// @cliAlias p
// ----------------------------------------------------------------------------

const exitCodes = require('../lib/exitCodes')

/**
 * Does a walkthrough of questions and returns the answers as an object.
 * 
 * @param {Object} context The gluegun context.
 * @returns {Object} The answers.
 */
const walkthrough = async (context) => {
  const minOptions = { template: 'No', command: 'No' }
  const maxOptions = { template: 'Yes', command: 'Yes' }
  if (context.parameters.options.min) { return minOptions }
  if (context.parameters.options.max) { return maxOptions }

  // Okay, we'll ask one by one, fine
  return await context.prompt.ask([
    {
      name: 'template',
      message: 'Would you like to generate an example component?',
      type: 'list',
      choices: ['No', 'Yes']
    },
    {
      name: 'command',
      message: 'Would you like to generate an example command/generator?',
      type: 'list',
      choices: ['No', 'Yes']
    }
  ])
}

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
    // As passive-aggressively as possible
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
  const name = strings.pascalCase(pluginName.replace(/^ignite-/, ""))

  // Validate plugin name
  if (!checkName(pluginName, context)) { return }

  // Plugin generation walkthrough
  const answers = await walkthrough(context)

  // Here we go!
  print.info(`Creating new plugin: ${pluginName}`)

  const copyJobs = [
    { template: 'plugin/.gitignore', target: `${pluginName}/.gitignore` },
    { template: 'plugin/index.js.ejs', target: `${pluginName}/index.js` },
    { template: 'plugin/ignite.toml.ejs', target: `${pluginName}/ignite.toml` },
    { template: 'plugin/package.json.ejs', target: `${pluginName}/package.json` },
    (answers.template === 'Yes') &&
      { template: 'plugin/templates/Example.js.ejs', target: `${pluginName}/templates/${name}Example.js` },
    (answers.command === 'Yes') &&
      { template: 'plugin/commands/example.js.ejs', target: `${pluginName}/commands/example.js` },
  ]

  // copy over the files
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
  ignite plugin list (coming soon)

Example:
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

