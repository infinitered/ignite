---
sidebar_position: 37
---

import ToggleProps from './\_toggle_props.mdx';

# Radio

This is the `Radio` variant of the [Toggle component](https://github.com/infinitered/ignite/blob/master/boilerplate/app/components/Toggle/Toggle.tsx). It renders a circular toggle with an inner dot indicator.

```tsx
<Radio value={value} onValueChange={setValue} />
```

## Radio Props

### `inputDetailStyle`

The `inputDetailStyle` prop allows you to customize the inner dot indicator. This affects the small circular dot that appears when the radio is in the "on" state.

```tsx
<Radio
  value={value}
  onValueChange={setValue}
  inputDetailStyle={{ backgroundColor: "red", width: 16, height: 16 }}
/>
```

<ToggleProps componentName="Radio" />
