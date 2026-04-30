# ADR 0001: pnpm as the package manager

- **Status**: Accepted
- **Date**: 2026-04-30

## Context

The forked Ignite template defaults to yarn. We needed to choose one canonical package manager for the starter and stick to it. Mixed package managers (yarn lockfile + npm install) is a well-documented source of "works on my machine" bugs.

Constraints:
- Must work with Expo's Metro resolver.
- Must support workspaces (in case projects later split into a monorepo, even though this starter is single-app).
- Must be fast — install is the most-repeated developer ritual.
- Must support strict version pinning (lockfile + `packageManager` field + corepack).

## Decision

**pnpm 9** is the canonical package manager for this starter. The `packageManager` field in `package.json` pins the version; `corepack` enforces it.

`.npmrc` configures:
- `node-linker=hoisted` — Expo's Metro resolver doesn't fully support pnpm's strict symlink layout. `hoisted` mimics yarn/npm `node_modules` structure.
- `auto-install-peers=true` — RN ecosystem has many implicit peer deps; auto-install reduces friction.
- `shamefully-hoist=true` — secondary safety net for components that reach into `node_modules` directly.

## Consequences

### Positive

- ~3× faster installs than npm; ~2× faster than yarn classic.
- Stricter dep resolution (still better than npm's flat-by-default).
- Single lockfile format (`pnpm-lock.yaml`); no yarn-vs-npm-vs-bun confusion.
- Workspace support if we later need it.
- Corepack pinning means engineers don't need to install pnpm globally.

### Negative / trade-offs

- `node-linker=hoisted` loses pnpm's main perf benefit (the symlink-based dep tree). We accept this for Expo compatibility.
- Some tooling (older CI config, some IDE plugins) assumes npm; engineers occasionally need to translate `npm i X` → `pnpm add X`.
- Native dev tooling (`pod install`, `gradle`) doesn't care, but the JS layer needs `pnpm install` first.

### Neutral

- Fresh team members must install via `corepack enable` (one extra step) but never deal with global pnpm versions.

## Alternatives considered

### A. Yarn 4 (Berry)

- Pros: Mature, Expo team has tested with it.
- Cons: Configuration complexity (PnP vs `node_modules`), historically rough in RN due to native module resolution. Slower than pnpm.
- Verdict: workable but less performant.

### B. Bun

- Pros: Very fast install + native bundler integration.
- Cons: Ecosystem maturity for RN is unproven; not officially supported by Expo as of SDK 55. Lockfile format incompatibility risks.
- Verdict: revisit in 12–18 months.

### C. npm

- Pros: Universal, no setup.
- Cons: Slowest of the four; weakest dep resolution. We can do better.
- Verdict: rejected.

## Notes / follow-ups

- Re-evaluate Bun in late 2026 once it has Expo support.
- If we later split into a monorepo: pnpm workspaces are the path of least resistance.
