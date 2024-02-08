/* eslint-disable  react-native/no-inline-styles */
import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { colors } from "../../theme"

interface DemoDividerProps {
  type?: "vertical" | "horizontal"
  size?: number
  style?: StyleProp<ViewStyle>
  line?: boolean
}

/**
 * @param {DemoDividerProps} props - The props for the `DemoDivider` component.
 * @returns {JSX.Element} The rendered `DemoDivider` component.
 */
export function DemoDivider(props: DemoDividerProps) {
  const { type = "horizontal", size = 10, line = false, style: $styleOverride } = props

  return (
    <View
      style={[
        $divider,
        type === "horizontal" && { height: size },
        type === "vertical" && { width: size },
        $styleOverride,
      ]}
    >
      {line && (
        <View
          style={[
            $line,
            type === "horizontal" && {
              width: 150,
              height: 1,
              marginStart: -75,
              marginTop: -1,
            },
            type === "vertical" && {
              height: 50,
              width: 1,
              marginTop: -25,
              marginStart: -1,
            },
          ]}
        />
      )}
    </View>
  )
}

const $divider: ViewStyle = {
  flexGrow: 0,
  flexShrink: 0,
}

const $line: ViewStyle = {
  backgroundColor: colors.border,
  position: "absolute",
  left: "50%",
  top: "50%",
}

// @demo remove-file
