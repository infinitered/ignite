---
sidebar_position: 80
---

# Styling Ignite apps

Ignite's approach to styling individual components is, like many other things in Ignite, straightforward and direct.

If you're looking to set app-wide styles such as fonts/typography or colors, check out the [Theming](../boilerplate/app/theme/Theming.md) documentation.

We don't use `StyleSheet.create()` as a general rule, as it doesn't provide any real benefits over bare objects and functions.

We instead use a strategy of bare JS objects and functions that take a theme parameter, colocated with our components (usually below the component in the file), prefixed with `$`, and typed with TypeScript:

```tsx
import { View, type ViewStyle } from "react-native"
import { useAppTheme } from "app/utils/useAppTheme"

const MyComponent = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <View style={$plainObjectStyle} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  paddingHorizontal: theme.spacing.small,
})

const $plainObjectStyle: ViewStyle = {
  marginBottom: 20,
}
```

We use [components with presets](../boilerplate/app/components/Components.md) to share styles across our whole app.

With this strategy, you can tell if a variable is a style when it has the `$` prefix. You can also spread in other styles to compose styles:

```tsx
const $bold: TextStyle = {
  fontWeight: "bold",
}
const $larger: TextStyle = {
  fontSize: 22,
}
const $title: TextStyle = {
  ...$bold,
  ...$larger,
}
```

## Sharing Styles via Presets

Most of the [components](../boilerplate/app/components/Components.md) we include with Ignite include a `preset` property:

```tsx
<View preset="heading" text="My Header" />
```

Presets are defined in the component file itself, usually something like this:

```tsx
type Presets = "default" | "bold" | "heading" | "subheading"
const $presets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [$baseStyle],
  bold: [$baseStyle, $fontWeightStyles.bold],
  heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold],
  subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium],
}
```

These presets are usually composed of other styles, using arrays (which React Native will properly merge).

So, let's say we want a button that is a destructive action. We might add a "destructive" preset to the Button component.

The preset might look like this:

```tsx
const $warning: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.alert,
  color: "white",
  padding: theme.spacing.lg,
})

const $viewPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
  destructive: [$baseViewStyle, $warning],
}
```

You can then use it with your Button like this:

```tsx
<Button
  text="Delete"
  // set the preset here
  preset="destructive"
  onPress={() => thisItem.destroy()}
/>
```
