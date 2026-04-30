import PostHog from 'posthog-react-native';

import { env } from '@/config/env';
import type { AnalyticsAdapter } from '@/services/analytics/types';

let client: PostHog | null = null;

export function initAnalytics(): void {
  if (!env.EXPO_PUBLIC_POSTHOG_KEY) return;
  client = new PostHog(env.EXPO_PUBLIC_POSTHOG_KEY, {
    host: env.EXPO_PUBLIC_POSTHOG_HOST,
    flushAt: 20,
    flushInterval: 30_000,
  });
}

export const analytics: AnalyticsAdapter = {
  identify: (userId, traits) => client?.identify(userId, traits),
  track: (event, properties) => client?.capture(event, properties),
  screen: (name, properties) => client?.screen(name, properties),
  reset: () => client?.reset(),
  flush: async () => {
    await client?.flush();
  },
  getFeatureFlag: (key, fallback) => {
    if (!client) return fallback;
    const value = client.getFeatureFlag(key);
    return (value ?? fallback) as typeof fallback;
  },
};
