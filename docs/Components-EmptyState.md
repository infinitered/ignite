# EmptyState Component

[Back to all components](./Components.md)

The `EmptyState` component is to be used when there is no data to display, usually after attempting to load some content from an external API. It is a container that can hold a heading and content. It can also display an image and provide a button to interact with.

## Props

```tsx
<EmptyState
  preset="generic"
  style={{ padding: 10 }}
  imageSource={require("../../assets/images/sad-face.png")}
  imageStyle={{ height: 400, width: 400 }}
  ImageProps={{ resizeMode: "contain" }}
  heading="EmptyState Heading"
  headingStyle={{ color: "#a511dc" }}
  HeadingTextProps={{ weight: "bold" }}
  content="EmptyState Content"
  contentStyle={{ color: "#a511dc" }}
  ContentTextProps={{ weight: "light" }}
  button="Press here"
  buttonOnPress={handleButtonPress}
/>
```

### `preset`

The `preset` prop is used to set the preset container style of the EmptyState. This affects the default image, heading, content and button. Currently, only one preconfigured preset exists: `generic`.

```tsx
<EmptyState preset="generic" heading="EmptyState Heading" content="EmptyState Content" />
```

### `style`

The `style` prop is used to set the style override for the container.

```tsx
<EmptyState
  style={{ padding: 10, marginTop: 20 }}
  heading="EmptyState Heading"
  content="EmptyState Content"
/>
```

### `imageSource`

The `imageSource` prop is used to set the Image source to be displayed above the heading.

```tsx
<EmptyState
  imageSource={require("../../assets/images/empty-state.png")}
  heading="EmptyState Heading"
  content="EmptyState Content"
/>
```

### `imageStyle`

The `imageStyle` prop is used to set any style overrides to be applied to the image about the heading.

```tsx
<EmptyState
  imageSource={require("../../assets/images/empty-state.png")}
  imageStyle={{ borderRadius: 5 }}
  heading="EmptyState Heading"
  content="EmptyState Content"
/>
```

### `ImageProps`

The `ImageProps` prop is used to pass any additional props directly to the `Image` component. It will accept any prop that the `Image` component accepts.

```tsx
<EmptyState
  imageSource={require("../../assets/images/empty-state.png")}
  ImageProps={{ onLoad: handleImageLoaded }}
  heading="EmptyState Heading"
  content="EmptyState Content"
/>
```

### `heading`

The `heading` prop is used to set the heading text of the EmptyState.

```tsx
<EmptyState heading="EmptyState Heading" content="EmptyState Content" button="EmptyState Button" />
```

### `headingTx`

The `headingTx` prop is used to set the heading text of the EmptyState using a translation key.

```tsx
<EmptyState
  headingTx="EmptyState.heading"
  content="EmptyState Content"
  button="EmptyState Button"
/>
```

### `headingTxOptions`

The `headingTxOptions` prop is used to set the options for the translation key used by the `headingTx` prop.

```tsx
<EmptyState
  headingTx="EmptyState.heading"
  headingTxOptions={{ count: 2 }}
  content="EmptyState Content"
  button="EmptyState Button"
/>
```

### `headingStyle`

The `headingStyle` prop is used to set the style of the heading text.

```tsx
<EmptyState
  heading="EmptyState Heading"
  headingStyle={{ color: "red" }}
  content="EmptyState Content"
  button="EmptyState Button"
/>
```

### `HeadingTextProps`

The `HeadingTextProps` prop is used to pass any additional props to the heading `Text` component. It will accept any prop that the [`Text`](./Components-Text.md) component accepts.

```tsx
<EmptyState
  heading="EmptyState Heading"
  HeadingTextProps={{ size: "lg" }}
  content="EmptyState Content"
  button="EmptyState Button"
/>
```

### `content`

The `content` prop is used to set the content text of the EmptyState.

```tsx
<EmptyState heading="EmptyState Heading" content="EmptyState Content" button="EmptyState Button" />
```

### `contentTx`

The `contentTx` prop is used to set the content text of the EmptyState using a translation key.

```tsx
<EmptyState
  heading="EmptyState Heading"
  contentTx="EmptyState.content"
  button="EmptyState Button"
/>
```

### `contentTxOptions`

The `contentTxOptions` prop is used to set the options for the translation key used by the `contentTx` prop.

```tsx
<EmptyState
  heading="EmptyState Heading"
  contentTx="EmptyState.content"
  contentTxOptions={{ count: 2 }}
  button="EmptyState Button"
/>
```

### `contentStyle`

The `contentStyle` prop is used to set the style of the content text.

```tsx
<EmptyState
  heading="EmptyState Heading"
  content="EmptyState Content"
  contentStyle={{ backgroundColor: colors.error, color: colors.palette.neutral100 }}
  button="EmptyState Button"
/>
```

### `ContentTextProps`

The `ContentTextProps` prop is used to pass any additional props to the content `Text` component. It will accept any prop that the [`Text`](./Components-Text.md) component accepts.

```tsx
<EmptyState
  heading="EmptyState Heading"
  content="EmptyState Content"
  ContentTextProps={{ size: "lg" }}
  button="EmptyState Button"
/>
```

### `button`

The `button` prop is used to set the button text of the EmptyState.

```tsx
<EmptyState heading="EmptyState Heading" content="EmptyState Content" button="EmptyState Button" />
```

### `buttonTx`

The `buttonTx` prop is used to set the button text of the EmptyState using a translation key.

```tsx
<EmptyState
  heading="EmptyState Heading"
  content="EmptyState Content"
  buttonTx="EmptyState.button"
/>
```

### `buttonTxOptions`

The `buttonTxOptions` prop is used to set the options for the translation key used by the `buttonTx` prop.

```tsx
<EmptyState
  heading="EmptyState Heading"
  content="EmptyState Content"
  buttonTx="EmptyState.button"
  buttonTxOptions={{ count: 2 }}
/>
```

### `buttonStyle`

The `buttonStyle` prop is used to set the style overrides of the button.

```tsx
<EmptyState
  heading="EmptyState Heading"
  content="EmptyState Content"
  button="EmptyState Button"
  buttonStyle={{ backgroundColor: "red" }}
/>
```

### `buttonTextStyle`

The `buttonTextStyle` prop is used to set the style of the button text.

```tsx
<EmptyState
  heading="EmptyState Heading"
  content="EmptyState Content"
  button="EmptyState Button"
  buttonTextStyle={{ color: "red" }}
/>
```

### `ButtonProps`

The `ButtonProps` prop is used to pass any additional props to the `Button` component. It will accept any prop that the [`Button`](./Components-Button.md) component accepts.

```tsx
<EmptyState
  heading="EmptyState Heading"
  content="EmptyState Content"
  ButtonProps={{ preset: "reversed" }}
/>
```
