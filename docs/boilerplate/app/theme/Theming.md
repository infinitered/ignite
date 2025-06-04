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
} from '@/theme'

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
  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  )
}
```

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
const resetThemeContextOverride = () => {
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

Ignite uses `react-navigation` so it's already hooked up for use with your `NavigationController`! The `navigationTheme` variable returned from `useThemeProvider()` is a `react-navigation` theme object you can pass to the root `NavigationController`.

```tsx
const { navigationTheme } = useThemeProvider()
return <NavigationContainer theme={navigationTheme} {...props} />
```

## Integrating other styling and component libraries

There are many component libraries that offer light/dark modes to their components. Here's an example of how to use `react-native-elements` with Ignite's theming system by extending their own `ThemeProvider`:

```tsx
import { colorsDark, colorsLight } from "@/theme/colors"
import { customFontsToLoad } from "@/theme/typography"
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

# useAppTheme

The `useAppTheme()` hook returns various properties and tools relating to theming your app.

Generally, you'll only need a few properties from this hook, with the most important being `theme` and `themed`.

Example usage:

```tsx
import { View, type ViewStyle } from "react-native"
import { useAppTheme } from "@/theme"

const MyComponent = () => {
  const {
    // Any styles you create with the type ThemedStyle<T> must be wrapped with
    // themed($styleName) before passing it along to the component's style property.
    themed,
    // This is the current theme object.
    theme,
    // themeContext is what theme you are actually using: "light" | "dark"
    themeContext,
  } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={$plainObjectStyle}>
        {/* An Example of direct theme color usage in a component: */}
        <View
          style={{
            backgroundColor: theme.colors.error,
          }}
        >
          {/* This will output "light" or "dark" */}
          <Text>{themeContext}</Text>
        </View>
      </View>
    </View>
  )
}

// This is an ignite ThemedStyle. It's just like a ViewStyle but
// is wrapped with a function that will be called with a theme parameter.
const $container: ThemedStyle<ViewStyle> = (theme) => ({
  // You can access theme named colors:
  backgroundColor: theme.colors.background,
  // Accessing the color palette is not generally recommended.
  color: theme.colors.palette.angry500,
  // Spacing can be changed on a per-theme basis as well.
  paddingHorizontal: theme.spacing.small,
})

// We haven't abandoned plain style objects as the preferred way
// to style your components, but it can't use dynamic themes.
const $plainObjectStyle: ViewStyle = {
  marginBottom: 20,
}
```

## Properties:

### `theme`

A `Theme` object that contains all the colors, spacing, and other theme-related properties of the current theme context. You can edit these values in the `app/theme` folder.

### `themeContext`

A string that represents the current theme context. This will almost always be either "light" or "dark".

:::info

When resetting the theme context to the system preference with `setThemeContextOverride(undefined)`, the `themeContext` will not be undefined. It will be the return value of `react-native`'s `useColorScheme()` hook.

:::

### `themed`

`themed()` is a simple function with complex types. You can pass a plain style object to it, a `ThemedStyle` function, or an array of either.

:::note

When passing an array of styles or `ThemedStyle` functions to `themed()`, it will return a single style object with last properties overriding any properties previously set.

In the example below, the last `<View>` would be yellow even though `$themedStyle` specifies red because the background color property was modified by a later style in the array.

:::

```tsx
const $plainStyle: ViewStyle = {
  padding: 10,
  backgroundColor: "black",
  width: 25,
  height: 25,
}

const $themedStyle: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.errorBackground,
  height: theme.spacing.xl,
  width: theme.spacing.xl
})

<View style={$plainStyle} />
// <View style={$themedStyle} /> // This won't work
<View style={themed($themedStyle)} />
// <View style={themed($plainStyle)} /> // You can, but why would you?
<View style={themed([$themedStyle, $plainStyle])} />
<View style={themed([
  $themedStyle,
  $plainStyle,
  // A plain style object
  { width: 7, backgroundColor: 'yellow'}
])} />
```

Make sure you don't pass any `Animated` styles to `themed()`. It will not work as expected! Keep them in separate style array objects: `<Animated.View style={[$animatedStyle, themed($myThemedStyle)]}>`.

### `setThemeContextOverride`

A function that allows you to override the theme context. This is useful for allowing users to switch between light and dark mode.

The default behavior is to use the system theme, but you can override this by calling `setThemeContextOverride("light" | "dark")`.

Calling `setThemeContextOverride(undefined)` will reset the theme to the user's system preference.

### `navigationTheme`

A `react-navigation` [theme object](https://reactnavigation.org/docs/themes#built-in-themes). This is the same object you would pass to a `NavigationContainer` component.

