import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  StyleProp,
  SwitchProps,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import Animated, { FadeIn, useAnimatedStyle, withTiming } from "react-native-reanimated"
import { colors, spacing } from "../theme"
import { iconRegistry } from "./Icon"
import { Text, TextProps } from "./Text"

type Variants = "checkbox" | "switch" | "radio"

export interface ToggleProps extends Omit<TouchableOpacityProps, "style"> {
  /**
   * The variant of the toggle.
   * Options: "checkbox", "switch", "radio"
   * Default: "checkbox"
   */
  variant?: Variants
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * If false, input is not editable. The default value is true.
   */
  editable?: TextInputProps["editable"]
  /**
   * The value of the field. If true the component will be turned on.
   */
  value?: boolean
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: SwitchProps["onValueChange"]
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional input wrapper style override.
   * This gives the inputs their size, shape, "off" background-color, and outer border.
   */
  inputOuterStyle?: StyleProp<ViewStyle>
  /**
   * Optional input style override.
   * This gives the inputs their inner characteristics and "on" background-color.
   */
  inputInnerStyle?: StyleProp<ViewStyle>
  /**
   * Optional input detail style override.
   * For checkbox, this affects the Image component.
   * For radio, this affects the dot View.
   * For switch, this affects the knob View.
   */
  inputDetailStyle?: StyleProp<ViewStyle | ImageStyle>
  /**
   * The position of the label relative to the action component.
   * Default: right
   */
  labelPosition?: "left" | "right"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for label text.
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * Special prop for the switch variant that adds a text/icon label for on/off states.
   */
  switchAccessibilityMode?: "text" | "icon"
}

interface ToggleInputProps {
  on: boolean
  status: ToggleProps["status"]
  disabled: boolean
  innerStyle: StyleProp<any>
  detailStyle: StyleProp<any>
  switchAccessibilityMode?: ToggleProps["switchAccessibilityMode"]
}

/**
 * Renders a boolean input.
 * This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Toggle.md)
 */
export function Toggle(props: ToggleProps) {
  const {
    variant = "checkbox",
    editable = true,
    status,
    value,
    onPress,
    onValueChange,
    labelPosition = "right",
    inputOuterStyle: $inputOuterStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const disabled = editable === false || status === "disabled"

  const Wrapper = useMemo<ComponentType<TouchableOpacityProps>>(
    () => (disabled ? View : TouchableOpacity),
    [disabled],
  )
  const ToggleInput = useMemo(() => ToggleInputs[variant] || (() => null), [variant])

  const $containerStyle = [$container, $containerStyleOverride]

  const $inputOuterStyle = [
    $inputOuterVariants[variant],
    value && { borderColor: colors.palette.secondary500 },
    !value && { borderColor: colors.palette.neutral800 },
    status === "error" && { borderColor: colors.error },
    disabled && {
      borderColor: colors.palette.neutral300,
      backgroundColor: colors.palette.neutral300,
    },
    !disabled && { backgroundColor: colors.palette.neutral200 },
    $inputOuterStyleOverride,
  ]

  function handlePress(e: GestureResponderEvent) {
    if (disabled) return
    onValueChange?.(!value)
    onPress?.(e)
  }

  return (
    <Wrapper
      activeOpacity={1}
      accessibilityRole={variant}
      accessibilityState={{ checked: value, disabled }}
      {...WrapperProps}
      style={$containerStyle}
      onPress={handlePress}
    >
      {labelPosition === "left" && <FieldLabel {...props} labelPosition={labelPosition} />}

      <View style={$inputOuterStyle}>
        <ToggleInput
          on={value}
          disabled={disabled}
          status={status}
          innerStyle={props.inputInnerStyle}
          detailStyle={props.inputDetailStyle}
          switchAccessibilityMode={props.switchAccessibilityMode}
        />
      </View>

      {labelPosition === "right" && <FieldLabel {...props} labelPosition={labelPosition} />}
    </Wrapper>
  )
}

const ToggleInputs: Record<Variants, FC<ToggleInputProps>> = {
  checkbox: Checkbox,
  switch: Switch,
  radio: Radio,
}

function Checkbox(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    innerStyle: $checkboxContainerStyleOverride,
    detailStyle: $checkboxIconStyleOverride,
  } = props

  const $animatedCheckboxContainer = useAnimatedStyle(
    () => ({ opacity: withTiming(on ? 1 : 0) }),
    [on],
  )

  const $checkboxContainerStyle = [
    $checkboxContainer,
    { backgroundColor: colors.palette.secondary500 },
    status === "error" && { backgroundColor: colors.error },
    disabled && { backgroundColor: colors.transparent },
    $animatedCheckboxContainer,
    $checkboxContainerStyleOverride,
  ]

  const $checkboxIconStyle = [
    $checkboxIcon,
    { tintColor: colors.palette.neutral100 },
    disabled && { tintColor: colors.palette.neutral600 },
    $checkboxIconStyleOverride,
  ]

  return (
    <Animated.View style={$checkboxContainerStyle}>
      <Image source={iconRegistry.check} style={$checkboxIconStyle} />
    </Animated.View>
  )
}

