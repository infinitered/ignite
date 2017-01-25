// @cliDescription  WUT?
// ----------------------------------------------------------------------------
const { reduce, filter } = require('ramda')

module.exports = async function (context) {
  // grab a fist-full of features...
  const { system, print, filesystem, strings, ignite, patching } = context
  const { trim, kebabCase } = strings
  const { info, warning, success, debug, checkmark, error } = print

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
    process.exit(1)
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

  const directory = filter(x => x.name === selectedPlugin, context.ignite.findIgnitePlugins())[0].directory
  const choices = filesystem.list(`${directory}/templates`)

  const copyFiles = await context.prompt.ask({
    name: 'selectedTemplates',
    message: 'Which templates would you like to spork?',
    type: 'checkbox',
    choices
  })

  copyFiles.selectedTemplates.map((template) => {
    filesystem.copyAsync(`${directory}/templates/${template}`, `ignite/Spork/${selectedPlugin}/${template}`)
  })
}
