import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { TxKeyPath } from "../../i18n"
import { IconTypes } from "../Icon"

export interface HeaderProps {
  /**
   * Main header, e.g. POWERED BY IGNITE
   */
  headerTx?: TxKeyPath

  /**
   * header non-i18n
   */
  headerText?: string

  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconTypes

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconTypes

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Title style overrides.
   */
  titleStyle?: StyleProp<TextStyle>
}
