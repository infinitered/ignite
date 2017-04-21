const exitCodes = require('../../lib/exitCodes')

module.exports = (plugin, command, context) => {
  /**
   * Sets Debug Config setting
   *
   * @param {string} key - Key of setting to be defined
   * @param {string} value - Value to be set
   * @param {bool} isVariableName[false] - flag to set value as variable name instead of string
   */
  function setDebugConfig (key, value, isVariableName = false) {
    const { filesystem, patching, ignite, print } = context
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      const msg = 'No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an Ignite project?'
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
          insert: `  ${key}: ${value},`
        })
      } else {
        ignite.patchInFile(debugConfig, {
          after: 'export default {',
          insert: `  ${key}: '${value}',`
        })
      }
    }
  }

  return setDebugConfig
}
