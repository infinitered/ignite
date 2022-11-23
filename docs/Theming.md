# Theming Ignite Apps

[Back to README](./readme.md)

Theming involves creating a consistent look & feel across your application. It's a collection of style attributes and building blocks that are used everywhere.

If you're looking for customizing the look of an individual component, look at the [Styling](./Styling.md) documentation.

Theming involves a few different things: palettes, colors, animation timings, fonts, typography, and spacing. You can find everything that we use for theming in the `app/theme` folder. When we at Infinite Red receive a custom design, one of the first places we start is in this directory matching the values to the design. It's a great idea to match the design language used by the designers with the semantic names you will be providing in these files.

## Colors & Palettes

Colors are defined in `app/theme/colors.ts`. We use a palette-based approach to colors, which means that we define the set of colors used in the app. We then use these colors to define semantic color names to be used throughout the app. This allows us to have a consistent color palette across the app, and also allows us to change the palette easily.

[Colors & Palettes](./Theming-Colors-And-Palettes.md)]

## Fonts & Typography

Fonts are defined in `app/theme/fonts.ts`. We use a similar approach to colors, defining a set of fonts and then using those fonts to define semantic font names to be used throughout the app. This allows us to have a consistent font usage across the app, and also allows us to change the fonts easily.

[Fonts & Typography](./Theming-Fonts-And-Typography.md)]

## Timings

Timings are defined in `app/theme/timing.ts`. They can be used for consistent animation timings throughout the app.

## Spacing

Spacing is a first class citizen in Ignite. We use a spacing scale to define the spacing between elements in the app. This allows us to have a consistent spacing scale across the app, and also allows us to change the spacing easily. It is recommended to use the spacing scale for all spacing in the app if possible.

[Spacing](./Theming-Spacing.md)
