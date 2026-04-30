# Brand guidelines

> Placeholder template. Replace per project. Keep this doc tight — it's the contract between design and engineering.

## Color system

The semantic tokens live in `tailwind.config.js` and map to CSS variables in `global.css`. Light + dark variants flip automatically.

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | white | gray-900 | Screen background |
| `foreground` | gray-900 | gray-100 | Default text |
| `muted` | gray-100 | gray-800 | Secondary surfaces |
| `muted-foreground` | gray-500 | gray-400 | Secondary text |
| `border` | gray-200 | gray-700 | Dividers, outlines |
| `card` | white | gray-800 | Card background |
| `primary` | brand-500 | brand-400 | Primary action, link |
| `primary-foreground` | white | gray-900 | Text on primary |
| `destructive` | red-600 | red-400 | Error / destructive |
| `success` | green-600 | green-400 | Success state |
| `warning` | amber-500 | amber-400 | Warning state |

**Brand palette** (`brand-50` … `brand-900`) — replace the defaults in `tailwind.config.js` with your real palette.

## Typography

- **Default font**: Space Grotesk (loaded via `@expo-google-fonts`).
- **Sizes**: 2xs (10), xs (12), sm (14), base (16), lg (18), xl (20), 2xl (24), 3xl (30), 4xl (36).
- **Use `<Text variant="…">`** — never hardcode font sizes or weights.

| Variant | Tailwind class | Example use |
|---|---|---|
| `display` | `text-4xl font-sans-bold` | Marketing hero |
| `heading-1` | `text-3xl font-sans-bold` | Screen title |
| `heading-2` | `text-2xl font-sans-bold` | Section header |
| `heading-3` | `text-xl font-sans-medium` | Subsection |
| `heading-4` | `text-lg font-sans-medium` | Card title |
| `body` | `text-base` | Default paragraph |
| `body-bold` | `text-base font-sans-bold` | Emphasized inline text |
| `caption` | `text-sm text-muted-foreground` | Metadata, helper text |
| `code` | `text-sm font-mono` | Inline code |

## Spacing scale

8-pixel base scale via Tailwind defaults (`p-1` = 4px, `p-2` = 8px, …). Custom additions:
- `p-4.5` = 18px
- `p-5.5` = 22px
- `p-13` = 52px
- `p-15` = 60px

**No literal pixel values** outside `tailwind.config.js`. If you need a one-off, add it to the scale.

## Border radius

| Token | Value | Use |
|---|---|---|
| `rounded-none` | 0 | Edge-to-edge |
| `rounded-sm` | 4px | Tight corners (small chips) |
| `rounded` | 8px | Default (buttons, cards) |
| `rounded-md` | 12px | Larger surfaces |
| `rounded-lg` | 16px | Modal, sheet |
| `rounded-xl` | 24px | Hero card |
| `rounded-full` | 9999px | Avatars, pills |

## Iconography

- `@expo/vector-icons` Ionicons via `<Icon name="…" />`.
- Default size: 24. Override with `size={…}` only when the design calls for it.
- Custom SVG: `react-native-svg` + a per-icon component file. Add to `app/components/icons/` (create the folder when you have your first one).

## Voice & tone

> TODO per-project: define the brand voice (e.g., "warm, confident, no jargon").

## Motion

- **Reanimated 4** for any non-trivial animation.
- Default durations: 150ms (micro), 250ms (small), 350ms (medium), 500ms (large).
- **Always respect `useReduceMotion()`** for decorative animations.
- **Easing**: prefer `Easing.bezier(0.4, 0, 0.2, 1)` (Material standard) for continuity with platform defaults.

## Sound & haptics

- `expo-haptics` for tactile feedback on important actions (`Haptics.impactAsync(ImpactFeedbackStyle.Medium)` on submit success).
- No sound effects by default — opt in per-feature.

## Accessibility (brand contract)

- Color contrast ≥ 4.5:1 against the relevant background. Tokens are tuned for AA — don't bypass.
- Tap targets ≥ 48×48 dp. Use `hitSlop={8}` (or larger) for visually-small targets.
- Don't communicate state with color alone. Pair with icon, label, or pattern.

## Updating the brand

1. Edit `tailwind.config.js` `theme.extend` for colors / spacing / type.
2. Edit `global.css` for the semantic CSS variables (light + dark).
3. If a rebrand affects copy: search-replace through `app/i18n/en.ts`.
4. Smoke-test all primary screens in light + dark.
5. Run a11y CI (`pnpm test:e2e --include-tags a11y`) to catch contrast regressions.
