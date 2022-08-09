# Icon Component

[Back to all components](./Components.md)

Ignite's `Icon` Component renders an icon using predefined icon images. It initially supports a 'back' icon, 'bullet' icon, and a 'bug' icon. This is used in ignite's `DemoScreen`, but can be used as a reference for how to create your own icons.

```tsx
<Icon icon="bug" />
```

## Props

### `icon`

The `icon` prop is required. This is the string name of the icon to be rendered. The options are:

- `back`
- `bullet`
- `bug`

```tsx
<Icon icon="bug" />
```

### `style`

The `style` prop is optional. This is an object that overrides the default style of the icon, and is of the type `StyleProp<ImageStyle>`. See React Native docs on [ImageStyle](https://reactnative.dev/docs/image#style) for more information.

```tsx
<Icon icon="bug" style={{ width: 20, height: 20 }} />
```

### `containerStyle`

The `containerStyle` prop is optional this is an object that overrides the default style of the icon container, and is of the type `StyleProp<ViewStyle>`. See React Native docs on [ViewStyle](https://reactnative.dev/docs/view-style-props) for more information.

```tsx
<Icon icon="bug" containerStyle={{ backgroundColor: "red" }} />
```

## Custom Icons

To create your own custom icon, add your icon image(s) to the `icon/icons/` directory and then add it with its own name to the `index.ts` file in the same directory.

```
-- icon/
  -- icons/
    -- index.ts
    -- my-custom-icon.png
```

```tsx
export const icons = {
  // ...
  custom: require("./myCustomIcon.png"),
}
```

You can then use your custom icon by passing its name through the `icon` prop.

```tsx
<Icon icon="custom" />
```
