import { DarkTheme, DefaultTheme, useTheme as useNavTheme } from "@react-navigation/native"
import { Colors, Theme, ThemedStyleFn, ThemeContexts } from "app/theme"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { Alert, useColorScheme } from "react-native"
import { colors as lightColors } from "app/theme/colors"
import { colors as darkColors } from "app/theme/colorsDark"
import { spacing } from "app/theme/spacing"
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

  // This is where we build our theme object
  const themeVariant: Theme = useMemo(
    () => ({
      colors: themeColorVariant,
      spacing,
      typography,
      timing,
    }),
    [themeColorVariant],
  )

  const themed = useCallback(
    <T>(styleFunction: ThemedStyleFn<T> | (ThemedStyleFn<T> | false)[]) => {
      return Array.isArray(styleFunction)
        ? styleFunction.map((f: ThemedStyleFn<T> | false) => f && f(themeVariant))
        : styleFunction(themeVariant)
    },
    [themeVariant],
  )

  return {
    colors: themeColorVariant,
    navTheme,
    setThemeContextOverride,
    spacing,
    theme: themeVariant,
    themeContext,
    themed,
    timing,
    typography,
  }
}
