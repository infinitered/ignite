import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text } from "../../components"
import { ThemedStyle, spacing } from "../../theme"
import { useAppTheme } from "app/utils/useAppTheme"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  const { themed } = useAppTheme()
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Icon icon="ladybug" size={64} />
        <Text style={themed($heading)} preset="subheading" tx="errorScreen.title" />
        <Text tx="errorScreen.friendlySubtitle" />
      </View>

      <ScrollView
        style={themed($errorSection)}
        contentContainerStyle={$errorSectionContentContainer}
      >
        <Text style={themed($errorContent)} weight="bold" text={`${props.error}`.trim()} />
        <Text
          selectable
          style={themed($errorBacktrace)}
          text={`${props.errorInfo?.componentStack ?? ""}`.trim()}
        />
      </ScrollView>

      <Button
        preset="reversed"
        style={themed($resetButton)}
        onPress={props.onReset}
        tx="errorScreen.reset"
      />
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $heading: ThemedStyle<TextStyle> = (colors) => ({
  color: colors.error,
  marginBottom: spacing.md,
})

const $errorSection: ThemedStyle<ViewStyle> = (colors) => ({
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.md,
  borderRadius: 6,
})

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.md,
}

const $errorContent: ThemedStyle<TextStyle> = (colors) => ({
  color: colors.error,
})

const $errorBacktrace: ThemedStyle<TextStyle> = (colors) => ({
  marginTop: spacing.md,
  color: colors.textDim,
})

const $resetButton: ThemedStyle<ViewStyle> = (colors) => ({
  backgroundColor: colors.error,
  paddingHorizontal: spacing.xxl,
})
