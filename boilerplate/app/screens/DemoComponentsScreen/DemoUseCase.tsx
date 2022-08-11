import React, { ReactNode } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"

interface DemoUseCaseProps {
  name: string
  description: string
  children: ReactNode
}

export function DemoUseCase(props: DemoUseCaseProps) {
  return (
    <View style={$container}>
      <Text preset="subheading">{props.name}</Text>
      <Text style={$description}>{props.description}</Text>
      {props.children}
    </View>
  )
}

const $container: ViewStyle = {
  marginBottom: 24,
}

const $description: TextStyle = {
  marginTop: 8,
  marginBottom: 24,
}
