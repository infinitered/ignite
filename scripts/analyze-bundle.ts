#!/usr/bin/env tsx
/**
 * Bundle composition analysis. Wraps `react-native-bundle-visualizer` once
 * configured per-project; until then, prints a summary of the current
 * `dist/` contents (run `npx expo export` first).
 *
 * For richer output:
 *   pnpm dlx react-native-bundle-visualizer --platform ios
 *   pnpm dlx react-native-bundle-visualizer --platform android
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
if (!existsSync(dist)) {
  // biome-ignore lint/suspicious/noConsole: CLI script.
  console.warn('ℹ️  No `dist/` found. Producing one with `npx expo export`…');
  try {
    execFileSync('npx', ['expo', 'export', '--platform', 'all'], { stdio: 'inherit' });
  } catch {
    // biome-ignore lint/suspicious/noConsole: CLI script.
    console.error('✗ `expo export` failed.');
    process.exit(1);
  }
}

// biome-ignore lint/suspicious/noConsole: CLI script.
console.warn('Bundle directory:', dist);
try {
  execFileSync('du', ['-sh', dist], { stdio: 'inherit' });
} catch {
  // ignore on platforms without `du`
}

// biome-ignore lint/suspicious/noConsole: CLI script.
console.warn('\nFor an interactive treemap, run:');
// biome-ignore lint/suspicious/noConsole: CLI script.
console.warn('  pnpm dlx react-native-bundle-visualizer --platform ios');
