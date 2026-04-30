---
description: Performance audit — re-renders, list virtualization, image sizing, bundle inspection.
---

# /audit-perf [path]

Goal: find the FPS / TTI / bundle-size issues in the given file or directory (defaults to all of `app/`).

## Checklist (act on what you find)

### Re-renders
- For each component in a list (`renderItem`, `keyExtractor`): is it `React.memo`-wrapped? Is the renderer stable (`useCallback`)?
- Inline objects/arrays in props (`style={{...}}`, `data={[...]}`)? Hoist or memoize.
- Zustand subscriptions: are they selector-based (`useStore(s => s.x)`)? Whole-store subscriptions are a smell.

### Lists
- Any `FlatList`? Replace with `<ListView />` (FlashList).
- Is `estimatedItemSize` set? It's required.
- Item heterogeneity > 2 layouts? Use `getItemType` for FlashList.

### Images
- Any RN `Image`? Replace with `<Image />` (expo-image) — Biome should already block this.
- Network images without `placeholder`? Bad — add a blurhash or local fallback.
- Oversized images (e.g., 4096-wide PNGs displayed at 200px)? Resize the asset or pass `contentFit="cover"` with appropriate dims.

### Animations
- Reanimated worklets accessing non-shared state? UI thread crashes.
- Decorative animations not respecting `useReduceMotion`?

### TTI
- Heavy work in root `useEffect` (`[]` deps)? Defer with `InteractionManager.runAfterInteractions`.
- Modules imported eagerly that are only used on a sub-screen? Move to dynamic import.

### Bundle
Run:
```bash
pnpm bundle:analyze
```

Look for:
- Whole-library imports (`import * as _ from 'lodash'`) — switch to per-fn (`import debounce from 'lodash/debounce'`).
- Duplicate deps with different versions.
- Anything > 100 KB you didn't expect.

Then:
```bash
pnpm bundle:check     # CI gate; fails if > 4 MB iOS / 5 MB Android
```

## Output

Reply with:
- **Critical** issues (blocking) — call out file:line.
- **High** improvements — would yield a measurable perf win.
- **Medium** nits — micro-optimizations.

Don't auto-fix more than 5 things in one pass — propose, don't surprise.
