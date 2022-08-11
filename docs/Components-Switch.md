# Switch Component

[Back to all components](./Components.md)

The `Switch` component is a [`TouchableWithoutFeedback`](https://reactnative.dev/docs/touchablewithoutfeedback) component that renders a few animated views that can be toggled on and off like a switch. This component handles all the logic of the animation between the on/off states, and all you need to do is style it as you see fit.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  trackOnStyle={{ backgroundColor: "red" }}
  trackOffStyle={{ backgroundColor: "blue" }}
  thumbOnStyle={{ backgroundColor: "red" }}
  thumbOffStyle={{ backgroundColor: "blue" }}
/>
```

## Props

### `value`

The `value` prop is an optional boolean that determines whether the switch is on or off. Note that while not strictly required, the switch will default to the off state if this prop is not provided.

```tsx
<Switch value={true} />
```

### `onToggle`

The `onToggle` optional prop is a callback function that is called when the switch is toggled. This is useful for updating the state of the switch. Note that while not strictly required, it is necessary to make the component interactable.

```tsx
<Switch value={switch} onToggle={() => setSwitch(!switch)} />
```

### `style`

The `style` optional prop is an object that is applied to the outermost `TouchableWithoutFeedback` component of the switch.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
/>
```

### `trackOnStyle`

The `trackOnStyle` optional prop is an object that is applied to the outer `Animated.View` that is when the switch is on.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  trackOnStyle={{ backgroundColor: "red" }}
/>
```

### `trackOffStyle`

The `trackOffStyle` optional prop is an object that is applied to the outer `Animated.View` that is when the switch is off.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  trackOffStyle={{ backgroundColor: "blue" }}
/>
```

### `thumbOnStyle`

The `thumbOnStyle` optional prop is an object that is applied to the inner `Animated.View` that is when the switch is on.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  thumbOnStyle={{ backgroundColor: "red" }}
/>
```

### `thumbOffStyle`

The `thumbOffStyle` optional prop is an object that is applied to the inner `Animated.View` that is when the switch is off.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  thumbOffStyle={{ backgroundColor: "blue" }}
/>
```
