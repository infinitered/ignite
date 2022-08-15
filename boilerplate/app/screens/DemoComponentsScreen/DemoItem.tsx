import React, { Fragment } from "react"
import { ListRenderItemInfo, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { Demo } from "./DemoComponentsScreen"

export function DemoItem(props: ListRenderItemInfo<Demo>) {
  const { item } = props

  return (
    <View style={$demoItemContainer}>
      <Text preset="heading" style={$title}>
        {item.name}
      </Text>
      <Text style={$description}>{item.description}</Text>

      {item.useCases.map((i) => (
        <Fragment key={i.props.name}>{i}</Fragment>
      ))}
    </View>
  )
}

const $demoItemContainer: ViewStyle = {
  paddingHorizontal: 24,
}

const $title: TextStyle = {
  marginVertical: 8,
}

const $description: TextStyle = {
  marginBottom: 24,
}
