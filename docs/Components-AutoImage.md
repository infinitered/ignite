# AutoImage Component

[Back to all components](./Components.md)

Ignite's `AutoImage` Component is an enhanced version of the built-in React Native [Image](https://reactnative.dev/docs/image) component. It automatically resizes the image view to fit the size of the image and ensures you don't need to explicitly set the image size props on every image. This is mostly useful for images with an image source that is a remote URI or a data uri scheme. Local images (those loaded with `require()`) don't need this.

```tsx
<AutoImage
  source={{ uri: "https://pbs.twimg.com/profile_images/845384502067159040/pqF2RQ2q_400x400.jpg" }}
/>
```

## Props

Ignite's `AutoImage` component doesn't have any props of its own. As its only purpose is to automatically resize the image, it will accept all React Native `Image` props and forward them to the built in `Image` component.

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
