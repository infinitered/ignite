# Ignite Built-in Components

Ignite comes with a number of customizable built-in React Native components -- sort of a lightweight design system, in a way. It's the system we (at Infinite Red) tend to use the most often with our own custom mobile designs, and is designed to emphasize flexibility and customizability _over_ out-of-the-box power.

There are a number of other options out there that work great with Ignite -- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/), [RN Elements](https://reactnativeelements.com/), and more. But if you're building something with a totally custom design, Ignite's built-in components work great.

## Components

Here's a summary of each component. Click through to view detailed documentation and code examples!

_NOTE: Work-in-progress -- stay tuned, as our new docs will be landing soon!_

### AutoImage

This is a wrapper around React Native's [Image](https://reactnative.dev/docs/image) component, which automatically resizes the image to fit the container.

```tsx
import { AutoImage as Image } from '../components/AutoImage';
export const logoIgnite = require("./logo-ignite.png");

<Image source={logoIgnite} />
```

[Full AutoImage Component Documentation](./Components-AutoImage.md)

### BulletItem

### Button

### Checkbox

### FormRow

### GradientBackground

### Header

### Icon

### Screen

### Switch

### Text

This is an enhanced version of the built-in React Native Text component. It adds internationalization and property presets.

```tsx
<Text
  preset="header"
  tx="welcome.header"
  txOptions={{
    name: rootStore.currentUser.name,
  }}
  style={$header}
/>
```

[Full Text Component Documentation](./Components-Text.md)

### TextField

### Wallpaper
