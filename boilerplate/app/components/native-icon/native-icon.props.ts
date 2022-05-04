import { IconProps } from 'react-native-vector-icons/Icon';

export type IconDirectory =
  | 'Ionicons'
  | 'AntDesign'
  | 'Entypo'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'MaterialCommunityIcons'
  | 'SimpleLineIcons'
  | 'Foundation'
  | 'Fontisto'
  | 'EvilIcons'
  | 'Octicons'
  | 'MaterialIcons'
  | 'Zocial';

/**
 * Native icon props
 *
 * @interface NativeIconProps
 * @extends {IconProps}
 */
export interface NativeIconProps extends IconProps {
  directory?: IconDirectory;
}
