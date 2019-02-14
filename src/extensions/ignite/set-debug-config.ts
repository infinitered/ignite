import exitCodes from '../../lib/exit-codes'
import { IgniteToolbox } from '../../types'

export default (toolbox: IgniteToolbox) => {
  /**
   * Sets Debug Config setting
   */
  function setDebugConfig(key: string, value: string, isVariableName: boolean = false) {
    const { filesystem, ignite, print } = toolbox
    const { patching } = ignite
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      const msg = 'No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an Ignite CLI project?'
      print.error(msg)
      process.exit(exitCodes.GENERIC)
    }

    if (patching.isInFile(debugConfig, key)) {
      if (isVariableName) {
        patching.replaceInFile(debugConfig, key, `  ${key}: ${value},`)
      } else {
        patching.replaceInFile(debugConfig, key, `  ${key}: '${value},'`)
      }
    } else {
      if (isVariableName) {
        ignite.patchInFile(debugConfig, {
          after: 'export default {',
          insert: `  ${key}: ${value},`,
        })
      } else {
        ignite.patchInFile(debugConfig, {
          after: 'export default {',
          insert: `  ${key}: '${value}',`,
        })
      }
    }
  }

  return setDebugConfig
}
