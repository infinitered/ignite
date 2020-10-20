import { ImageStyle, ViewStyle } from "react-native"
import { IconTypes } from "./icons"

export interface IconProps {
  /**
   * Style overrides for the icon image
   */
  style?: ImageStyle

  /**
   * Style overrides for the icon container
   */

  containerStyle?: ViewStyle

  /**
   * The name of the icon
   */

  icon?: IconTypes
}
