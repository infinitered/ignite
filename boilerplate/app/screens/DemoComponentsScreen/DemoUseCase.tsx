import React, { ReactNode } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"

interface DemoUseCaseProps {
  name: string
  description?: string
  layout?: "column" | "row"
  children: ReactNode
}

export function DemoUseCase(props: DemoUseCaseProps) {
  const { name, description, children, layout = "column" } = props

  return (
    <View style={$container}>
      <Text preset="subheading">{name}</Text>

      {description && <Text style={$description}>{description}</Text>}

      <View style={layout === "row" && $rowLayout}>{children}</View>
    </View>
  )
}

const $container: ViewStyle = {
  marginBottom: 24,
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}

const $description: TextStyle = {
  marginTop: 8,
  marginBottom: 24,
}
