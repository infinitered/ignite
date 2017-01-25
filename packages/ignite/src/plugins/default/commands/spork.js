// @cliDescription  Copy templates as blueprints for this project
// ----------------------------------------------------------------------------
const { reduce, find } = require('ramda')
const exitCodes = require('../../../lib/exitCodes')

module.exports = async function (context) {
  // grab a fist-full of features...
  const { print, filesystem, patching } = context
  const { warning, success } = print

  // ignite spork
  // -> lists all generator plugins (identified in toml)
  const pluginOptions = reduce((a, k) => {
    const tomlFile = `${k.directory}/ignite.toml`
    // review them for toml files with generators
    if (patching.isInFile(tomlFile, 'generators')) {
      a.push(k.name)
    }
    return a
  }, [], context.ignite.findIgnitePlugins())

  // Ask (if necessary)
  let selectedPlugin = ''
  if (pluginOptions.length === 0) {
    warning('No plugins with generators were detected!')
    process.exit(exitCodes.SPORKABLES_NOT_FOUND)
  } else if (pluginOptions.length === 1) {
    selectedPlugin = pluginOptions[0]
  } else {
    const answer = await context.prompt.ask({
      name: 'selectedPlugin',
      message: 'Which plugin will you be sporking templates from?',
      type: 'list',
      choices: pluginOptions
    })
    selectedPlugin = answer.selectedPlugin
  }

  const directory = find(x => x.name === selectedPlugin, context.ignite.findIgnitePlugins()).directory
  const choices = filesystem.list(`${directory}/templates`)

  const copyFiles = await context.prompt.ask({
    name: 'selectedTemplates',
    message: 'Which templates would you like to spork?',
    type: 'checkbox',
    choices
  })

  // TODO: This will be wonky if you're not in root of your project
  copyFiles.selectedTemplates.map((template) => {
    filesystem.copyAsync(`${directory}/templates/${template}`, `ignite/Spork/${selectedPlugin}/${template}`)
  })

  success('Sporked!')
}
