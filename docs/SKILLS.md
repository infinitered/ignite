# Skills, commands, and agents

> Index of the AI-tooling surface. The substance of each skill lives in `.agents/skills/<name>/SKILL.md` (symlinked at `.claude/skills/`).

## Skills (8)

Read the skill file when starting unfamiliar work. Each starts with a one-line summary and the priorities ranked CRITICAL / HIGH / MEDIUM.

| Skill | When to read |
|---|---|
| [`react-native-best-practices`](../.claude/skills/react-native-best-practices/SKILL.md) | FPS / re-renders / bundle / TTI / native modules / New Architecture |
| [`building-native-ui`](../.claude/skills/building-native-ui/SKILL.md) | Designing components, NativeWind patterns, dark mode, RTL, animations |
| [`native-data-fetching`](../.claude/skills/native-data-fetching/SKILL.md) | TanStack Query: queryKeys, mutations, optimistic, infinite, offline |
| [`state-with-zustand`](../.claude/skills/state-with-zustand/SKILL.md) | Slice composition, MMKV vs SecureStore, selectors, TS inference |
| [`forms-with-rhf-zod`](../.claude/skills/forms-with-rhf-zod/SKILL.md) | Form schemas, `Controller` for RN inputs, async validation |
| [`expo-deployment`](../.claude/skills/expo-deployment/SKILL.md) | EAS profiles, OTA, source maps, store submission |
| [`e2e-testing-patterns`](../.claude/skills/e2e-testing-patterns/SKILL.md) | Maestro flows, accessibility-id selectors, smoke vs full suites |
| [`typescript-advanced-types`](../.claude/skills/typescript-advanced-types/SKILL.md) | Branded types, exhaustive switches, `satisfies`, route param typing |

## Slash commands (Claude Code, 7)

Type `/<name>` in a Claude session.

| Command | What it does |
|---|---|
| `/onboard` | Loads CLAUDE.md, all skills, key files; prints a stack summary |
| `/new-screen <Name>` | Generates a screen + nav entry + i18n keys |
| `/new-feature <Name>` | Composite: store + service + query + screen + nav + i18n + test |
| `/audit-perf` | Re-renders, list virtualization, image sizing, bundle inspection |
| `/audit-a11y` | Labels, roles, contrast, hit-slop, reduce-motion |
| `/audit-security` | Env handling, token paths, secret leaks, dep CVEs |
| `/before-pr` | Runs lint + typecheck + tests + Maestro smoke |

## Cursor commands (1)

| Command | What it does |
|---|---|
| `/pr` | Generate Conventional-Commits PR title + body, save to `.cursor/PR_TITLE` & `.cursor/PR_DRAFT.md` |

## Subagents (Claude Code, 4)

Specialized agents for deep audits. Invoke via the Task tool when applicable.

| Agent | Use case |
|---|---|
| `rn-perf-auditor` | Surgical perf audit — flags re-renders, lists, images, animations, bundle |
| `a11y-auditor` | Surgical a11y audit — labels, roles, contrast, hit-slop, live regions |
| `dependency-upgrader` | Risk-grouped pnpm bumps with changelog excerpts and migration notes |
| `security-auditor` | Security audit — secrets, env, CVEs, OWASP-mobile-top-10 |

## Cursor rules (6 `.mdc` files)

Auto-loaded by Cursor based on glob:

| File | Glob | Purpose |
|---|---|---|
| `core.mdc` | `**/*` | Core rules slimmed for context budget |
| `native-app.mdc` | `app/**/*` | RN/Expo specifics, screen grouping, data flow |
| `testing.mdc` | `**/*.test.{ts,tsx}` | Jest + RTL + MSW + Maestro patterns |
| `security.mdc` | `**/*` | Secrets, env, OWASP-mobile-top-10 |
| `styling.mdc` | `app/**/*.{ts,tsx}` | NativeWind v4, `tv()`, dark mode, RTL |
| `accessibility.mdc` | `app/**/*.tsx` | Labels, roles, contrast, hit-slop |

## Top-level system prompts

- [`../CLAUDE.md`](../CLAUDE.md) — Claude Code (full rules)
- [`../AGENTS.md`](../AGENTS.md) — Codex / Aider / Cline / Antigravity (delegates to CLAUDE)
- [`../GEMINI.md`](../GEMINI.md) — Gemini CLI
- [`../.github/copilot-instructions.md`](../.github/copilot-instructions.md) — GitHub Copilot

## Editing the skills/rules

If a rule changes, update the **enforcement** first (Biome, hooks, generators), then the prose in CLAUDE.md, then the relevant `.cursor/rules/*.mdc`, then the relevant skill file. Document the *why* as an ADR in `docs/decisions/`.

If the prose disagrees with the code, the code wins.
