module.exports = (plugin, command, context) => {
  /**
   * Adds a npm-based module to the project.
   *
   * @param {string}  moduleName - The module name as found on npm.
   * @param {Object}  options - Various installing flags.
   * @param {boolean} options.link - Should we run `react-native link`?
   * @param {boolean} options.dev - Should we install as a dev-dependency?
   */
  async function addModule (moduleName, options = {}) {
    const { print, system, ignite } = context
    const { useYarn } = ignite

    const depType = options.dev ? 'as dev dependency' : ''
    const spinner = print.spin(
      `▸ installing ${print.colors.cyan(moduleName)} ${depType}`
    )

    // install the module
    if (useYarn) {
      const addSwitch = options.dev ? '--dev' : ''
      await system.run(`yarn add ${moduleName} ${addSwitch}`)
    } else {
      const installSwitch = options.dev ? '--save-dev' : '--save'
      await system.run(`npm i ${moduleName} ${installSwitch}`)
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
