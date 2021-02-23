import * as React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "../../theme"
import { Text, Button } from "../../components"
import { DataUserProps } from "../../models/list-demo/list-demo.props"

const CONTAINER: ViewStyle = {
  padding: spacing[2],
  flexDirection: "row",
  alignItems: "center",
}
const AVATAR: ImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
}
const INFO: ViewStyle = {
  flex: 1,
  marginLeft: spacing[3],
}
const NAME: TextStyle = {
  fontWeight: "bold",
}

export interface ItemListProps {
  item: DataUserProps
  onDeleteItem(item: DataUserProps): void
}

/**
 * Describe your component here
 */
export const ItemList = observer(function ItemList(props: ItemListProps) {
  const { item, onDeleteItem } = props

  const clickDelete = () => onDeleteItem(item)

  return (
    <View style={CONTAINER}>
      <Image style={AVATAR} source={{ uri: item?.image }} />
      <View style={INFO}>
        <Text style={NAME} text={item?.name} />
        <Text text={item?.gender} />
      </View>
      <Button onPress={clickDelete} preset="link">
        <Text tx={"listScreen.delete"} />
      </Button>
    </View>
  )
})
