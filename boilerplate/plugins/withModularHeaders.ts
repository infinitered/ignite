import { withDangerousMod, ConfigPlugin } from "@expo/config-plugins"
import fs from "fs"
import path from "path"

/**
 * react-native-mmkv v4 is a Nitro Module now, which means we need to install react-native-nitro-modules.
 * But react-native-nitro-modules causes an error in `pod install` unless you use `use_modular_headers!` in the Podfile.
 *
 * We can't use the `useFrameworks: static` build property, because that seems to break when using pre-built React Native.
 *
 * So this plugin adds `use_modular_headers!` to the Podfile, which fixes the issue without breaking pre-built React Native.
 * 
 * See: https://github.com/mrousavy/react-native-mmkv/issues/861#issuecomment-3235206778
 *
 * @param config
 * @returns
 */
export const withModularHeaders: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, "Podfile")

      if (!fs.existsSync(podfilePath)) {
        throw new Error(`Podfile not found at ${podfilePath}`)
      }

      let podfileContent = fs.readFileSync(podfilePath, "utf8")

      // Check if use_modular_headers! is already present
      if (podfileContent.includes("use_modular_headers!")) {
        console.log("use_modular_headers! already present in Podfile")
        return config
      }

      // Find the first target block and add use_modular_headers! after it
      const targetPattern = /(target\s+['"]([^'"]+)['"]\s+do\s*\n)/
      if (targetPattern.test(podfileContent)) {
        // Only replace the first occurrence
        podfileContent = podfileContent.replace(targetPattern, "$1  use_modular_headers!\n\n")

        fs.writeFileSync(podfilePath, podfileContent)
        console.log("Successfully added use_modular_headers! to Podfile")
      } else {
        console.warn("Could not find any target block in Podfile")
      }

      return config
    },
  ])
}
