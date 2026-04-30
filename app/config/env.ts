import { z } from 'zod';

/**
 * Single source of truth for environment variables.
 *
 * EXPO_PUBLIC_* values are bundled into the JS and visible to clients.
 * Any other key (e.g. SENTRY_AUTH_TOKEN) is build-time only — used by
 * EAS / CI, never reachable at runtime.
 *
 * The schema runs at module load. A misconfigured environment fails
 * loudly with a readable error, not silently with `undefined`.
 */

const Env = z.object({
  EXPO_PUBLIC_API_URL: z.string().url().default('https://jsonplaceholder.typicode.com'),
  EXPO_PUBLIC_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  EXPO_PUBLIC_POSTHOG_KEY: z.string().optional(),
  EXPO_PUBLIC_POSTHOG_HOST: z.string().url().default('https://us.posthog.com'),
  EXPO_PUBLIC_EAS_PROJECT_ID: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
});

const parsed = Env.safeParse(process.env);

if (!parsed.success) {
  // Print a developer-friendly diagnostic. Throw to halt boot — silent
  // env failures are the worst kind: they surface as null-pointer errors
  // hours later in unrelated code paths.
  console.error('❌ Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`  • ${issue.path.join('.')}: ${issue.message}`);
  }
  throw new Error('Environment validation failed; see above.');
}

export const env = parsed.data;
export type Env = typeof env;
