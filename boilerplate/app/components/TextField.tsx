import { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import {
  ImageStyle,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { isRTL } from "@/i18n"
import type { ThemedStyle, ThemedStyleArray } from "@/theme"
import { $styles } from "../theme"
import { Text, TextProps } from "./Text"
import { useAppTheme } from "@/utils/useAppTheme"

export interface TextFieldAccessoryProps {
  style: StyleProp<ViewStyle | TextStyle | ImageStyle>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display.
   */
  label?: TextProps["text"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display.
   */
  helper?: TextProps["text"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The placeholder text to display.
   */
  placeholder?: TextProps["text"]
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
}

/**
 * A component that allows for the entering and editing of text.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/TextField/}
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    label,
    placeholder,
    helper,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...TextInputProps
  } = props
  const input = useRef<TextInput>(null)

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const disabled = TextInputProps.editable === false || status === "disabled"

  const $containerStyles = [$containerStyleOverride]

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const $inputWrapperStyles = [
    $styles.row,
    $inputWrapperStyle,
    status === "error" && { borderColor: colors.error },
    TextInputProps.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ]

  const $inputStyles: ThemedStyleArray<TextStyle> = [
    $inputStyle,
    disabled && { color: colors.textDim },
    isRTL && { textAlign: "right" as TextStyle["textAlign"] },
    TextInputProps.multiline && { height: "auto" },
    $inputStyleOverride,
  ]

  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: colors.error },
    HelperTextProps?.style,
  ]

  /**
   *
   */
  function focusInput() {
    if (disabled) return

    input.current?.focus()
  }

  useImperativeHandle(ref, () => input.current as TextInput)

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!(label) && (
        <Text
          preset="formLabel"
          text={label}
          {...LabelTextProps}
          style={themed($labelStyles)}
        />
      )}

      <View style={themed($inputWrapperStyles)}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={themed($leftAccessoryStyle)}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholder}
          placeholderTextColor={colors.textDim}
          {...TextInputProps}
          editable={!disabled}
          style={themed($inputStyles)}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={themed($rightAccessoryStyle)}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}
      </View>

      {!!(helper) && (
        <Text
          preset="formHelper"
          text={helper}
          {...HelperTextProps}
          style={themed($helperStyles)}
        />
      )}
    </TouchableOpacity>
  )
})

const $labelStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $inputWrapperStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  alignItems: "flex-start",
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
  overflow: "hidden",
})

const $inputStyle: ThemedStyle<ViewStyle> = ({ colors, typography, spacing }) => ({
  flex: 1,
  alignSelf: "stretch",
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,
  height: 24,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.xs,
  marginHorizontal: spacing.sm,
})

const $helperStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $rightAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.xs,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
})

const $leftAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginStart: spacing.xs,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
})
