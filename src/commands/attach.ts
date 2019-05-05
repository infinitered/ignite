import isIgniteDirectory from '../lib/is-ignite-directory'
import attachIgnite from '../lib/attach-ignite'
import { IgniteToolbox } from '../types'

module.exports = {
  description: 'Attaches Ignite CLI to an existing project.',
  run: async function(toolbox: IgniteToolbox) {
    const { print, meta } = toolbox

    // ensure we're in a supported directory
    if (isIgniteDirectory(process.cwd())) {
      toolbox.print.info('🍻  Good news! This project is already Ignite CLI-enabled!')
      return
    }

    await attachIgnite(toolbox, { createdWith: meta.version(), boilerplate: 'empty', boilerplateVersion: '' })

    toolbox.print.info(`🔥  Good to go! Type ${print.colors.bold('ignite')} to get started.`)
  },
}
