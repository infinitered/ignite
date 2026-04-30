---
description: Pre-flight check before opening a PR — lint + typecheck + tests + Maestro smoke.
---

# /before-pr

Run the full pre-PR gauntlet. If anything fails, fix it before opening the PR.

## Steps

```bash
pnpm before-pr                                  # lint + typecheck + tests
pnpm test:e2e --include-tags smoke              # Maestro smoke flows (requires sim/device)
pnpm bundle:check                               # bundle-size budget
```

## What "good" looks like

```
✔ Biome — 0 errors, 0 warnings
✔ tsc --noEmit — 0 errors
✔ Jest — N tests passed
✔ Maestro smoke — all flows green
✔ Bundle — under budget (4 MB iOS / 5 MB Android)
```

## If something is red

- **Biome error** → run `pnpm lint:fix` for auto-fixable; manually address `noRestrictedImports` violations (don't disable the rule).
- **TS error** → fix the type. Resist the urge to `// @ts-expect-error` — leave a comment about why if you must.
- **Test failure** → reproduce locally; fix the bug, not the test.
- **Maestro flake** → check `.maestro/flows/` selectors. Add `extendedWaitUntil` for known-slow steps; never absolute waits.
- **Bundle over budget** → run `pnpm bundle:analyze` to see who's at fault. Common culprits: whole-library imports, duplicate deps, large assets.

## Final checklist (manual)

- [ ] All four UI states handled (loading, empty, error, populated) for any new screen
- [ ] Every `Pressable` has `accessibilityRole` + `accessibilityLabel`
- [ ] Every user-visible string uses `translate()` or the `tx` prop
- [ ] Sentry / PostHog events documented in PR body (if added)
- [ ] Screenshots attached (iOS + Android) for UI changes
- [ ] PR title follows Conventional Commits

Then: `/pr` (Cursor command) to generate title + body, or `gh pr create` directly.
