// @cliDescription Manages ignite plugins
// @cliAlias p
// ----------------------------------------------------------------------------

const exitCodes = require('../lib/exitCodes')
const validateName = require('../lib/validateName')

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
      name: 'boilerplate',
      message: 'Is this an app boilerplate plugin?',
      type: 'list',
      choices: ['No', 'Yes']
    },
    {
      name: 'template',
      message: 'Will your plugin have an example component?',
      type: 'list',
      choices: ['No', 'Yes']
    },
    {
      name: 'command',
      message: 'Will your plugin have a generator command? (e.g. ignite generate <mygenerator> <name>)',
      type: 'list',
      choices: ['No', 'Yes']
    }
  ])
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
    { template: 'plugin/gitignore', target: `${pluginName}/.gitignore` },
    { template: 'plugin/plugin.js.ejs', target: `${pluginName}/plugin.js` },
    { template: 'plugin/ignite.json.ejs', target: `${pluginName}/ignite.json` },
    { template: 'plugin/package.json.ejs', target: `${pluginName}/package.json` },
    { template: 'plugin/README.md', target: `${pluginName}/README.md` },
    { template: 'plugin/test/add.js.ejs', target: `${pluginName}/test/add.js` },
    { template: 'plugin/test/remove.js.ejs', target: `${pluginName}/test/remove.js` },
    { template: 'plugin/test/interface.js.ejs', target: `${pluginName}/test/interface.js` },
    (answers.template === 'Yes') &&
      { template: 'plugin/templates/Example.js.ejs', target: `${pluginName}/templates/${name}Example.js.ejs` },
    (answers.command === 'Yes') &&
      { template: 'plugin/commands/thing.js.ejs', target: `${pluginName}/commands/thing.js` },
    (answers.command === 'Yes') &&
      { template: 'plugin/templates/thing.js.ejs.ejs', target: `${pluginName}/templates/thing.js.ejs` }
  ]
  if (answers.boilerplate === 'Yes') {
    copyJobs.push({ template: 'plugin/boilerplate.js.ejs', target: `${pluginName}/boilerplate.js` })
    copyJobs.push({ template: 'plugin/boilerplate/index.js.ejs.ejs', target: `${pluginName}/boilerplate/index.js.ejs` })
    copyJobs.push({ template: 'plugin/boilerplate/App/App.js', target: `${pluginName}/boilerplate/App/App.js` })
    copyJobs.push({ template: 'plugin/boilerplate/Tests/AppTest.js', target: `${pluginName}/boilerplate/Tests/AppTest.js` })
    copyJobs.push({ template: 'plugin/boilerplate/ignite/ignite.json', target: `${pluginName}/boilerplate/ignite/ignite.json` })
  }

  // copy over the files
  await ignite.copyBatch(context, copyJobs, {name, pluginName, answers, igniteVersion: ignite.version, isGenerator: answers.command === 'Yes'})
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

Example:
  ignite plugin new ignite-mobx`
  context.print.info(instructions)
  process.exit(exitCodes.OK)
}

module.exports = async function (context) {
  const { parameters } = context

  switch (parameters.second) {
    case 'new':
      await createNewPlugin(context)
      break

    case 'help':
    default:
      showHelp(context)
      break
  }
}
