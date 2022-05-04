import { spacing } from './spacing';
import { ViewStyle } from 'react-native';

export const appStyles = {
  simpleShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  } as ViewStyle,
  seperator: {
    height: spacing[6],
  } as ViewStyle,
  smallSeperator: {
    height: spacing[5]
  } as ViewStyle
}