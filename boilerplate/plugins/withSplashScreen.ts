import {
  ConfigPlugin,
  withStringsXml,
  AndroidConfig,
  withAndroidStyles,
} from "expo/config-plugins"

/**
 * 
 * Expo Config Plugin to help address the double splash screen issue with `expo-splash-screen`
 * See more information about this issue here: https://github.com/expo/expo/issues/16084
 * 
 * How it works: 
 *   1) Replace the default splash screen with a transparent screen
 *   2) Set the splash screen status bar to translucent
 */
export const withSplashScreen: ConfigPlugin = (config) => {
  config = withAndroidSplashScreen(config)
  return config
}

/**
 * Android implementation of the config plugin - the only platform needed for this plugin.
 * However, it is good practice to break up your config plugins from the exported
 * function into parts by platform. For example, if it was needed, we would also
 * add `withIosSplashScreen` for the iOS implementation.
 */
const withAndroidSplashScreen: ConfigPlugin = (config) => {
  config = withCustomStylesXml(config)
  config = withCustomStringsXml(config)
  return config
}

/**
 * Modifies the `android/app/src/main/res/values/strings.xml` file to add the following string:
 * 
 * <string name="expo_splash_screen_status_bar_translucent" translatable="false">true</string>
 */
const withCustomStringsXml: ConfigPlugin = (config) =>
  withStringsXml(config, (modConfig) => {
    modConfig.modResults = AndroidConfig.Strings.setStringItem(
      [
        {
          _: "true",
          $: {
            name: "expo_splash_screen_status_bar_translucent",
            translatable: "false",
          },
        },
      ],
      modConfig.modResults,
    )
    return modConfig
  })

/**
 * Modifies the `android/app/src/main/res/values/styles.xml` file to append the
 * the following to the Theme.App.SplashScreen style:
 * 
 * <item name="android:windowIsTranslucent">true</item>
 */
const withCustomStylesXml: ConfigPlugin = (config) =>
  withAndroidStyles(config, async (modConfig) => {
    modConfig.modResults = AndroidConfig.Styles.assignStylesValue(modConfig.modResults, {
      add: true,
      name: "android:windowIsTranslucent",
      value: "true",
      parent: {
        name: "Theme.App.SplashScreen",
        parent: "AppTheme",
      },
    })
    return modConfig
  })
