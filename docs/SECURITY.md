# Security

> Operational security for this starter. Rules: `.cursor/rules/security.mdc`. Audit playbook: `.claude/commands/audit-security.md`.

## Threat model

- Mobile app distributed via App Store / Play Store. JS bundle is reverse-engineerable.
- Backend exposed via HTTPS API consumed by the app + (potentially) a web client.
- Users authenticate via the app and receive bearer tokens stored on-device.

## Secrets at rest

| Data | Where | Why |
|---|---|---|
| Auth tokens / refresh tokens | `expo-secure-store` (Keychain/Keystore) via `@/lib/secureStorage` | Encrypted by OS; survives reinstalls only on iOS (with iCloud Keychain) |
| Biometric flags, encryption keys | `expo-secure-store` | Same |
| Non-secret prefs (theme, language, last view) | MMKV via `@/lib/storage` | Sync, fast, mmap-backed; NOT encrypted |
| Server data cache | TanStack Query in-memory + optional `react-query-persist-client` (per-project) | Already gone on close (or persisted to MMKV non-secrets) |

**NEVER** put secrets in MMKV, AsyncStorage, or a Zustand-persisted store. Audit:

```bash
grep -rE '(token|secret|key|password|bearer)' app/stores/
grep -rE 'MMKV|AsyncStorage|persist' app/stores/  # cross-check w/ secret-naming greps
```

`useSessionStore` is the canonical pattern: token lives in SecureStore, the store rehydrates on `bootstrap()` via the SecureStore async API.

## Secrets in transit

- HTTPS only. `usesCleartextTraffic: false` enforced in `app.config.ts` (Android via `expo-build-properties`).
- All HTTP via `@/lib/api`. Auth header injected by request interceptor — never per-call.
- Optional: certificate pinning. Adds operational friction (rotating certs becomes a release-cycle task), so off by default. Consider for high-value targets (banking, healthcare) — add per-project after threat-modeling.

## Env / build-time secrets

- `process.env` access only in `app/config/env.ts` and `app.config.ts`. Other files import `env` from `@/config/env`.
- `.env*` files are gitignored. Pre-commit gitleaks scan blocks accidental commits.
- `EXPO_PUBLIC_*` keys are bundled into the JS — visible to anyone who downloads the app. **NEVER** put backend secrets in `EXPO_PUBLIC_*`.
- Build-time only secrets (`SENTRY_AUTH_TOKEN`, `SNYK_TOKEN`, `EXPO_TOKEN`): provided as EAS secrets / GitHub Actions secrets. Never in `app.config.ts` `extra`.

## Logging

- `app/lib/logger.ts` is the only file allowed to call `console.*`. Biome warns elsewhere.
- Production: Sentry captures the breadcrumb stream. **Redact PII** before logging.
- DON'T log full request/response objects — they often contain user data, tokens in headers, etc. Log the URL + status + duration; redact bodies.
- Sentry `setUser` should be `{ id }` only in production. `email` / `name` only after consent.

## Privacy

- Apple Privacy Manifest (`app.config.ts` `ios.privacyManifests`): declare every data collection category. Required reasons API: see Apple's list.
- PostHog `identify(userId)` only after the user consents to analytics (gate behind `usePrefsStore.analyticsConsent`).
- GDPR / CCPA compliance: provide a "delete my data" path that calls:
  - `useSessionStore.getState().signOut()` (clears SecureStore tokens)
  - `MMKV.clearAll()` (non-secret prefs)
  - `analytics.reset()` (PostHog distinct id)
  - backend delete endpoint (server-side cleanup)

## Dependency security

- **Dependabot** weekly grouped bumps (`.github/dependabot.yml`). Patches auto-mergeable; minors / majors require review.
- **Snyk** SCA in CI (`.github/workflows/security.yml`). Optional — gated by `vars.SNYK_ENABLED`.
- **CodeQL** static analysis weekly + on PRs.
- **Gitleaks** pre-commit + repo-wide weekly scan.
- `pnpm audit` locally before any release.

## Native build hardening

- **Hermes** ON (faster startup + bytecode obfuscation).
- **ProGuard** ON for Android release builds (`app.config.ts` `expo-build-properties`).
- **`useFrameworks: 'static'`** for iOS (smaller binary, faster startup).
- **Code signing**: managed by EAS — never check certs into the repo (gitleaks blocks `.p12` / `.mobileprovision`).

## OWASP Mobile Top 10 mapping

| ID | Risk | How we address it |
|---|---|---|
| **M1** | Improper credential usage | SecureStore for tokens; refresh-on-401 pattern in `app/lib/api.ts` |
| **M2** | Inadequate supply-chain security | pnpm-lock.yaml + Dependabot + Snyk + CodeQL |
| **M3** | Insecure auth/authz | Server-side validation; never trust client claims |
| **M4** | Insufficient input/output validation | Zod on every external response (`getValidated`) |
| **M5** | Insecure communication | HTTPS only; cleartext blocked at config level |
| **M6** | Inadequate privacy controls | Privacy manifest + consent flows + delete-my-data |
| **M7** | Insufficient binary protections | Hermes bytecode + ProGuard |
| **M8** | Security misconfiguration | TS strict + Biome rules + CI gates |
| **M9** | Insecure data storage | SecureStore for secrets; MMKV blocked from token-named keys |
| **M10** | Insufficient cryptography | Use platform crypto (`expo-crypto`); never roll your own |

## Incident response

1. Identify scope: which users, which versions, since when?
2. Mitigate: ship a hot patch via OTA if JS-only; emergency app review if native.
3. Notify: in-app banner (rare), email (common), regulatory disclosure (jurisdiction-dependent).
4. Rotate any exposed secrets:
   - EAS: `eas secret:delete` + `eas secret:create`.
   - SecureStore: bump app version + wipe on launch via a feature flag.
5. Postmortem within 5 working days; if the response involved a structural change, document the rationale in the change's PR description.

## Reporting vulnerabilities

For project-specific reporting, replace this section with your contact + PGP key. Default: open a GitHub Security Advisory (private).
