# Contributing

See [`docs/CONTRIBUTING.md`](../docs/CONTRIBUTING.md) for the full developer guide (setup, commit + PR workflow, code review checklist).

## Quick reference

- Read [`CLAUDE.md`](../CLAUDE.md) before your first PR — it's the source of truth for conventions.
- Run `pnpm before-pr` (lint + typecheck + tests) before opening a PR.
- Conventional Commits: `type(scope): description`.
- Every interactive control needs `accessibilityRole` + `accessibilityLabel`.
- Every user-visible string goes through `translate()` / `tx`.
- No raw `react-native` `Text` / `Button` / `TextInput` / `FlatList` / `Image` / `SafeAreaView` — use `@/components/*`.
- No raw `axios` / `fetch` outside `app/lib/api.ts`.

If anything in the docs disagrees with the code, the code wins — open a PR to fix the doc.
