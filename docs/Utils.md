# Collection of helpful utilities

Here you can find a library of utilities that are used often within your application. This includes hooks, helper functions, and various tools.

## Hooks

### useSafeAreaInsetsStyle

A hook can be used to create a safe-area-aware style object that can be passed directly to a View.

```tsx
const $insetStyle = useSafeAreaInsetsStyle(["top"], "padding")

<View style={$insetStyle} />
```

[Full `useSafeAreaInsetsStyle`](./Utils-useSafeAreaInsetsStyle.md)

### useHeader

A hook that can be used to easily set the Header of a react-navigation screen from within the screen's component.

```tsx
function AccountScreen() {
  useHeader({
    rightTx: "common.logOut",
    onRightPress: logout,
  })

  return <Screen />
}
```

[Full `useHeader`](./Utils-useHeader.md)
