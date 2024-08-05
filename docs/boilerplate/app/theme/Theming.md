---
sidebar_position: 70
---

# Theming Ignite Apps

Theming involves creating a consistent look & feel across your application. It's a collection of style attributes and building blocks that are used everywhere.

If you're looking for customizing the look of an individual component, look at the [Styling](../../../concept/Styling.md) documentation.

Theming involves a few different things: palettes, colors, animation timings, fonts, typography, and spacing. You can find everything that we use for theming in the `app/theme` folder. When we at Infinite Red receive a custom design, one of the first places we start is in this directory matching the values to the design. It's a great idea to match the design language used by the designers with the semantic names you will be providing in these files.

## Colors & Palettes

Colors are defined in `app/theme/colors.ts` (and `colorsDark.ts` for the dark theme). We use a palette-based approach to colors, which means that we define the set of colors used in the app. We then use these colors to define semantic color names to be used throughout the app. This allows us to have a consistent color palette across the app, and also allows us to change the palette easily.

[Colors & Palettes](./colors.ts.md)

## Fonts & Typography

Fonts are defined in `app/theme/fonts.ts`. We use a similar approach to colors, defining a set of fonts and then using those fonts to define semantic font names to be used throughout the app. This allows us to have a consistent font usage across the app, and also allows us to change the fonts easily.

[Fonts & Typography](./typography.ts.md)

## Timings

Timings are defined in `app/theme/timing.ts`. They can be used for consistent animation timings throughout the app.

## Spacing

Spacing is a first class citizen in Ignite. We use a spacing scale to define the spacing between elements in the app. This allows us to have a consistent spacing scale across the app, and also allows us to change the spacing easily. It is recommended to use the spacing scale for all spacing in the app if possible.

[Spacing](./spacing.ts.md)

# Multiple Themes (a.k.a "Dark Mode")

The Ignite boilerplate ships with color palette definitions and support for multiple themes! By default we define two themes, but you can easily add more using our generic theming system.

:::tip

Head on over to the [Ignite Cookbook](https://ignitecookbook.com/) to find recipes for how to integrate Ignite's theming system with other popular styling and component libraries!

:::

**New in Ignite 10**: the `useAppTheme` hook allows you to create dynamically-themed styles, right out of the box. Here's an example:

```tsx
import { type ViewStyle, View } from 'react-native'
import {
  type ThemedStyle,
  useAppTheme,
  ThemeProvider,
  useThemeProvider
} from 'app/theme'

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  justifyContent: "center",
  alignItems: "center",
})
const $normalStyle: ViewStyle = {
  width: 100,
  height: 100,
}

// Then use in a component like so:
const Component = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <View style={$normalStyle}>
    </View>
  )
}

const App = () => {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()
  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <Component />
    </ThemeProvider>
  )
}
```

For more information on the `useAppTheme()` hook, [check out its documentation](../utils/useAppTheme.tsx.md).

## Switching Between Themes

Theme support would be useless if there wasn't a built-in way to switch the theme at will. Ignite's theming system will automatically pick the theme that matches the user's system configuration (light mode or dark mode) but you can override this using the `

```tsx
// In your component:
const {
  setThemeContextOverride, // Function to set the theme
  themeContext, // The current theme context ("light" | "darK")
} = useAppTheme()

// Then hook it up to a user interaction:
const onThemeButtonPress = () => {
  // This will toggle between light and dark mode.
  setThemeContextOverride(themeContext === "dark" ? "light" : "dark")
}

// Or you can let them use their deice's system setting: light/dark
const resetThemeontextOverride = () => {
  setThemeContextOverride(undefined)
}
```

You could also hook it up to a switch if that's more your style:

```tsx
// In your component:
const {
  setThemeContextOverride, // Function to set the theme
  themeContext, // The current theme context ("light" | "darK")
} = useAppTheme()

// Then implement the switching button:
<Toggle
  label="Dark Mode"
  variant="switch"
  value={themeContext === "dark"}
  onValueChange={(value: boolean) => {
    setThemeContextOverride(value ? "dark" : "light")
  }}
/>
```

Once you have set an explicit theme override, the app will not respect the user's system setting, allowing you to lock the app to dark mode or light mode even when the user's system setting is different.

To have your app go back to respecting the user's device system setting, you can call `setThemeContextOverride(undefined)`.

## Hooking up the navigation theme

Ignite uses `react-navigation` so it's already hooked up for use with your `NavigationController`! The `navigationTheme` variable returned from `useThemeProvider()` is a `react-navigation` heme object you can pass to the root `NavigtionController`.

```tsx
const { navigationTheme } = useThemeProvider()
return <NavigationContainer theme={navigationTheme} {...props} />
```

## Integrating other styling and component libraries

There are many component libraries that offer light/dark modes to their components. Here's an example of how to use `react-native-elements` with Ignite's theming system by exending their own `ThemeProvider`:

```tsx
import { colorsDark, colorsLight, customFontsToLoad } from "src/theme"
import { createTheme as createRNEUITheme, ThemeProvider as RNEUIThemeProvider } from "@rneui/themed"

export const ThemedRNEUIProvider = ({ children }) => {
  const { themeScheme } = useThemeProvider()
  const themeColors = themeScheme === "light" ? colorsLight : colorsDark
  const RNEUITheme = createRNEUITheme({
    mode: themeScheme,
    lightColors: {
      primary: colorsLight.palette.secondary500,
    },
    darkColors: {
      primary: colorsDark.palette.secondary500,
    },
    components: {
      Text: {
        style: {
          color: themeColors.text,
        },
      },
      // ...etc
    },
  })

  return <RNEUIThemeProvider theme={RNEUITheme}>{children}</RNEUIThemeProvider>
}
```
