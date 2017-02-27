const exitCodes = require('../../lib/exitCodes')

module.exports = (plugin, command, context) => {
  /**
   * Remove Debug Config setting
   *
   * @param {string}  key Key of setting to be removed
   */
  function removeDebugConfig (key) {
    const { print, filesystem, patching } = context
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      print.error(
        '💩 No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an ignite project?'
      )
      process.exit(exitCodes.generic)
    }

    if (patching.isInFile(debugConfig, key)) {
      patching.replaceInFile(debugConfig, key, '')
    } else {
      print.warning(`Debug Setting ${key} not found.`)
    }
  }

  return removeDebugConfig
}
