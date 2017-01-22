const minimist = require('minimist')
const { build, printCommands, printWtf } = require('gluegun')
const header = require('../brand/header')
const { isNil, isEmpty } = require('ramda')
const exitCodes = require('../lib/exitCodes')

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
    .configFile('ignite/ignite.toml')
    .loadDefault(`${__dirname}/../plugins/default`)
    .loadAll(`${process.cwd()}/node_modules`, { matching: 'ignite-*', hidden: true })
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
    runtime.run({ rawCommand: 'version' })
    process.exit(exitCodes.OK)
  }

  // wtf mode shows problems with plugins, commands, and extensions
  if (commandLine.wtf) {
    printWtf(runtime)
    process.exit(exitCodes.OK)
  }

  // run the command
  const context = await runtime.run()

  // print the commands (TODO: but not if we just ran i guess)
  if (isNil(context.plugin) || isNil(context.command)) {
    header()
    printCommands(context)
  }

  if (context.error) {
    console.dir(context.error)
  }

  // send it back to make testing easier
  return context
}
