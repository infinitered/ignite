# Remove Demo Code

Whenever users use command line boilerplate tool like `ignite` or `create-react-app`, the first thing that many users do is delete all the demo code to start their project.

Instead of going through the files yourself, or using find and replace, run `npx ignite-cli remove-demo`.

After the command, the Ignite boilerplate will now have the smallest amount of demo code possible, while having all of Ignite's set up still at your fingertips.

_Note: You can pass `--dry-run` to have the command tell you what it would remove/change._

## How It Works

When adding demo code to the boilerplate, use the following comments to have fine grained control over what gets stripped out. The goal is to be able to remove as much source code as possible while still having the generated Ignite app build correctly.

### `// @demo remove-file`

Remove the entire file.

#### Example:

```tsx
// @demo remove-file
export * from "./Text"
export * from "./Screen"
```

### `// @demo remove-current-line`

Remove the current line from the source code.

#### Example:

```tsx
const $style: ViewStyle = { padding: 10 } // @demo remove-current-line
```

### `// @demo remove-next-line`

Remove the next line from the source code

#### Example:

```tsx
// @demo remove-next-line
import { DemoScreen } from "./demo/screen"
```

### `// @demo remove-block-start && // @demo remove-block-end`

Remove the entire block between these lines from the source code

#### Example:

```tsx
// @demo remove-block-start
export function DemoDivider(props: DemoDividerProps) {
  const { type = "horizontal", size = 10, style: $styleOverride } = props

  return (
    <View
      style={[
        $divider,
        type === "horizontal" && { height: size },
        type === "vertical" && { width: size },
        $styleOverride,
      ]}
    />
  )
}
// @demo remove-block-end
```
