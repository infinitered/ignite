# Colors & Palettes

[Back to Theming](./../Theming.md)

In `app/theme/colors.ts`, we define a palette of colors and the semantic names to be used in the app. The palette is meant to be a simple list of colors, and the semantic names are meant to be used throughout the app. This matches how designers often think of colors & palettes, and lets us match designs which define these easily.

The palette color names are meant to be semantically neutral names matching the color. For example, `neutral100` defines a neutral color, but has no semantic meaning for its use and as such should not be used outside of the colors file if at all possible. It's meant to be used to define semantic colors, such as `text`. You would then use `colors.text` in your components where you need the `neutral100` color.

```tsx
<Text tx="examples.color" style={{color: colors.text}} />
```