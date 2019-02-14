import { trim } from 'ramda'
import * as path from 'path'
import { IgniteToolbox } from '../../types'

export type AddModuleOptions = {
  link?: boolean
  dev?: boolean
  version?: string
}

export default (toolbox: IgniteToolbox) => {
  const getModuleName = (moduleName, options: AddModuleOptions) => {
    let name
    if (options.version) {
      name = `${moduleName}@${options.version}`
    } else if (toolbox.parameters.first.includes(path.sep)) {
      // If adding from a directory, then display a deprecation warning.
      // This is to alert plugin authors to the issue without cluttering others' output.
      toolbox.print.warning(`DEPRECATION WARNING:`)
      toolbox.print.warning(`Plugin should specify specific version for NPM module ${moduleName} in addModule call.`)
      toolbox.print.warning(`In your addModule call, add the following:`)
      toolbox.print.warning(`   await ignite.addModule(NPM_MODULE_NAME, { version: 'VERSION HERE' })`)
    }
    return name || moduleName
  }

  /**
   * Adds a npm-based module to the project.
   */
  async function addModule(moduleName: string, options: AddModuleOptions = {}) {
    const { print, system, ignite } = toolbox
    const { useYarn } = ignite
    const moduleFullName = getModuleName(moduleName, options)

    const depType = options.dev ? 'as dev dependency' : ''
    const spinner = print.spin(`▸ installing ${print.colors.cyan(moduleFullName)} ${depType}`)

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
          stdio: 'ignore',
        })
        spinner.stop()
      } catch (err) {
        spinner.fail()
        throw new Error(`Error running: react-native link ${moduleName}.\n${err.stderr}`)
      }
    }
  }

  return addModule
}
