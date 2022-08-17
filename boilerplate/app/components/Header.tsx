import React, { ReactElement } from "react"
import { TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"
import { Edge, SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context"
import { translate } from "../i18n/"
import { colors } from "../theme"
import { Icon, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"

export interface HeaderProps {
  /**
   * Optional title style override.
   */
  titleStyle?: TextStyle
  /**
   * Optional header style override.
   */
  containerStyle?: TextStyle
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: TextProps["text"]
  /**
   * Title text which is looked up via i18n.
   */
  titleTx?: TextProps["tx"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  titleTxOptions?: TextProps["txOptions"]
  /**
   * Icon that should appear on the left.
   * Can be used with `onLeftPress`.
   */
  leftIcon?: IconTypes
  /**
   * Left action text to display if not using `leftTx`.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftText?: TextProps["text"]
  /**
   * Left action text text which is looked up via i18n.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftTx?: TextProps["tx"]
  /**
   * Left action custom ReactElement if the built in action props don't suffice.
   * Overrides `leftIcon`, `leftTx` and `leftText`.
   */
  LeftActionComponent?: ReactElement
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  leftTxOptions?: TextProps["txOptions"]
  /**
   * What happens when you press the left icon or text action.
   */
  onLeftPress?: TouchableOpacityProps["onPress"]
  /**
   * Icon that should appear on the right.
   * Can be used with `onRightPress`.
   */
  rightIcon?: IconTypes
  /**
   * Right action text to display if not using `rightTx`.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightText?: TextProps["text"]
  /**
   * Right action text text which is looked up via i18n.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightTx?: TextProps["tx"]
  /**
   * Right action custom ReactElement if the built in action props don't suffice.
   * Overrides `rightIcon`, `rightTx` and `rightText`.
   */
  RightActionComponent?: ReactElement
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  rightTxOptions?: TextProps["txOptions"]
  /**
   * What happens when you press the right icon or text action.
   */
  onRightPress?: TouchableOpacityProps["onPress"]
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: Edge[]
  /**
   * Pass any additional props directly to the SafeAreaView component.
   */
  SafeAreaViewProps?: SafeAreaViewProps
}

export interface HeaderActionProps {
  backgroundColor?: string
  icon?: IconTypes
  text?: TextProps["text"]
  tx?: TextProps["tx"]
  txOptions?: TextProps["txOptions"]
  onPress?: TouchableOpacityProps["onPress"]
  ActionComponent?: ReactElement
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header is meant to be used with the `header` option on navigators, routes, or screen components via `navigation.setOptions`.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Header.md)
 */
export function Header(props: HeaderProps) {
  const {
    backgroundColor = colors.background,
    LeftActionComponent,
    leftIcon,
    leftText,
    leftTx,
    leftTxOptions,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightText,
    rightTx,
    rightTxOptions,
    safeAreaEdges = ["top"],
    SafeAreaViewProps,
    title,
    titleTx,
    titleTxOptions,
    titleStyle: $titleStyleOverride,
    containerStyle: $containerStyleOverride,
  } = props

  const Wrapper = safeAreaEdges?.length ? SafeAreaView : View

  const titleContent = titleTx ? translate(titleTx, titleTxOptions) : title

  return (
    <Wrapper
      edges={safeAreaEdges}
      {...SafeAreaViewProps}
      style={[$safeArea, SafeAreaViewProps?.style, { backgroundColor }]}
    >
      <View style={[$container, $containerStyleOverride]}>
        <HeaderAction
          tx={rightTx}
          text={rightText}
          icon={rightIcon}
          onPress={onRightPress}
          txOptions={rightTxOptions}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />

        {!!titleContent && (
          <Text
            weight="medium"
            size="md"
            text={titleContent}
            style={[$title, $titleStyleOverride]}
          />
        )}

        <HeaderAction
          tx={leftTx}
          text={leftText}
          icon={leftIcon}
          onPress={onLeftPress}
          txOptions={leftTxOptions}
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </Wrapper>
  )
}

function HeaderAction(props: HeaderActionProps) {
  const { backgroundColor, icon, text, tx, txOptions, onPress, ActionComponent } = props

  const content = tx ? translate(tx, txOptions) : text

  if (!!ActionComponent) return ActionComponent

  if (!!content) {
    return (
      <TouchableOpacity
        style={[$actionTextContainer, { backgroundColor }]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
      >
        <Text weight="medium" size="md" text={content} style={$actionText} />
      </TouchableOpacity>
    )
  }

  if (!!icon) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={colors.palette.neutral800}
        onPress={onPress}
        containerStyle={[$actionIconContainer, { backgroundColor }]}
      />
    )
  }

  return <View />
}

const $safeArea: ViewStyle = {
  width: "100%",
}

const $container: ViewStyle = {
  height: 56,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $title: TextStyle = {
  position: "absolute",
  width: "100%",
  textAlign: "center",
  paddingHorizontal: 56,
  zIndex: 1,
}

const $actionTextContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: 16,
  zIndex: 2,
}

const $actionText: TextStyle = {
  color: colors.tint,
}

const $actionIconContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: 16,
  zIndex: 2,
}
