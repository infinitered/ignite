/**
 * Provider-agnostic analytics interface. Swap out the implementation
 * (PostHog → Mixpanel → Amplitude → in-house) without touching consumers.
 */
export interface AnalyticsAdapter {
  identify(userId: string, traits?: Record<string, unknown>): void;
  track(event: string, properties?: Record<string, unknown>): void;
  screen(name: string, properties?: Record<string, unknown>): void;
  reset(): void;
  flush(): Promise<void>;
  getFeatureFlag<T = boolean | string>(key: string, fallback: T): T;
}
