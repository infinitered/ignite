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

The `label` prop is optional. We encourage you to not use this but rather use the `labelTx` prop instead.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  label="Name"
/>
```

### `labelTx`

The `labelTx` prop is optional. The label text is looked up by [i18n](https://www.i18next.com/) (used for internationalization)

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  labelTx="signup.name"
/>
```

### `placeholder`

The `placeholder` prop is optional. We encourage you to not use this but rather use the `placeholderTx` prop instead.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  placeholder="Name"
/>
```

### `placeholderTx`

The `placeholderTx` prop is optional. The placeholder text is looked up by [i18n](https://www.i18next.com/) (used for internationalization)

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  placeholderTx="signup.name"
/>
```

### `style`

The `style` prop is optional. It overrides container style useful for margins & padding.

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

The `inputStyle` prop is optional. It overrides the input style.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  labelTx="signup.name"
  placeholderTx="signup.name"
  style={{ paddingHorizontal:10 }}
  inputStyle={{ color:color.palette.black }}
/>
```

### `preset`

The `preset` prop is optional. Use preset to setup various look and feels.

```tsx
<TextField
  value={input}
  onChangeText={(value) => setInput(value)}
  labelTx="signup.name"
  placeholderTx="signup.name"
  style={{ paddingHorizontal:10 }}
  inputStyle={{ color:color.palette.black }}
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
  style={{ paddingHorizontal:10 }}
  inputStyle={{ color:color.palette.black }}
  preset="default"
  forwardedRef={inputRef}
/>
```
