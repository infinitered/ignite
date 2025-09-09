import { FC } from "react"
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

const logo = require("@assets/images/logo.png")

export default function Showroom() {
  const { themed } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Image style={themed($logo)} source={logo} resizeMode="contain" />
      <Text preset="heading" tx="demoShowroomScreen:jumpStart" style={themed($title)} />
      <Text tx="demoShowroomScreen:description" style={themed($description)} />
      <Text preset="subheading" tx="demoShowroomScreen:reactotron" style={themed($sectionTitle)} />
      <Text tx="demoShowroomScreen:reactotronDescription" style={themed($description)} />
      
      {/* TODO: Add drawer navigation and component demos in Step 4 */}
      <Text style={themed($comingSoon)}>
        Component showcase with drawer navigation coming soon...
      </Text>
    </Screen>
  )
}

const $logo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.lg,
  alignSelf: "center",
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xl,
  marginBottom: spacing.sm,
})

const $comingSoon: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.xl,
  padding: spacing.md,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 8,
  textAlign: "center",
  fontStyle: "italic",
})
