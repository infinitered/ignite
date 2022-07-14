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

The `value` prop is a boolean that determines whether the switch is on or off.

```tsx
<Switch value={true} />
```

### `onToggle`

The `onToggle` prop is a function that is called when the switch is toggled. This is useful for updating the state of the switch.

```tsx
<Switch value={switch} onToggle={() => setSwitch(!switch)} />
```

### `style`

The `style` prop is an object that is applied to the outermost `TouchableWithoutFeedback` component of the switch.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
/>
```

### `trackOnStyle`

The `trackOnStyle` prop is an object that is applied to the outer `Animated.View` that is when the switch is on.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  trackOnStyle={{ backgroundColor: "red" }}
/>
```

### `trackOffStyle`

The `trackOffStyle` prop is an object that is applied to the outer `Animated.View` that is when the switch is off.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  trackOffStyle={{ backgroundColor: "blue" }}
/>
```

### `thumbOnStyle`

The `thumbOnStyle` prop is an object that is applied to the inner `Animated.View` that is when the switch is on.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  thumbOnStyle={{ backgroundColor: "red" }}
/>
```

### `thumbOffStyle`

The `thumbOffStyle` prop is an object that is applied to the inner `Animated.View` that is when the switch is off.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  thumbOffStyle={{ backgroundColor: "blue" }}
/>
```