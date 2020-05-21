import { GluegunToolbox } from 'gluegun'
import printCommands from '../lib/print-commands'

module.exports = {
  dashed: true,
  alias: ['h'],
  description: 'Displays Ignite CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info, colors },
    } = toolbox

    info('')
    require('../brand/header')()
    printCommands(toolbox)
    info('')
    info(colors.magenta('If you need additional help, join our Slack at http://community.infinite.red'))
    info('')
  },
}
