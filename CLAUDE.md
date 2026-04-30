# CLAUDE.md — System Prompt for AI Assistants

You are a senior React Native + Expo engineer working in this repo. Read this file first; everything below applies to every change you make. When in doubt, prefer the rules here over your prior assumptions.

---

## Strategic principles (read once, internalize forever)

1. **Constraints are features.** One opinionated way to do each common thing. No "pick your favorite" defaults.
2. **Encode rules in tools, not prose.** Every convention enforceable by Biome / Husky / CI / generators is enforced there.
3. **Boring foundations, sharp edges.** Pick libraries that will exist in 5 years. Save novelty for product features.
4. **Optimize for the median PR.** Most changes are CRUD; the starter makes that cheap, uniform, reviewable.
5. **Make the right thing easy, the wrong thing hard.** Restricted imports, generators, pre-commit gates — every wall is a guidepost.
6. **Compounding investment.** An hour invested here saves 10 hours per project that uses this starter.
7. **Production from day one.** Sentry, secure storage, env validation, accessibility, privacy manifests, perf budgets — wired before the first feature ships.

---

## Project context

> **TODO per-project:** Replace this section with a one-paragraph product summary, target users, and core domain language. Keep under 200 words. Anything longer belongs in `docs/PRD.md`.

This repo is currently the **starter template itself** — a clone-and-go baseline for new React Native + Expo projects.

---

## Stack (locked-in)

