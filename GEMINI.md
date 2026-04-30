# GEMINI.md — Entry point for Gemini CLI

> **Read [`CLAUDE.md`](./CLAUDE.md) first.** It is the system prompt for every assistant working in this repo. This file is a Gemini-specific shim — orientation, quickstart, and tool-use tips.

This is a FAANG-quality Expo + React Native starter. Conventions are enforced by tools (Biome, Husky, commitlint, gitleaks, CI), not just prose — so following them is mostly a matter of running the right scripts and trusting the gates.

## Stack one-liner

Expo SDK 55 · RN 0.83 · React 19 · TS 5.9 strict · Hermes + New Architecture · Zustand · TanStack Query · axios · RHF + Zod · NativeWind v4 · FlashList · expo-image · MMKV + expo-secure-store · Sentry · PostHog · Biome · Jest + RTL + MSW · Maestro · EAS · pnpm.

## A 60-second tour (the 3 paths to know)

| Path | What's there |
| --- | --- |
| [`app/`](./app/) | All product code. `components/` (custom primitives — never use raw RN equivalents), `screens/{feature}/`, `lib/` (api.ts, queryClient, storage, secureStorage, logger), `services/` (sentry, notifications, analytics), `stores/` (Zustand), `queries/` (TanStack Query), `i18n/`, `config/env.ts` (Zod-validated env). |
| [`.claude/`](./.claude/) | `skills/` (8 in-depth guides — Gemini reads these as plain markdown), `commands/` (slash commands like `/onboard`, `/before-pr`), `agents/` (subagent definitions). |
| [`docs/`](./docs/) | Hand-written architecture, code standards, security, deployment, testing, production checklist, and onboarding guide. |

## Quickstart in this repo

```bash
pnpm setup            # one-shot bootstrap (deps, husky, .env.local)
pnpm ios              # or pnpm android, pnpm web
pnpm gen feature MyScreen   # scaffold store + service + query + screen
pnpm before-pr        # lint + typecheck + tests — must be green before PR
```

If `pnpm before-pr` is red, the change is not done. Don't propose a PR.

## Gemini-specific notes

- **Read files in full before editing.** Partial reads have been a frequent source of stale-context bugs. Use the repo browser tool, not summary fetches.
- **Always shell with `pnpm`** (this repo uses pnpm 9). Don't switch to `npm` or `yarn` even for one-offs — `pnpm-lock.yaml` is the truth.
- **Don't auto-format whole files.** Biome runs on commit via lint-staged; a sweep on every save creates noise diffs. Touch only the lines you need to change.
- **Respect the strict TS settings** — this repo enables `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. Don't suggest weakening tsconfig to make an error go away; refactor the call site.
- **Prefer the generators over hand-written boilerplate.** `pnpm gen <kind> <Name>` produces files that already follow the conventions. Hand-rolling a screen will almost always miss something the template gets right.

## Hard rules (the short list — full set in CLAUDE.md)

- Use `@/components/*` primitives. Never raw `react-native` `Text` / `Button` / `TextInput` / `FlatList` / `Image` / `SafeAreaView` (Biome blocks them).
- All HTTP goes through `@/lib/api`. Direct `axios` / `fetch` outside that file is blocked by Biome.
- Validate every external response with Zod via `getValidated(url, schema)`.
- Auth tokens via `expo-secure-store` only. Non-secret prefs via MMKV. Never the reverse.
- Theme tokens live in `tailwind.config.js`. No hex/spacing literals in JSX.
- Every user-visible string goes through `translate()` or the `tx` prop.
- Every `Pressable` has `accessibilityRole` + `accessibilityLabel`.

## When stuck

1. Check [`CLAUDE.md`](./CLAUDE.md) — most "is this allowed?" questions are answered there.
2. Check `.claude/skills/<topic>/SKILL.md` for depth on the 8 covered topics.
3. Check [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for the folder map and data-flow diagram.
4. Read the existing `app/screens/example/ExampleScreen.tsx` — it demonstrates every load-bearing pattern in one screen.

If something in the docs disagrees with the code, the code wins — open a PR to fix the doc.
