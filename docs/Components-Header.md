# Header Component

[Back to all components](./Components.md)

The `Header` component is a component that will appear at the top of your screen. It is used to hold navigation buttons and the screen title.

```tsx
<Header
  titleTx="header.title"
  title="Header Title"
  leftIcon="back"
  rightIcon="bullet"
  onLeftPress={() => navigation.goBack()}
  onRightPress={() => Alert.alert("pressed")}
  style={{ backgroundColor: "purple" }}
  titleStyle={{ color: "white" }}
/>
```

## Props

### `titleMode`

The layout of the title relative to the action components.

`center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
`flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.

### `titleStyle`

The `titleStyle` prop is an optional prop that is used to set the style of the header title. This is a [`StyleProp<TextStyle>`](https://reactnative.dev/docs/text-style-props) object.

```tsx
<Header
  title="Header Title"
  onLeftPress={() => navigation.goBack()}
  titleStyle={{ color: "white" }}
/>
```

### `containerStyle`

The `containerStyle` prop is an optional prop that is used to set the style of the header container. This is a [`StyleProp<ViewStyle>`](https://reactnative.dev/docs/view-style-props) object.

```tsx
<Header
  title="Header Title"
  onLeftPress={() => navigation.goBack()}
  containerStyle={{ backgroundColor: "purple" }}
/>
```

### `backgroundColor`

The `backgroundColor` prop is an optional prop that is used to set the background color of the header container.

```tsx
<Header
  title="Header Title"
  onLeftPress={() => navigation.goBack()}
  backgroundColor="purple"
/>
```

### `title`

The `title` is an optional prop that is used to set the header title. If this is not set, the `titleTx` prop must be present to set the title. If both are set, the `title` value will be used.

```tsx
<Header title="Header Title" leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `titleTx`

The `titleTx` is an optional prop that is used to lookup the translation for the header title. If this is not set, the `title` prop must be present to set the header title. If both are set, the `title` value will be used.

```tsx
<Header titleTx="header.title" leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `titleTxOptions`

The `titleTxOptions` is an optional prop that is used to pass props to the translation lookup for the header title. This is useful if you need to pass in dynamic values to the translation.

```tsx
<Header
  titleTx="header.title"
  titleTxOptions={{ name: "John" }}
  leftIcon="back"
  onLeftPress={() => navigation.goBack()}
/>
```

### `leftIcon`

The `leftIcon` is an optional prop that is used to set the icon for the left navigation button. Options are 'back', 'bullet', and 'bug'. Custom icons can be created by using the [`Icon` component](./Components-Icon.md#custom-icons). Once you create a custom icon, just pass the string name of the icon to the `leftIcon` prop.

```tsx
<Header leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `leftIconColor`

The `leftIconColor` is an optional prop that is used to set the tint color of the left navigation icon.

```tsx
<Header
  leftIcon="back"
  onLeftPress={() => navigation.goBack()}
  leftIconColor="white"
/>
```

### `leftText`

The `leftText` is an optional prop that is used to set the text for the left navigation button. Overrides the `leftIcon` prop.

```tsx
<Header leftText="Back" onLeftPress={() => navigation.goBack()} />
```

### `leftTx`

The `leftTx` is an optional prop that is used to lookup the translation for the left navigation button. Overrides the `leftIcon` and `leftText` prop`.

```tsx
<Header leftTx="header.back" onLeftPress={() => navigation.goBack()} />
```

### `leftTxOptions`

The `leftTxOptions` is an optional prop that is used to pass props to the translation lookup for the left navigation button. This is useful if you need to pass in dynamic values to the translation.

```tsx
<Header
  leftTx="header.back"
  leftTxOptions={{ name: "John" }}
  onLeftPress={() => navigation.goBack()}
/>
```

### `LeftActionComponent`

The `LeftActionComponent` is an optional prop that is used to set a custom component for the left navigation button. Overrides the `leftIcon`, `leftText`,  and `leftTx` props.

```tsx
<Header
  LeftActionComponent={() => <Text>Back</Text>}
  onLeftPress={() => navigation.goBack()}
/>
```

### `onLeftPress`

The `onLeftPress` is an optional prop that is used to set the function to be called when the left navigation button is pressed.

```tsx
<Header leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `rightIcon`

The `rightIcon` is an optional prop that is used to set the icon for the right navigation button. Custom icons can be created by using the [`Icon` component](./Components-Icon.md#custom-icons). Once you create a custom icon, just pass the string name of the icon to the `rightIcon` prop.

```tsx
<Header rightIcon="back" onRightPress={() => navigation.goBack()} />
```

### `rightIconColor`

The `rightIconColor` is an optional prop that is used to set the tint color of the right navigation icon.

```tsx
<Header
  rightIcon="back"
  onRightPress={() => navigation.goBack()}
  rightIconColor="white"
/>
```

### `rightText`

The `rightText` is an optional prop that is used to set the text for the right navigation button. Overrides the `rightIcon` prop.

```tsx
<Header rightText="Back" onRightPress={() => navigation.goBack()} />
```

### `rightTx`

The `rightTx` is an optional prop that is used to lookup the translation for the right navigation button. Overrides the `rightIcon` and `rightText` prop`.

```tsx
<Header rightTx="header.back" onRightPress={() => navigation.goBack()} />
```

### `rightTxOptions`

The `rightTxOptions` is an optional prop that is used to pass props to the translation lookup for the right navigation button. This is useful if you need to pass in dynamic values to the translation.

```tsx
<Header
  rightTx="header.back"
  rightTxOptions={{ name: "John" }}
  onRightPress={() => navigation.goBack()}
/>
```

### `RightActionComponent`

The `RightActionComponent` is an optional prop that is used to set a custom component for the right navigation button. Overrides the `rightIcon`, `rightText`,  and `rightTx` props.

```tsx
<Header
  RightActionComponent={() => <Text>Back</Text>}
  onRightPress={() => navigation.goBack()}
/>
```

### `onRightPress`

The `onRightPress` is an optional prop that is used to set the function to be called when the right navigation button is pressed.

```tsx
<Header rightIcon="back" onRightPress={() => navigation.goBack()} />
```

### `safeAreaEdges`

The `safeAreaEdges` optional prop can be used to override the default safe area edges. By default, the header will use the `top` safe area edge. If you want to use the `bottom` safe area edge, you can pass in `["bottom"]` to the `safeAreaEdges` prop.

```tsx
<Header safeAreaEdges={["bottom"]} />
```

### `SafeAreaViewProps`

The `SafeAreaViewProps` optional prop can be used to pass props to the `SafeAreaView` component. This is useful if you need to override the default `SafeAreaView` behavior.

```tsx
<Header SafeAreaViewProps={{ forceInset: { top: "never" } }} />
```
