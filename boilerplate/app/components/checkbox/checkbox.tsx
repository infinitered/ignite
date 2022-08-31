import * as React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../Text"
import { colors, spacing } from "../../theme"
import { CheckboxProps } from "./checkbox.props"

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1

  const rootStyle = [$root, props.style]
  const outlineStyle = [$outline, props.outlineStyle]
  const fillStyle = [$fill, props.fillStyle]
  const labelStyle = [$label, props.labelStyle]

  const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      <View style={outlineStyle}>{props.value && <View style={fillStyle} />}</View>
      <Text text={props.text} tx={props.tx} numberOfLines={numberOfLines} style={labelStyle} />
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  flexDirection: "row",
  paddingVertical: spacing.tiny,
  alignSelf: "flex-start",
}

const $dimensions = { width: 16, height: 16 }

const $outline: ViewStyle = {
  ...$dimensions,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 1,
}

const $fill: ViewStyle = {
  width: $dimensions.width - spacing.tiny,
  height: $dimensions.height - spacing.tiny,
  backgroundColor: colors.tint,
}

const $label: TextStyle = { paddingStart: spacing.extraSmall, color: colors.palette.neutral900 }
