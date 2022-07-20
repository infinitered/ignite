import React, { ComponentType } from "react"
import { Pressable, PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native"
import { TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"
import { Text } from "./Text"

type Presets = keyof typeof $buttonPresetStyles

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<{ style: StyleProp<{}> }>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<{ style: StyleProp<{}> }>
}

export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    ...rest
  } = props

  // compose the styles
  const $presetViewStyle = $buttonPresetStyles[preset] || $buttonPresetStyles.default
  const $viewStyle = [$presetViewStyle, $viewStyleOverride]
  const $presetTextStyle = $textPresetStyles[preset] || $textPresetStyles.default
  const $textStyle = [$presetTextStyle, $textStyleOverride]

  return (
    <Pressable style={$viewStyle} {...rest}>
      {!!LeftAccessory && <LeftAccessory style={$leftAccessoryStyle} />}
      <Text tx={tx} text={text} style={$textStyle} children={children} />
      {!!RightAccessory && <RightAccessory style={$rightAccessoryStyle} />}
    </Pressable>
  )
}

const $baseButtonStyle: ViewStyle = {
  minHeight: 56,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: 10,
  paddingHorizontal: 10,
  overflow: "hidden",
}

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 20,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
}

const $rightAccessoryStyle: ViewStyle = { marginLeft: 8, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginRight: 8, zIndex: 1 }

const $buttonPresetStyles = {
  /**
   * The default preset. Used as a primary button.
   */
  default: [
    $baseButtonStyle,
    { borderWidth: 1, borderColor: colors.palette.neutral400 },
  ] as StyleProp<ViewStyle>,
  /**
   * An alternative button style. Used as a secondary button.
   */
  filled: [
    $baseButtonStyle,
    { backgroundColor: colors.palette.neutral300 },
  ] as StyleProp<ViewStyle>,
  /**
   *A contrast button. A more prominent button that stands out.
   */
  reversed: [
    $baseButtonStyle,
    { backgroundColor: colors.palette.neutral800 },
  ] as StyleProp<ViewStyle>,
}

const $textPresetStyles: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  filled: $baseTextStyle,
  reversed: [$baseTextStyle, { color: colors.palette.neutral100 }],
}
