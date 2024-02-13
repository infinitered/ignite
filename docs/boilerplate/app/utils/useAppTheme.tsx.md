---
sidebar_position: 10
---

# useAppTheme()

The `useAppTheme()` hook returns various properties and tools relating to theming your app.

Generally, you'll only need a few properties from this hook, with the most important being `theme` and `themed`.

Example usage:

```tsx
import { View, type ViewStyle } from "react-native"
import { useAppTheme } from "app/utils/useAppTheme"
import { colors } from "app/theme"

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

### Using `themed()`

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
