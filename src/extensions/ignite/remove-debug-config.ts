import exitCodes from '../../lib/exit-codes'
import { IgniteToolbox } from '../../types'

export default (toolbox: IgniteToolbox) => {
  /**
   * Remove Debug Config setting
   *
   * @param {string}  key Key of setting to be removed
   */
  function removeDebugConfig(key: string) {
    const { print, filesystem, ignite } = toolbox
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      print.error('💩 No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an ignite project?')
      process.exit(exitCodes.GENERIC)
    }

    if (ignite.patching.isInFile(debugConfig, key)) {
      ignite.patching.replaceInFile(debugConfig, key, '')
    } else {
      print.warning(`Debug Setting ${key} not found.`)
    }
  }

  return removeDebugConfig
}
