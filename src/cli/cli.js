const minimist = require('minimist')
const { build, printCommands, printWtf, print } = require('gluegun')
const header = require('../brand/header')
const { isNil, isEmpty } = require('ramda')
const PrettyError = require('pretty-error')
const pe = new PrettyError()

const buildIgnite = () => {
  return build()
    .brand('ignite')
    .loadDefault(`${__dirname}/..`)
    .loadAll(`${process.cwd()}/ignite/plugins`)
    .loadAll(`${process.cwd()}/node_modules`, { matching: 'ignite-*', hidden: true })
    .loadAll(`${process.cwd()}/node_modules`, { matching: 'gluegun-*', hidden: true })
    .token('commandName', 'cliCommand')
    .token('commandHidden', 'cliHidden')
    .token('commandAlias', 'cliAlias')
    .token('commandName', 'cliCommand')
    .token('commandDescription', 'cliDescription')
    .token('extensionName', 'contextExtension')
    .createRuntime()
}

/**
 * Kick off a run.
 *
 * @param  {array} argv An array of command line arguments.
 * @return {RunContext} The gluegun RunContext
 */
module.exports = async function run (argv) {
  // create a runtime
  let runtime
  try {
    runtime = buildIgnite()
  } catch (e) {
    console.log(pe.render(e))
    throw e // rethrow
  }

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

  if (commandLine.verbose && !commandLine.debug) {
    print.error('Use --debug instead of --verbose.')
    return
  }

  // run the command
  let context
  try {
    context = await runtime.run()
  } catch (e) {
    console.log(pe.render(e))
    throw e // rethrow
  }

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
