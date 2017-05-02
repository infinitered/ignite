module.exports = (plugin, command, context) => {
  /**
   * Removes a npm-based module from the project.
   *
   * @param {string}  moduleName - The module name to remove.
   * @param {Object}  options - Various uninstalling flags.
   * @param {boolean} options.unlink - Should we unlink?
   * @param {boolean} options.dev - is this a dev dependency?
   */
  async function removeModule (moduleName, options = {}) {
    const { print, system, ignite } = context
    const { useYarn } = ignite

    print.info(`    ${print.checkmark} uninstalling ${moduleName}`)

    // unlink
    if (options.unlink) {
      print.info(`    ${print.checkmark} unlinking`)
      await system.spawn(`react-native unlink ${moduleName}`, {
        stdio: 'ignore'
      })
    }

    print.info(`    ${print.checkmark} removing`)
    // uninstall
    if (useYarn) {
      const addSwitch = options.dev ? '--dev' : ''
      await system.run(`yarn remove ${moduleName} ${addSwitch}`)
    } else {
      const uninstallSwitch = options.dev ? '--save-dev' : '--save'
      await system.run(`npm rm ${moduleName} ${uninstallSwitch}`)
    }
  }

  return removeModule
}
