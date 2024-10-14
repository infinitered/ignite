---
sidebar_position: 38
---

import ToggleProps from './\_toggle_props.mdx';

# Switch

The `Switch` component provides a simple way to collect user input for a boolean value.

## Switch Props

### `accessibilityMode`

The `accessibilityMode` is a special prop for the switch variant that adds a text/icon label for on/off states. Options are `text` and `icon`

```tsx
<Switch value={value} onValueChange={setValue} accessibilityMode="icon" />
```

<ToggleProps componentName="Switch" />
