import '@expo/metro-runtime'; // fast refresh on web (no expo-router)
import './global.css'; // NativeWind base styles
import 'react-native-gesture-handler';

import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';

import { App } from '@/app';
import { SentryWrap, initSentry } from '@/services/sentry';

// Keep the native splash visible until App's boot effect finishes.
// `App` calls `SplashScreen.hideAsync()` once fonts + i18n + session are ready.
SplashScreen.preventAutoHideAsync().catch(() => {
  // ignore — splash may have already auto-hidden in dev fast refresh
});

initSentry();

// Wrap App with Sentry to capture unhandled errors at the root.
registerRootComponent(SentryWrap(App));
