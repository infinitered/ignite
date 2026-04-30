# GEMINI.md — Entry point for Gemini CLI

> **Read [`CLAUDE.md`](./CLAUDE.md) first.** It contains the full system prompt. This file is a Gemini-specific shim.

This is a FAANG-quality Expo + React Native starter. The conventions are enforced by tools (Biome, Husky, CI), not just prose — so following them is mostly a matter of running the right scripts.

## Quick map

- Stack: Expo SDK 55, RN 0.83, React 19, TypeScript strict, Zustand, TanStack Query, axios, RHF + Zod, NativeWind v4, FlashList, Sentry, PostHog, Biome, MSW, Maestro, EAS, pnpm.
- Source root: `app/`. Read [`CLAUDE.md`](./CLAUDE.md) §"App layout" for the directory contract.
- Theme tokens: `tailwind.config.js` is the single source of truth — never hardcode hex/spacing.
- HTTP: only via `@/lib/api` (axios instance with auth + error interceptors). Biome blocks direct `axios`/`fetch`.

## Gemini-specific notes

- **File reading**: prefer the repo browser to fetch files in full before editing — partial reads have been a frequent source of stale-context bugs.
- **Tool use**: when running shell, prefix with `pnpm` (this repo uses pnpm 9). Don't switch to `npm` or `yarn` even for one-offs — pnpm-lock.yaml is the truth.
- **Don't auto-fix lint by reformatting whole files**; Biome runs on commit via lint-staged. Touch only what you need to change.

## Required commands before claiming done

```bash
pnpm before-pr     # lint + typecheck + tests
```

If `pnpm before-pr` is red, the change is not done. Don't propose a PR.

## Where to look when stuck

- [`CLAUDE.md`](./CLAUDE.md) §Rules — non-negotiables
- `.claude/skills/<topic>/SKILL.md` — depth-first guides for each domain
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — folder map + data flow
- [`docs/decisions/`](./docs/decisions/) — why each foundational choice was made
