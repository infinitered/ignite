# Icon Component

[Back to all components](./Components.md)

Ignite's `Icon` Component renders an icon using predefined icon images. You can use those, override them, or customize this component to create any number of image based icons. If `onPress` is passed, it will wrap the icon in a [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity) component, otherwise it will use a [`View`](https://reactnative.dev/docs/view) component.

```tsx
<Icon icon="ladybug" onPress={() => Alert.alert("Hello")} />
```

## Props

Other than these props, you can pass any props that `TouchableOpacity` or `View` support and they will be forwarded to the respective wrapper component.

### `icon`

The `icon` prop is required. This is the string name of the icon to be rendered. The options are:

- back
- bell
- caretLeft
- caretRight
- check
- community
- components
- debug
- heart
- hidden
- ladybug
- lock
- menu
- more
- pin
- settings
- view
- x

```tsx
<Icon icon="bell" />
```

You can easily change or add [custom icons](#custom-icons) to the `Icon` component.

### `color`

The `color` optional prop is a string that will be used to set the [`tintColor`](https://reactnative.dev/docs/image-style-props#tintcolor) of the icon image.

```tsx
<Icon icon="x" color="#7C7C7C">
```

### `size`

The `size` optional prop is a number that is used to set the dimensions of the icon image.

```tsx
<Icon icon="x" size={24} />
```

### `style`

The `style` prop is optional. This is an object that overrides the default style of the icon, and is of the type `StyleProp<ImageStyle>`. By default this just sets the image's `resizeMode` to `contain`. See React Native docs on [ImageStyle](https://reactnative.dev/docs/image#style) for more information.

```tsx
<Icon icon="ladybug" style={{ width: 20, height: 20 }} />
```

### `containerStyle`

The `containerStyle` is an optional prop that sets the style of the icon container, and is of the type `StyleProp<ViewStyle>`. See React Native docs on [ViewStyle](https://reactnative.dev/docs/view-style-props) for more information.

```tsx
<Icon icon="bug" containerStyle={{ backgroundColor: "red" }} />
```

### `onPress`

The `onPress` optional prop is a function that will be called when the icon is pressed. Note that when this prop is passed, the icon will be wrapped in a `TouchableOpacity` component rather than a `View` component.

```tsx
<Icon icon="ladybug" onPress={() => Alert.alert("Hello")} />
```

## Custom Icons

To create your own custom icon, add your icon image(s) to the `assets/icons/` directory and then add it with its own name to the `iconRegistry` object in `app/components/Icon.tsx`.

```
-- icon/
  -- icons/
    -- index.ts
    -- my-custom-icon.png
```

```tsx
export const iconRegistry = {
  // ...
  custom: require("./myCustomIcon.png"),
}
```

You can then use your custom icon by passing its name through the `icon` prop.

```tsx
<Icon icon="custom" />
```
