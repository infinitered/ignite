# Code standards

> Naming, file shape, anti-patterns. The *enforced* version is in `biome.json`; this doc explains the *why*.

## Naming

- **Screens**: `PascalCase` + `Screen` suffix → `app/screens/profile/ProfileScreen.tsx`
- **Navigators**: `PascalCase` + `Navigator` suffix
- **Hooks**: `useCamelCase.ts`
- **Zustand stores**: `useNameStore.ts`
- **TanStack Query hooks**: `useResourceVerb.ts` (e.g., `usePosts`, `useCreatePost`)
- **Services**: `app/services/{domain}/{domain}Service.ts` (camelCase exports)
- **Components**: `PascalCase.tsx`
- **Schemas**: `app/schemas/{name}.ts` (camelCase Zod schemas)
- **Tests**: co-located `Foo.test.tsx` / `useFoo.test.ts`

Screens MUST be grouped by feature subdirectory. Flat `screens/` is rejected at review.

## File shape

- **≤ 250 LOC per file.** If a screen grows beyond, extract presentational components into `screens/{feature}/components/`.
- **Cognitive complexity ≤ 15 per function.** Refactor with early returns, extract helpers.
- **Max 4 positional parameters.** Beyond, take an options object: `function frobnicate({ a, b, c, d, e })`.
- **One default export per file.** Prefer named exports — they're refactor-friendly and grep-friendly.
- **No barrel re-exports across modules.** `index.ts` barrels only when 3+ siblings genuinely benefit. Avoid them at the top of large directories — they hurt tree-shaking and make refactors painful.

## Comments

- **Default to writing none.** Self-documenting code is the goal.
- Comments are reserved for the **non-obvious why**: hidden constraints, subtle invariants, workarounds for bugs, behavior that would surprise a reader.
- Don't explain *what* the code does — well-named identifiers do that.
- Don't reference the current PR / fix / caller — that belongs in commit messages.

## TypeScript

- `strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` + `useUnknownInCatchVariables`. Already enabled.
- `as any` and `as never` are smells — reach for `unknown` and narrow.
- Schema-first: a Zod schema generates the TS type; never write a parallel TS interface.
- Branded types for IDs: `type UserId = string & { __brand: 'UserId' }` — turns "passed userId where I meant postId" into compile errors.
- Exhaustive switches via `const _: never = x` in the default branch.

See the `typescript-advanced-types` skill for examples.

## Imports

- **Forbidden** by Biome:
  - `react-native`'s `Text` / `Button` / `TextInput` / `FlatList` / `Image` / `SafeAreaView` — use `@/components/*`.
  - `axios` outside `app/lib/api.ts` — use the `api` instance.
  - `fetch` for app code — use the `api` instance.
  - `console.*` outside `app/lib/logger.ts`.
- **Path aliases**: `@/*` → `app/*`, `@assets/*` → `assets/*`. Use them; relative `../..` paths are a smell.
- **Import order** (Biome organizes automatically): react → react-native → expo → other externals → `@/*` → relative.
- Use `import type { … }` for type-only imports (`verbatimModuleSyntax` is on).

## Anti-patterns (auto-rejected at review)

| ❌ Don't | ✅ Do |
|---|---|
| `<Text>{user.name}</Text>` from `react-native` | `import { Text } from '@/components/Text'` |
| `<FlatList ... />` | `<ListView ... estimatedItemSize={…} />` |
| `<Image source={{ uri }} />` from RN | `<Image source={{ uri }} placeholder={blurhash} />` from `@/components/Image` |
| `axios.get('/users')` outside `lib/api.ts` | `api.get('/users')` from `@/lib/api` |
| `fetch('/users')` | `api.get('/users')` |
| `style={{ padding: 16, backgroundColor: '#fff' }}` | `className="p-4 bg-background"` |
| `<Text>Submit</Text>` (hardcoded English) | `<Text tx="form.submit" />` |
| `<Pressable onPress={…} />` (no a11y label) | `<Pressable accessibilityRole="button" accessibilityLabel="Submit form" onPress={…} />` |
| `console.log('debug')` in app code | `logger.debug('debug')` from `@/lib/logger` |
| MMKV storing `auth.token` | SecureStore via `@/lib/secureStorage` |
| Persisting server data to Zustand | TanStack Query handles caching |

## Error handling

- The `api` client returns normalized errors (`ApiError`). Catch at the screen boundary; render with `<ErrorState />`.
- Sentry capture only at error boundaries / explicit catches at I/O boundaries.
- Empty `catch {}` blocks are forbidden. If you must swallow, comment why in 1 line.
- Custom error classes: extend `Error` and add a `kind` discriminant for narrowing.

## Logging

- `app/lib/logger.ts` is the only file allowed to call `console.*`.
- Production: forwards to Sentry breadcrumbs (configured in `sentry.ts`).
- Development: human-readable; gated on `__DEV__` for `debug` / `info`.

## Performance

- Memoize list renderers (`React.memo` + `useCallback` for `renderItem` / `keyExtractor`).
- `FlashList` `estimatedItemSize` is required.
- No inline objects/arrays in hot paths (props, dependencies).
- Reanimated worklets: UI thread only; never read non-shared values inside.
- Bundle: `pnpm bundle:analyze` after any dep change. CI gate at 4 MB iOS / 5 MB Android.

## i18n

- Every user-visible string via `translate(key)` or the `tx` prop.
- One namespace per feature in `app/i18n/en.ts` (then mirror to other locales).
- Error messages in Zod schemas are i18n keys, resolved at render time.
- Pluralization via i18next interpolation: `t('foo.count', { count })`.
- RTL: `me-*` / `ms-*` margin utilities — never `mr-*` / `ml-*` for layout.

## Accessibility

- Every Pressable: `accessibilityRole` + `accessibilityLabel`.
- 48×48 dp tap targets minimum; otherwise `hitSlop={8}` (or larger).
- Live regions for async status changes (`accessibilityLiveRegion="polite"`).
- Color contrast ≥ 4.5:1 (AA). Tokens are tuned; don't bypass.
- Respect `useReduceMotion()` for decorative animations.

See the `building-native-ui` skill and `.cursor/rules/accessibility.mdc` for depth.
