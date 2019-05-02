import { IgniteToolbox } from '../../types'
import exitCodes from '../../lib/exit-codes'

const APP_PATH = process.cwd()

export default (toolbox: IgniteToolbox) => {
  /**
   * Removes Android Permission
   *
   * @param {string} key - Permission name to be removed e.g. `ACCESS_NETWORK_STATE`
   */
  function removeAndroidPermission(key: string) {
    const { filesystem, print, ignite } = toolbox
    const permissionString = `<uses-permission android:name="android.permission.${key.toUpperCase()}" />`
    const manifestFile = `${APP_PATH}/android/app/src/main/AndroidManifest.xml`

    if (!filesystem.exists(manifestFile)) {
      const msg = `No '${manifestFile}' file found in this folder, are you sure it is a valid React Native project?`
      print.error(msg)
      process.exit(exitCodes.GENERIC)
    } else if (ignite.patching.isInFile(manifestFile, permissionString)) {
      // Remove permission from AndroidManifest
      ignite.patchInFile(manifestFile, {
        delete: permissionString,
      })
    }
  }

  return removeAndroidPermission
}
