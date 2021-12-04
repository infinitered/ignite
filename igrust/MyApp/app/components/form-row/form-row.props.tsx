import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { FormRowPresets } from "./form-row.presets"

/**
 * The properties you can pass to FormRow.
 */
export interface FormRowProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Override the container style... useful for margins and padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * The type of border.
   */
  preset: FormRowPresets
}
