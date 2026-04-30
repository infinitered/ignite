---
description: Security audit — env handling, token paths, secret leaks, dep vulnerabilities.
---

# /audit-security

Goal: catch security issues before they ship.

## Checklist

### Secrets at rest
- All auth tokens go through `@/lib/secureStorage` (expo-secure-store)? Grep for any direct `MMKV` or `AsyncStorage` use storing `token`, `refresh`, `auth`, `bearer`.
- `useSessionStore`'s state is NOT persisted via MMKV.

### Secrets in transit
- HTTPS only — `usesCleartextTraffic: false` in `app.config.ts`. Confirm no `http://` URLs anywhere except documentation.
- Auth header injection happens in `app/lib/api.ts`'s request interceptor, not per-call.

### Env access
- All `process.env` reads go through `@/config/env` (Zod-validated). Grep for `process.env.` — the only hits should be in `app/config/env.ts` and `app.config.ts`.
- `EXPO_PUBLIC_*` vs server-only: anything with a backend secret prefix should NOT be `EXPO_PUBLIC_*` (it'd be bundled into the JS).

### Logs
- `console.log` calls outside `app/lib/logger.ts`? Biome warns; verify no leaks.
- Redact PII before logging (email, phone, name, userId).

### Dependencies
Run:
```bash
pnpm audit                    # npm advisories
# CI runs Snyk + CodeQL + gitleaks weekly via .github/workflows/security.yml
```

Address:
- Critical / high CVEs → patch or pin to a fixed version.
- Lockfile diff ≥ 50 deps → suspicious; review.

### Repo hygiene
- No `.env*` checked in (gitleaks pre-commit catches, but verify).
- No private keys / certificates in `assets/` (gitleaks).
- `.gitleaks.toml` allowlist isn't smuggling secrets.

### Privacy
- Privacy manifest declarations (`app.config.ts` `ios.privacyManifests`) match all "required reasons" APIs in use.
- PostHog `identify(userId)` only fires after consent.
- Sentry `setUser({ id })` doesn't include email/name in production unless consented.

### Native build
- Android `proguardMinifyEnabled: true` (in `app.config.ts` `expo-build-properties`).
- iOS `useFrameworks: 'static'` (already set).
- Hermes ON (faster, plus bytecode obfuscation).

## OWASP Mobile Top 10 quick check

Refer to `.cursor/rules/security.mdc` — each item has a paragraph on how this repo addresses it.

## Output

Group findings as:
- **Critical** (ship-blocker)
- **High** (must fix before next release)
- **Medium** (clean up this sprint)
- **Low** (note for future)

For each: file:line, what, why it matters, suggested fix.
