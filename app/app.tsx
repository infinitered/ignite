import '@/lib/cssInterop';

import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import { initI18n } from '@/i18n';
import { customFontsToLoad } from '@/lib/fonts';
import { queryClient } from '@/lib/queryClient';
import { initAnalytics } from '@/services/analytics/posthog';
import { useSessionStore } from '@/stores/useSessionStore';
import { AppNavigator } from '@/navigators/AppNavigator';

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Example: '',
    },
  },
};

/**
 * Root component. Mounts providers in this order (outermost first):
 *   SafeAreaProvider → KeyboardProvider → QueryClientProvider → NavigationContainer (inside AppNavigator)
 *
 * Boot sequence: load fonts + i18n + auth session in parallel. The native
 * splash stays visible (via `SplashScreen.preventAutoHideAsync` in
 * `index.tsx`) until all three are ready, then `onLayoutRootView` hides it.
 */
export function App() {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad);
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  const isSessionHydrated = useSessionStore((s) => s.isHydrated);
  const bootstrap = useSessionStore((s) => s.bootstrap);

  useEffect(() => {
    initI18n().then(() => setIsI18nInitialized(true));
    bootstrap();
    initAnalytics();
  }, [bootstrap]);

  const isReady =
    isI18nInitialized && (areFontsLoaded || Boolean(fontLoadError)) && isSessionHydrated;

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <AppNavigator linking={linking} />
          </QueryClientProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </View>
  );
}
