const minimist = require('minimist')
const { build, printCommands, printWtf, print } = require('gluegun')
const header = require('../brand/header')
const { isNil, isEmpty } = require('ramda')

/**
 * Kick off a run.
 *
 * @param  {array} argv An array of command line arguments.
 * @return {RunContext} The gluegun RunContext
 */
module.exports = async function run (argv) {
  // create a runtime
  const runtime = build()
    .brand('ignite')
    .loadDefault(`${__dirname}/..`)
    .loadAll(`${process.cwd()}/node_modules`, { matching: 'ignite-*', hidden: true })
    .token('commandName', 'cliCommand')
    .token('commandHidden', 'cliHidden')
    .token('commandAlias', 'cliAlias')
    .token('commandName', 'cliCommand')
    .token('commandDescription', 'cliDescription')
    .token('extensionName', 'contextExtension')
    .createRuntime()

  // parse the commandLine line
  const commandLine = minimist(argv.slice(2))

  // should we show the version number & jet?
  const hasNoArguments = isEmpty(commandLine._)
  const hasVersionOption = commandLine.version || commandLine.v
  if (hasNoArguments && hasVersionOption) {
    await runtime.run({ rawCommand: 'version' })
    return
  }

  // wtf mode shows problems with plugins, commands, and extensions
  if (commandLine.wtf) {
    printWtf(runtime)
    return
  }

  // run the command
  const context = await runtime.run()

  if (commandLine.help || commandLine.h || isNil(context.plugin) || isNil(context.command)) {
    // no args, show help
    print.info('')
    header()
    printCommands(context)
    print.info('')
    print.info(print.colors.magenta('If you need additional help, join our Slack at http://community.infinite.red'))
    print.info('')
  }

  if (context.error) {
    print.debug(context.error)
  }

  // send it back to make testing easier
  return context
}
