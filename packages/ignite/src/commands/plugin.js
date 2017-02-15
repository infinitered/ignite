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
  return /^ignite-/.test(pluginName) ? pluginName : 'ignite-' + pluginName
}

/**
 * Creates a new folder with the plugin files.
 *
 * @param {Object} context The gluegun context.
 */
const createNewPlugin = async (context) => {
  const { parameters, print, ignite, strings } = context
  const pluginName = validateName(parameters.third, context)
  const name = strings.pascalCase(pluginName.replace(/^ignite-/, ''))

  // Plugin generation walkthrough
  const answers = await walkthrough(context)

  // Here we go!
  print.info(`Creating new plugin: ${pluginName}`)

  const copyJobs = [
    { template: 'plugin/.gitignore', target: `${pluginName}/.gitignore` },
    { template: 'plugin/index.js.ejs', target: `${pluginName}/index.js` },
    { template: 'plugin/ignite.toml.ejs', target: `${pluginName}/ignite.toml` },
    { template: 'plugin/package.json.ejs', target: `${pluginName}/package.json` },
    { template: 'plugin/README.md', target: `${pluginName}/README.md` },
    (answers.template === 'Yes') &&
      { template: 'plugin/templates/Example.js.ejs', target: `${pluginName}/templates/${name}Example.js.ejs` },
    (answers.command === 'Yes') &&
      { template: 'plugin/commands/example.js.ejs', target: `${pluginName}/commands/example.js.ejs` }
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
      break

    case 'list':
      print.error(`ignite plugin list is not implemented yet.`)
      break

    case 'help':
    default:
      showHelp(context)
      break
  }
}

