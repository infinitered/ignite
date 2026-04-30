#!/usr/bin/env tsx
/**
 * One-shot rename script. Updates the app name, slug, scheme, and bundle
 * identifier across the canonical config files.
 *
 * Usage:
 *   pnpm rename <NewName> [--bundle-id com.your.app] [--scheme yourscheme]
 *
 * Example:
 *   pnpm rename Acme --bundle-id com.acme.app --scheme acme
 *
 * Refuses to run with a dirty working tree (so you can review the diff).
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

type Args = {
  name: string;
  bundleId?: string;
  scheme?: string;
};

function parseArgs(argv: string[]): Args {
  const [name, ...rest] = argv;
  if (!name) fail('Missing <NewName>. Usage: pnpm rename <NewName> [--bundle-id …] [--scheme …]');

  const args: Args = { name };
  for (let i = 0; i < rest.length; i++) {
    const flag = rest[i];
    const value = rest[i + 1];
    if (flag === '--bundle-id' && value) {
      args.bundleId = value;
      i++;
    } else if (flag === '--scheme' && value) {
      args.scheme = value;
      i++;
    }
  }
  return args;
}

function fail(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function ok(msg: string): void {
  console.warn(`✓ ${msg}`);
}

function ensureCleanTree(): void {
  const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
  if (status) {
    fail(
      `Working tree is dirty. Commit or stash first so you can review the rename diff.\n${status}`
    );
  }
}

function toKebab(s: string): string {
  return s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
}

function patch(path: string, fn: (content: string) => string): void {
  const original = readFileSync(path, 'utf8');
  const next = fn(original);
  if (next === original) return;
  writeFileSync(path, next);
  ok(path);
}

const args = parseArgs(process.argv.slice(2));
ensureCleanTree();

const Pascal = args.name;
const kebab = toKebab(args.name);
const bundleId = args.bundleId ?? `com.example.${kebab.replace(/-/g, '')}`;
const scheme = args.scheme ?? kebab.replace(/-/g, '');

// package.json
patch(join('package.json'), (content) => {
  return content.replace(/"name":\s*".*?"/, `"name": "${kebab}"`);
});

// app.json
patch(join('app.json'), (content) =>
  content
    .replace(/"name":\s*".*?"/, `"name": "${Pascal}"`)
    .replace(/"slug":\s*".*?"/, `"slug": "${kebab}"`)
    .replace(/"scheme":\s*".*?"/, `"scheme": "${scheme}"`)
    .replace(/"package":\s*"[^"]*"/, `"package": "${bundleId}"`)
    .replace(/"bundleIdentifier":\s*"[^"]*"/, `"bundleIdentifier": "${bundleId}"`)
);

ok(`\nRenamed to "${Pascal}" (slug: ${kebab}, bundleId: ${bundleId}, scheme: ${scheme}).`);
ok('Next steps:');
ok('  1. Review the diff: git diff');
ok('  2. Update assets/images/ icons + splash to match the new brand');
ok('  3. If ios/ or android/ folders exist (you ran prebuild), run: npx expo prebuild --clean');
ok(`  4. Commit: git commit -am "chore(infra): rename to ${Pascal}"`);
