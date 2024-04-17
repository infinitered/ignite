import React from "react"
import { Image, ImageStyle, Platform, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import { colors } from "../../theme"
import { iconRegistry } from "../Icon"
import { isRTL } from "app/i18n"
import { $inputOuterBase, BaseToggleInputProps, Toggle, ToggleProps } from "./Toggle"

export interface SwitchToggleProps extends ToggleProps<SwitchInputProps> {
  /**
   * Switch-only prop that adds a text/icon label for on/off states.
   */
  switchAccessibilityMode?: "text" | "icon"
  /**
   * Optional style prop that affects the knob View.
   * Note: `width` and `height` rules should be points (numbers), not percentages.
   */
  inputDetailStyle?: Omit<ViewStyle, "width" | "height"> & { width?: number; height?: number }
}

interface SwitchInputProps extends Omit<BaseToggleInputProps<SwitchToggleProps>, "ToggleInput"> {
  switchAccessibilityMode?: SwitchToggleProps["switchAccessibilityMode"]
}

export function Switch(props: SwitchToggleProps) {
  return <Toggle {...props} ToggleInput={SwitchInput} />
}

/**
 * @param {ToggleInputProps} props - The props for the `Switch` component.
 * @returns {JSX.Element} The rendered `Switch` component.
 */
function SwitchInput(props: SwitchInputProps) {
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
  } = props

  const knobSizeFallback = 2

  const knobWidth = [$detailStyleOverride?.width, $switchDetail?.width, knobSizeFallback].find(
    (v) => typeof v === "number",
  )

  const knobHeight = [$detailStyleOverride?.height, $switchDetail?.height, knobSizeFallback].find(
    (v) => typeof v === "number",
  )

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.errorBackground,
    colors.palette.neutral300,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === "error" && colors.errorBackground,
    colors.palette.secondary500,
  ].filter(Boolean)[0]

  const knobBackgroundColor = (function () {
    if (on) {
      return [
        $detailStyleOverride?.backgroundColor,
        status === "error" && colors.error,
        disabled && colors.palette.neutral600,
        colors.palette.neutral100,
      ].filter(Boolean)[0]
    } else {
      return [
        $innerStyleOverride?.backgroundColor,
        disabled && colors.palette.neutral600,
        status === "error" && colors.error,
        colors.palette.neutral200,
      ].filter(Boolean)[0]
    }
  })()

  const $animatedSwitchKnob = useAnimatedStyle(() => {
    const offsetLeft = ($innerStyleOverride?.paddingStart ||
      $innerStyleOverride?.paddingLeft ||
      $switchInner?.paddingStart ||
      $switchInner?.paddingLeft ||
      0) as number

    const offsetRight = ($innerStyleOverride?.paddingEnd ||
      $innerStyleOverride?.paddingRight ||
      $switchInner?.paddingEnd ||
      $switchInner?.paddingRight ||
      0) as number

    // For RTL support:
    // - web flip input range to [1,0]
    // - outputRange doesn't want rtlAdjustment
    const rtlAdjustment = isRTL ? -1 : 1
    const inputRange = Platform.OS === "web" ? (isRTL ? [1, 0] : [0, 1]) : [0, 1]
    const outputRange =
      Platform.OS === "web"
        ? [offsetLeft, +(knobWidth || 0) + offsetRight]
        : [rtlAdjustment * offsetLeft, rtlAdjustment * (+(knobWidth || 0) + offsetRight)]

    const translateX = interpolate(on ? 1 : 0, inputRange, outputRange, Extrapolation.CLAMP)

    return { transform: [{ translateX: withTiming(translateX) }] }
  }, [on, knobWidth])

  return (
    <View style={[$inputOuter, { backgroundColor: offBackgroundColor }, $outerStyleOverride]}>
      <Animated.View
        style={[
          $switchInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      />

      <SwitchAccessibilityLabel {...props} role="on" />
      <SwitchAccessibilityLabel {...props} role="off" />

      <Animated.View
        style={[
          $switchDetail,
          $detailStyleOverride,
          $animatedSwitchKnob,
          { width: knobWidth, height: knobHeight },
          { backgroundColor: knobBackgroundColor },
        ]}
      />
    </View>
  )
}

/**
 * @param {ToggleInputProps & { role: "on" | "off" }} props - The props for the `SwitchAccessibilityLabel` component.
 * @returns {JSX.Element} The rendered `SwitchAccessibilityLabel` component.
 */
function SwitchAccessibilityLabel(props: SwitchInputProps & { role: "on" | "off" }) {
  const { on, disabled, status, switchAccessibilityMode, role, innerStyle, detailStyle } = props

  if (!switchAccessibilityMode) return null

  const shouldLabelBeVisible = (on && role === "on") || (!on && role === "off")

  const $switchAccessibilityStyle: StyleProp<ViewStyle> = [
    $switchAccessibility,
    role === "off" && { end: "5%" },
    role === "on" && { left: "5%" },
  ]

  const color = (function () {
    if (disabled) return colors.palette.neutral600
    if (status === "error") return colors.error
    if (!on) return innerStyle?.backgroundColor || colors.palette.secondary500
    return detailStyle?.backgroundColor || colors.palette.neutral100
  })()

  return (
    <View style={$switchAccessibilityStyle}>
      {switchAccessibilityMode === "text" && shouldLabelBeVisible && (
        <View
          style={[
            role === "on" && $switchAccessibilityLine,
            role === "on" && { backgroundColor: color },
            role === "off" && $switchAccessibilityCircle,
            role === "off" && { borderColor: color },
          ]}
        />
      )}

      {switchAccessibilityMode === "icon" && shouldLabelBeVisible && (
        <Image
          style={[$switchAccessibilityIcon, { tintColor: color }]}
          source={role === "off" ? iconRegistry.hidden : iconRegistry.view}
        />
      )}
    </View>
  )
}

const $inputOuter: StyleProp<ViewStyle> = [
  $inputOuterBase,
  { height: 32, width: 56, borderRadius: 16, borderWidth: 0 },
]

const $switchInner: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  borderColor: colors.transparent,
  overflow: "hidden",
  position: "absolute",
  paddingStart: 4,
  paddingEnd: 4,
}

const $switchDetail: SwitchToggleProps["inputDetailStyle"] = {
  borderRadius: 12,
  position: "absolute",
  width: 24,
  height: 24,
}

const $switchAccessibility: TextStyle = {
  width: "40%",
  justifyContent: "center",
  alignItems: "center",
}

const $switchAccessibilityIcon: ImageStyle = {
  width: 14,
  height: 14,
  resizeMode: "contain",
}

const $switchAccessibilityLine: ViewStyle = {
  width: 2,
  height: 12,
}

const $switchAccessibilityCircle: ViewStyle = {
  borderWidth: 2,
  width: 12,
  height: 12,
  borderRadius: 6,
}
