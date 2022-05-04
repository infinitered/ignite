import * as React from 'react'
import { ImageBackgroundProps, ImageBackground as ImageBackgroundRN } from 'react-native'

export interface CustomImageBackgroundProps extends ImageBackgroundProps {
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * Describe your component here
 */
export const ImageBackground = (props: CustomImageBackgroundProps) => {
  return (
    <ImageBackgroundRN {...props} />
  )
}
