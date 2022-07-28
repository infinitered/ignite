# Screen Component

[Back to all components](./Components.md)

This is a component that renders a screen. It is used to wrap your entire screen, and handles scrolling, [safe areas](https://reactnavigation.org/docs/handling-safe-area/), and keyboard avoiding behavior.

```tsx
<Screen preset="scroll" >
  <Header headerTitle="screen"/>
  // ... content here ...
</Screen>
```

## Props

### `style`

The `style` prop is an optional `StyleProp<ViewStyle>` object that applies to the outer `KeyboardAvoidingView` component and can be used to override the `preset` style.

```tsx
<Screen style={{ backgroundColor: "red"}}>
  // ... content here ...
</Screen>
```

### `preset`

The `preset` prop is an optional predefined `StyleProp<ViewStyle>` object that applies to the outer `KeyboardAvoidingView` component. You can view the details for the preset and create custom ones in `screen.presets.ts`. The predefined presets with ignite deal with different use cases for scroll behavior and keyboard avoiding behavior. It defaults to `scroll` behavior if not set.

The predefined presets are:

* `scroll` - A preset that applies a scroll behavior to the screen. This is useful for forms or other screens which require a keyboard.
* `fixed` - A preset that applies a fixed behavior to the screen. i.e. The screen will not scroll. This is useful if you have a component such as a `FlatList` that has its own scrolling behavior.
* `auto` - A preset that applies an automatic behavior to the screen. i.e. The screen will scroll if the content is larger than the screen, but not otherwise.

```tsx
<Screen preset="scroll">
  // ... content here ...
</Screen>
```

### `backgroundColor`

The `backgroundColor` optional prop is a simple `string` that applies a background color to root level `KeyboardAvoidingView`.

```tsx
<Screen backgroundColor="red">
  // ... content here ...
</Screen>
```

### `statusBar`

The `statusBar` optional prop is one of the following: 'light-content' or 'dark-content'. It defaults to 'light-content'. It is passed to the React Native [`StatusBar`](https://facebook.github.io/react-native/docs/statusbar.html) component under its `barStyle` prop.

```tsx

```tsx
<Screen statusBar="dark-content">
  // ... content here ...
</Screen>
```

### `unsafe`

The `unsafe` optional prop is a boolean that determines if the `KeyboardAvoidingView` is rendered as a `View` or a `SafeAreaView`. It defaults to `false`.

```tsx
<Screen unsafe>
  // ... content here ...
</Screen>
```

### `keyboardOffset`

The `keyboardOffset` optional prop is a number that determines the amount of space between the bottom of the screen and the bottom of the keyboard. It defaults to 'none', which is `0`. You can define a custom offset in `screen.presets.ts`.

```tsx
export const offsets = {
  none: 0,
  basic: 20,
}
```

```tsx
<Screen keyboardOffset="basic">
  // ... content here ...
</Screen>
```

### `keyboardShouldPersistTaps`

The `keyboardShouldPersistTaps` optional prop is a enum that determines if the keyboard should persist taps. It defaults to `"handled"`. This only applies for the `scroll` preset, because it is passed into the React Native [`ScrollView`](https://facebook.github.io/react-native/docs/scrollview.html) component under its `keyboardShouldPersistTaps` prop.


The valid values for this prop are: `"handled"`, `"always"`,and `"never"`.

```tsx
<Screen preset="scroll" keyboardShouldPersistTaps="never">
  // ... content here ...
</Screen>
```

