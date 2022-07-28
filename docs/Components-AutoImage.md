# AutoImage Component

[Back to all components](./Components.md)

Ignite's `AutoImage` Component is an enhanced version of the built-in React Native [Image](https://reactnative.dev/docs/image) component. It automatically resizes the image view to fit the size of the image and ensures you don't need to explicitly set the image size props on every image. You can use it in place of the built-in `Image` component. We at Infinite Red often import it `as Image`, as there are no significant downsides to doing so, and ensures images will always be resized if needed.

```tsx
import { AutoImage as Image } from '../components/AutoImage';
export const logoIgnite = require("./logo-ignite.png");

<Image source={logoIgnite} />
```

## Props

Ignite's `AutoImage` component doesn't have any props of its own. As its only purpose is to automatically resize the image, it will accept all React Native `Image` props and forward them to the built in `Image` component.

### `source`

As with React Native's built in Image component, the `source` prop is always required. This can be *almost* anything that conforms to ReactNative's [ImageSource](https://reactnative.dev/docs/image#imagesource) type. (See [Notes](#Notes) below for caveats.)


```tsx
<AutoImage source={logoIgnite} />
```

### `style`

Setting the `style` prop will override the default styles. With `AutoImage`, you generally only need to specify width or height with dynamically loaded images. Setting both will override the resizing of `AutoImage` altogether.

```tsx
<AutoImage source={logoIgnite} style={{width: 200}} />
```

```tsx
<AutoImage source={logoIgnite} style={{height: 200}} />
```

Setting both will override the resizing of `AutoImage`, and can result in an incorrect aspect ratio.

```tsx
<AutoImage source={logoIgnite} style={{width: 200, height: 200}} />
```

## Notes

As noted above, the `source` prop can be almost anything, the one exception being an array of objects, which `AutoImage` doesn't support. See the React Native [Image#source](https://reactnative.dev/docs/image#source) documentation for more information.