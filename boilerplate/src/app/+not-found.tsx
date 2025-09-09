import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { router, Stack } from "expo-router"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

const sadFace = require("@assets/images/sad-face.png")

export default function NotFoundScreen() {
  const { themed } = useAppTheme()

  const goBack = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace("/")
    }
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Page Not Found",
          headerShown: true 
        }} 
      />
      <Screen preset="fixed" contentContainerStyle={[$styles.container, themed($container)]}>
        <Image source={sadFace} style={themed($image)} />
        <Text preset="heading" text="404 - Page Not Found" style={themed($title)} />
        <Text 
          text="Sorry, we couldn't find the page you're looking for." 
          style={themed($description)} 
        />
        <Button
          preset="reversed"
          text="Go Back"
          onPress={goBack}
          style={themed($button)}
        />
      </Screen>
    </>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  alignItems: "center",
  justifyContent: "center",
})

const $image: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 200,
  width: 200,
  marginBottom: spacing.xl,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  textAlign: "center",
})

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
  textAlign: "center",
  paddingHorizontal: spacing.lg,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})
