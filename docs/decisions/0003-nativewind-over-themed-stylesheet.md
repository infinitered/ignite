# ADR 0003: NativeWind v4 over Ignite's themed StyleSheet

- **Status**: Accepted
- **Date**: 2026-04-30

## Context

The forked Ignite template uses a custom `themed()` helper over RN StyleSheet. Each component declares `$styles: ThemedStyle<ViewStyle>` constants and reads colors / spacing from `useAppTheme()`. The result is verbose at the call site and creates a lot of "where is this token defined?" hops.

Modern RN UIs increasingly use class-based styling — NativeWind (Tailwind for RN), Tamagui, or similar. The benefits compound: consistent design language, easier to grep, design-system tokens enforced by the framework.

## Decision

**NativeWind v4** is the canonical styling system. Tokens (colors, spacing, fontSize, fontFamily, borderRadius) live in `tailwind.config.js` and are referenced via `className` strings. Variants via `tailwind-variants` (`tv()`).

The existing `app/theme/` directory is removed; tokens migrate into `tailwind.config.js`.

Inline `style={{ … }}` is allowed only for **dynamic numeric values** (Reanimated transforms, animated opacity).

## Consequences

### Positive

- Single source of truth: `tailwind.config.js` defines all tokens.
- Design-system enforcement: hardcoded hex / spacing literals fail review.
- Familiar to web devs: same Tailwind classes work cross-platform.
- Dark mode + RTL handled centrally (CSS variables + `me-*`/`ms-*` utilities).
- `tailwind-variants` gives type-safe variant components without React Context.
- Smaller learning curve for new hires than a bespoke `themed()` helper.
- Better grep-ability: `bg-primary` is unambiguous; `colors.primary` could be 5 different `useAppTheme` calls.

### Negative / trade-offs

- Initial setup is non-trivial: babel preset, metro plugin, CSS file, `nativewind-env.d.ts`, `cssInterop` for third-party components.
- Some third-party components (FlashList, expo-image) need `cssInterop` to accept `className`. We do this once in `app/lib/cssInterop.ts`.
- NativeWind v4 is newer than Tailwind for the web; some sharp edges (e.g., performance of dynamic class strings) require care. Mitigated by `tailwind-variants` for variants instead of string concatenation.
- Long className strings for complex components. Use `tv()` slots to break them up.

### Neutral

- The existing `useAppTheme` API is removed. Theme runtime values that don't fit Tailwind (e.g., animation timings as numbers) live in `app/lib/` constants.

## Alternatives considered

### A. Ignite's `themed()` helper (status quo)

- Pros: Familiar to existing Ignite users.
- Cons: Verbose, creates token-traversal friction, doesn't enforce design-system constraints at the lint level.
- Verdict: rejected.

### B. Tamagui

- Pros: Compile-time CSS, best perf, web + native unified.
- Cons: Steep learning curve, heavy build setup, smaller community.
- Verdict: defer; could revisit if cross-platform parity becomes critical.

### C. Restyle (Shopify)

- Pros: Type-safe themed props, opinionated tokens.
- Cons: Verbose API at the call site (`<Box paddingHorizontal="m">`), prop-based theming feels dated next to className.
- Verdict: rejected.

### D. NativeBase / gluestack-ui

- Pros: Full kit available out of the box.
- Cons: Heavier bundle, more opinionated visuals, less control. Our principle is "primitives are custom."
- Verdict: rejected.

## Notes / follow-ups

- `tailwind.config.js` ships with sensible defaults. Replace the `brand` palette per project.
- Document `tv()` slot patterns in `building-native-ui` skill.
- If perf regressions appear on long lists with many className strings, evaluate compile-time class extraction (NativeWind v4 supports this — verify it's enabled).
