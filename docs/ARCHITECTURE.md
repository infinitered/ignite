# Architecture

> The "what lives where and why" map. For *rules* about how to work in this codebase, see [`../CLAUDE.md`](../CLAUDE.md).

## Folder map

```
app/
├── components/         primitives + cross-cutting (Button, Text, TextField, Screen, Card, ListView, Icon, Image, OfflineBanner, ErrorState, EmptyState, LoadingState)
├── screens/{feature}/  feature-grouped screens (PascalCase + Screen suffix)
├── navigators/         React Navigation stacks/tabs + types + linking
├── hooks/              cross-cutting hooks (useCamelCase)
├── services/           external clients NOT API: analytics, sentry, notifications
├── stores/             Zustand stores (useNameStore.ts)
├── queries/            TanStack Query hooks per resource (useResourceVerb)
├── lib/                pure utilities — api (axios), queryClient, storage (MMKV), secureStorage (SecureStore), network, logger, fonts, sentry, cssInterop, notifications
├── i18n/               translations + i18n init
├── types/              shared TS types
├── config/             env.ts (Zod-validated)
└── utils/              legacy bucket; prefer lib/ for new code
```

Top-level config:
- `app.config.ts` — dynamic Expo config (env-aware, Sentry plugin, expo-secure-store + notifications plugins, privacy manifest)
- `app.json` — static base config (name, slug, scheme, bundle ids, plugins)
- `tailwind.config.js` — the **single source of truth for design tokens**
- `global.css` — Tailwind directives + CSS variables (light/dark)
- `biome.json` — lint + format config (replaces ESLint + Prettier); enforces `noRestrictedImports`
- `metro.config.js`, `babel.config.js` — composed for NativeWind + Sentry source-map upload

Context engineering:
- `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.github/copilot-instructions.md` — top-level system prompts
- `.cursor/rules/{core,native-app,testing,security,styling,accessibility}.mdc` — Cursor IDE rules
- `.cursor/commands/pr.md` — Cursor slash command
- `.agents/skills/<name>/SKILL.md` — 8 deep-dive skill files (symlinked at `.claude/skills/`)
- `.claude/{commands,agents,settings.local.json}` — Claude Code slash commands, subagents, permissions

CI / hooks:
- `.husky/{pre-commit,commit-msg,pre-push}` — lint-staged + commitlint + gitleaks + typecheck + tests
- `.github/workflows/{ci,security,a11y,eas-build}.yml` — automated quality gates

## Data flow

### Server state — read

```
Screen
  └─ uses → query hook (e.g., usePosts in app/queries/)
              └─ wraps → useQuery({ queryKey, queryFn })
                          └─ queryFn calls service (e.g., postsService.list in app/services/posts/)
                                └─ service calls @/lib/api (axios instance with interceptors)
                                            └─ HTTPS → backend
```

### Server state — write (mutation)

```
Screen
  └─ uses → mutation hook (useCreatePost)
              └─ wraps → useMutation({ mutationFn, onSuccess })
                          └─ mutationFn calls service.create
                                └─ on success: queryClient.invalidateQueries(postKeys.list())
```

### UI / ephemeral state

```
Screen
  └─ uses → Zustand store (useUiStore, useFormDraftStore, useSessionStore)
              └─ persisted via zustand/middleware + zustandMMKVStorage (non-secrets)
              └─ OR rehydrated from expo-secure-store on boot (tokens; useSessionStore.bootstrap)
```

### Boot sequence

1. `index.tsx` — imports `global.css`, calls `initSentry()`, registers `App` (wrapped with `SentryWrap`).
2. `app/app.tsx` — mounts providers (outermost first):
   - `SafeAreaProvider`
   - `KeyboardProvider`
   - `QueryClientProvider`
   - `AppNavigator` (which wraps `NavigationContainer` + `ErrorBoundary` + `OfflineBanner`)
3. Parallel async work in `useEffect`:
   - `useFonts(customFontsToLoad)` — load Space Grotesk
   - `initI18n()` — i18next init with detected locale
   - `useSessionStore.getState().bootstrap()` — async load token from SecureStore
   - `initAnalytics()` — PostHog (gated on consent in real apps)
4. Render `null` until all four are ready (native splash stays up).

## Theme contract (NativeWind v4)

- **Tokens live ONLY in `tailwind.config.js`** under `theme.extend`.
- Semantic tokens (`background`, `foreground`, `muted`, `card`, `primary`, `destructive`, `success`, `warning`, …) are mapped to CSS variables in `global.css`.
- Dark mode flips the variables via `:root.dark` — components don't need per-color `dark:` plumbing.
- For custom one-off styling: prefer adding the value to `tailwind.config.js` over an inline `style`. The contract is that anyone reading a className understands the visual without grepping.

## Env loading

- `.env.example` documents every key.
- Local dev: `.env.local` (gitignored).
- `app/config/env.ts` parses `process.env` via Zod. Misconfiguration = boot crash with readable error (better than silent `undefined` + null-pointer hours later).
- `app.config.ts` reads env via the same parser; expo-constants exposes `extra` to native.
- **`EXPO_PUBLIC_*` keys are bundled into the JS** — never put backend secrets here.
- Build-time only: `SENTRY_AUTH_TOKEN`, `SNYK_TOKEN`, etc. — referenced from `eas.json` / GitHub Actions secrets.

## OTA / runtime version

`runtimeVersion: { policy: 'appVersion' }` in `app.config.ts`. Same app version = same OTA channel. Native dep changes require a fresh build, not an OTA — otherwise users on the previous binary crash.

## Privacy manifest

`app.config.ts` declares iOS 17+ "required reasons" APIs in `ios.privacyManifests`. When you adopt a new API in one of Apple's required-reasons categories (UserDefaults, file timestamp, system boot time, disk space, active keyboards), add the declaration before App Review or expect rejection.

## Performance budgets (CI gate)

- JS bundle: 4 MB iOS / 5 MB Android. Enforced by `scripts/check-bundle-size.ts` (CI gate). Bumping requires an ADR.
- TTI on a mid-tier Android (Pixel 5): ≤ 2 s. Profile with Hermes profiler.
- Lists: 60 fps scrolling for ≤ 1000 items. FlashList + `estimatedItemSize` is the contract.

## Decisions

Foundational choices are documented as ADRs in [`./decisions/`](./decisions/). Read them when joining the project — they encode *why*, not just what.
