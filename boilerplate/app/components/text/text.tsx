import * as React from 'react'
import { Text as ReactNativeText, TextStyle } from 'react-native'
import { presets } from './text.presets'
import { TextProps } from './text.props'
import { translate } from '../../i18n'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const { preset = 'default', tx, txOptions, text, children, color, style: styleOverride, numberOfLines, ...rest } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const style = presets[preset] || presets.default
  const textStyle: TextStyle = {
    ...rest,
    color: color || style.color
  }

  const styles = [style, textStyle ,styleOverride]

  return (
    <ReactNativeText
      numberOfLines={numberOfLines}
      {...rest}
      style={styles}
    >
      {content}
    </ReactNativeText>
  )
}
