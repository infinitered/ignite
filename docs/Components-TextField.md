# TextField Component

[Back to all components](./Components.md)

Ignite's `TextField` Component is an enhanced version of the built-in React Native [`TextInput`](https://reactnative.dev/docs/textinput) component. It consists of TextInput and a Text(./Components-Text.md) label.

With this component you will be able to standardise TextInput component across your app.

```tsx
import { TextField } from '../components';

const [input, setInput] = useState("")
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  status="error"
  label="Name"
  labelTx="login.nameLabel"
  labelTxOptions={{ name: "John" }}
  LabelTextProps={{ style: { color: "#FFFFFF" } }}
  placeholder="John Doe"
  placeholderTx="login.namePlaceholder"
  placeholderTxOptions={{ name: "John" }}
  helper="Enter your name"
  helperTx="login.nameHelper"
  helperTxOptions={{ name: "John" }}
  HelperTextProps={{ style: { color: "#FFFFFF" } }}
  style={{ backgroundColor: "#BFBFBF" }}
  containerStyle={{ backgroundColor: "#BFBFBF" }}
  inputWrapperStyle={{ backgroundColor: "#BFBFBF" }}
  RightAccessory={() => <Icon icon="check" />}
  LeftAccessory={() => <Icon icon="bell" />}
/>

```

## Props

The `TextField` component accepts all the props of the built-in React Native [`TextInput`](https://reactnative.dev/docs/textinput) component which will be forwarded to the `TextInput` component, as well as the following props:

### `status`

The `status` prop is used to set an `'error'` or `'disabled'` state on the component. The default value is `null`. You can use it to show an error style for validations or to disable the component. By default the `'error'` status will set the `borderColor` on the input wrapper to whatever `colors.error` is set to. Setting the status to `'disabled'` will disable editing on the `TextInput` component.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} status="error" />
```

### `label`

The `label` optional prop is a string that is used to set the label. If this is not set, the `labelTx` prop must be present to set the label. If both are set, the `label` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} label="Name" />
```

### `labelTx`

The `labelTx` optional prop is the string key used to look up the translated text for the user's locale. Ignite uses [`i18n-js`](http://i18njs.com/) for internationalization. If this is not set, the `label` prop must be present to set the label. If both are set, the `label` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} labelTx="signup.name" />
```

### `labelTxOptions`

The `labelTxOptions` is an optional prop that is used to pass props to the translation lookup for the header title. This is useful if you need to pass in dynamic values to the translation.

```tsx
<TextField
  value={input}
  labelTx="signup.name"
  labelTxOptions={{ name: "John" }}
  onChangeText={(value) => setInput(value)}
/>
```

### `LabelTextProps`

The `LabelTextProps` is an optional prop that is used to pass props to the [`Text`](./Components-Text.md) component that renders the label.

```tsx
<TextField
  value={input}
  labelTx="signup.name"
  onChangeText={(value) => setInput(value)}
  LabelTextProps={{ style: { color: "red" } }}
/>
```

### `helper`

The `helper` optional prop is a string that is used to set the helper text. If this is not set, the `helperTx` prop must be present to set the helper text. If both are set, the `helper` value will be used. The helper text is rendered with a [`Text`](./Components-Text.md) component.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} helper="This is a helper text" />
```

### `helperTx`

The `helperTx` optional prop is the string key used to look up the translated text for the user's locale. Ignite uses [`i18n-js`](http://i18njs.com/) for internationalization. If this is not set, the `helper` prop must be present to set the helper text. If both are set, the `helper` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} helperTx="signup.name" />
```

### `helperTxOptions`

The `helperTxOptions` is an optional prop that is used to pass props to the translation lookup for the helper text. This is useful if you need to pass in dynamic values to the translation.

```tsx
<TextField
  value={input}
  helperTx="login.name"
  helperTxOptions={{ name: "John" }}
  onChangeText={(value) => setInput(value)}
/>
```

### `HelperTextProps`

The `HelperTextProps` is an optional prop that is used to pass props to the [`Text`](./Components-Text.md) component that renders the helper text.

```tsx
<TextField
  value={input}
  helper="Name"
  onChangeText={(value) => setInput(value)}
  HelperTextProps={{ style: { color: "red" } }}
/>
```

### `placeholder`

The `placeholder` optional prop is a string that is used to set the placeholder. If this is not set, the `placeholderTx` prop must be present to set the placeholder. If both are set, the `placeholder` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} placeholder="Name" />
```

### `placeholderTx`

The `placeholderTx` optional prop is the string key used to look up the translated text for the user's locale. Ignite uses [`i18n-js`](http://i18njs.com/) for internationalization. If this is not set, the `placeholder` prop must be present to set the placeholder. If both are set, the `placeholder` value will be used.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} placeholderTx="signup.name" />
```

### `placeholderTxOptions`

The `placeholderTxOptions` is an optional prop that is used to pass props to the translation lookup for the placeholder text. This is useful if you need to pass in dynamic values to the translation.

```tsx
<TextField value={input} onChangeText={(value) => setInput(value)} />
```

### `style`

The `style` optional prop is an object used to override the input style.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  style={{ backgroundColor: "red" }}
/>
```

### `containerStyle`

The `containerStyle` optional prop is an object used to override the container style.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  containerStyle={{ backgroundColor: "red" }}
/>
```

### `inputWrapperStyle`

The `inputWrapperStyle` optional prop is an object used to override the input wrapper style.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  inputWrapperStyle={{ backgroundColor: "red" }}
/>
```

### `RightAccessory` and `LeftAccessory`

The `RightAccessory` and `LeftAccessory` optional props are components that are rendered on the right and left sides of the input, respectively. This is useful for rendering icons or buttons. The [`status`](#status), `multiline` from the `TextInputProps`, `editable` (negation of `disabled` status), and a default `style` attribute are passed into it via props for custom usage.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  RightAccessory={(props) => (
    // props has `multiline`, `status`, `disabled`, and `style` attributes
    {disabled, status} = props

    if (!!disabled) return <Icon icon="lock" color="gray" />
    if (status === 'error') return <Icon icon="x" color="red" />

    return <Icon icon="check" color="green" />
  )}
/>
```

It's also recommended to use `useMemo` on accessories to prevent flickering, as without `useMemo` they will rerender whenever the input value changes.

```tsx
const PasswordRightAccessory = useMemo(
  () =>
    function PasswordRightAccessory(props: TextFieldAccessoryProps) {
      return (
        <Icon
          icon={isAuthPasswordHidden ? "view" : "hidden"}
          color={colors.palette.neutral800}
          containerStyle={props.style}
          onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
        />
      )
    },
  [isAuthPasswordHidden],
)
```

This could then be passed to the `TextField` component directly.

```tsx
<TextField
  value={password}
  onChangeText={(value) => setPassword(password)}
  RightAccessory={PasswordRightAccessory}
/>
```
