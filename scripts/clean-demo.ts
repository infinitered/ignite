#!/usr/bin/env tsx
/**
 * Strip all reference / demo content from the starter, leaving the
 * structural skeleton ready for your first real feature.
 *
 * Usage:
 *   pnpm clean-demo
 *
 * Two markers are recognised:
 *   • `@demo remove-file`  — anywhere in a file → delete the file.
 *   • `@demo remove-block` … `@demo remove-block-end` (paired) → strip the
 *     block (inclusive of the marker lines).
 *
 * Refuses to run with a dirty working tree so you can review the diff.
 *
 * After running, expect TypeScript to flag a few orphan imports
 * (Example screen / counter actions). Fix those manually — the surface
 * is small and intentional, since your first screen will replace them.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, rmSync, rmdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const REPO_ROOT = process.cwd();

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.expo',
  'dist',
  'build',
  'ios',
  'android',
  'coverage',
  '.maestro/output',
]);

const FILE_MARKER = '@demo remove-file';
const BLOCK_OPEN = '@demo remove-block';
const BLOCK_CLOSE = '@demo remove-block-end';

function fail(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function info(msg: string): void {
  console.warn(msg);
}

function ensureCleanTree(): void {
  try {
    const out = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' });
    if (out.trim()) {
      fail('Working tree is dirty. Commit or stash first so the cleanup diff is reviewable.');
    }
  } catch {
    fail('Could not run `git status`. Are you inside a git checkout?');
  }
}

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (st.isFile()) files.push(full);
  }
  return files;
}

function stripBlocks(content: string): { next: string; removed: number } {
  const lines = content.split('\n');
  const out: string[] = [];
  let inside = false;
  let removed = 0;
  for (const line of lines) {
    const opens = line.includes(BLOCK_OPEN) && !line.includes(BLOCK_CLOSE);
    const closes = line.includes(BLOCK_CLOSE);
    if (opens) {
      inside = true;
      removed++;
      continue;
    }
    if (closes) {
      inside = false;
      removed++;
      continue;
    }
    if (inside) {
      removed++;
      continue;
    }
    out.push(line);
  }
  if (inside) fail('Unbalanced @demo remove-block — found opener with no matching end.');
  return { next: out.join('\n'), removed };
}

function tryRemoveEmptyAncestors(filePath: string): void {
  let dir = join(filePath, '..');
  while (dir.startsWith(REPO_ROOT) && dir !== REPO_ROOT) {
    try {
      const entries = readdirSync(dir);
      if (entries.length > 0) return;
      rmdirSync(dir);
      dir = join(dir, '..');
    } catch {
      return;
    }
  }
}

function main(): void {
  ensureCleanTree();

  const all = walk(REPO_ROOT);
  const toDelete: string[] = [];
  const toEdit: { path: string; next: string; removed: number }[] = [];

  for (const path of all) {
    const rel = relative(REPO_ROOT, path);
    if (rel === 'scripts/clean-demo.ts') continue; // never strip self

    let content: string;
    try {
      content = readFileSync(path, 'utf8');
    } catch {
      continue; // binary or unreadable — skip
    }
    if (!content.includes('@demo')) continue;

    if (content.includes(FILE_MARKER)) {
      toDelete.push(path);
      continue;
    }
    if (content.includes(BLOCK_OPEN)) {
      const { next, removed } = stripBlocks(content);
      if (removed > 0) toEdit.push({ path, next, removed });
    }
  }

  if (toDelete.length === 0 && toEdit.length === 0) {
    info('No @demo content found. Nothing to do.');
    return;
  }

  for (const path of toDelete) {
    rmSync(path);
    info(`✗ deleted  ${relative(REPO_ROOT, path)}`);
    tryRemoveEmptyAncestors(path);
  }

  for (const { path, next, removed } of toEdit) {
    writeFileSync(path, next);
    info(`✂ stripped ${removed} line(s) in ${relative(REPO_ROOT, path)}`);
  }

  info('');
  info(`✓ demo content removed (${toDelete.length} files, ${toEdit.length} edits).`);
  info('');
  info('Next steps:');
  info('  1. `pnpm tsc --noEmit` to surface orphan imports — clean them up.');
  info('  2. Add your first screen with `pnpm gen feature MyScreen`.');
  info('  3. Wire the new screen into `app/navigators/AppNavigator.tsx`.');
  info('  4. `pnpm before-pr` to verify the project is green.');
}

main();
