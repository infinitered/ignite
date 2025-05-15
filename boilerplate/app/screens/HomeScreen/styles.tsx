import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { type ThemedStyle } from '@/theme';

export const $field: ThemedStyle<TextStyle> = () => ({
  borderRadius: 8,
  padding: 10,
  margin: 60,
});

export const $textInput: ThemedStyle<TextStyle> = () => ({
  margin: 20,
});

export const $view: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: 20,
  backgroundColor: colors.background,
  borderRadius: 8,
  marginBottom: 80,
});

export const $listContentContainer: ThemedStyle<any> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
});

export const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: '57%',
  paddingHorizontal: spacing.lg,
});

export const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: '100%',
  marginBottom: spacing.xxl,
});

export const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});

export const $buttonAddItem: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: 'white',
  borderRadius: 8,
  padding: 10,
  marginBottom: 50,
  alignItems: 'center',
  justifyContent: 'center',
});

export const $button: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: 'white',
  borderRadius: 8,
  padding: 10,
  margin: 20,
  alignItems: 'center',
  justifyContent: 'center',
});
