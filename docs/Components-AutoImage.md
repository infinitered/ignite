# AutoImage Component

[Back to all components](./Components.md)

Ignite's `AutoImage` Component is an enhanced version of the built-in React Native [Image](https://reactnative.dev/docs/image) component. It automatically resizes the image view to fit a max width or height constraint

```tsx
<AutoImage
  source={{ uri: "https://pbs.twimg.com/profile_images/845384502067159040/pqF2RQ2q_400x400.jpg" }}
  maxWidth={200}
/>
```

`AutoImage` uses a `useAutoImage` hook to calculate the image's dimensions when you have a specific values you need to constrain the image within. This hook is also available for use in your own components.

```tsx
const { width, height } = useAutoImage(uri, maxWidth, maxHeight)
```

## Props

Ignite's `AutoImage` component has two props of its own: `maxWidth` and `maxHeight`.

### `maxWidth` and `maxHeight`

These props are used to constrain the image to a specific size. Use `maxWidth` or `maxHeight` to set the maximum width or height of the image, and it will resize to whichever dimension you specify without skewing the aspect ratio. e.g. If the image is 300w x 200h, and you set `maxWidth={200}`, the image will be resized to 200w x 133h.

```tsx
<AutoImage
  source={{ uri: "https://pbs.twimg.com/profile_images/845384502067159040/pqF2RQ2q_400x400.jpg" }}
  maxWidth={200}
  maxHeight={200}
/>
```

## Default Image props

As `AutoImage` is a wrapper around React Native's `Image` component, it also accepts all of the props that `Image` accepts. See the [React Native Image documentation](https://reactnative.dev/docs/image) for more information.

### `source`

As with React Native's built in Image component, the `source` prop is always required. This can be _almost_ anything that conforms to ReactNative's [ImageSource](https://reactnative.dev/docs/image#imagesource) type. (See [Notes](#Notes) below for caveats.)

```tsx
<AutoImage source={logoIgnite} />
```

### `style`

Setting the `style` prop will override the default styles. With `AutoImage`, you generally only need to specify width _or_ height with dynamically loaded images. Setting both will override the resizing of `AutoImage` altogether, and if that is needed it's best to just use the default React Native `Image` component.

```tsx
<AutoImage source={logoIgnite} style={{ width: 200 }} />
```

```tsx
<AutoImage source={logoIgnite} style={{ height: 200 }} />
```

## Notes

As noted above, the `source` prop can be almost anything, the one exception being an array of objects, which `AutoImage` doesn't support. See the React Native [Image#source](https://reactnative.dev/docs/image#source) documentation for more information.
