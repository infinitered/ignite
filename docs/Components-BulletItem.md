# BulletItem Component

[Back to all components](./Components.md)

Ignite's `BulletItem` component renders some text next to a bullet point created using the `Icon` component. This is used internally for the `DemoScreen`, but can be used as a reference for how we use custom components mixed with the standard components that come with ignite.

```tsx
import { BulletItem } from "../components/BulletItem"
;<BulletItem text="This is a bullet item" />
```

## Props

### `text`

This prop is required. It sets the text to be displayed next to the bullet icon.
