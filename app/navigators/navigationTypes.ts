import type { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ComponentProps } from 'react';

/**
 * Top-level stack route param list. Add screens here as you create them.
 */
export type AppStackParamList = {
  // @demo remove-block
  Example: undefined;
  // @demo remove-block-end
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}
