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

// PostHog's event properties are loosely typed; our adapter exposes the
// stricter `Record<string, unknown>` shape and casts at the boundary.
type PostHogProps = Parameters<NonNullable<typeof client>['capture']>[1];

const asProps = (props?: Record<string, unknown>): PostHogProps => props as PostHogProps;

export const analytics: AnalyticsAdapter = {
  identify: (userId, traits) => client?.identify(userId, asProps(traits)),
  track: (event, properties) => client?.capture(event, asProps(properties)),
  screen: (name, properties) => client?.screen(name, asProps(properties)),
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
