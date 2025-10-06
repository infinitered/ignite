import { useEffect, useState } from "react"
import { Platform } from "react-native"
import { Slot, SplashScreen } from "expo-router"
import { useFonts } from "@expo-google-fonts/space-grotesk"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { initI18n } from "@/i18n"
import { ThemeProvider } from "@/theme/context"
import { customFontsToLoadWebOnly } from "@/theme/typography"
import { loadDateFnsLocale } from "@/utils/formatDate"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  // We load fonts dynamically for web only, the rest are handled by
  // the expo-font config plugin in `app.json`. If not using web, 
  // you can delete this permissive check along with associated
  // code in `typography'.
  const [fontsLoadedWebOnly, fontErrorWebOnly] = useFonts(customFontsToLoadWebOnly)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = Platform.OS === "web" ? fontsLoadedWebOnly && isI18nInitialized : isI18nInitialized

  useEffect(() => {
    if (fontErrorWebOnly && Platform.OS === "web") throw fontErrorWebOnly
  }, [fontErrorWebOnly])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <KeyboardProvider>
          <Slot />
        </KeyboardProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
