# Styling Ignite apps

Ignite's approach to styling is, like many other things in Ignite, straightforward and direct.

We don't use `StyleSheet.create()` as a general rule, as it doesn't provide any real benefits over bare objects.

We instead use a strategy of bare constants, colocated with our components, prefixed with `$`, and typed with TypeScript:

```tsx
import { View, ViewStyle } from "react-native"
import { palette } from "../theme"

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: palette.bgColor,
}

const MyComponent = () => {
  return <View style={$container}>...</View>
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

TODO

## Styling Workflow

TODO
