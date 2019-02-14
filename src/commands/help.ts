import { GluegunToolbox } from 'gluegun'
module.exports = {
  dashed: true,
  alias: ['h'],
  description: 'Displays Ignite CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { printCommands, info, colors },
    } = toolbox

    info('')
    require('../brand/header')()
    printCommands(toolbox)
    info('')
    info(colors.magenta('If you need additional help, join our Slack at http://community.infinite.red'))
    info('')
  },
}
