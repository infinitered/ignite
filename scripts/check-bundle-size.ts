#!/usr/bin/env tsx
/**
 * Bundle-size budget gate. Runs in CI; fails if the production JS bundle
 * exceeds the per-platform budget.
 *
 * This is a stub. Wire it up per-project when you have a baseline:
 *   1. Run `pnpm bundle:analyze` once to get current size.
 *   2. Set IOS_BUDGET_BYTES / ANDROID_BUDGET_BYTES below.
 *   3. Adjust `expo export` invocation to your needs.
 *
 * For now, this exits 0 so CI passes — bumping the gate to a real check
 * happens once the team agrees on a baseline (file an ADR if you tighten).
 */
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const IOS_BUDGET_BYTES = 4 * 1024 * 1024; // 4 MB
const ANDROID_BUDGET_BYTES = 5 * 1024 * 1024; // 5 MB

const dist = join(process.cwd(), 'dist');
if (!existsSync(dist)) {
  // biome-ignore lint/suspicious/noConsole: CLI script.
  console.warn('ℹ️  No `dist/` found. Run `npx expo export` first to produce a bundle.');
  // biome-ignore lint/suspicious/noConsole: CLI script.
  console.warn('   Skipping bundle-size gate. (Set up the gate per-project.)');
  process.exit(0);
}

function reportPlatform(name: 'ios' | 'android', budget: number) {
  const platformDir = join(dist, '_expo', 'static', 'js', name);
  if (!existsSync(platformDir)) {
    // biome-ignore lint/suspicious/noConsole: CLI script.
    console.warn(`ℹ️  No bundle found for ${name}, skipping.`);
    return true;
  }
  const stats = statSync(platformDir);
  const bytes = stats.size;
  const mb = (bytes / 1024 / 1024).toFixed(2);
  const budgetMb = (budget / 1024 / 1024).toFixed(2);
  if (bytes > budget) {
    // biome-ignore lint/suspicious/noConsole: CLI script.
    console.error(`✗ ${name} bundle (${mb} MB) exceeds budget (${budgetMb} MB).`);
    return false;
  }
  // biome-ignore lint/suspicious/noConsole: CLI script.
  console.warn(`✓ ${name} bundle: ${mb} MB / ${budgetMb} MB`);
  return true;
}

const ok = [reportPlatform('ios', IOS_BUDGET_BYTES), reportPlatform('android', ANDROID_BUDGET_BYTES)].every(Boolean);

process.exit(ok ? 0 : 1);
