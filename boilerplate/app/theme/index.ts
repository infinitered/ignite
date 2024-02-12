import type { StyleProp } from "react-native"
import { colors as colorsLight } from "./colors"
import { colors as colorsDark } from "./colorsDark"
import type { Spacing } from "./spacing"
import type { Timing } from "./timing"
import type { Typography } from "./typography"

// This supports "light" and "dark" themes by default. If undefined, it'll use the system theme
export type ThemeContexts = "light" | "dark" | undefined
export type Colors = typeof colorsLight | typeof colorsDark

export interface Theme {
  colors: Colors
  spacing: Spacing
  typography: Typography
  timing: Timing
}

export type ThemedStyle<T> = (theme: Theme) => T
export type ThemedStyleFn<T> = (theme: Theme) => StyleProp<T>

export interface ThemeColorVariants {
  light: Colors
  dark: Colors
}
export const colors: ThemeColorVariants = {
  light: colorsLight,
  dark: colorsDark,
}

export { colorsLight, colorsDark }

export { customFontsToLoad } from "./typography"
