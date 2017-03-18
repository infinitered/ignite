const exitCodes = require('../../lib/exitCodes')
const APP_PATH = process.cwd()

module.exports = (plugin, command, context) => {
  /**
   * Sets Android Permission
   *
   * @param {string} key - Permission name to be inserted e.g. `ACCESS_NETWORK_STATE`
   */
  function addAndroidPermission (key) {
    const { filesystem, patching, print, ignite } = context
    const permissionString = `    <uses-permission android:name="android.permission.${key.toUpperCase()}" />`
    const manifestFile = `${APP_PATH}/android/app/src/main/AndroidManifest.xml`

    if (!filesystem.exists(manifestFile)) {
      const msg = `No '${manifestFile}' file found in this folder, are you sure it is a valid React Native project?`
      print.error(msg)
      process.exit(exitCodes.GENERIC)
    } else if (!patching.isInFile(manifestFile, permissionString)) {
      // Insert permission to AndroidManifest
      ignite.patchInFile(manifestFile, {
        after: 'uses-permission',
        insert: permissionString
      })
    }
  }

  return addAndroidPermission
}
