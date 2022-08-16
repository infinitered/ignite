import React, { ReactNode } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { colors, typography } from "../../theme"

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
  marginTop: 16,
}

const $item: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: 24,
  marginVertical: 18,
}

const $name: TextStyle = {
  fontFamily: typography.primary.bold,
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}
