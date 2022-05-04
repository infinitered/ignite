import * as React from 'react'
import { View as ViewRN, ViewProps as ViewPropsRN } from 'react-native'

export interface ViewProps extends ViewPropsRN {
  /**
   * Children components.
   */
  children?: React.ReactNode
  ref?: any
}

/**
 * Describe your component here
 */
export const View = (props: ViewProps) => {
  const { ref ,...rest } = props
  return (
    <ViewRN {...rest} />
  )
}
