import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { Alert, StyleProp, useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, useTheme as useNavTheme } from "@react-navigation/native"
import type {
  Colors,
  Theme,
  ThemeContexts,
  ThemedStyle,
  Spacing,
  ThemedStyleArray,
} from "app/theme"
import { colors as lightColors } from "app/theme/colors"
import { colors as darkColors } from "app/theme/colorsDark"
import { spacing as spacingLight } from "app/theme/spacing"
import { spacing as spacingDark } from "app/theme/spacingDark"
import { typography } from "app/theme/typography"
import { timing } from "app/theme/timing"

type ThemeContextType = {
  theme: ThemeContexts
  setThemeContextOverride: (newTheme: ThemeContexts) => void
}

// create a React context and provider for the current theme
export const ThemeContext = createContext<ThemeContextType>({
  theme: undefined, // default to the system theme
  setThemeContextOverride: (_newTheme: ThemeContexts) => {
    Alert.alert("setThemeContextOverride not implemented")
  },
})

export const useThemeProvider = (initialTheme: ThemeContexts = undefined) => {
  const colorScheme = useColorScheme()
  const [overrideTheme, setTheme] = useState<ThemeContexts>(initialTheme)

  const setThemeContextOverride = useCallback((newTheme: ThemeContexts) => {
    setTheme(newTheme)
  }, [])

  console.log("useThemeProvider", { colorScheme, initialTheme, overrideTheme })

  const themeScheme = overrideTheme || colorScheme || "light"
  const navigationTheme = themeScheme === "dark" ? DarkTheme : DefaultTheme

  return {
    theme: themeScheme,
    navigationTheme,
    setThemeContextOverride,
    ThemeProvider: ThemeContext.Provider,
  }
}

export const useAppTheme = () => {
  const navTheme = useNavTheme()
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  const { theme: overrideTheme, setThemeContextOverride } = context

  const themeContext: ThemeContexts = useMemo(
    () => overrideTheme || (navTheme.dark ? "dark" : "light"),
    [overrideTheme, navTheme],
  )
  const themeColorVariant: Colors = useMemo(
    () => (themeContext === "dark" ? darkColors : lightColors),
    [themeContext],
  )

  const themeSpacingVariant: Spacing = useMemo(
    () => (themeContext === "dark" ? spacingDark : spacingLight),
    [themeContext],
  )

  // This is where we build our theme object
  const themeVariant: Theme = useMemo(
    () => ({
      colors: themeColorVariant,
      spacing: themeSpacingVariant,
      typography,
      timing,
    }),
    [themeColorVariant, themeSpacingVariant],
  )

  const themed = useCallback(
    <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3) as (ThemedStyle<T> | StyleProp<T>)[]
      const stylesArray = flatStyles.map((f) => {
        if (typeof f === "function") {
          return (f as ThemedStyle<T>)(themeVariant)
        } else {
          return f
        }
      })

      // Flatten the array of styles into a single object
      return Object.assign({}, ...stylesArray) as T
    },
    [themeVariant],
  )

  return {
    navTheme,
    setThemeContextOverride,
    theme: themeVariant,
    themeContext,
    themed,
  }
}
