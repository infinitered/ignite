import '@/lib/cssInterop';

import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
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
 * Boot sequence: load fonts + i18n + auth session in parallel; render `null`
 * (native splash stays visible) until all three are ready.
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

  if (!isI18nInitialized || (!areFontsLoaded && !fontLoadError) || !isSessionHydrated) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <AppNavigator linking={linking} />
        </QueryClientProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
