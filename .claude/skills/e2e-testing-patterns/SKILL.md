---
name: e2e-testing-patterns
description: Maestro flows, accessibility-id selectors, env hooks, smoke vs full suites, CI integration
priority: medium
---

# E2E testing patterns

## When to apply

- Adding a critical user journey (sign-up, checkout, search-and-add)
- Reproducing a bug that only surfaces in real device interaction
- Wiring a new app to CI a11y / smoke gates

## Tool: Maestro

Why Maestro over Detox:
- YAML-based flows — readable by non-engineers (PMs, QA).
- No native build modifications.
- Cross-platform (iOS + Android) with the same flow.
- Cloud runner option (Maestro Cloud) for parallel CI.

## Flow structure

```
.maestro/
├── flows/
│   ├── smoke/                # tagged smoke; CI runs on every PR
│   │   ├── happy-path.yaml
│   │   └── critical-error.yaml
│   ├── auth/
│   │   ├── login.yaml
│   │   └── signup.yaml
│   ├── a11y/                 # accessibility-focused flows; nightly
│   │   └── voiceover-onboarding.yaml
│   └── full/                 # nightly full suite
└── shared/                   # reusable steps (login helper, etc.)
    └── _login.yaml
```

## Selector rules

- **Use `accessibilityLabel`-based selectors** — they double as a11y audit.
- **Avoid raw text selectors** — break with i18n.
- **Avoid `accessibilityIdentifier` (iOS-only) and `testID`** unless no accessible alternative exists.

```yaml
- tapOn:
    accessibilityLabel: "Submit form"
- assertVisible:
    accessibilityLabel: "Form submitted"
```

## Test data via env

NEVER check in real credentials. Use Maestro env vars:

```yaml
env:
  EMAIL: ${MAESTRO_TEST_USER_EMAIL}
  PASSWORD: ${MAESTRO_TEST_USER_PASSWORD}
appId: ${MAESTRO_APP_ID}
---
- launchApp
- inputText: ${EMAIL}
```

CI provides these as secrets. Local dev: `export MAESTRO_TEST_USER_EMAIL=qa+staging@example.com` in your shell rc.

## Tags

Tag flows for selective runs:

```yaml
# tags: smoke,critical
appId: ${MAESTRO_APP_ID}
---
- launchApp
- ...
```

Run subsets:

```bash
maestro test --include-tags smoke .maestro/flows
```

CI:
- PR builds: `--include-tags smoke` (fast, ~2 min)
- Nightly: full suite (slow, ~30 min)
- Pre-release: full + a11y

## Common patterns

### Login helper

```yaml
# shared/_login.yaml
- tapOn:
    accessibilityLabel: "Email"
- inputText: ${EMAIL}
- tapOn:
    accessibilityLabel: "Password"
- inputText: ${PASSWORD}
- tapOn:
    accessibilityLabel: "Sign in"
- assertVisible:
    accessibilityLabel: "Home"
```

```yaml
# flows/checkout.yaml
appId: ${MAESTRO_APP_ID}
---
- runFlow: ../shared/_login.yaml
- tapOn: "Cart"
- ...
```

### Wait for async

```yaml
- assertVisible:
    accessibilityLabel: "Posts"
    timeout: 10000     # 10s — generous for slow CI emulators
```

### Screenshot on failure

```yaml
- takeScreenshot: name-of-step
```

CI artifacts upload these for triage.

## Flaky-test prevention

- Avoid `wait` with absolute time. Use `assertVisible` with a timeout instead.
- Use the `extendedWaitUntil` step for known-slow operations (network requests).
- Beware backgrounded animations — disable them in test mode if they cause flake (`useReduceMotion` honored already).
- Run on a clean app state: `clearState` step before login flows so previous session doesn't leak.

## CI integration

`.github/workflows/a11y.yml` — Maestro a11y flows on a CI emulator nightly.
`.github/workflows/ci.yml` — `--include-tags smoke` on every PR.

For Maestro Cloud (faster, parallel):
```yaml
- uses: mobile-dev-inc/action-maestro-cloud@v1
  with:
    api-key: ${{ secrets.MAESTRO_CLOUD_API_KEY }}
    app-file: app-release.apk
    workspace: .maestro
```

## Common mistakes

- ❌ Using raw text selectors → i18n breaks them.
- ❌ Hardcoded waits (`waitForAnimationToEnd: 5000`) → flaky on slow CI.
- ❌ Tests that depend on the previous test's state → use `clearState` between flows.
- ❌ Real prod credentials in YAML → use env vars + CI secrets.
- ❌ Skipping a11y flows → regressions slip through.

## References

- `references/maestro-recipes.md`
- `references/ci-integration.md`
- `references/a11y-flows.md`
