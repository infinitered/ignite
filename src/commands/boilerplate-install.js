// @cliHidden true

const detectInstall = require('../lib/detectInstall')
const isIgniteDirectory = require('../lib/isIgniteDirectory')
const importPlugin = require('../lib/importPlugin')
const exitCodes = require('../lib/exitCodes')

/**
 * Installs and runs an ignite boilerplate.
 *
 * Overview:
 *
 *    * ensures we're not already in an ignite directory
 *    * installs the boilerplate package
 *    * verifies that the boilerplate is legit
 *    * runs it
 *
 * Note:
 *
 * This is in a separate command and not inside `new` because we need to
 * install & pickup on any dependencies of the boilerplate.  It might be entirely
 * possible to do that, but we had some problems with it.  This became the
 * "at least it works" solution.
 *
 * @param {any} context - The gluegun context.
 */
async function installBoilerplate (context) {
  const { print, ignite, filesystem } = context

  ignite.log('running boilerplate-install command')

  // we cannot be in an ignite directory
  if (isIgniteDirectory(process.cwd())) {
    print.error('The `ignite boilerplate-install` command must be run in an ignite-compatible directory.')
    process.exit(exitCodes.NOT_IGNITE_PROJECT)
  }

  // determine where the package comes from
  const installSource = detectInstall(context)
  const { moduleName } = installSource
  const modulePath = `${process.cwd()}/node_modules/${moduleName}`
  const boilerplateJs = modulePath + '/boilerplate.js'

  // install the plugin
  const exitCode = await importPlugin(context, installSource)
  if (exitCode) {
    process.exit(exitCode)
  }

  // start the spinner
  const spinner = print.spin('installing boilerplate')

  // ensure we can find the boilerplate.js file
  if (!filesystem.exists(boilerplateJs)) {
    spinner.fail(`${moduleName} does not have a boilerplate.js`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // load the boilerplate.js module
  let pluginModule
  try {
    pluginModule = require(`${modulePath}/boilerplate.js`)
  } catch (e) {
    spinner.fail(`error loading the boilerplate`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // must have an `install` function
  if (!pluginModule.hasOwnProperty('install')) {
    spinner.fail(`boilerplate.js is missing a 'install' function`)
    process.exit(exitCodes.PLUGIN_INVALID)
  }

  // set the path to the current running ignite plugin
  ignite.setIgnitePluginPath(modulePath)

  // stop the spinner
  spinner.stop()

  // run the boilerplate
  try {
    await pluginModule.install(context)
  } catch (e) {
    print.error(`an error occured while installing ${moduleName} boilerplate.`)
    print.error(e)
  }
}

module.exports = installBoilerplate
