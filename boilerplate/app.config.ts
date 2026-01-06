import { ExpoConfig, ConfigContext } from "@expo/config"
import fs from "fs"
import path from "path"

/**
 * Automatically discover all fonts under `assets/fonts`
 * so we never have to hardcode them.
 */
function getFontPathsFromAssetsFolder(): string[] {
  const fontsDir = path.resolve(__dirname, "assets/fonts")
  if (!fs.existsSync(fontsDir)) {
    console.warn("FONT_WARNING: No custom fonts detected.")
    return []
  }

  return fs
    .readdirSync(fontsDir)
    .map((file) => `./assets/fonts/${file}`)
}

/**
 * Use tsx/cjs here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript.
 * 
 * See https://docs.expo.dev/config-plugins/plugins/#add-typescript-support-and-convert-to-dynamic-app-config
 */
import "tsx/cjs"

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []
  const fontPaths = getFontPathsFromAssetsFolder()

  return {
    ...config,
    ios: {
      ...config.ios,
      // This privacyManifests is to get you started.
      // See Expo's guide on apple privacy manifests here:
      // https://docs.expo.dev/guides/apple-privacy/
      // You may need to add more privacy manifests depending on your app's usage of APIs.
      // More details and a list of "required reason" APIs can be found in the Apple Developer Documentation.
      // https://developer.apple.com/documentation/bundleresources/privacy-manifest-files
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"], // CA92.1 = "Access info from same app, per documentation"
          },
        ],
      },
    },
    plugins: [
      ...existingPlugins,
      [
        "expo-font",
        {
          fonts: fontPaths,
        },
      ],
    ],
  }
}
