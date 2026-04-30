# AGENTS.md — Entry point for Codex / Aider / Cline / Antigravity / non-Claude agents

> **Read [`CLAUDE.md`](./CLAUDE.md) first.** Everything below assumes you have. This file is a quick map and a checklist; the *rules* live in `CLAUDE.md`.

---

## What this repo is

A FAANG-quality, SaaS-ready, context-engineered Expo + React Native starter template. Clone-and-go: rename → install → start coding. Code generated on top must default to production-grade quality because the rules are encoded in tools (Biome, Husky, CI, generators), not just documentation.

## Stack one-liner

Expo SDK 55 · RN 0.83 · React 19 · TS 5.9 strict · Hermes + New Arch · Zustand · TanStack Query · axios · RHF + Zod · NativeWind v4 · FlashList · expo-image · MMKV + expo-secure-store · Sentry · PostHog · Biome · Jest + RTL + MSW · Maestro · EAS · pnpm.

---

## The 5 files you must read before editing

1. **[`CLAUDE.md`](./CLAUDE.md)** — full rules and architecture.
2. **[`app/lib/api.ts`](./app/lib/api.ts)** — all HTTP goes through here.
3. **[`app/app.tsx`](./app/app.tsx)** — provider tree and boot order.
4. **[`tailwind.config.js`](./tailwind.config.js)** — theme tokens (single source of truth).
5. **[`biome.json`](./biome.json)** — lint rules including `noRestrictedImports`.

## The 5 commands you must run before claiming done

```bash
pnpm lint          # Biome, fails on style/lint violations
pnpm typecheck     # tsc --noEmit, strict
pnpm test          # Jest + RTL with MSW network mocking
pnpm before-pr     # chains all of the above
pnpm gen <kind> <Name>   # use generators; don't hand-write boilerplate
```

## Definition of "done"

- ✅ `pnpm before-pr` passes (lint + typecheck + tests).
- ✅ All four UI states handled in any new screen (loading, empty, error, populated).
- ✅ Every `Pressable` has `accessibilityRole` + `accessibilityLabel`.
- ✅ Every user-visible string uses `translate()` or the `tx` prop — no hardcoded English.
- ✅ Bundle size delta documented in PR description if dependency added.
- ✅ Conventional Commits format: `type(scope): description`.

## Where the rules live (executable, not just prose)

| Concern | Enforced by |
|---|---|
| No raw RN primitives, no raw `axios`/`fetch`, no `console.log` | `biome.json` `noRestrictedImports` |
| Conventional commits | `commitlint.config.js` (commit-msg hook) |
| Auto-format on commit | `.lintstagedrc.json` + `.husky/pre-commit` |
| No committed secrets | `.gitleaks.toml` (pre-commit) |
| Type safety | `tsconfig.json` strict++ |
| Bundle size budget | `.github/workflows/ci.yml` |
| Security scanning | `.github/workflows/security.yml` (CodeQL, Snyk, gitleaks) |
| Accessibility regression | `.github/workflows/a11y.yml` (Maestro a11y flows) |

## Pointer to docs

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md), [`docs/CODE_STANDARDS.md`](./docs/CODE_STANDARDS.md), [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md)
- [`docs/SECURITY.md`](./docs/SECURITY.md), [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md), [`docs/TESTING.md`](./docs/TESTING.md)
- [`docs/PRODUCTION_CHECKLIST.md`](./docs/PRODUCTION_CHECKLIST.md), [`docs/ONBOARDING.md`](./docs/ONBOARDING.md)
- [`.claude/skills/`](./.claude/skills/) — depth-first technique guides
