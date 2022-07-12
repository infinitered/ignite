# Wallpaper Component

[Back to all components](./Components.md)


Ignite's `Wallpaper` component renders an image background to ypur component or a screen. It is composed of an [Image](https://reactnative.dev/docs/image) component. You can also create your own presets for the background image.


```tsx
import { Wallpaper } from '../components/Wallpaper';
export const bgImage = require("./background.png");

<Wallpaper backgroundImage={bgImage} />
```

## Props

### `style`

The `style` prop is optional, it overrides the default style and is used for padding and margin. It is of the type `StyleProp<ImageStyle>`. See React Native docs on [ImageStyle](https://reactnative.dev/docs/image#style) for more information.

```tsx
<Wallpaper
  style={{ margunHorizontal: 5, paddingVertical:10 }}
/>
```

### `backgroundImage`

The `backgroundImage` prop is optional, this is an object that overrides the default image used for background, and is of the type `string`. 

```tsx
export const bgImage = require("./background.png");

<Wallpaper backgroundImage={bgImage} />
```

## Presets

Presets allow you to have a consistent look and feel across your app without having to redefine the styles all the time.

```tsx
<Wallpaper preset="stretch" />
```

You'll want to customize these presets and add more. You can do this in the `wallpaper.presets.ts` file.

If you find yourself overriding styles with the `style` prop a lot, you probably need a new preset for that use case.

### Custom Presets

Feel free to add your own presets by emulating the style you see with the provided presets. In a typical Infinite Red project, we will have a dozen or more presets that we use across the project.
