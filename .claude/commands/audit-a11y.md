---
description: Accessibility audit — labels, roles, contrast, hit-slop, reduce-motion.
---

# /audit-a11y [path]

Goal: find a11y regressions in the given file or directory (defaults to `app/`).

## Checklist

### Pressables / interactive controls
- Every `<Pressable>`, `<Button>`, `<TouchableOpacity>` has BOTH `accessibilityRole` and `accessibilityLabel`.
- `accessibilityState` declares `{ disabled, busy, checked }` when relevant.
- Hit-slop ≥ 8 on visually-small targets (icons, etc.).
- 48×48 dp minimum tap area.

### Icons
- Decorative icons: `accessibilityElementsHidden` set, `importantForAccessibility="no-hide-descendants"`.
- Meaningful icons: `accessibilityLabel` describing what they communicate.

### Text & contrast
- No hardcoded `#xxxxxx` colors — use semantic tokens.
- Text contrast against its background ≥ 4.5:1 (AA). Tokens are tuned, but verify when stacking translucent surfaces.
- Don't communicate state with color alone; pair with icon + label.

### Live regions
- Form error messages: `accessibilityLiveRegion="polite"`.
- Async loading captions: `"polite"`.
- Toasts: `"polite"`.
- `"assertive"` only for genuinely interrupting messages.

### Lists
- Each list item has a complete `accessibilityLabel` (e.g., "post titled X by Y, published Z").
- Lists themselves: nothing extra needed.

### Forms
- Each field has either a visible label OR an `accessibilityLabel`.
- Errors are announced (live region on `<TextField error="…" />` already wired).
- `aria-invalid` set when error present (also wired).

### Reduced motion
- Decorative animations check `useReduceMotion()` and disable accordingly.

### Headers
- One `accessibilityRole="header"` at the top of meaningful content per screen.
- After navigation, the header should be the first focused element.

## Output

Reply with file:line for each issue, severity (blocking / high / medium), and a one-line fix suggestion.

Then run:
```bash
pnpm test:e2e  --include-tags a11y
```

(or remind the user to run it on a device).

Don't auto-fix bulk a11y issues — propose, then apply selectively.
