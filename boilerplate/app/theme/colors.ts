import { colors as colorsLight } from "./colorsLight"
import { colors as colorsDark } from "./colorsDark"
import { Spacing } from "./spacing"
import { Timing } from "./timing"
import { Typography } from "./typography"
import { StyleProp } from "react-native"

export interface DefaultThemeColors {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette: {
    neutral100: string
    neutral200: string
    neutral300: string
    neutral400: string
    neutral500: string
    neutral600: string
    neutral700: string
    neutral800: string
    neutral900: string

    primary100: string
    primary200: string
    primary300: string
    primary400: string
    primary500: string
    primary600: string

    secondary100: string
    secondary200: string
    secondary300: string
    secondary400: string
    secondary500: string

    accent100: string
    accent200: string
    accent300: string
    accent400: string
    accent500: string

    angry100: string
    angry500: string

    overlay20: string
    overlay50: string
  }
  /**
   * A helper for making something see-thru.
   */
  transparent: string
  /**
   * The default text color in many components.
   */
  text: string
  /**
   * Secondary text information.
   */
  textDim: string
  /**
   * The default color of the screen background.
   */
  background: string
  /**
   * The default border color.
   */
  border: string
  /**
   * The main tinting color.
   */
  tint: string
  /**
   * The inactive tinting color.
   */
  tintInactive: string
  /**
   * A subtle color used for lines.
   */
  separator: string
  /**
   * Error messages.
   */
  error: string
  /**
   * Error Background.
   */
  errorBackground: string
}

// This supports "light" and "dark" themes by default. If undefined, it'll use the system theme
export type Themes = "light" | "dark" | undefined

export interface Theme {
  colors: DefaultThemeColors
  spacing: Spacing
  typography: Typography
  timing: Timing
}

export type ThemedStyle<T> = (colors: DefaultThemeColors) => T
export type ThemedStyleFn<T> = (colors: DefaultThemeColors) => StyleProp<T>
export interface ThemeColorVariants {
  light: DefaultThemeColors
  dark: DefaultThemeColors
}

export const colors: ThemeColorVariants = {
  light: colorsLight,
  dark: colorsDark,
}
