import * as React from 'react'
import { ViewStyle } from 'react-native'
import { flatten } from 'ramda'
import { View, ViewProps } from '../view/view'
import { CustomStyleProps } from '../../utils/features'
import { spacing } from '../../theme'

const CONTAINER: ViewStyle = {
  flexDirection: 'column',
}

export interface ColProps extends ViewProps, CustomStyleProps {
}

/**
 * Describe your component here
 */
export const Col = (props: ColProps) => {
  const {
    style,
    pd,
    pdS,
    pdE,
    pdT,
    pdL,
    pdB,
    pdR,
    pdH,
    pdV,
    mg,
    mgS,
    mgE,
    mgT,
    mgL,
    mgB,
    mgR,
    mgH,
    mgV,
    w,
    h,
    mW,
    mH,
    ...rest
  } = props
  const colStyle: ViewStyle = {
    flexDirection: 'column',
    paddingStart: spacing[pdS],
    paddingEnd: spacing[pdE],
    paddingTop: spacing[pdT],
    paddingLeft: spacing[pdL],
    paddingBottom: spacing[pdB],
    paddingRight: spacing[pdR],
    paddingHorizontal: pdH !== undefined ? spacing[pdH] : spacing[4],
    paddingVertical: pdV !== undefined ? spacing[pdV] : spacing[2],
    padding: spacing[pd],
    margin: spacing[mg],
    marginTop: spacing[mgT],
    marginStart: spacing[mgS],
    marginEnd: spacing[mgE],
    marginLeft: spacing[mgL],
    marginBottom: spacing[mgB],
    marginRight: spacing[mgR],
    marginHorizontal: spacing[mgH],
    marginVertical: spacing[mgV],
    width: w ? `${w}0%` : undefined,
    height: w ? `${h}0%` : undefined,
    maxWidth: w ? `${mW}0%` : undefined,
    maxHeight: w ? `${mH}0%` : undefined,
  }
  const styles = flatten([CONTAINER, colStyle, style])

  return (
    <View
      style={styles}
      {...rest}
    />
  )
}
