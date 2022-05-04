import * as React from 'react'
import { StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import { flatten } from 'ramda'
import { color } from '../../theme'

const CONTAINER: ViewStyle = {
}

export interface LoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Loader = (props: LoaderProps) => {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  return (
    <ActivityIndicator
      color={color.primary}
      size="large"
      style={styles}
    />
  )
}
