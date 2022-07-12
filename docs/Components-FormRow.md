# FormRow Component

[Back to all components](./Components.md)

The `FormRow` component is a horizontal container for a form row. You can use it to contain form inputs.

```tsx
<FormRow preset="top">
  <TextField
    labelTx="form.email"
    placeholderTx="form.email.placeholder"
    returnKeyType="next"
    onSubmitEditing={() => this.passwordRef.current.focus()}
  />
</FormRow>
```

## Props

### `preset`

The `FormRow` component is a simple wrapper component that includes a few preset styles:

* top - rounded corners on the top, no bottom border
* middle - no rounded corners, no bottom border
* bottom - rounded corners on the bottom
* soloRound - all corners are rounded
* soloStraight - all corners are straight
* clear - transparent borders

```tsx
<FormRow preset="top">
  <TextField
    labelTx="form.email"
    placeholderTx="form.email.placeholder"
    returnKeyType="next"
    onSubmitEditing={() => this.passwordRef.current.focus()}
  />
</FormRow>
```

To create a custom reusable preset, add a new key to the `form-row.presets.ts` file.

### `style`

`style` is an optional style prop that you can use to override the default style of the component.

```tsx
<FormRow preset="top" style={{ backgroundColor: "red" }}>
  <TextField
    labelTx="form.email"
    placeholderTx="form.email.placeholder"
    returnKeyType="next"
    onSubmitEditing={() => this.passwordRef.current.focus()}
  />
</FormRow>
```