import React, { useState, useEffect } from "react"
import { StyleProp, View, ViewStyle, Animated } from "react-native"
import { colors } from "../../theme"
import { $inputOuterBase, BaseToggleInputProps, ToggleProps, Toggle } from "./Toggle"

export interface RadioToggleProps extends Omit<ToggleProps<RadioInputProps>, "ToggleInput"> {
  /**
   * Optional style prop that affects the dot View.
   */
  inputDetailStyle?: ViewStyle
}

interface RadioInputProps extends BaseToggleInputProps<RadioToggleProps> {}

/**
 * @param {RadioToggleProps} props - The props for the `Radio` component.
 * @returns {JSX.Element} The rendered `Radio` component.
 */
export function Radio(props: RadioToggleProps) {
  return <Toggle accessibilityRole="radio" {...props} ToggleInput={RadioInput} />
}

function RadioInput(props: RadioInputProps) {
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
  } = props

  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [on])

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.errorBackground,
    colors.palette.neutral200,
  ].filter(Boolean)[0]

  const outerBorderColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.error,
    !on && colors.palette.neutral800,
    colors.palette.secondary500,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === "error" && colors.errorBackground,
    colors.palette.neutral100,
  ].filter(Boolean)[0]

  const dotBackgroundColor = [
    disabled && colors.palette.neutral600,
    status === "error" && colors.error,
    colors.palette.secondary500,
  ].filter(Boolean)[0]

  return (
    <View
      style={[
        $inputOuter,
        { backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
        $outerStyleOverride,
      ]}
    >
      <Animated.View
        style={[
          $radioInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          { opacity },
        ]}
      >
        <View
          style={[$radioDetail, { backgroundColor: dotBackgroundColor }, $detailStyleOverride]}
        />
      </Animated.View>
    </View>
  )
}

const $radioInner: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}

const $radioDetail: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
}

const $inputOuter: StyleProp<ViewStyle> = [$inputOuterBase, { borderRadius: 12 }]
