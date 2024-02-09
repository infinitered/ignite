import { DarkTheme, DefaultTheme, useTheme as useNavTheme } from "@react-navigation/native"
import { spacing, timing, typography } from "app/theme"
import { DefaultThemeColors, Theme, ThemedStyleFn, Themes } from "app/theme/colors"
import { createContext, useCallback, useContext, useState } from "react"
import { Alert, StyleProp, useColorScheme } from "react-native"
import { colors as lightColors } from "app/theme/colorsLight"
import { colors as darkColors } from "app/theme/colorsDark"

type ThemeContextType = {
  theme: Themes
  setThemeOverride: (newTheme: Themes) => void
}

// create a React context and provider for the current theme
export const ThemeContext = createContext<ThemeContextType>({
  theme: undefined, // default to the system theme
  setThemeOverride: (newTheme: Themes) => {
    Alert.alert("setThemeOverride not implemented")
  },
})

export const useThemeProvider = (initialTheme: Themes = undefined) => {
  const colorScheme = useColorScheme()
  const [overridetheme, setTheme] = useState<Themes>(initialTheme)

  const setThemeOverride = useCallback((newTheme: Themes) => {
    setTheme(newTheme)
  }, [])

  console.log("useThemeProvider", { colorScheme, initialTheme, overridetheme })

  const theme = overridetheme || colorScheme || "light"
  const navigationTheme = theme === "dark" ? DarkTheme : DefaultTheme

  return { theme, navigationTheme, setThemeOverride, ThemeProvider: ThemeContext.Provider }
}

export const useAppTheme = () => {
  const navTheme = useNavTheme()
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  const { theme: overridetheme, setThemeOverride } = context

  const theme: Themes = overridetheme || (navTheme.dark ? "dark" : "light")
  const themeColorVariant: DefaultThemeColors = theme === "dark" ? darkColors : lightColors

  const themed = useCallback(
    <T>(styleFunction: ThemedStyleFn<T> | (ThemedStyleFn<T> | false)[]) => {
      return Array.isArray(styleFunction)
        ? styleFunction.map((f: ThemedStyleFn<T> | false) => f && f(themeColorVariant))
        : styleFunction(themeColorVariant)
    },
    [themeColorVariant],
  )

  return { colors: themeColorVariant, theme, themed, navTheme, setThemeOverride }
}
