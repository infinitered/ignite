import { IgniteToolbox } from '../types'
import { map, pipe, values } from 'ramda'
import { GluegunCommand } from 'gluegun'

/**
 * Displays information about what generators are available.
 */
module.exports = {
  description: 'Generates some files.',
  alias: ['g'],
  run: async function(toolbox: IgniteToolbox) {
    // grab some features
    const { print, runtime } = toolbox
    const {
      newline,
      warning,
      info,
      table,
      colors: { bold, yellow, muted, white },
    } = print

    // find all commands that start with `generate` (except `generate` itself)
    // and then sort alphabetically
    const generatorCommands = runtime.commands
      .filter(cmd => cmd.commandPath.length > 1 && cmd.commandPath[0] === 'generate')
      .sort((a, b) => (a.commandPath.join(' ') < b.commandPath.join(' ') ? -1 : 1))

    newline()

    /**
     * Prints a footer used when we're unable to run a generator.
     */
    const footer = () => {
      newline()
      info(muted('  --------------------------------------------------------------------------'))
      info(muted(`  Check out ${white('https://github.com/infinitered/ignite')} for more information`)) // prettier-ignore
      info(muted('  or join our Slack community at http://community.infinite.red.'))
    }

    // Avast! Thar be no generators ripe for tha plunder.
    if (generatorCommands.length === 0) {
      warning('⚠️  No generators detected.\n')
      info(`  ${bold('Generators')} allow you to quickly make frequently created files such as:\n`)
      info(`    * components`)
      info(`    * screens`)
      info(`    * models`)
      info(`    * and more`)
      footer()
      return
    }

    // print out all the generators
    info(`✨ Type ${bold('ignite generate')} ${yellow('________')} to run one of these generators:\n`)

    // turn into data we can print
    const data = pipe(
      values,
      map((item: GluegunCommand) => [yellow(item.name), item.description, muted(item.plugin.name)]),
    )(generatorCommands)

    // and print it
    table(data)
    footer()
  },
}
