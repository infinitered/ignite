import * as Sentry from '@sentry/react-native';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';

import { env } from '@/config/env';

/**
 * Initialize Sentry as early as possible (called from `index.tsx`).
 * Tagged with the native version + EAS Update ID so issues can be
 * pinned to a specific OTA bundle.
 */
export function initSentry(): void {
  if (!env.EXPO_PUBLIC_SENTRY_DSN) {
    if (__DEV__) console.warn('[sentry] EXPO_PUBLIC_SENTRY_DSN not set, Sentry disabled');
    return;
  }

  Sentry.init({
    dsn: env.EXPO_PUBLIC_SENTRY_DSN,
    environment: env.EXPO_PUBLIC_ENV,
    enabled: !__DEV__,
    debug: __DEV__,
    tracesSampleRate: env.EXPO_PUBLIC_ENV === 'production' ? 0.1 : 1.0,
    release: `${Application.applicationId}@${Application.nativeApplicationVersion}+${Application.nativeBuildVersion}`,
    dist: Updates.updateId ?? undefined,
  });
}

export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
export const setUser = Sentry.setUser;
export const addBreadcrumb = Sentry.addBreadcrumb;

export const SentryWrap = Sentry.wrap;
