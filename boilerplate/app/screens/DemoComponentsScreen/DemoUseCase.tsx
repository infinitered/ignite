import React, { ReactNode } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { colors, spacing, typography } from "../../theme"

interface DemoUseCaseProps {
  name: string
  description?: string
  layout?: "column" | "row"
  children: ReactNode
}

export function DemoUseCase(props: DemoUseCaseProps) {
  const { name, description, children, layout = "column" } = props

  return (
    <View>
      <Text style={$name}>{name}</Text>

      {description && <Text style={$description}>{description}</Text>}

      <View style={[layout === "row" && $rowLayout, $item]}>{children}</View>
    </View>
  )
}

const $description: TextStyle = {
  marginTop: spacing.medium,
}

const $item: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing.large,
  marginVertical: spacing.medium,
}

const $name: TextStyle = {
  fontFamily: typography.primary.bold,
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}

// @demo remove-file
