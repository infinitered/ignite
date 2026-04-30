import {
  type NavigationState,
  type PartialState,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import type { AppStackParamList } from '@/navigators/navigationTypes';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

/** Recursively returns the active route name from a navigation state. */
export function getActiveRouteName(state: NavigationState | PartialState<NavigationState>): string {
  const route = state.routes[state.index ?? 0];
  if (!route?.state) return (route?.name ?? 'unknown') as keyof AppStackParamList;
  return getActiveRouteName(route.state as NavigationState);
}

/**
 * Custom back-button handler. Pass a predicate that returns true when
 * the current route should exit the app (e.g., the home screen).
 */
export function useBackButtonHandler(canExit: (routeName: string) => boolean): void {
  useEffect(() => {
    const onBackPress = (): boolean => {
      const routeName = navigationRef.isReady() ? navigationRef.getCurrentRoute()?.name : null;
      if (!routeName) return false;
      if (canExit(routeName)) return false;
      navigationRef.goBack();
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [canExit]);
}
