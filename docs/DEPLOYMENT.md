# Deployment

> EAS profiles, OTA updates, source maps, store submission. Deeper recipes in the `expo-deployment` skill.

## EAS profiles

`eas.json` defines four profiles:

| Profile | Use | Distribution | Auto-increment |
|---|---|---|---|
| `development` | Local sim with dev-client | internal | no |
| `development:device` | Real device with dev-client | internal | no |
| `preview` | TestFlight / Play Internal QA | store | no |
| `preview:device` | Real device QA build | internal | no |
| `production` | App Store / Play Store | store | **yes** |

Build:

```bash
pnpm build:ios:preview        # local IPA (or `eas build --platform ios --profile preview --local`)
pnpm build:android:preview
pnpm build:ios:prod
```

CI: `.github/workflows/eas-build.yml` (`workflow_dispatch` with profile + platform inputs).

## Required secrets

| Secret | Where used | How to set |
|---|---|---|
| `EXPO_TOKEN` | EAS CLI auth | `eas secret:create` or GH Actions secret |
| `SENTRY_AUTH_TOKEN` | Source-map upload | EAS secret + GH Actions |
| `SENTRY_ORG`, `SENTRY_PROJECT` | Sentry plugin in `app.config.ts` | EAS secret + GH Actions |
| `EXPO_PUBLIC_EAS_PROJECT_ID` | Push token registration | `.env.local` (public) |
| `APPLE_ID`, `APPLE_TEAM_ID`, `ASC_APP_ID`, `APPLE_APP_SPECIFIC_PASSWORD` | iOS submit | EAS secret |
| (Play submit) Service account JSON | Android submit | `eas credentials` |
| `SNYK_TOKEN`, `MAESTRO_CLOUD_API_KEY`, `CODECOV_TOKEN` | CI workflows | GH Actions secret |

Set EAS secrets:

```bash
eas secret:create --scope project --name SENTRY_AUTH_TOKEN --type string --value "$TOKEN"
eas secret:create --scope project --name SENTRY_ORG       --type string --value "$ORG"
eas secret:create --scope project --name SENTRY_PROJECT   --type string --value "$PROJECT"
```

## OTA updates

```bash
eas update --branch production --message "Hotfix: corrected price formatter"
```

`runtimeVersion: { policy: 'appVersion' }` is set in `app.config.ts` — OTAs apply only to builds with the matching app version. Bumping a native dep ⇒ requires a fresh native build, not an OTA. Pushing an OTA to a binary with a mismatched native dep crashes users on launch.

## Sentry

- Source-map upload: automatic via the `@sentry/react-native/expo` plugin during production / preview builds when `SENTRY_AUTH_TOKEN` is set.
- Release tagging: `app/services/sentry.ts` tags every event with `release: <bundleId>@<nativeAppVersion>+<nativeBuildVersion>` and `dist: <Updates.updateId>` (the OTA bundle id).
- Verify after build: open the Sentry release page → "Source Maps" tab — should show JS + native sourcemaps attached.

For OTA-only releases (no rebuild), create a Sentry release entry post-update:

```bash
sentry-cli releases new "<bundleId>@<version>+<build>"
sentry-cli releases set-commits "<bundleId>@<version>+<build>" --auto
sentry-cli releases finalize "<bundleId>@<version>+<build>"
```

## App Store submission

```bash
eas build --platform ios --profile production
eas submit --platform ios --latest
```

App Store Connect:
1. Create the app entry (one-time): bundle id, name, primary category.
2. Privacy nutrition labels — fill from `app.config.ts` `ios.privacyManifests` declarations.
3. Screenshots: 6.7" / 6.5" / 6.1" / 5.5" iPhone; iPad if `supportsTablet: true`.
4. App Review notes: how to test, any demo credentials.
5. Submit for review.

## Play Store submission

```bash
eas build --platform android --profile production
eas submit --platform android --latest --track internal  # → "internal" → "alpha" → "beta" → "production"
```

Play Console:
1. App entry one-time setup.
2. Service account JSON: `eas credentials` → upload.
3. Screenshots: phone + tablet (if applicable).
4. Data safety form (Play's privacy declaration) — keep aligned with the iOS privacy manifest.
5. Roll out incrementally (10% → 25% → 50% → 100%) for production releases.

## Privacy manifest gotcha (iOS 17+)

Whenever you adopt an API in Apple's "required reasons" categories, declare it in `app.config.ts` `ios.privacyManifests`:
- `NSPrivacyAccessedAPICategoryUserDefaults` (we use this)
- `NSPrivacyAccessedAPICategoryFileTimestamp`
- `NSPrivacyAccessedAPICategorySystemBootTime`
- `NSPrivacyAccessedAPICategoryDiskSpace`
- `NSPrivacyAccessedAPICategoryActiveKeyboards`

Failing to declare = App Review rejection.

## Release runbook

1. Cut a release branch: `git checkout -b release/v0.x.0`.
2. Bump `version` in `package.json` + `app.json`.
3. Update `CHANGELOG.md` (manual until `release-please` is wired).
4. Run `pnpm before-pr`, run Maestro full suite locally.
5. PR + merge.
6. Tag: `git tag v0.x.0 && git push --tags`.
7. Trigger `eas-build.yml` for production.
8. Monitor build → submit → review.
9. Post-launch: watch Sentry / PostHog dashboards for the first 48h.

## Rollback

- **JS-only regression**: `eas update --branch production --message "Rollback to v0.x.0"` with the previous bundle.
- **Native regression on iOS**: pull the binary from review (if not yet released) or expedite a hotfix build.
- **Already on the store**: ship a fix; you cannot un-ship a binary.
- **Post-incident**: write a postmortem (cause, mitigation, prevention) in the rollback PR description. Link it from the Sentry release notes.
