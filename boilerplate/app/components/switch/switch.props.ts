import { StyleProp, ViewProps, ViewStyle } from "react-native"

export interface SwitchProps extends ViewProps {
  /*
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
