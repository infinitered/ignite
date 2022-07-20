import i18n from "i18n-js"
import * as React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { translate, TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presetStyles

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  const {
    preset = "default",
    weight,
    size,
    tx,
    txOptions,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  // compose the styles
  const $presetStyle = $presetStyles[preset] || $presetStyles.default
  const $composedStyle = [$fontWeightStyles[weight], $sizeStyles[size]]
  const $styles = [$presetStyle, $composedStyle, $styleOverride]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } as TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } as TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } as TextStyle,
  md: { fontSize: 18, lineHeight: 26 } as TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } as TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } as TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyles: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  { color: colors.text },
]

const $presetStyles = {
  /**
   * The default text styles.
   */
  default: $baseStyles,
  /**
   * A bold version of the default text.
   */
  bold: [$baseStyles, $fontWeightStyles.bold] as StyleProp<TextStyle>,
  /**
   * Large heading.
   */
  heading: [$baseStyles, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,
  /**
   * Smaller heading.
   */
  subheading: [$baseStyles, $sizeStyles.lg, $fontWeightStyles.medium] as StyleProp<TextStyle>,
  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: [
    $sizeStyles.xs,
    $fontWeightStyles.light,
    { color: colors.dim },
  ] as StyleProp<TextStyle>,
}
