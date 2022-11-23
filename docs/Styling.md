# Styling Ignite apps

[Back to README](./README.md)

Ignite's approach to styling individual components is, like many other things in Ignite, straightforward and direct.

If you're looking to set app-wide styles such as fonts/typography or colors, check out the [Theming](./Theming.md) documentation.

We don't use `StyleSheet.create()` as a general rule, as it doesn't provide any real benefits over bare objects.

We instead use a strategy of bare JS objects, colocated with our components (usually below the component in the file), prefixed with `$`, and typed with TypeScript:

```tsx
import { View, ViewStyle } from "react-native"
import { colors } from "../theme"

const MyComponent = () => {
  return <View style={$container}>...</View>
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
```

Very often, we use [components with presets](./Components.md) to share styles across our whole app.

With this strategy, you can tell a variable is a style if it has the $ prefix. You can also spread in other styles to compose styles:

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

Most of the components we include with Ignite include a `preset` property:

```tsx
<View preset="heading" text="My Header" />
```

Presets are defined in the component file itself, usually something like this:

```tsx
const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium] as StyleProp<TextStyle>,
}
```

These presets are usually composed of other styles, using arrays (which React Native will properly merge).

So, let's say we want a button that is a destructive action. We might add a "destructive" preset to the Button component.

The preset might look like this:

```tsx
const $warning = { backgroundColor: "red", color: "white" }

const $viewPresets = {
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

## Styling Workflow

TODO: Finish this section?
