---
name: react-native-best-practices
description: FPS, re-renders, bundle size, TTI, native modules, profiling, New Architecture nuances
priority: critical
---

# React Native best practices

## When to apply

- Slow scrolling or sluggish animations on real devices
- Re-renders you can't explain
- Bundle size growing past budget (CI gate fails)
- TTI (time-to-interactive) over 3s on a mid-tier Android device
- Adding a native module
- Memory leaks / crashes only on production builds

## Priority-ordered guidelines

### CRITICAL — FPS & re-renders

1. **Memoize list renderers.** `renderItem` and `keyExtractor` MUST be `useCallback`-wrapped or hoisted. Inline = re-creates per render = full list re-render.
2. **`React.memo` anything in a list.** With `arePropsEqual` only when objects don't compare reference-stably.
3. **`FlashList` with `estimatedItemSize`.** Required, not optional. Wrong estimate is worse than no estimate (causes jank).
4. **Avoid inline objects/arrays in props.** `style={{ flex: 1 }}` per render → break ref equality. Hoist or use `className`.
5. **Selector-based subscriptions.** `useStore(s => s.x)` not `const { x } = useStore()` — only re-renders when `x` changes.

### CRITICAL — Bundle size

1. Run `pnpm bundle:analyze` after any dep change.
2. **Tree-shake imports**: `import { format } from 'date-fns'` not `import * as dateFns from 'date-fns'`.
3. **Avoid moment.js / lodash full imports.** Use `date-fns` and per-function lodash imports.
4. **Lottie**: load animations on-demand via `require()` inside the Reanimated worklet, not at module top.
5. CI bundle-size budget gate (`scripts/check-bundle-size.ts`) fails the build if exceeded.

### HIGH — TTI

1. `inlineRequires: true` in metro.config — defers heavy modules to first use.
2. Avoid blocking work in `useEffect(()=>{...}, [])` of root components — defer to `InteractionManager.runAfterInteractions`.
3. Hide splash screen only after fonts + i18n + auth bootstrap complete (see `app/app.tsx`).
4. Lazy-load screens only if they're behind navigation: React Navigation does this by default for native-stack.

### HIGH — Native modules

1. Check `react-native-directory.com` for Fabric (New Arch) compatibility before adopting.
2. Prefer `expo-*` modules over bare RN native libs — they handle config plugins automatically.
3. Custom native modules → build a Turbo Module, not the legacy bridge. See `expo-modules-core` docs.

### MEDIUM — Profiling

- **JS perf**: Hermes profiler (Flipper or Chrome DevTools).
- **Native**: Xcode Instruments (Time Profiler), Android Studio CPU Profiler.
- **Render counts**: `react-scan` or React DevTools' "Highlight updates when components render" toggle.
- **TanStack Query**: devtools in dev (already wired).

## Quick reference (commands)

```bash
pnpm bundle:analyze          # bundle composition (detects bloated deps)
pnpm bundle:check            # CI gate (4 MB iOS / 5 MB Android)
pnpm doctor                  # expo-doctor; surfaces version mismatches
pnpm depcruise               # cycle / forbidden-dep detection
```

## New Architecture notes

- **Fabric**: synchronous layout, no shadow tree → faster, but legacy native modules need `view manager` migration.
- **TurboModules**: lazy-loaded, type-safe via codegen.
- Both are ON by default in this starter (`app.json` `newArchEnabled: true`). Native modules MUST be Fabric-compatible — check before adding.

## References

- `references/list-virtualization.md` — FlashList deep dive
- `references/reanimated-worklets.md` — UI-thread rules
- `references/native-modules.md` — Turbo Module checklist
