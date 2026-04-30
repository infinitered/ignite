# Contributing

## Local dev setup

```bash
git clone <repo-url>
cd <repo>
corepack enable
pnpm setup
pnpm rename MyApp --bundle-id com.your.app  # if it's a fresh project
pnpm ios   # or pnpm android, pnpm web
```

Required tools:
- **Node** ≥ 20.18 (use `.nvmrc`).
- **pnpm** ≥ 9 (via corepack — don't `npm i -g pnpm`).
- **Xcode** + iOS sim (macOS) for iOS builds.
- **Android Studio** + emulator for Android builds.
- **Watchman** (`brew install watchman`) — much faster file watching.
- **gitleaks** (`brew install gitleaks`) — local pre-commit secret scan.
- **EAS CLI** (`pnpm add -g eas-cli`) for builds.

## Branch naming

`<type>/<short-kebab-description>`:
- `feat/profile-screen`
- `fix/login-rtl-layout`
- `chore/upgrade-tanstack-query`
- `docs/architecture-revision`

## Commit format (Conventional Commits)

```
type(scope): description
```

- **types**: `feat | fix | chore | refactor | perf | docs | test | ci | build`
- **scopes**: `screen | store | query | service | nav | theme | i18n | auth | api | components | hooks | lib | infra | docs | deps | ci | release | a11y | perf | security`
- **description**: imperative ("add" not "added"), no trailing period.

Examples:
- `feat(screen): add profile screen with edit flow`
- `fix(api): retry on 503 with exponential backoff`
- `perf(query): memoize post list renderer`

Body and footers are optional; use them for migration notes / breaking-change callouts.

## PR workflow

1. Branch off `main` (or `master`).
2. Implement. Use `pnpm gen <kind> <Name>` for new modules — don't hand-write boilerplate.
3. Run **`pnpm before-pr`** and fix anything red.
4. For UI changes: smoke-test on iOS *and* Android. Capture screenshots.
5. **`/pr`** in Cursor (or write the PR manually) to generate title + body.
6. Open PR. Use the template — fill every section.
7. Ensure CI is green:
   - `ci.yml` (Biome, TS, tests, bundle, expo-doctor, SBOM)
   - `security.yml` (CodeQL, gitleaks, optionally Snyk)
   - `a11y.yml` (Maestro a11y flows; nightly + manual)
8. Address review comments; squash if requested.
9. Merge via "Squash and merge" by default.

## Code review checklist

Reviewers should verify:

- [ ] No raw `react-native` `Text`/`Button`/`TextInput`/`FlatList`/`Image`/`SafeAreaView` imports.
- [ ] No raw `axios`/`fetch` outside `app/lib/api.ts`.
- [ ] No hardcoded colors / hex / spacing literals.
- [ ] All user-visible strings via `translate()` / `tx`.
- [ ] Every `Pressable` has `accessibilityRole` + `accessibilityLabel`.
- [ ] All four UI states handled in any new screen (loading, empty, error, populated).
- [ ] Tests added/updated. MSW used for HTTP mocking.
- [ ] PR body has Test plan + screenshots + bundle delta (if dep added).
- [ ] Conventional Commits format on all commits.

## Skipping hooks

Don't. `--no-verify` bypasses lint/format/secret checks and creates a tax debt that someone else pays. If a hook is genuinely wrong, fix the hook in the same PR.

## Releasing

Release automation (`release-please`) is intentionally deferred. For now, manual releases:

1. Bump `version` in `package.json` + `app.json`.
2. Run `eas build --profile production --platform all`.
3. After build success: `eas submit --profile production --latest`.
4. Tag the release: `git tag v0.x.y && git push --tags`.
5. Add a Sentry release entry: `sentry-cli releases new "<bundleId>@<version>+<build>"`.

Add `release-please` (or `changesets`) once the repo is in active multi-project use. The deferred rationale: until the repo has a release cadence, the tooling churn isn't worth the savings.

## Updating the rules

Conventions evolve. To change a rule:

1. **Update the enforcement** first (Biome rule, husky hook, CI step, generator template).
2. **Update the prose** in `CLAUDE.md`, `.cursor/rules/`, `docs/CODE_STANDARDS.md`.
3. **Document the rationale** in the PR description (the why, the alternatives considered, the trade-off accepted).

If the prose disagrees with the code, the code wins.
