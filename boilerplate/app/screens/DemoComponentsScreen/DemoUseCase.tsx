import React, { ReactNode } from "react"
import { View } from "react-native"
import { Text } from "../../components"

interface DemoUseCaseProps {
  name: string
  description: string
  children: ReactNode
}

export function DemoUseCase(props: DemoUseCaseProps) {
  return (
    <View>
      <Text preset="subheading">{props.name}</Text>
      <Text>{props.description}</Text>
      {props.children}
    </View>
  )
}
