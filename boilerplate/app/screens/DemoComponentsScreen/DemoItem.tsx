import React, { Fragment } from "react"
import { ListRenderItemInfo, View } from "react-native"
import { Text } from "../../components"
import { Demo } from "./DemoComponentsScreen"

export function DemoItem(props: ListRenderItemInfo<Demo>) {
  const { item } = props

  return (
    <View>
      <Text preset="heading">{item.name}</Text>

      {item.useCases.map((i) => (
        <Fragment key={i.props.name}>{i}</Fragment>
      ))}
    </View>
  )
}
