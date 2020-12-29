import * as React from "react"
import { View, ViewStyle, ImageStyle, TextStyle } from "react-native"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing, typography } from "../../theme"

const BULLET_ITEM: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing[4],
  paddingBottom: spacing[4],
  borderBottomWidth: 1,
  borderBottomColor: "#3A3048",
}
const BULLET_CONTAINER: ViewStyle = {
  marginRight: spacing[4] - 1,
  marginTop: spacing[2],
}
const BULLET: ImageStyle = {
  width: 8,
  height: 8,
}
const BULLET_TEXT: TextStyle = {
  flex: 1,
  fontFamily: typography.primary,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}

export interface BulletItemProps {
  text: string
}

export function BulletItem(props: BulletItemProps) {
  return (
    <View style={BULLET_ITEM}>
      <Icon icon="bullet" containerStyle={BULLET_CONTAINER} style={BULLET} />
      <Text style={BULLET_TEXT} text={props.text} />
    </View>
  )
}
