import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { Demo } from "./DemoComponentsScreen"

export function DemoItem({ name, description }: Demo) {
  return (
    <View style={$demoItemContainer}>
      <Text preset="heading" style={$title}>
        {name}
      </Text>
      <Text style={$description}>{description}</Text>
    </View>
  )
}

const $demoItemContainer: ViewStyle = {
  paddingHorizontal: 24,
}

const $title: TextStyle = {
  marginTop: 32,
  paddingTop: 24,
  paddingBottom: 8,
  fontSize: 24,
}

const $description: TextStyle = {
  paddingTop: 8,
  paddingBottom: 16,
}
