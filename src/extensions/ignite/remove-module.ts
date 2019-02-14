import { IgniteToolbox } from '../../types'

export default (toolbox: IgniteToolbox) => {
  /**
   * Removes a npm-based module from the project.
   */
  async function removeModule(moduleName: string, options: { unlink?: boolean; dev?: boolean } = {}) {
    const { print, system, ignite } = toolbox
    const { useYarn } = ignite

    print.info(`    ${print.checkmark} uninstalling ${moduleName}`)

    // unlink
    if (options.unlink) {
      print.info(`    ${print.checkmark} unlinking`)
      await system.spawn(`react-native unlink ${moduleName}`, {
        stdio: 'ignore',
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
