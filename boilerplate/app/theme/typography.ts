// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import { FontSource, useFonts } from "expo-font"

/**
 * The naming here is important. Most font files come with
 * a name like `SpaceGrotesk_300Light`, but iOS uses the font PostScript
 * name (in this case `SpaceGrotesk-Light`). To keep the imports the
 * same on both platforms use the PostScript name.
 *
 * For more info: https://docs.expo.dev/develop/user-interface/fonts/#how-to-determine-which-font-family-name-to-use
 */
export const customFontsToLoad: Record<string, FontSource> =
  Platform.OS === "web"
    ? {
        "SpaceGrotesk-Light": require("../../assets/fonts/SpaceGrotesk-Light.ttf"),
        "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-Medium": require("../../assets/fonts/SpaceGrotesk-Medium.ttf"),
        "SpaceGrotesk-SemiBold": require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf"),
      }
    : {}

/**
 * On iOS and Android, the fonts are embedded as part of the app binary
 * using the expo config plugin in `app.config.ts`. See the project
 * [`app.config.ts`](../../app.config.ts) for the expo-fonts configuration. The assets
 * are added via the `app/assets/fonts` folder. This config plugin
 * does NOT work for web, so we have to dynamically load the fonts via this hook.
 *
 * For more info: https://docs.expo.dev/versions/latest/sdk/font/
 */
export const useCustomFonts = (): [boolean, Error | null] => {
  const [areFontsLoaded, fontError] = useFonts(customFontsToLoad)
  if (Platform.OS === "web") {
    return [areFontsLoaded, fontError]
  }

  // On native, fonts are precompiled and ready
  return [true, null]
}

const fonts = {
  spaceGrotesk: {
    light: "SpaceGrotesk-Light",
    normal: "SpaceGrotesk-Regular",
    medium: "SpaceGrotesk-Medium",
    semiBold: "SpaceGrotesk-SemiBold",
    bold: "SpaceGrotesk-Bold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.spaceGrotesk,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
