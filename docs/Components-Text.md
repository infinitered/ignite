# Text Component

[Back to all components](./Components.md)

Ignite's `Text` Component is an enhanced version of the built-in React Native Text component. It adds internationalization and property presets.

By enhancing the Ignite Text component and using it across your app, you can make sure the right fonts, font weight, and other styles and behaviors are shared across your whole app.

## Props

### `text`

Text content. We encourage you to not use this but rather use the `tx` prop instead.

```tsx
<Text text="My Text" />
```

### `tx`

Text which is looked up via i18n. _TODO: Add i18n docs and link here._

```tsx
<Text tx="welcomeScreen.readyForLaunch" />
```

### `txOptions`

Optional options to pass to i18n. Useful for [interpolation]() as well as explicitly setting locale or translation fallbacks. You'll be defining these in the `app/i18n/*.json` files, and can use `{{variableName}}` for interpolation.

```tsx
// in en.json
profile: {
  details: "{{name}} who is {{age}} years old"
}

// in your component
;<Text
  tx="profile.details"
  txOptions={{
    name: "Jamon",
    age: 40,
  }}
/>
```

### `style`

Style overrides for this particular component. You can use style overrides with presets.

```tsx
<Text tx="welcome.title" style={{ fontSize: 40 }} />
```

### `preset`

Specify what preset style you want to use. You can use style overrides with presets.

```tsx
<Text preset="bold" text="This is bold" />
```

## Presets

Presets allow you to have a consistent look and feel across your app without having to redefine the styles all the time.

```tsx
<View preset="header" text="My Header" />
```

You'll want to customize these presets and add more. You can do this in the `text.presets.ts` file.

### Available Presets

`default`: The default text styles.

`bold`: A bold version of the default text.

`header`: Large headers.

`fieldLabel`: Field labels that appear on forms above the inputs.

`secondary`: A smaller piece of secondary information.
