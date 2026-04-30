# Production checklist

> Pre-launch verification. Walk this top-to-bottom before submitting v1.0.0.

## Environment

- [ ] `.env.local` complete; no leftover placeholder values
- [ ] EAS secrets set: `EXPO_TOKEN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`
- [ ] App Store Connect / Play Console credentials configured
- [ ] `app.json` `version`, `bundleIdentifier`, `package` reflect the production identity
- [ ] `runtimeVersion: { policy: 'appVersion' }` set (already configured)

## Brand & assets

- [ ] App icon: iOS, Android (legacy + adaptive foreground/background), web favicon
- [ ] Splash screen image + background color
- [ ] App name in App Store / Play Store matches the binary
- [ ] Screenshots: 6.7" / 6.5" / 6.1" / 5.5" iPhone (and iPad if `supportsTablet: true`); Android phone + tablet
- [ ] Promotional graphic (Android Play Store)
- [ ] App description, keywords, support URL filled in stores

## Performance

- [ ] `pnpm bundle:check` passes — under 4 MB iOS / 5 MB Android JS bundle
- [ ] TTI ≤ 2 s on a mid-tier Android (Pixel 5 baseline)
- [ ] All long lists use `<ListView />` (FlashList) with correct `estimatedItemSize`
- [ ] `expo-image` + `placeholder` (blurhash) on every network image
- [ ] No `console.log` in production paths (Biome warns)
- [ ] No Reactotron in production builds (gated on `__DEV__`)
- [ ] Hermes ON, New Architecture ON, ProGuard ON (Android)

## Accessibility

- [ ] Every Pressable: `accessibilityRole` + `accessibilityLabel`
- [ ] All four UI states handled in every screen (loading, empty, error, populated)
- [ ] Color contrast ≥ 4.5:1 (verified with the Accessibility Inspector / a11y CLI tool)
- [ ] VoiceOver pass on every primary user flow (iOS)
- [ ] TalkBack pass on every primary user flow (Android)
- [ ] Reduce Motion respected for decorative animations
- [ ] Maestro a11y flows green (`pnpm test:e2e --include-tags a11y`)

## Internationalization

- [ ] All user-visible strings via `translate()` / `tx`
- [ ] At least one RTL language tested end-to-end if you ship to RTL markets
- [ ] Date/number formatting via `expo-localization` / `Intl` (not hardcoded)
- [ ] Pluralization handled with i18next interpolation

## Crash reporting + analytics

- [ ] Sentry receives events from production (test with a deliberate throw in dev → verify in dashboard)
- [ ] Sentry release tagging works (release page shows source maps attached)
- [ ] PostHog `track()` events for the critical funnel (e.g., signup, first action, purchase)
- [ ] PostHog `identify()` only after consent
- [ ] Analytics event names documented in `docs/ANALYTICS.md` (per-project)

## Security

- [ ] No `.env*` committed (gitleaks scan clean)
- [ ] All HTTP via `@/lib/api`; no `http://` URLs anywhere
- [ ] Auth tokens via SecureStore only — audit:
      `grep -rE '(token|secret|key|password|bearer)' app/stores/`
- [ ] HTTPS only (`usesCleartextTraffic: false` enforced)
- [ ] `pnpm audit` — no critical / high vulns
- [ ] CodeQL workflow green
- [ ] Privacy manifest declarations cover all in-use APIs

## Privacy & legal

- [ ] Privacy policy URL filled in stores
- [ ] Terms of service URL filled in stores
- [ ] App Store privacy nutrition labels match real data collection
- [ ] Play Store data safety form matches real data collection
- [ ] GDPR / CCPA compliance: "delete my data" path implemented + tested
- [ ] Consent flow before analytics `identify` / Sentry user attribution
- [ ] Cookie / tracking disclosure if applicable (web)

## App Store / Play Store metadata

- [ ] Age rating set
- [ ] Content rating questionnaire complete (Play)
- [ ] Export compliance: "Does your app use encryption?" answered (App Store)
- [ ] In-app purchase products configured (if applicable)
- [ ] Subscription products configured + tested (if applicable)
- [ ] App Review notes: how to test, demo credentials (NOT real prod data)

## Build verification

- [ ] `eas-build.yml` production build succeeds for both iOS + Android
- [ ] TestFlight build installable + functional on a real iPhone
- [ ] Play Internal Testing build installable + functional on a real Android
- [ ] OTA flow tested: push a benign change via `eas update`, verify it lands on the test device
- [ ] App responds correctly to deep links (test via `xcrun simctl openurl` / `adb shell am start -W -a android.intent.action.VIEW -d`)

## Monitoring (post-launch first 48 hours)

- [ ] Sentry dashboard open; Slack webhook for critical issues
- [ ] PostHog funnels live for the critical user journey
- [ ] On-call rotation defined; escalation path documented
- [ ] Rollback plan rehearsed (OTA + emergency hotfix build)

## Sign-off

- [ ] Product approved
- [ ] Design approved
- [ ] Engineering lead approved
- [ ] Security review passed
- [ ] Legal sign-off (privacy + terms)

When all boxes are checked, you are clear to submit.
