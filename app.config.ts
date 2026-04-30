import 'tsx/cjs';
import type { ConfigContext, ExpoConfig } from '@expo/config';

/**
 * Dynamic Expo config. The static `app.json` carries app-name placeholders
 * that `pnpm rename` updates; this file layers env-driven settings on top.
 *
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? [];

  return {
    ...config,
    runtimeVersion: { policy: 'appVersion' },
    updates: {
      ...config.updates,
      fallbackToCacheTimeout: 0,
    },
    ios: {
      ...config.ios,
      supportsTablet: true,
      // Apple Privacy Manifest. Add categories as you adopt APIs.
      // https://docs.expo.dev/guides/apple-privacy/
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryUserDefaults',
            NSPrivacyAccessedAPITypeReasons: ['CA92.1'],
          },
        ],
      },
    },
    plugins: [
      ...existingPlugins,
      // Sentry source-map upload. Requires SENTRY_AUTH_TOKEN at build time.
      [
        '@sentry/react-native/expo',
        {
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          url: 'https://sentry.io/',
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            usesCleartextTraffic: false,
            minSdkVersion: 24,
          },
          ios: {
            useFrameworks: 'static',
            deploymentTarget: '15.1',
          },
        },
      ],
      'expo-secure-store',
      'expo-notifications',
    ],
    extra: {
      eas: { projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID },
    },
  };
};
