import type { ComponentProps } from 'react';
import type { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Top-level stack route param list. Add screens here as you create them.
 */
export type AppStackParamList = {
  Example: undefined;
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}
