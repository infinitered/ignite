---
description: Load the project context — CLAUDE.md, all 8 skills, key files. Print stack summary.
---

# /onboard — orient yourself in this repo

Read these files in order. After each, summarize back what you learned in 1-2 lines so the user can confirm.

1. **`CLAUDE.md`** — system prompt + locked-in rules. (~250 lines)
2. **`AGENTS.md`** — quick map for non-Claude agents.
3. **`docs/ARCHITECTURE.md`** — folder structure + data flow diagram.
4. **`docs/CODE_STANDARDS.md`** — naming, file shape, anti-patterns.
5. **`tailwind.config.js`** — design-system tokens.
6. **`biome.json`** — lint rules including `noRestrictedImports`.
7. **`app/lib/api.ts`** — central HTTP client.
8. **`app/app.tsx`** — provider tree + boot order.
9. **`app/screens/example/ExampleScreen.tsx`** — canonical screen patterns.
10. **All 8 `.claude/skills/<name>/SKILL.md`** — depth-first techniques. Read summaries; you can drill into `references/` later when you hit those topics.

Then run:

```bash
pnpm doctor                # surface env / version mismatches
git log --oneline -10      # recent activity
```

Finally, print:

```
Stack: Expo SDK 55 · RN 0.83 · React 19 · TS strict · Zustand · TanStack Query · axios · RHF + Zod · NativeWind v4 · FlashList · expo-image · MMKV + expo-secure-store · Sentry · PostHog · Biome · MSW · Maestro · EAS · pnpm

Skills loaded: react-native-best-practices, building-native-ui, native-data-fetching, state-with-zustand, forms-with-rhf-zod, expo-deployment, e2e-testing-patterns, typescript-advanced-types

Commands: /onboard /new-screen /new-feature /audit-perf /audit-a11y /audit-security /before-pr
Agents:   rn-perf-auditor, a11y-auditor, dependency-upgrader, security-auditor

Ready.
```
