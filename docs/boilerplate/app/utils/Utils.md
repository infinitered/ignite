---
title: utils
sidebar_position: 60
---

# `utils` folder

Every app needs a junk drawer. Here you can find a library of utilities that are used often within your application. This could includes hooks, helper functions, and various tools.

## Hooks

:::tip
We sometimes create a separate `app/hooks` folder just for hooks. This is a matter of preference.
:::

### useAppTheme

A hook that returns various properties and tools relating to theming your app.

```tsx
const { themed, themeContext } = useAppTheme()

const $themedStyle: ThemedStyle<ViewStyle> = (theme) =({
  backgroundColor: theme.colors.background
})

<View style={themed($themedStyle)}>
  <Text>{themeContext}</Text>
</View>
```

[Full `useAppTheme`](./useAppTheme.tsx.md)

### useSafeAreaInsetsStyle

A hook can be used to create a safe-area-aware style object that can be passed directly to a View.

```tsx
const $insetStyle = useSafeAreaInsetsStyle(["top"], "padding")

<View style={$insetStyle} />
```

[Full `useSafeAreaInsetsStyle`](./useSafeAreaInsetsStyle.ts.md)

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

[Full `useHeader`](./useHeader.tsx.md)
