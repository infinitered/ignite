import React, { ReactElement } from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing } from "../theme"
import { Icon, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"

export interface ListItemProps extends TouchableOpacityProps {
  /**
   * How tall the list item should be.
   * Default: 56
   */
  height?: number
  /**
   * Whether to show the top separator.
   * Default: false
   */
  topSeparator?: boolean
  /**
   * Whether to show the bottom separator.
   * Default: false
   */
  bottomSeparator?: boolean
  /**
   * Text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * Children components.
   */
  children?: TextProps["children"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * Optional text style override.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the Text component.
   */
  TextProps?: TextProps
  /**
   * Optional View container style override.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional TouchableOpacity style override.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Icon that should appear on the left.
   */
  leftIcon?: IconTypes
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: IconTypes
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string
  /**
   * Right action custom ReactElement.
   * Overrides `rightIcon`.
   */
  RightComponent?: ReactElement
  /**
   * Left action custom ReactElement.
   * Overrides `leftIcon`.
   */
  LeftComponent?: ReactElement
}

interface ListItemActionProps {
  icon?: IconTypes
  iconColor?: string
  Component?: ReactElement
  size: number
  side: "left" | "right"
}

/**
 * A styled row component that can be used in FlatList, SectionList, or by itself.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/ListItem/}
 * @param {ListItemProps} props - The props for the `ListItem` component.
 * @returns {JSX.Element} The rendered `ListItem` component.
 */
export function ListItem(props: ListItemProps) {
  const {
    bottomSeparator,
    children,
    height = 56,
    LeftComponent,
    leftIcon,
    leftIconColor,
    RightComponent,
    rightIcon,
    rightIconColor,
    style,
    text,
    TextProps,
    topSeparator,
    tx,
    txOptions,
    textStyle: $textStyleOverride,
    containerStyle: $containerStyleOverride,
    ...TouchableOpacityProps
  } = props

  const $textStyles = [$textStyle, $textStyleOverride, TextProps?.style]

  const $containerStyles = [
    topSeparator && $separatorTop,
    bottomSeparator && $separatorBottom,
    $containerStyleOverride,
  ]

  const $touchableStyles = [$touchableStyle, { minHeight: height }, style]

  return (
    <View style={$containerStyles}>
      <TouchableOpacity {...TouchableOpacityProps} style={$touchableStyles}>
        <ListItemAction
          side="left"
          size={height}
          icon={leftIcon}
          iconColor={leftIconColor}
          Component={LeftComponent}
        />

        <Text {...TextProps} tx={tx} text={text} txOptions={txOptions} style={$textStyles}>
          {children}
        </Text>

        <ListItemAction
          side="right"
          size={height}
          icon={rightIcon}
          iconColor={rightIconColor}
          Component={RightComponent}
        />
      </TouchableOpacity>
    </View>
  )
}

/**
 * @param {ListItemActionProps} props - The props for the `ListItemAction` component.
 * @returns {JSX.Element | null} The rendered `ListItemAction` component.
 */
function ListItemAction(props: ListItemActionProps) {
  const { icon, Component, iconColor, size, side } = props

  const $iconContainerStyles = [$iconContainer]

  if (Component) return Component

  if (icon !== undefined) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        containerStyle={[
          $iconContainerStyles,
          side === "left" && $iconContainerLeft,
          side === "right" && $iconContainerRight,
          { height: size },
        ]}
      />
    )
  }

  return null
}

const $separatorTop: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: colors.separator,
}

const $separatorBottom: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
}

const $textStyle: TextStyle = {
  paddingVertical: spacing.xs,
  alignSelf: "center",
  flexGrow: 1,
  flexShrink: 1,
}

const $touchableStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 0,
}
const $iconContainerLeft: ViewStyle = {
  marginEnd: spacing.md,
}

const $iconContainerRight: ViewStyle = {
  marginStart: spacing.md,
}
