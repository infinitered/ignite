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
  label="Name"
  placeholder="omg your name"
  style={$header}
  inputStyle={$inputStyle}
  preset="default"
/>

```

## Props

### `label`

The `label` optional prop is a string that is used to set the label. If this is not set, the `labelTx` prop must be present to set the label. If both are set, the `label` value will be used. The label is rendered with a [`Text`](./Components-Text.md) component

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  label="Name"
/>
```

### `labelTx`

The `labelTx` optional prop is a string that is used to set the label. If this is not set, the `label` prop must be present to set the label. If both are set, the `label` value will be used. The label is rendered with a [`Text`](./Components-Text.md) component. The label text is looked up by [i18n-js](https://github.com/fnando/i18n-js) (used for internationalization).

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  labelTx="signup.name"
/>
```

### `placeholder`

The `placeholder` optional prop is a string that is used to set the placeholder. If this is not set, the `placeholderTx` prop must be present to set the placeholder. If both are set, the `placeholder` value will be used.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  placeholder="Name"
/>
```

### `placeholderTx`

The `placeholderTx` is an optional prop that is used to set the placeholder. If this is not set, the `placeholder` prop must be present to set the placeholder. If both are set, the `placeholder` value will be used. The placeholder text is looked up by [i18n-js](https://github.com/fnando/i18n-js) (used for internationalization).

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  placeholderTx="signup.name"
/>
```

### `style`

The `style` optional prop is an object used to override the container style and is useful for margins & padding.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  labelTx="signup.name"
  placeholderTx="signup.name"
  style={{ paddingHorizontal:10 }}
/>
```

### `inputStyle`

The `inputStyle` optional prop is an object used to override the input style.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  labelTx="signup.name"
  placeholderTx="signup.name"
/>
```

### `preset`

The `preset` optional prop is a string name of the style preset to use. Use preset to setup various default styles.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  labelTx="signup.name"
  placeholderTx="signup.name"
  preset="default"
/>
```

If you find yourself overriding styles with the `style` prop a lot, you probably need a new preset for that use case.

#### Available Presets

`default`: this a default empty preset

#### Custom Presets

Feel free to add your own presets by adding style you require. In a typical Infinite Red project, for `TextField` we would have a couple or more presets that we use across the project.

### `forwardedRef`

The `forwardedRef` prop is optional. It is a reference prop.

```tsx
const inputRef = useRef();
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  labelTx="signup.name"
  placeholderTx="signup.name"
  forwardedRef={inputRef}
/>
```
