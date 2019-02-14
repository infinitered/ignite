import exitCodes from '../lib/exit-codes'
import isIgniteDirectory from '../lib/is-ignite-directory'

module.exports = {
  description: 'Copy templates as blueprints for this project',
  run: async function(context) {
    // ensure we're in a supported directory
    if (!isIgniteDirectory(process.cwd())) {
      context.print.error('The `ignite spork` command must be run in an ignite-compatible directory.')
      process.exit(exitCodes.NOT_IGNITE_PROJECT)
    }

    // grab a fist-full of features...
    const { print, filesystem, parameters } = context
    const { warning, success, info } = print

    // ignite spork
    // -> lists all generator plugins (identified in json)
    const pluginOptions = context.ignite.findIgnitePlugins().reduce((a, k) => {
      const jsonFile = `${k.directory}/ignite.json`
      if (filesystem.exists(jsonFile)) {
        const jsonContents = filesystem.read(jsonFile, 'json') || {}
        if (jsonContents.generators) {
          a.push(k.name)
        }
      }
      return a
    }, [])

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
        choices: pluginOptions,
      })
      selectedPlugin = answer.selectedPlugin
    }

    const directory = context.ignite.findIgnitePlugins().find(x => x.name === selectedPlugin).directory
    const choices = filesystem.list(`${directory}/templates`)

    // Ask (if necessary)
    let copyFiles
    if (parameters.first) {
      if (choices.includes(parameters.first)) {
        copyFiles = { selectedTemplates: [parameters.first] }
      } else {
        warning(`${parameters.first} is not a recognized generator template.`)
        process.exit(exitCodes.SPORKABLES_NOT_FOUND)
      }
    } else {
      copyFiles = await context.prompt.ask({
        name: 'selectedTemplates',
        message: 'Which templates would you like to spork?',
        type: 'checkbox',
        choices,
      })
    }

    // TODO: This will be wonky if you're not in root of your project
    copyFiles.selectedTemplates.map(template => {
      const destination = `ignite/Spork/${selectedPlugin}/${template}`
      filesystem.copyAsync(`${directory}/templates/${template}`, destination)
      info(` 🔘 ${destination}`)
    })

    success('Sporked!')
  },
}
