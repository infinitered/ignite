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
  style={{ height: 60 }}
  backgroundColor="purple"
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
<Header title="Header Title" titleStyle={{ color: "white" }} />
```

### `titleContainerStyle`

The `titleContainerStyle` prop is an optional prop that is used to set the style of the header title's outer container. This is a [`StyleProp<ViewStyle>`](https://reactnative.dev/docs/view-style-props) object.

```tsx
<Header title="Header Title" titleContainerStyle={{ backgroundColor: "purple" }} />
```

### `containerStyle`

The `containerStyle` prop is an optional prop that is used to set the style of the header's outer container. This is useful specifically on notched devices to override insets. This is a [`StyleProp<ViewStyle>`](https://reactnative.dev/docs/view-style-props) object.

```tsx
<Header title="Header Title" containerStyle={{ backgroundColor: "purple" }} />
```

### `style`

The `style` prop is an optional prop that is used to set the style of the header's inner container. You can use this to override the header's height. This is a [`StyleProp<ViewStyle>`](https://reactnative.dev/docs/view-style-props) object.

```tsx
<Header title="Header Title" style={{ height: 50 }} />
```

### `backgroundColor`

The `backgroundColor` prop is an optional prop that is used to set the background color of the header's outer container.

```tsx
<Header title="Header Title" onLeftPress={() => navigation.goBack()} backgroundColor="purple" />
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
<Header titleTx="header.title" leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `leftIconColor`

The `leftIconColor` is an optional prop that is used to set the tint color of the left navigation icon.

```tsx
<Header
  titleTx="header.title"
  leftIcon="back"
  leftIconColor="white"
  onLeftPress={() => navigation.goBack()}
/>
```

### `leftText`

The `leftText` is an optional prop that is used to set the text for the left navigation button. Overrides the `leftIcon` prop.

```tsx
<Header titleTx="header.title" leftText="Back" onLeftPress={() => navigation.goBack()} />
```

### `leftTx`

The `leftTx` is an optional prop that is used to lookup the translation for the left navigation button. Overrides the `leftIcon` and `leftText` prop`.

```tsx
<Header titleTx="header.title" leftTx="header.back" onLeftPress={() => navigation.goBack()} />
```

### `leftTxOptions`

The `leftTxOptions` is an optional prop that is used to pass props to the translation lookup for the left navigation button. This is useful if you need to pass in dynamic values to the translation.

```tsx
<Header
  titleTx="header.title"
  leftTx="header.back"
  leftTxOptions={{ name: "John" }}
  onLeftPress={() => navigation.goBack()}
/>
```

### `LeftActionComponent`

The `LeftActionComponent` is an optional `ReactElement` prop that is used to set a custom component for the left navigation button. Overrides the `leftIcon`, `leftText`, `leftTx`, and `onLeftText` props (since the passed component is completely customizable).

```tsx
<Header titleTx="header.title" LeftActionComponent={<Text>Back</Text>} />
```

### `onLeftPress`

The `onLeftPress` is an optional prop that is used to set the function to be called when the left navigation button is pressed.

```tsx
<Header titleTx="header.title" leftIcon="back" onLeftPress={() => navigation.goBack()} />
```

### `rightIcon`

The `rightIcon` is an optional prop that is used to set the icon for the right navigation button. Custom icons can be created by using the [`Icon` component](./Components-Icon.md#custom-icons). Once you create a custom icon, just pass the string name of the icon to the `rightIcon` prop.

```tsx
<Header titleTx="header.title" rightIcon="back" onRightPress={() => navigation.goBack()} />
```

### `rightIconColor`

The `rightIconColor` is an optional prop that is used to set the tint color of the right navigation icon.

```tsx
<Header
  titleTx="header.title"
  rightIcon="back"
  onRightPress={() => navigation.goBack()}
  rightIconColor="white"
/>
```

### `rightText`

The `rightText` is an optional prop that is used to set the text for the right navigation button. Overrides the `rightIcon` prop.

```tsx
<Header titleTx="header.title" rightText="Back" onRightPress={() => navigation.goBack()} />
```

### `rightTx`

The `rightTx` is an optional prop that is used to lookup the translation for the right navigation button. Overrides the `rightIcon` and `rightText` prop`.

```tsx
<Header titleTx="header.title" rightTx="header.back" onRightPress={() => navigation.goBack()} />
```

### `rightTxOptions`

The `rightTxOptions` is an optional prop that is used to pass props to the translation lookup for the right navigation button. This is useful if you need to pass in dynamic values to the translation.

```tsx
<Header
  titleTx="header.title"
  rightTx="header.back"
  rightTxOptions={{ name: "John" }}
  onRightPress={() => navigation.goBack()}
/>
```

### `RightActionComponent`

The `RightActionComponent` is an optional `ReactElement` prop that is used to set a custom component for the right navigation button. Overrides the `rightIcon`, `rightText`, `rightTx`, and `onRightPress` props (since the right action component can customize all that).

```tsx
<Header titleTx="header.title" RightActionComponent={<Text>Back</Text>} />
```

### `onRightPress`

The `onRightPress` is an optional prop that is used to set the function to be called when the right navigation button is pressed.

```tsx
<Header titleTx="header.title" rightIcon="back" onRightPress={() => navigation.goBack()} />
```

### `safeAreaEdges`

The `safeAreaEdges` optional prop can be used to override the default safe area edges. By default, the header will use the `top` safe area edge. If you want to not account for the safe area edges, you can pass in `[]` to the `safeAreaEdges` prop.

```tsx
<Header titleTx="header.title" safeAreaEdges={[]} />
```

## Usage

The Header is a flexible component that can be integrated within your application using a few different methods:

### Method 1 (recommended) - Using `navigation.setOptions()` method in your screen component or `useHeader()` hook.

This method gives you the most control over your Header and co-locates the logic inside of your screen while preserving react-navigation's optimizations by keeping it outside of the screen component's render lifecycle.

```tsx
function AccountScreen(props) {
  const { navigation } = props

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header title="Hello" />,
    })
  }, [])

  return <Screen />
}
```

A convenience [`useHeader`](./Utils-useHeader.md) hook is provided that abstracts and cleans up some of this logic.

```tsx
function AccountScreen(props) {
  useHeader({
    title: "Hello",
  })

  return <Screen />
}
```

### Method 2 - Directly in the render of you screen component.

The Header can be rendered directly in your screen's body. This gives you the most control over the Header component at the expense of performance as it is now a part of the screen's render lifecycle.

```tsx
function AccountScreen(props) {
  return (
    <View>
      <Header title="Hello" />
    </View>
  )
}
```

If you prefer this method, it might be a good idea to memoize the component to prevent unnecessary re-renders.

### Method 3 - Defining the header in your navigator/screen config.

If your Header shares a lot of the same logic within a navigator, it might be a better solution to set the Header inside the navigator config or navigator's screen config. For any customization between screens, you will still need to set the Header props using `navigation.setOptions()`. Additionally, the Header might need to be updated/refactored to use react-navigation's header properties as it isn't very compatible out-of-the-box.

```tsx
<Stack.Navigator
  screenOptions={{
    header: (props) => <Header title={props.options.headerTitle ?? props.route.name} />,
  }}
/>
```

Or, you can define it on the screen config.

```tsx
<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen
    name="Welcome"
    component={WelcomeScreen}
    options={{ headerShown: true, header: () => <Header title="Hello" /> }}
  />
</Stack.Navigator>
```
