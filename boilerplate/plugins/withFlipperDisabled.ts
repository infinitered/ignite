import { ConfigPlugin, withAppBuildGradle, withMainApplication } from "expo/config-plugins"

/**
 *
 * Expo Config Plugin to disable Flipper entirely in Android
 *
 * How it works:
 *   1) Remove the dependency from app/build.gradle
 *   2) Remove ReactNativeFlipper initialization from MainApplication.kt
 */
export const withFlipperDisabled: ConfigPlugin = (config) => {
  config = withAppBuildGradleMod(config)
  config = withMainApplicationKtMod(config)
  return config
}

const FLIPPER_DEPENDENCY = 'implementation("com.facebook.react:flipper-integration")'
const FLIPPER_INITIALIZATION_REGEX =
  /^\s+if \(BuildConfig.DEBUG\) {\s+ReactNativeFlipper\.initializeFlipper.*\s+}$/gm
const FIND_FLIPPER_INITIALIZATION = 'ReactNativeFlipper.initializeFlipper'
const FIND_FLIPPER_IMPORT = 'import com.facebook.react.flipper.ReactNativeFlipper'

/**
 * Modifies the `android/app/build.gradle` file to remove the following line:
 *
 * implementation 'com.facebook.flipper:flipper:${FLIPPER_VERSION}'
 */
const withAppBuildGradleMod: ConfigPlugin = (config) =>
  withAppBuildGradle(config, (modConfig) => {
    if (modConfig.modResults.contents.includes(FLIPPER_DEPENDENCY)) {
      modConfig.modResults.contents = modConfig.modResults.contents.replace(FLIPPER_DEPENDENCY, "")
    }
    return modConfig
  })

/**
 * Modifies the `android/app/src/main/java/com/bundle/id/MainApplication.kt` file to remove the following lines:
 * if (BuildConfig.DEBUG) {
 *     ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
 * }
 */
const withMainApplicationKtMod: ConfigPlugin = (config) =>
  withMainApplication(config, (modConfig) => {
    if (modConfig.modResults.contents.includes(FIND_FLIPPER_IMPORT)) { 
      modConfig.modResults.contents = modConfig.modResults.contents.replace(
        FIND_FLIPPER_IMPORT,
        "",
      )
    }
    if (modConfig.modResults.contents.includes(FIND_FLIPPER_INITIALIZATION)) {
      modConfig.modResults.contents = modConfig.modResults.contents.replace(
        FLIPPER_INITIALIZATION_REGEX,
        "",
      )
    }

    return modConfig
  })
