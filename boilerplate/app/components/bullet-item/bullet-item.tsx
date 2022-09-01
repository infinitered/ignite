import * as React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { spacing, typography } from "../../theme"
import { Icon } from "../Icon"
import { Text } from "../Text"
export interface BulletItemProps {
  text: string
}

export function BulletItem(props: BulletItemProps) {
  return (
    <View style={$bulletItem}>
      <Icon icon="ladybug" containerStyle={$bulletContainer} style={$bullet} />
      <Text style={$bulletText} text={props.text} />
    </View>
  )
}

const $bulletItem: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.medium,
  paddingBottom: spacing.medium,
  borderBottomWidth: 1,
  borderBottomColor: "#3A3048",
}
const $bulletContainer: ViewStyle = {
  marginEnd: spacing.medium - 1,
  marginTop: spacing.extraSmall,
}
const $bullet: ImageStyle = {
  width: 8,
  height: 8,
}
const $bulletText: TextStyle = {
  flex: 1,
  fontFamily: typography.primary.normal,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
