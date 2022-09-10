import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"

interface DemoDividerProps {
  type?: "vertical" | "horizontal"
  size?: number
  style?: StyleProp<ViewStyle>
}

export function DemoDivider(props: DemoDividerProps) {
  const { type = "horizontal", size = 10, style: $styleOverride } = props

  return (
    <View
      style={[
        $divider,
        type === "horizontal" && { height: size },
        type === "vertical" && { width: size },
        $styleOverride,
      ]}
    />
  )
}

const $divider: ViewStyle = {
  flexGrow: 0,
  flexShrink: 0,
}

// @demo remove-file
