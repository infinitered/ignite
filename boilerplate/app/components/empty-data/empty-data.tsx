import * as React from 'react'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import { flatten } from 'ramda'
import { spacing, color } from '../../theme'
import { Image } from '../image/image'
import { Text } from '../text/text'

const CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}

const TITLE: TextStyle = {
  fontSize: 25,
  textAlign: 'center',
  marginTop: spacing[2],
  marginBottom: spacing[2],
  maxWidth: '80%'
}

export interface EmptyDataProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image?: any
  title?: string
  description?: string
}

/**
 * Describe your component here
 */
export const EmptyData = (props: EmptyDataProps) => {
  const { style, image, title, description } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Image source={image} />
      <Text
        color={color.secondaryText}
        preset="title"
        style={TITLE}
        text={title}
      />
      <Text
        lineHeight={18}
        maxWidth='65%'
        preset="bigDesc"
        text={description}
        textAlign="center"
      />
    </View>
  )
}
