import { StyleProp, ViewStyle } from 'react-native'

export interface HeaderProps {
  leftType?: 'back' | 'text' | 'none'

  backText?: string

  leftText?: string

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightType?: 'notification' | 'none'

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>

  bordered?: boolean

  topSafe?: boolean

  rightContent?: React.ReactNode
}
