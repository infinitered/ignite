import { GluegunToolbox } from 'gluegun'
import { equals, replace } from 'ramda'

function commandAvailableInContext(command): boolean {
  const isIgniteDir = true

  let availableCommands
  if (isIgniteDir) {
    availableCommands = ['add', 'doctor', 'generate', 'plugin', 'remove', 'spork', 'version']
  } else {
    availableCommands = ['doctor ', 'new', 'plugin', 'version']
  }
  return availableCommands.includes(command.name)
}

export default function printCommands(toolbox: GluegunToolbox, commandRoot?: string[]) {
  const {
    print: { newline, table },
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
  newline()
  table(commandInfo)
}
