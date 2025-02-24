---
sidebar_position: 39
---

# Text

Ignite's `Text` Component is an enhanced version of the built-in React Native [`Text`](https://reactnative.dev/docs/text) component. It adds internationalization and several useful (and customizable) property presets. You shouldn't need the built-in React Native Text component if you use this. It does everything the built-in one does and more.

By enhancing the Ignite Text component and using it across your app, you can make sure the right fonts, font weight, and other styles and behaviors are shared across your whole app.

![text-component](https://github.com/user-attachments/assets/61277e64-c530-4043-93fe-5da41c9e9351)

## Props

### `text`

The `text` prop is the text of the component. 

```tsx
<Text text="My Text" />
```

<!-- TODO: add internationalization instructions here -->

```tsx
const translations = TranslateSheet.create("namespace", {
  details: "My name is {{name}} and I'm {{age}} years old!"
})

// in your component
<Text text={translations.details({ name: "Jamon", age: 40 })} />
```

### `style`

The `style` optional prop is an object with overrides for this particular component. You can use `style` overrides with presets.

```tsx
<Text text="Welcome" style={{ fontSize: 40 }} />
```

### `weight`

The `weight` optional prop is the font weight to use for the text. It utilizes the fonts defined in the `app/theme/typography.tsx` file.

```tsx
<Text text="Welcome" weight="medium" />
```

### `size`

The `size` optional prop is the font size to use for the text. The options are defined as `$sizeStyles` in `app/components/Text.tsx`. You can add sizes as you need to the `$sizeStyles` object and use them in your `Text` component.

```tsx
<Text text="Welcome" size="lg" />
```

### `preset`

The `preset` optional prop specifies the string of the preset style you want to use. You can use style overrides with presets.

```tsx
<Text preset="bold" text="This is bold" />
```

## Presets

Presets allow you to have a consistent look and feel across your app without having to redefine the styles all the time.

```tsx
<View preset="heading" text="My Header" />
```

You'll want to customize these presets and add more. You can do this in the `text.presets.ts` file.

If you find yourself overriding styles with the `style` prop a lot, you probably need a new preset for that use case.

### Available Presets

`default`: The default text styles.

`bold`: A bold version of the default text.

`heading`: Large headers.

`subheading`: A smaller piece of secondary information.

`formLabel`: Form input label.

`formHelper`: Form assistive information.

### Custom Presets

Feel free to add your own presets by emulating the style you see with the provided presets. In a typical Infinite Red project, we will have a dozen or more presets that we use across the project. Simply add a new key to the `$presets` object in `app/components/Text.tsx` and then pass the name of the preset to the `preset` prop.

```tsx
$presets = { label: [$baseStyle, $sizeStyles.md, $fontWeightStyles.medium] }
```

```tsx
<Text preset="label" text="Email" />
```
