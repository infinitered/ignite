// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import type { FontSource } from "expo-font"
import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from "@expo-google-fonts/space-grotesk"

export const customFontsToLoadWebOnly =
  Platform.OS === "web"
    ? {
        spaceGroteskLight,
        spaceGroteskRegular,
        spaceGroteskMedium,
        spaceGroteskSemiBold,
        spaceGroteskBold,
      }
    : ({} as Record<string, FontSource>)

const fonts = {
  spaceGrotesk: {
    // The way expo-fonts config plugin applies
    // fonts to the individual platforms, the names come out different
    // on ios and android. For web, we have to load fonts asynchronously
    // using useFonts.
    light: Platform.select({
      ios: "SpaceGrotesk-Light",
      android: "SpaceGrotesk-300Light",
      web: "spaceGroteskLight",
    }),
    normal: Platform.select({
      ios: "SpaceGrotesk-Regular",
      android: "SpaceGrotesk-400Regular",
      web: "spaceGroteskRegular",
    }),
    medium: Platform.select({
      ios: "SpaceGrotesk-Medium",
      android: "SpaceGrotesk-500Medium",
      web: "spaceGroteskMedium",
    }),
    semiBold: Platform.select({
      ios: "SpaceGrotesk-SemiBold",
      android: "SpaceGrotesk-600SemiBold",
      web: "spaceGroteskSemiBold",
    }),
    bold: Platform.select({
      ios: "SpaceGrotesk-Bold",
      android: "SpaceGrotesk-700Bold",
      web: "spaceGroteskBold",
    }),
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
