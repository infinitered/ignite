# Button Component

[Back to all components](./Components.md)

The `Button` component is a wrapper around the [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity) component. Any prop that can be passed to `TouchableOpacity` can be passed to `Button` and it will be forwarded. `Button` renders a button with given text in a [`Text`](./Components-Text.md) component or children. It allows you to specify the preset style of the button, you can override both the `TouchableOpacity` and `Text` style.

```tsx
<Button
  text="Click It"
  tx="button.clickIt"
  preset="primary"
  onPress={() => Alert.alert("pressed")}
  style={[{ paddingVertical: 100 }, { borderRadius: 0 }]}
  textStyle={[{ fontSize: 20 }, { color: "#a511dc" }]}
/>
```

## Props

### `text`

The `text` prop is required if `tx` or `children` are not provided. This is the text to be rendered in the button.

```tsx
<Button text="Click me" />
```

### `tx`

The `tx` prop is required if `text` or `children` are not provided. This is the translation key to be used to translate the text.

```tsx
<Button tx="button.clickMe" />
```

### `children`

The `children` prop is required if no `tx` or `text` prop is passed. This is the content to be rendered in the button in the place of the default `Text` component.

```tsx
<Button>
  <Text>Click me</Text>
</Button>
```

### `preset`

The `preset` prop is optional. This is the preset style of the button. It can be one of the following built in options: `primary`, `link`

```tsx
<Button preset="primary" tx="button.clickMe" />
```

Note that the preset applies to both the `TouchableOpacity` and `Text` components, using a view preset and text preset of the same name respectively, so you to use differently named presets on each you need to pass a child `Text` component directly.

```tsx
<Button preset="primary">
  // uses primary view preset
  <Text preset="link">Click me</Text> // uses link text preset
</Button>
```

To make a custom preset, add a `View` and `Text` preset in `app/components/button/button.presets.ts` and then pass the name of the preset to the `preset` prop.

```tsx
export const viewPresets: Record<string, ViewStyle> = {
  // ... other view presets
  custom: {
    backgroundColor: "#fff",
    borderRadius: 0,
  },
}

export const textPresets: Record<string, TextStyle> = {
  // ... other text presets
  custom: {
    color: "#fff",
  },
}
```

```tsx
<Button preset="custom" text="Click me" />
```

### `textStyle`

The `textStyle` prop is optional. This can be used to style text in the button. Values passed here will override anything set in the preset.

```tsx
<Button textStyle={{ fontSize: 20, color: "#a511dc" }} />
```

### `style`

The `style` prop is optional. This can be used to style the `TouchableOpacity` component of the `Button`. Values passed here will override anything set in the preset.

```tsx
<Button style={{ paddingVertical: 20, borderRadius: 10 }}>
```

<!-- MAVERICKTODO: update the documentation with new component props  -->
