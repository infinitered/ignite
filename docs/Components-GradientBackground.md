# GradientBackground Component

This is a convenience component that wraps [`LinearGradient`]((https://docs.expo.dev/versions/latest/sdk/linear-gradient/)) from `expo-linear-gradient` and handles the styling for you.

The only prop you need to pass is a 2 item array of colors, the gradient will be from the first color to the second color.

```tsx
<GradientBackground colors={["#422443", "#281b34"]} />
```

You will generally pass this as a top level component in your [`Screen`](./Components-Screen.md).

```tsx
<Screen>
  <GradientBackground colors={["#422443", "#281b34"]} />
  // ... other components
</Screen>
```