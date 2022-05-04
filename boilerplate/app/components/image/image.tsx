import * as React from 'react'
import { ImageProps, Image as ImageRN } from 'react-native'

/**
 * Describe your component here
 */
export const Image = (props: ImageProps) => {
  return (
    <ImageRN {...props} />
  )
}
