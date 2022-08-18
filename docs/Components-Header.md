# Header Component

[Back to all components](./Components.md)

MAVERICKTODO: update documentation with new props

The `Header` component is a component that will appear at the top of your screen. It is used to hold navigation buttons and the screen title.

```tsx
<Header
  headerTx="header.title"
  headerText="Header Title"
  leftIcon="back"
  rightIcon="bullet"
  onLeftPress={() => navigation.goBack()}
  onRightPress={() => Alert.alert("pressed")}
  style={{ backgroundColor: "purple" }}
  titleStyle={{ color: "white" }}
/>
```

## Props

### `headerTx`

The `headerTx` is an optional prop that is used to lookup the translation for the header title. If this is not set, the `headerText` prop must be present to set the header title. If both are set, the `headerText` value will be used.

```tsx
<Header headerTx="header.title" leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `headerText`

The `headerText` is an optional prop that is used to set the header title. If this is not set, the `headerTx` prop must be present to set the title. If both are set, the `headerText` value will be used.

```tsx
<Header headerText="Header Title" leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `leftIcon`

The `leftIcon` is an optional prop that is used to set the icon for the left navigation button. Options are 'back', 'bullet', and 'bug'. Custom icons can be created by using the [`Icon` component](./Components-Icon.md#custom-icons). Once you create a custom icon, just pass the string name of the icon to the `leftIcon` prop.

```tsx
<Header leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `rightIcon`

The `rightIcon` is an optional prop that is used to set the icon for the right navigation button. Options are 'bullet', and 'bug'. Custom icons can be created by using the [`Icon` component](./Components-Icon.md#custom-icons). Once you create a custom icon, just pass the string name of the icon to the `rightIcon` prop.

```tsx
<Header rightIcon="bullet" onRightPress={() => Alert.alert("pressed")} />
```

### `onLeftPress`

The `onLeftPress` is an optional prop that is used to set the function to be called when the left navigation button is pressed.

```tsx
<Header leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `onRightPress`

The `onRightPress` is an optional prop that is used to set the function to be called when the right navigation button is pressed.

```tsx
<Header rightIcon="bullet" onRightPress={() => Alert.alert("pressed")} />
```

### `style`

The `style` prop is an optional prop that is used to set the style of the header container. This is a [`StyleProp<ViewStyle>`](https://reactnative.dev/docs/view-style-props) object.

```tsx
<Header
  headerText="Header Title"
  onLeftPress={() => navigation.goBack()}
  style={{ backgroundColor: "purple" }}
/>
```

### `titleStyle`

The `titleStyle` prop is an optional prop that is used to set the style of the header title. This is a [`StyleProp<TextStyle>`](https://reactnative.dev/docs/text-style-props) object.

```tsx
<Header
  headerText="Header Title"
  onLeftPress={() => navigation.goBack()}
  titleStyle={{ color: "white" }}
/>
```
