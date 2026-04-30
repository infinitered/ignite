---
name: expo-deployment
description: EAS profiles, OTA updates, source maps, Sentry releases, store metadata
priority: high
---

# Expo deployment

## When to apply

- Setting up EAS for a new project
- Configuring build profiles (dev / preview / production)
- Pushing OTA updates
- Submitting to App Store / Play Store
- Wiring Sentry source-map upload

## EAS Build profiles

`eas.json` defines profiles. The starter ships:

```json
{
  "build": {
    "development":           { "developmentClient": true, "distribution": "internal", "ios": { "simulator": true } },
    "development:device":    { "developmentClient": true, "distribution": "internal" },
    "preview":               { "distribution": "store" },
    "preview:device":        { "distribution": "internal" },
    "production":            { "autoIncrement": true, "channel": "production" }
  }
}
```

Use:
- **development** — local sim, runs on `pnpm ios` / `pnpm android` after `eas build --profile development:device --local`.
- **preview** — internal QA / TestFlight + Play Internal Testing.
- **production** — App Store + Play Store. Auto-increments build numbers.

## OTA updates

`expo-updates` is wired. Push code-only changes (no native module additions) without a new store build:

```bash
eas update --branch production --message "Hotfix: …"
```

`runtimeVersion: { policy: 'appVersion' }` is set in `app.config.ts` — the OTA only applies to builds with the same app version. Bumping native deps requires a fresh native build.

## Sentry source maps

The `@sentry/react-native/expo` plugin uploads source maps automatically when `SENTRY_AUTH_TOKEN` is set. Required EAS secrets:

```bash
eas secret:create --scope project --name SENTRY_AUTH_TOKEN --type string --value $TOKEN
eas secret:create --scope project --name SENTRY_ORG --type string --value $ORG
eas secret:create --scope project --name SENTRY_PROJECT --type string --value $PROJECT
```

Verify after a build: open the Sentry release in the dashboard — should show source maps attached.

## Sentry release tagging

`app/lib/sentry.ts` tags every event with:

```
release: <bundleId>@<nativeAppVersion>+<nativeBuildVersion>
dist:    <Updates.updateId>            # OTA bundle ID
```

In CI, after a successful EAS Update, create a Sentry release manually if you want a "this OTA replaced the previous":

```bash
sentry-cli releases new "$RELEASE"
sentry-cli releases set-commits "$RELEASE" --auto
sentry-cli releases finalize "$RELEASE"
```

## App Store submission

```bash
eas build --platform ios --profile production
eas submit --platform ios --latest
```

App Store metadata in `store-config.json` (per-project; see Apple docs). Required since the starter doesn't ship metadata templates.

Required ASC env (in CI): `APPLE_ID`, `APPLE_TEAM_ID`, `ASC_APP_ID`, `APPLE_APP_SPECIFIC_PASSWORD`.

## Play Store submission

```bash
eas build --platform android --profile production
eas submit --platform android --latest --track internal
```

Play Console service account JSON: `eas credentials` → upload service account key.

## Store assets checklist

- App icon: `assets/images/app-icon-{ios,android-legacy,android-adaptive-foreground,android-adaptive-background}.png`
- Splash: `assets/images/splash-icon.png` (light + dark variants if needed)
- Screenshots: 6.7" / 6.5" / 6.1" / 5.5" iPhone, plus iPad if `supportsTablet: true`. Android: phone + tablet.
- Privacy nutrition labels (App Store) — fill in App Store Connect.
- Privacy manifest declarations: `app.config.ts` `ios.privacyManifests`.

## Required-reasons API (iOS 17+)

Whenever you add an API that uses one of Apple's "required reasons" categories (UserDefaults, system boot time, file timestamp, disk space, active keyboards), declare it in `app.config.ts` under `privacyManifests.NSPrivacyAccessedAPITypes`. Failing this fails App Review.

## Common mistakes

- ❌ Bumping a native dep and pushing an OTA — users on the previous binary crash on launch.
- ❌ Not running `eas-cli` doctor before submitting — surfaces config mismatches.
- ❌ Skipping `runtimeVersion` policy — risks pushing OTAs to incompatible binaries.
- ❌ Missing privacy manifest declarations — App Store rejects the binary.

## References

- `references/eas-recipes.md` — common EAS workflows
- `references/sentry-source-maps.md` — verifying upload
- `references/store-submission.md` — checklist
