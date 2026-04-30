# GitHub Copilot — project conventions

This file is auto-loaded by GitHub Copilot. Read [`CLAUDE.md`](../CLAUDE.md) for the full system prompt.

## Stack

Expo SDK 55 · RN 0.83 · React 19 · TypeScript strict · Zustand · TanStack Query · axios · React Hook Form + Zod · NativeWind v4 · FlashList · expo-image · MMKV + expo-secure-store · Sentry · PostHog · Biome · pnpm.

## The 12 hardest rules (Copilot, follow these always)

1. **Never import `Text` / `Button` / `TextInput` / `FlatList` / `Image` / `SafeAreaView` from `react-native`.** Use `@/components/*`. Biome blocks the violations.
2. **Never import `axios` directly outside `app/lib/api.ts`.** Use the `api` instance from `@/lib/api`.
3. **No hardcoded colors / hex / spacing literals.** Theme tokens live in `tailwind.config.js`.
4. **No `console.log` outside `app/lib/logger.ts`.** Biome warns.
5. **No `style={{...}}` for visual values.** Use `className` with NativeWind classes. Inline `style` only for dynamic numeric values (animated transforms).
6. **Auth tokens via `expo-secure-store` only.** Non-secret prefs via MMKV. NEVER the reverse.
7. **Server state via TanStack Query; UI state via Zustand. Never duplicate.**
8. **Validate every external response with Zod.** Use `getValidated(url, schema)` from `@/lib/api`.
9. **Forms: RHF + Zod resolver, schema exported, error messages are i18n keys.**
10. **All user-visible strings via `translate()` or `tx` prop.** Never hardcode English in JSX.
11. **Every Pressable: `accessibilityRole` + `accessibilityLabel`.** Plus `hitSlop ≥ 8` if visually small.
12. **Lists > 30 items: `<ListView />` (FlashList) with `estimatedItemSize`.** Never `FlatList`.

## File shape

- Source root `app/`. Path alias: `@/*` → `app/*`.
- Screens: `app/screens/{kebab-feature}/{Name}Screen.tsx`. Co-located test.
- Components: `app/components/{Name}.tsx` (PascalCase).
- Hooks: `app/hooks/use{Name}.ts`.
- Zustand: `app/stores/use{Name}Store.ts`.
- TanStack Query: `app/queries/use{Name}.ts`.
- Services: `app/services/{domain}/{domain}Service.ts`.
- Schemas: `app/schemas/{name}.ts` (Zod).

## Commit format

`type(scope): description` — Conventional Commits. Scopes: `screen`, `store`, `query`, `nav`, `theme`, `i18n`, `auth`, `infra`, `docs`, `deps`, `ci`, `api`, `components`.

## Done checklist

- `pnpm before-pr` green (lint + typecheck + tests).
- All four UI states handled in any new screen (loading, empty, error, populated).
- Manual smoke on iOS + Android.

For deeper context: read `CLAUDE.md` and the 8 skills in `.claude/skills/`.
