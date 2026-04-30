---
name: building-native-ui
description: NativeWind v4 patterns (tv, dark, RTL, cssInterop), accessibility primitives, animations
priority: critical
---

# Building native UI

## When to apply

- Designing a new component or screen
- Adapting third-party components for NativeWind
- Implementing dark mode / RTL / responsiveness
- Adding animations
- Hitting accessibility issues

## Library preferences

- **Custom primitives** in `app/components/` (Button, Text, TextField, Screen, Card, Icon, Image, ListView, OfflineBanner, ErrorState, EmptyState, LoadingState). NEVER raw RN equivalents — Biome blocks that.
- **`tailwind-variants` (`tv()`)** for any component with > 2 visual states. Slots for multi-element components.
- **`expo-image`** for all images. Always pass `placeholder` (blurhash preferred) for network images.
- **`@shopify/flash-list`** via `@/components/ListView` for any list > 30 items.
- **Expo modules** (`expo-blur`, `expo-linear-gradient`, `expo-haptics`, `lottie-react-native`) for visual effects.
- **`@expo/vector-icons` Ionicons** via `@/components/Icon`. Custom SVG icons → `react-native-svg` + per-icon component (only when designer hands SVGs).

## NativeWind patterns

### Variants with `tv()` slots

```tsx
const button = tv({
  slots: { base: 'flex-row items-center', label: 'font-sans-medium' },
  variants: {
    variant: {
      primary: { base: 'bg-primary', label: 'text-primary-foreground' },
      ghost: { base: 'bg-transparent', label: 'text-foreground' },
    },
  },
});
const styles = button({ variant });
return <Pressable className={styles.base()}><Text className={styles.label()}>...</Text></Pressable>;
```

### Dark mode

Semantic tokens in `tailwind.config.js` map to CSS vars, flipped by `:root.dark` in `global.css`. So `bg-background` and `text-foreground` automatically adapt. Use `dark:` prefix only for class-level overrides not covered by semantics.

### RTL

- `me-*` (margin-end), `ms-*` (margin-start), `pe-*`, `ps-*`, `start-*`, `end-*`.
- Avoid `mr-*` / `ml-*` for layout — those don't flip.
- `flex-row` is auto-reversed by RN when `I18nManager.isRTL`. If you actively want it reversed, `flex-row-reverse` works in both.

### `cssInterop` for third-party

Components built without `View` (e.g., `FlashList`, `expo-image`) need `cssInterop` to accept `className`. Done once in `app/lib/cssInterop.ts` — `<FlashList className="..." />` then works.

### Avoid

- ❌ `style={{ backgroundColor: '#fff' }}` — use `className="bg-background"`.
- ❌ Inline numeric spacing: `style={{ padding: 16 }}` — use `className="p-4"`.
- ❌ Hardcoded colors anywhere outside `tailwind.config.js`.

Inline `style` is allowed only for **dynamic numeric values** (Reanimated `transform`, animated opacity).

## Accessibility primitives

- `Button` requires `accessibilityLabel` (TS-enforced).
- `TextField` sets `aria-invalid` and pairs label/hint via `aria-labelledby`.
- `Icon` defaults to decorative (`accessibilityElementsHidden`); pass `accessibilityLabel` to make it announced.
- `OfflineBanner` and async error/loading messages use `accessibilityLiveRegion="polite"`.

## Animations

- **Reanimated 4** for any non-trivial animation. Worklets only on UI thread; never access non-shared values inside `withTiming` callbacks.
- **`useReduceMotion()`** — disable decorative animations when on.
- **Lottie** for designer-provided JSON — wrap with `require()` to defer load.
- **`expo-haptics`** for tactile feedback on important actions (success, errors, key presses).

## Responsiveness

- `useWindowDimensions()` for layout breakpoints.
- `useSafeAreaInsets()` for top/bottom inset values when not using `<Screen />`.
- For tablet support (`supportsTablet: true` in `app.json`): test on iPad simulator and adjust max-widths via `web:max-w-screen-md` or RN `useWindowDimensions`.

## Common mistakes

- Wrapping every component in `cssInterop` — only needed for components NOT built on `View` already.
- Hardcoding spacing in pixels — defeats the design-system contract.
- Skipping `placeholder` on `expo-image` — leads to blank flashes on slow networks.

## References

- `references/native-wind-cookbook.md` — copy-paste patterns
- `references/animation-patterns.md` — Reanimated + Lottie + Skia
- `references/responsive-and-rtl.md` — breakpoints and RTL details
