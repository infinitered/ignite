# Day 1 — engineer onboarding

> Everything a new engineer needs to be productive in their first day. Read top-to-bottom.

## Hour 1 — environment

```bash
git clone <repo-url> && cd <repo>
corepack enable                       # pins pnpm to the version in packageManager
pnpm setup                            # installs deps, husky, copies .env.example → .env.local
```

Required:
- Node ≥ 20.18 (`.nvmrc` pins this; use `nvm use` or `fnm use`)
- pnpm 9 (via corepack — don't `npm i -g pnpm`)
- Xcode + iOS sim (macOS) or Android Studio + emulator
- Watchman (`brew install watchman`)
- `gitleaks` (`brew install gitleaks`) for local secret-scan
- EAS CLI: `pnpm add -g eas-cli` and `eas login`

Optional (for the AI workflow):
- Cursor (loads `.cursor/rules/` automatically)
- Claude Code (loads `CLAUDE.md` automatically; try `/onboard` in the repo)
- Reactotron desktop app (in-app debugger)

## Hour 2 — read these files

In this order (each is short — under 200 lines):

1. **[`README.md`](../README.md)** — what this template is and what it gives you.
2. **[`CLAUDE.md`](../CLAUDE.md)** — strategic principles + full rules section. **The most important file in the repo.**
3. **[`docs/ARCHITECTURE.md`](./ARCHITECTURE.md)** — folder structure, data flow.
4. **[`docs/CODE_STANDARDS.md`](./CODE_STANDARDS.md)** — naming, anti-patterns.
5. Pick **one skill** from `.claude/skills/` relevant to your first task and skim it.

## Hour 3 — boot the app

```bash
pnpm ios          # or pnpm android, pnpm web
```

The example screen demonstrates every load-bearing pattern:
- NativeWind classes (light + dark)
- Zustand counter persisted via MMKV
- TanStack Query call rendered with FlashList
- React Hook Form + Zod form
- expo-image with placeholder
- PostHog analytics event on submit
- OfflineBanner when network drops

Take 10 minutes to:
- Tap the increment button, kill the app, reopen — counter persists.
- Pull-to-refresh the list — TanStack Query refetches.
- Type an invalid email + submit — see the error live region.
- Toggle airplane mode — see the OfflineBanner.

## Hour 4 — first PR

Pick a tiny task: rename a label, add a stub screen, add an env key. The point is to walk the workflow.

```bash
# 1. Branch
git checkout -b feat/hello-world

# 2. Generate (don't hand-write)
pnpm gen screen HelloWorld

# 3. Wire into nav (CLAUDE.md /new-screen recipe)
# Edit app/navigators/AppNavigator.tsx + navigationTypes.ts
# Add i18n keys in app/i18n/en.ts

# 4. Verify
pnpm before-pr        # lint + typecheck + tests
pnpm ios              # smoke-test

# 5. Commit (Conventional Commits enforced)
git commit -am "feat(screen): add hello-world demo screen"

# 6. Push + open PR (use the template)
git push -u origin feat/hello-world
gh pr create
```

CI will run automatically. Address feedback. Squash-merge.

## Day 1 mental model

- **One opinionated way per concern.** Don't add a parallel implementation. If you want to change a convention, open a PR that updates the enforcement (Biome rule, generator template, husky hook) plus the prose in CLAUDE.md, with the rationale in the PR description.
- **Encode rules in tools.** If a rule isn't enforceable by Biome / Husky / CI / generators, it's just a hope. Make it real.
- **Server state vs. client state.** TanStack Query owns server state. Zustand owns ephemeral / UI state. Never duplicate.
- **Primitives only.** `@/components/*`, never raw `react-native` for `Text` / `Button` / `TextInput` / `FlatList` / `Image` / `SafeAreaView`. Biome blocks the violations.
- **All HTTP via `@/lib/api`.** Direct `axios` is blocked. The interceptor injects auth headers and normalizes errors.
- **All strings via i18next.** Hardcoded English in JSX is rejected at review.

## Where to ask for help

- `CLAUDE.md` first — it's the single source of truth.
- `.claude/skills/<topic>/SKILL.md` for depth on FPS, lists, queries, forms, deployment, testing.
- `docs/` for runbooks (Architecture, Standards, Security, Deployment, Testing).
- Team Slack / Discord (replace this with your team's channel).

## Cheat sheet

| Want to | Run |
|---|---|
| Generate a CRUD feature | `pnpm gen feature Profile` |
| Run dev sim | `pnpm ios` (or `pnpm android`, `pnpm web`) |
| Pre-flight before PR | `pnpm before-pr` |
| Find perf regressions | `pnpm bundle:analyze` + `/audit-perf` Claude command |
| Find a11y regressions | `/audit-a11y` Claude command |
| Find security issues | `/audit-security` Claude command |
| Generate a PR title + body | `/pr` Cursor command |
| Onboard a fresh AI session | `/onboard` Claude command |

Welcome aboard.
