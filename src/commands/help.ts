import { GluegunToolbox } from 'gluegun'
import { equals, replace } from 'ramda'
import isIgniteDirectory from '../lib/is-ignite-directory'

function commandAvailableInContext(command): boolean {
  const isIgniteDir = isIgniteDirectory(process.cwd())

  let availableCommands
  if (isIgniteDir) {
    availableCommands = ['add', 'doctor', 'generate', 'plugin', 'remove', 'spork', 'version']
  } else {
    availableCommands = ['doctor ', 'new', 'plugin', 'version']
  }
  return availableCommands.includes(command.name)
}

function printCommands(toolbox: GluegunToolbox, commandRoot?: string[]) {
  const {
    print: { info },
  } = toolbox

  const commandInfo = toolbox.runtime.commands.reduce((commands, command) => {
    if (
      !command.hidden &&
      (!commandRoot || equals(command.commandPath.slice(0, commandRoot.length), commandRoot)) &&
      commandAvailableInContext(command)
    ) {
      const alias = command.hasAlias() ? `(${command.aliases.join(', ')})` : ''
      const commandPath = command.name ? command.commandPath.slice(0, -1).concat(command.name) : command.commandPath
      commands.push([
        `${commandPath.join(' ')} ${alias}`,
        replace('$BRAND', toolbox.runtime.brand, command.description || '-'),
      ])
    }

    return commands
  }, [])
  info(commandInfo)
}

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
