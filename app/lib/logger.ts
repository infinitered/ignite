/**
 * App-wide logger. The only place `console.*` is allowed (Biome rule).
 *
 * Production: forwards to Sentry breadcrumbs (configured in `sentry.ts`).
 * Development: human-readable colored output.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function format(level: LogLevel, args: unknown[]): unknown[] {
  const tag = `[${level.toUpperCase()}]`;
  return [tag, ...args];
}

export const logger = {
  debug: (...args: unknown[]): void => {
    if (__DEV__) console.warn(...format('debug', args));
  },
  info: (...args: unknown[]): void => {
    if (__DEV__) console.warn(...format('info', args));
  },
  warn: (...args: unknown[]): void => {
    console.warn(...format('warn', args));
  },
  error: (...args: unknown[]): void => {
    console.error(...format('error', args));
  },
};
