# Checkbox Component

[Back to all components](./Components.md)

The `Checkbox` component is a simple checkbox that can be used to toggle a boolean value. It is composed of a [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity) with a view to hold a checkbox and a text label.

```tsx
const [on, setOn] = useState(false)
// ...
;<Checkbox
  text="Outline is the box frame"
  value={on}
  multiline
  style={{
    backgroundColor: "purple",
    marginLeft: 40,
    paddingVertical: 30,
    paddingLeft: 60,
  }}
  fillStyle={{
    backgroundColor: "red",
    borderRadius: 8,
  }}
  outlineStyle={{
    borderColor: "green",
    borderRadius: 10,
    borderWidth: 4,
    width: 60,
    height: 20,
  }}
  onToggle={setOn}
/>
```

## Props

### `text`

The optional text label of the checkbox. This or `tx` is required.

```tsx
<Checkbox text="This is the checkbox label" value={on} onToggle={setOn} />
```

### `tx`

The optional translation key of the text label of the checkbox. This or `text` is required.

```tsx
<Checkbox tx="checkbox.label" value={on} onToggle={setOn} />
```

### `value`

The boolean value of the checkbox. This prop is not strictly required, but necessary to avoid defaulting to a unchecked checkbox.

```tsx
<Checkbox text="This is the checkbox label" value={true} onToggle={setOn} />
```

### `multiline`

This optional boolean prop determines if the text label of the checkbox is multiline.

```tsx
<Checkbox text="This is the checkbox label" value={true} multiline onToggle={setOn} />
```

### `style`

The optional [`style`](https://reactnative.dev/docs/viewstyle) prop is applied to the outer container of the checkbox.

```tsx
<Checkbox
  text="This is the checkbox label"
  value={on}
  style={{
    backgroundColor: "purple",
    marginLeft: 40,
    paddingVertical: 30,
    paddingLeft: 60,
  }}
  onToggle={setOn}
/>
```

### `fillStyle`

The optional [`fillStyle`](https://reactnative.dev/docs/viewstyle) of the filled part of the checkbox.

```tsx
<Checkbox
  text="This is the checkbox label"
  value={on}
  fillStyle={{
    backgroundColor: "red",
    borderRadius: 8,
  }}
  onToggle={setOn}
/>
```

### `outlineStyle`

The optional [`outlineStyle`](https://reactnative.dev/docs/viewstyle) of the outline of the checkbox.

```tsx
<Checkbox
  text="This is the checkbox label"
  value={on}
  outlineStyle={{
    borderColor: "green",
    borderRadius: 10,
    borderWidth: 4,
    width: 60,
    height: 20,
  }}
  onToggle={setOn}
/>
```

### `onToggle`

The function to call when the checkbox is toggled. This prop is optional, but the checkbox will not be interactable unless this is passed. Note that this function can be passed directly, as the `Checkbox` component will handle inverting the value.

```tsx
<Checkbox text="This is the checkbox label" value={on} onToggle={setOn} />
```
