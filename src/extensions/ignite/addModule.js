const { trim } = require('ramda')

module.exports = (plugin, command, context) => {
  const getModuleName = (moduleName, options) => {
    let name
    if (options.version) {
      name = `${moduleName}@${options.version}`
    } else if (context.parameters.second.includes('/')) {
      // If adding from a directory, then display a deprecation warning.
      // This is to alert plugin authors to the issue without cluttering others' output.
      context.print.warning(`DEPRECATION WARNING:`)
      context.print.warning(`Plugin should specify specific version for NPM module ${moduleName} in addModule call.`)
      context.print.warning(`In your addModule call, add the following:`)
      context.print.warning(`   await ignite.addModule(NPM_MODULE_NAME, { version: 'VERSION HERE' })`)
    }
    return name || moduleName
  }

  /**
   * Adds a npm-based module to the project.
   *
   * @param {string}  moduleName - The module name as found on npm.
   * @param {Object}  options - Various installing flags.
   * @param {boolean} options.link - Should we run `react-native link`?
   * @param {boolean} options.dev - Should we install as a dev-dependency?
   * @param {boolean} options.version - Install a particular version?
   */
  async function addModule (moduleName, options = {}) {
    const { print, system, ignite } = context
    const { useYarn } = ignite
    const moduleFullName = getModuleName(moduleName, options)

    const depType = options.dev ? 'as dev dependency' : ''
    const spinner = print.spin(
      `▸ installing ${print.colors.cyan(moduleFullName)} ${depType}`
    )

    // install the module
    if (useYarn) {
      const addSwitch = options.dev ? '--dev' : ''
      const cmd = trim(`yarn add ${moduleFullName} ${addSwitch}`)
      ignite.log(cmd)
      await system.run(cmd)
    } else {
      const installSwitch = options.dev ? '--save-dev' : '--save'
      const cmd = trim(`npm i ${moduleFullName} ${installSwitch}`)
      ignite.log(cmd)
      await system.run(cmd)
    }
    spinner.stop()

    // should we react-native link?
    if (options.link) {
      try {
        spinner.text = `▸ linking`
        spinner.start()
        await system.spawn(`react-native link ${moduleName}`, {
          stdio: 'ignore'
        })
        spinner.stop()
      } catch (err) {
        spinner.fail()
        throw new Error(
          `Error running: react-native link ${moduleName}.\n${err.stderr}`
        )
      }
    }
  }

  return addModule
}