function Radio(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    innerStyle: $radioContainerStyleOverride,
    detailStyle: $radioDotStyleOverride,
  } = props

  const $animatedRadioContainer = useAnimatedStyle(
    () => ({ opacity: withTiming(on ? 1 : 0) }),
    [on],
  )

  const $radioContainerStyle = [
    $radioContainer,
    { backgroundColor: colors.palette.neutral100 },
    disabled && { backgroundColor: colors.transparent },
    $animatedRadioContainer,
    $radioContainerStyleOverride,
  ]
  const $radioDotStyle = [
    $radioDot,
    { backgroundColor: colors.palette.secondary500 },
    status === "error" && { backgroundColor: colors.error },
    disabled && { backgroundColor: colors.palette.neutral600 },
    $radioDotStyleOverride,
  ]

  return (
    <Animated.View style={$radioContainerStyle}>
      <View style={$radioDotStyle} />
    </Animated.View>
  )
}

function Switch(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    innerStyle: $switchContainerStyleOverride,
    detailStyle: $switchKnobStyleOverride,
  } = props
  const knob = useRef<Animated.View>()
  const [renderedKnobWidth, setRenderedKnobWidth] = useState(null)

  useEffect(() => {
    // measure knob subsquently if the override changes
    if (!knob.current) return
    if (renderedKnobWidth === null) return
    knob.current.measure((_x, _y, width) => setRenderedKnobWidth(width))
  }, [$switchKnobStyleOverride?.width])

  const $animatedSwitchContainer = useAnimatedStyle(
    () => ({ opacity: withTiming(on ? 1 : 0) }),
    [on],
  )

  const $animatedSwitchKnob = useAnimatedStyle(() => {
    if (renderedKnobWidth === null) return {}

    const offsetLeft =
      $switchContainerStyleOverride?.paddingStart ||
      $switchContainerStyleOverride?.paddingLeft ||
      $switchContainer?.paddingStart ||
      $switchContainer?.paddingLeft ||
      0

    const offsetRight =
      $switchContainerStyleOverride?.paddingEnd ||
      $switchContainerStyleOverride?.paddingRight ||
      $switchContainer?.paddingEnd ||
      $switchContainer?.paddingRight ||
      0

    const start = withTiming(on ? "100%" : "0%")
    const marginStart = withTiming(on ? -(renderedKnobWidth || 0) - offsetRight : 0 + offsetLeft)

    return { start, marginStart }
  }, [on, renderedKnobWidth])

  const $switchContainerStyle = [
    $switchContainer,
    { backgroundColor: colors.palette.secondary500 },
    status === "error" && { backgroundColor: colors.error },
    disabled && { backgroundColor: colors.transparent },
    $animatedSwitchContainer,
    $switchContainerStyleOverride,
  ]

  const $switchKnobStyle = [
    $switchKnob,
    $animatedSwitchKnob,
    $switchKnobStyleOverride,
    {
      backgroundColor: (function () {
        if (on) {
          return [
            $switchKnobStyleOverride?.backgroundColor,
            disabled && colors.palette.neutral600,
            colors.palette.neutral100,
          ].filter(Boolean)[0]
        } else {
          return [
            $switchContainerStyleOverride?.backgroundColor,
            disabled && colors.palette.neutral600,
            status === "error" && colors.error,
            colors.palette.secondary500,
          ].filter(Boolean)[0]
        }
      })(),
    },
  ]

  return (
    <>
      <Animated.View style={$switchContainerStyle} />

      <SwitchAccessibilityLabel {...props} role="on" />
      <SwitchAccessibilityLabel {...props} role="off" />

      <Animated.View
        ref={knob}
        entering={FadeIn.delay(150).duration(150)}
        style={$switchKnobStyle}
        onLayout={(e) => {
          // measure knob on load only once
          if (renderedKnobWidth !== null) return
          setRenderedKnobWidth(e.nativeEvent.layout.width)
        }}
      />
    </>
  )
}

