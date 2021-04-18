import { StyleProp, ViewStyle } from "react-native"

export interface SwitchProps {
  /**
   * On or off.
   */
  value?: boolean
  /**
   * Fires when the on/off switch triggers.
   *
   * @param newValue The new value we're switching to.
   */
  onToggle?: (newValue: boolean) => void

  /**
   * A style override to apply to the container.  Useful for margins and paddings.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Additional track styling when on.
   */
  trackOnStyle?: StyleProp<ViewStyle>

  /**
   * Additional track styling when off.
   */
  trackOffStyle?: StyleProp<ViewStyle>

  /**
   * Additional thumb styling when on.
   */
  thumbOnStyle?: StyleProp<ViewStyle>

  /**
   * Additional thumb styling when off.
   */
  thumbOffStyle?: StyleProp<ViewStyle>
}
