# Fonts & Typography

[Back to Theming](./../Theming.md)

Fonts are defined in `app/theme/typography.ts`. We use a similar approach to [colors](./Colors-And-Palettes.md), defining a set of fonts and then using those fonts to define semantic font names to be used throughout the app. This allows us to have a consistent font usage across the app, and also allows us to change the fonts easily.

## Fonts

We define the fonts used in `app/theme/typography.ts`. The custom fonts are loaded using the `useFonts` hook from [`expo-fonts`](https://docs.expo.dev/guides/using-custom-fonts/) to load the fonts.

## Typography

As stated earlier, we define semantic names to be used throughout the app, similar to how we handle [colors](./Colors-And-Palettes.md. For example, we want to have consistent heading fonts across the app, so we will define a `heading` font. We can then use this font in our components. See the [Text](./../Components-Text.md) component for an example. We load the `typography.primary` font in the `Text` component, and switch between the different weights depending on what font weight is specified.

