import isIgniteDirectory from '../lib/is-ignite-directory'
import { IgniteToolbox } from '../types'

module.exports = {
  description: 'Attaches Ignite CLI to an existing project.',
  run: async function(toolbox: IgniteToolbox) {
    const { filesystem, print, meta } = toolbox

    // ensure we're in a supported directory
    if (isIgniteDirectory(process.cwd())) {
      toolbox.print.info('🍻  Good news! This project is already Ignite CLI-enabled!')
      return
    }

    // ignite/ignite.json
    const igniteJson = {
      createdWith: meta.version(),
      boilerplate: 'empty',
      examples: 'none',
    }
    filesystem.write('ignite/ignite.json', igniteJson)

    // the plugins folder
    filesystem.write('ignite/plugins/.gitkeep', '')

    toolbox.print.info(`🔥  Good to go! Type ${print.colors.bold('ignite')} to get started.`)
  },
}
