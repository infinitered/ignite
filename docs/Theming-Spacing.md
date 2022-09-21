# Spacing

[Back to Theming](./Theming.md)

Spacing refers to the whitespace in between the elements in your app.

Spacing should be consistent and thought of as a first class technique right alongside [colors](./Theming-Colors-And-Palettes.md) and [typography](./Theming-Fonts-And-Typography.md).

Anytime you add margins, or padding, they should come from this spacing scale, with relatively few exceptions.

Spacings are defined in `app/theme/spacing.ts`. The scale we use in Ignite is:

```ts
export const spacing = {
  micro: 2,
  tiny: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,
}
```

Example:

```ts
import { spacing } from "../theme"

$containerStyle = {
  margin: spacing.small,
}
```

Which type of scale you use is based on the design.

If you've got simpler app, you may only need 6 items. Or maybe you need lots of items.

Whatever you choose, try to stick with your scale and not use custom values if possible, as consistent spacing will give your app a very polished look and feel.
