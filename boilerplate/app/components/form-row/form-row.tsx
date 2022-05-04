import * as React from 'react'
import { View } from 'react-native'
import { PRESETS } from './form-row.presets'
import { FormRowProps } from './form-row.props'

/**
 * A horizontal container component used to hold a row of a form.
 */
export function FormRow({ preset = 'row', style ,children }: FormRowProps) {
  const viewStyle = [PRESETS[preset], style]

  return <View style={viewStyle}>{children}</View>
}
