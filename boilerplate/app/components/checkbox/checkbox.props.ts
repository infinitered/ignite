import { ViewStyle } from "react-native"

export interface CheckboxProps {
  /**
   * Additional container style. Useful for margins.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * Additional outline style.
   */
  outlineStyle?: ViewStyle | ViewStyle[]

  /**
   * Additional fill style. Only visible when checked.
   */
  fillStyle?: ViewStyle | ViewStyle[]

  /**
   * Is the checkbox checked?
   */
  value?: boolean

  /**
   * The text to display if there isn't a tx.
   */
  text?: string

  /**
   * The i18n lookup key.
   */
  tx?: string

  /**
   * Multiline or clipped single line?
   */
  multiline?: boolean

  /**
   * Fires when the user tabs to change the value.
   */
  onToggle?: (newValue: boolean) => void
}