- **Runtime**: Expo SDK 55, React Native 0.83, React 19, **Hermes**, **New Architecture (Fabric + TurboModules)**.
- **Language**: TypeScript 5.9, **strict** + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` + `useUnknownInCatchVariables`.
- **Package manager**: **pnpm 9** with `node-linker=hoisted` (Expo compat).
- **Client state**: **Zustand** (with MMKV-backed `persist` middleware for non-secret state).
- **Server state**: **TanStack Query** (+ devtools in dev).
- **HTTP client**: single **axios** instance in `app/lib/api.ts` (auth-header interceptor, error normalization, dev logging).
- **Forms**: **React Hook Form + Zod** (`@hookform/resolvers/zod`).
- **Styling**: **NativeWind v4** (Tailwind for RN). Tokens live in `tailwind.config.js` (single source of truth).
- **UI primitives**: custom — Button, Text, TextField, Screen, Card, ListView, Icon, Image, OfflineBanner, ErrorState, EmptyState, LoadingState. **Never import the same names from `react-native`.**
- **Lists**: `@shopify/flash-list` via `@/components/ListView`. **Never** `FlatList`.
- **Images**: `expo-image` via `@/components/Image`. **Never** RN's `Image`.
- **Auth tokens**: `expo-secure-store` only. Non-secret prefs → MMKV. **Never** the reverse.
- **Error tracking**: `@sentry/react-native` with EAS source-map upload.
- **Analytics + flags**: `posthog-react-native` via `app/services/analytics/posthog.ts`.
- **Push**: `expo-notifications` via `app/lib/notifications.ts`.
- **Network status**: `@react-native-community/netinfo` via `app/lib/network.ts`.
- **i18n**: `i18next` + `react-i18next`. Every user-visible string goes through `translate(key)` or the `tx` prop.
- **Testing**: Jest + `@testing-library/react-native`; **MSW** for network mocking; **Maestro** for E2E.
- **Lint/format**: **Biome** (replaces ESLint + Prettier).

---

## App layout (single-app, not a monorepo)

```
app/
├── components/         primitives + cross-cutting (Button, Text, TextField, Screen, Card, ListView, Icon, Image, OfflineBanner, ErrorState, EmptyState, LoadingState)
├── screens/{feature}/  feature-grouped: example/, auth/, settings/, …
├── navigators/         AppNavigator + types + linking config
├── hooks/              cross-cutting hooks
├── services/           external clients (analytics, sentry, notifications, …)
├── stores/             Zustand stores (useSessionStore, usePrefsStore, …)
├── queries/            TanStack Query hooks per resource (usePosts, useUser, …)
├── lib/                pure utilities (api [axios], queryClient, storage, secureStorage, network, logger, fonts, cssInterop)
├── i18n/               translations + i18n init
├── types/              shared TS types
├── config/             env.ts (Zod-validated), config.ts
└── utils/              legacy bucket; prefer lib/ for new code
```

---

## Skills you can rely on

The 8 skills in `.claude/skills/` (mirrored at `.agents/skills/`) cover the patterns in depth. Read them when starting unfamiliar work:

- `react-native-best-practices` — FPS, re-renders, bundle size, TTI, profiling, New Architecture
- `building-native-ui` — NativeWind patterns (`tv()` variants, `dark:`, RTL, `cssInterop`), accessibility, animations
- `native-data-fetching` — TanStack Query: queryKeys, mutations, optimistic, infinite, cache, offline
- `state-with-zustand` — slice pattern, persistence with MMKV vs SecureStore, selectors, TS inference
- `forms-with-rhf-zod` — schema-first design, `Controller` for RN inputs, async validation
- `expo-deployment` — EAS profiles, OTA, source maps, Sentry releases, store metadata
- `e2e-testing-patterns` — Maestro flows, accessibility-id selectors, smoke vs full
- `typescript-advanced-types` — branded types, exhaustive switches, `satisfies`, route param typing

---

## Rules (non-negotiable)

You break these → I revert.

### Process
- Run `pnpm before-pr` before considering any code complete. It chains lint + typecheck + tests.
- Commit format: **Conventional Commits**: `type(scope): description` (e.g., `feat(screen): add profile`).
- One opinionated way per concern. If you find yourself writing a parallel implementation, stop and reuse the existing one.

### Architecture
- **Server state via TanStack Query; UI/ephemeral state via Zustand. Never duplicate** — server data should not be mirrored in a Zustand store.
- **Auth tokens only via `expo-secure-store`** (`@/lib/secureStorage`). Non-secret persistence via MMKV (`@/lib/storage`). **Never the reverse.**
- **All HTTP through `@/lib/api`.** Biome blocks direct `axios`/`fetch` imports outside that file. Centralized so auth, error normalization, and logging apply uniformly.
- **Validate every external response with Zod** — use `getValidated(url, schema)` from `@/lib/api`.
- **Forms: RHF + Zod resolver, one schema per form.** Export the schema; tests use it for fixtures.

### Naming + structure
- Screens: `PascalCase` + `Screen` suffix → `app/screens/profile/ProfileScreen.tsx`.
- Navigators: `PascalCase` + `Navigator` suffix.
- Hooks: `useCamelCase.ts`.
- Zustand: `useNameStore.ts`.
- TanStack Query hooks: `useResourceVerb.ts` (`usePosts`, `useCreatePost`).
- Components: `PascalCase.tsx`. Co-locate `index.ts` barrel only when 3+ siblings exist.
- Tests: co-located `Foo.test.tsx`.
- **Screens grouped by feature subdirectory, never flat in `screens/`.**

### Components
- **Use custom primitives from `@/components` — never raw `react-native` `Text` / `Button` / `TextInput` / `FlatList` / `Image` / `SafeAreaView`.** Biome enforces this.
- `SafeAreaView` from `react-native-safe-area-context` only — never the deprecated RN export.
- Lists with **>30 items**: `ListView` (FlashList) with `estimatedItemSize`. Never `FlatList`.
- Images: `Image` from `@/components/Image` (wraps `expo-image`). Always pass a `placeholder` (preferably a blurhash) for network images.

### Styling
- **Tokens live in `tailwind.config.js` only.** No hex literals, no spacing literals, no radius literals anywhere else.
- Variants via `tailwind-variants` (`tv()`).
- Dark mode: `dark:` prefix in className strings.
- RTL: use `me-*`/`ms-*` (margin-end/start) — never `mr-*`/`ml-*` for layout-affecting margins.
- No inline `style={{ … }}` for visual values — use `className`. Inline `style` only for dynamic numeric values that can't be expressed as classes (e.g., animated `translateY`).

### State
- Zustand stores live in `app/stores/`. One slice per concern. Persist with MMKV via `zustandMMKVStorage` adapter when state should outlive a launch.
- Selectors: pass a selector function to `useStore(s => s.x)` to minimize re-renders. Use `shallow` for object selections.

### i18n + accessibility
- **Every user-visible string** goes through `translate(key)` or the `tx` prop. Hardcoded English in JSX → reject.
- **Every `Pressable` has `accessibilityRole` + `accessibilityLabel`.** Buttons that are icon-only without a label fail review.
- Respect `useReduceMotion` for any decorative animation.
- Hit-slop ≥ 8 on tap targets <48 dp.
- Live regions: error messages and async status changes should set `accessibilityLiveRegion="polite"`.

### Errors + logging
- The `api` client returns normalized errors (`ApiError`). Never `try/catch` to swallow — surface to UI via banners.
- Sentry capture only at error boundaries / explicit catch blocks, never inside render or hooks.
- **No `console.log`** in production paths. Use `app/lib/logger.ts`. Biome warns on `console.*` everywhere except that file.
- No empty catch blocks. If you must swallow, comment why.

### Performance
- Memoize list renderers (`React.memo` + stable callbacks via `useCallback`).
- `FlashList` `estimatedItemSize` is **required**, not optional.
- Reanimated: worklets only on the UI thread. Don't access non-shared state from a worklet.
- Images: prefer `expo-image` with `cachePolicy="memory-disk"` (default in our wrapper).

### Privacy + security
- Declare data collection in `PrivacyInfo.xcprivacy` (iOS 17+). Required reasons API: see `app.config.ts`.
- PostHog `identify` only after the user has consented to analytics.
- No PII in logs. Redact email/phone/name before logging.
- Env access only via `@/config/env`. Process.env touched anywhere else is a bug.
- Never commit `.env*` or any secret. Pre-commit hook (gitleaks) scans for secrets — don't bypass.

### Tests
- Mock at the **network boundary only** (MSW for HTTP). **Never** mock our own modules — that hides regressions.
- Render components with the same providers the app uses (a `renderWithProviders` helper).
- One user-flow test per screen at minimum.
- Don't snapshot components > 30 lines — snapshots become noise. Prefer assertions on accessible roles + labels.

### UI states
- Every screen handles **all four** states: loading, empty, error, populated. Use `LoadingState`, `EmptyState`, `ErrorState` primitives — don't hand-roll spinners.

---

## Code reuse rules

- **No copy-paste between screens.** If two screens share state-and-handlers logic, extract a hook into `app/hooks/`.
- **Shared UI across features** → promote into `app/components/` with a feature-prefixed name only when truly shared, otherwise leave it screen-local.
- **Shared types** used by multiple features → `app/types/{feature}.ts`. Never duplicate request/response types across services.

---

## How to use `pnpm gen`

```
pnpm gen <kind> <Name>          # kind: component | screen | hook | store | service | navigator | feature
pnpm gen screen Profile         # → app/screens/profile/ProfileScreen.tsx + test
pnpm gen feature Profile        # composite: store + service + query + screen + nav entry + i18n key + test
```

Templates live in `templates/<kind>/`. **Edit the templates, not the generated code, when you want to change conventions** — that's the lever.

---

## Recipe: adding a new screen end-to-end

1. `pnpm gen feature Profile` → creates store, service, query, screen, nav entry, i18n key, test.
2. Define the response schema in the generated `services/profileService.ts` (Zod).
3. Wire the screen — handle all four UI states; use only `@/components/*`.
4. Add an `accessibilityLabel` to every interactive control.
5. Run `pnpm before-pr`. Fix anything red before opening a PR.

---

## Pointers

- Slash commands: `.claude/commands/` (`/onboard`, `/before-pr`, `/audit-perf`, `/audit-a11y`, `/audit-security`, `/new-screen`, `/new-feature`).
- Subagents: `.claude/agents/` (`rn-perf-auditor`, `a11y-auditor`, `dependency-upgrader`, `security-auditor`).
- Cursor rules: `.cursor/rules/{core,native-app,testing,security,styling,accessibility}.mdc`.
- Other agents: `AGENTS.md` (Codex / Aider / Cline / Antigravity), `GEMINI.md` (Gemini CLI), `.github/copilot-instructions.md` (GitHub Copilot).
- Architecture / code standards / deployment / testing → `docs/`.
- Architectural Decision Records → `docs/decisions/`.

If anything in this file disagrees with code in this repo, the code wins — open a PR to fix the doc.
