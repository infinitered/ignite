import '@expo/metro-runtime'; // fast refresh on web (no expo-router)
import './global.css'; // NativeWind base styles
import 'react-native-gesture-handler';

import { registerRootComponent } from 'expo';

import { App } from '@/app';
import { initSentry } from '@/lib/sentry';
import { SentryWrap } from '@/lib/sentry';

initSentry();

// Wrap App with Sentry to capture unhandled errors at the root.
registerRootComponent(SentryWrap(App));