function SwitchAccessibilityLabel(props: ToggleInputProps & { role: "on" | "off" }) {
  const { on, disabled, status, switchAccessibilityMode, role, innerStyle, detailStyle } = props

  if (!switchAccessibilityMode) return null

  const shouldLabelBeVisible = (on && role === "on") || (!on && role === "off")

  const $switchAccessibilityStyle = [
    $switchAccessibility,
    role === "off" && { end: "5%" },
    role === "on" && { left: "5%" },
  ]

  const color = (function () {
    if (disabled) return colors.palette.neutral600
    if (status === "error" && !on) return colors.error
    if (!on) return innerStyle?.backgroundColor || colors.palette.secondary500
    return detailStyle?.backgroundColor || colors.palette.neutral100
  })()

  return (
    <View style={$switchAccessibilityStyle}>
      {switchAccessibilityMode === "text" && shouldLabelBeVisible && (
        <Text
          size="xs"
          style={{ color }}
          tx={role === "off" ? "accessibility.switchOff" : "accessibility.switchOn"}
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

function FieldLabel(props: ToggleProps) {
  const {
    label,
    labelTx,
    labelTxOptions,
    LabelTextProps,
    labelPosition,
    labelStyle: $labelStyleOverride,
  } = props

  if (!label && !labelTx && !LabelTextProps?.children) return null

  const $labelStyle = [
    $label,
    labelPosition === "right" && $labelRight,
    labelPosition === "left" && $labelLeft,
    $labelStyleOverride,
    LabelTextProps?.style,
  ]

  return (
    <Text
      preset="formLabel"
      text={label}
      tx={labelTx}
      txOptions={labelTxOptions}
      {...LabelTextProps}
      style={$labelStyle}
    />
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $inputOuterBase: ViewStyle = {
  height: 24,
  width: 24,
  borderWidth: 2,
  alignItems: "center",
  overflow: "hidden",
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: "space-between",
  flexDirection: "row",
}

const $inputOuterVariants: Record<Variants, StyleProp<ViewStyle>> = {
  checkbox: [$inputOuterBase, { borderRadius: 4 }],
  radio: [$inputOuterBase, { borderRadius: 12 }],
  switch: [$inputOuterBase, { height: 32, width: 56, borderRadius: 16 }],
}

const $checkboxContainer: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}

const $checkboxIcon: ImageStyle = {
  width: 20,
  height: 20,
  resizeMode: "contain",
}

const $radioContainer: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}

const $radioDot: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
}

const $switchContainer: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  borderColor: colors.transparent,
  overflow: "hidden",
  position: "absolute",
  paddingStart: 2,
  paddingEnd: 2,
}

const $switchKnob: ViewStyle = {
  borderRadius: 12,
  position: "absolute",
  width: 24,
  height: 24,
}

const $label: TextStyle = {
  flex: 1,
}

const $labelRight: TextStyle = {
  marginLeft: spacing.extraSmall,
}

const $labelLeft: TextStyle = {
  marginRight: spacing.extraSmall,
  textAlign: "right",
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
