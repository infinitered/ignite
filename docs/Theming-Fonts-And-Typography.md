# Fonts & Typography

[Back to Theming](./Theming.md)

Fonts are defined in `app/theme/typography.ts`. We use a similar approach to [colors](./Theming-Colors-And-Palettes.md), defining a set of fonts and then using those fonts to define semantic font names to be used throughout the app. This allows us to have a consistent font usage across the app, and also allows us to change the fonts easily.

## Fonts

We define the fonts used in `app/theme/typography.ts`. The custom fonts are loaded using the `useFonts` hook from [`expo-fonts`](https://docs.expo.dev/guides/using-custom-fonts/) to load the fonts.

To add additional custom fonts to your project, obtain the proper OTF/TTF file(s) or install the desired Google Font package. Make the necessary additions to the `customFontsToLoad` object in `app/theme/typography.ts` and `fonts` object to reference the font family in the typography theming object.

```tsx
export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
  myCustomFont: require("./assets/fonts/custom-font.otf"),
}

const fonts = {
  // ...
  myCustomFont: {
    normal: "myCustomFont",
  },
}
```

Keep in mind that when utilizing custom fonts, it is a better user experience to wait on rendering anything within the app until the fonts are loaded (this will prevent any text from changing in front of the user's eyes). This functionality is baked into Ignite for you! Check out `app/app.tsx` to see it in action.

## Typography

Since we use the [`Text`](./Components-Text.md) component to encapsulate almost all text within an ignite app, the semantic names are essentially presets. As with all presets, they should only be created where there's a consistent pattern of usage across the app. To do this you'd add a new preset to the `Text` component with the associated styles. For one-off cases, it's recommended to use the [`size`](./Components-Text.md#size) and [`weight`](./Components-Text.md#weight) props on the `Text` component.
