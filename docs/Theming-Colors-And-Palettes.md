# Colors & Palettes

[Back to Theming](./Theming.md)

In `app/theme/colors.ts`, we define a palette of colors and the semantic names to be used in the app. The palette is meant to be a simple list of colors, and the semantic names are meant to be used throughout the app. This matches how designers often think of colors & palettes, and lets us match designs which define these easily.

The palette color names are meant to be semantically neutral names matching the color. For example, `neutral100` defines a neutral color, but has no specific semantic meaning for its use. If you find yourself using a color in multiple places for the same purpose (e.g. background, border, text), define a semantic color and replace the palette color usage with the semantic one. For example, if you are styling all your text field components with a border of `colors.accent100`, define a semantic color such as `textFieldBorder` that is set to `accent100`. You would then use `colors.textFieldBorder` in your components in place of the `colors.accent100` color.

```tsx
<TextField style={{ borderColor: colors.border }} />
```
