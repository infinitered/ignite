# useSafeAreaInsetsStyle

[Back to all utils](./Utils.md)

The `useSafeAreaInsetsStyle()` hook can be used to create a safe-area-aware style object that can be passed directly to a View.

```tsx
<View style={useSafeAreaInsetsStyle(["top"], "padding")} />
```

## Parameters

### `safeAreaEdges: ExtendedEdge[]`

The first parameter is a list of edges that need to be safe-area-aware. In order for the hook to return an object with values, at least one edge needs to be provided. Default is `[]`.

```tsx
const $insetsStyle = useSafeAreaInsetsStyle(["top", "left"])

console.log($insetsStyle) // { paddingTop: 47, paddingStart: 0 }
```

### `property: "padding" | "margin"`

The second parameter specifies the property prefix that will be used to compose the style object. Default is `padding`.

```tsx
const $insetsPaddingStyle = useSafeAreaInsetsStyle(["bottom"], "padding")
const $insetsMarginStyle = useSafeAreaInsetsStyle(["bottom"], "margin")

console.log($insetsPaddingStyle) // { paddingBottom: 28 }
console.log($insetsMarginStyle) // { marginBottom: 28 }
```

## Types

### `ExtendedEdge`

A safe-area edge:

- top
- bottom
- left
- right
- start
- end

Note: "start" maps to the "left" value. "end" maps to "right.
