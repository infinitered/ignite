import * as React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { spacing, typography } from "../../theme"
import { Icon } from "../Icon"
import { Text } from "../Text"

const BULLET_ITEM: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
  paddingBottom: spacing.medium,
  borderBottomWidth: 1,
  borderBottomColor: "#3A3048",
}
const BULLET_CONTAINER: ViewStyle = {
  marginEnd: spacing.medium - 1,
  marginTop: spacing.extraSmall,
}
const BULLET: ImageStyle = {
  width: 8,
  height: 8,
}
const BULLET_TEXT: TextStyle = {
  flex: 1,
  fontFamily: typography.primary.normal,
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
      <Icon icon="ladybug" containerStyle={BULLET_CONTAINER} style={BULLET} />
      <Text style={BULLET_TEXT} text={props.text} />
    </View>
  )
}
