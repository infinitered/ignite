import * as React from "react"
import { View } from "react-native"
import { PRESETS } from "./form-row.presets"
import { FormRowProps } from "./form-row.props"
import { flatten } from "ramda"

/**
 * A horizontal container component used to hold a row of a form.
 */
export function FormRow(props: FormRowProps) {
  const viewStyle = flatten([PRESETS[props.preset], props.style])

  return <View style={viewStyle}>{props.children}</View>
}
