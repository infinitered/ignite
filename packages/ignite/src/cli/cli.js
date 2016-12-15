const minimist = require('minimist')
const { build, printCommands, printWtf } = require('gluegun')
const header = require('../brand/header')
const { isNil } = require('ramda')

/**
 * Kick off a run.
 *
 * @param  {array}      argv An array of command line arguments.
 * @return {RunContext}      The gluegun RunContext
 */
module.exports = async function run (argv) {
  // parse the cmd line
  const cmd = minimist(argv.slice(2))

  // create a runtime
  const runtime = build()
    .brand('ignite')
    .loadDefault(`${__dirname}/../plugins/default`)
    // .loadAll(`${__dirname}/../plugins`)
    .token('commandName', 'cliCommand')
    .token('commandDescription', 'cliDescription')
    .token('extensionName', 'contextExtension')
    .createRuntime()

  // wtf mode shows problems with plugins, commands, and extensions
  if (cmd.wtf) {
    printWtf(runtime)
    process.exit(0)
  }

  // run the command
  const context = await runtime.run()

  // print the commands (TODO: but not if we just ran i guess)
  if (isNil(context.plugin) || isNil(context.command)) {
    header()
    printCommands(context)
  }

  // send it back to make testing easier
  return context
}
