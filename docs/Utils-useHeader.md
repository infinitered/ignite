# useHeader

[Back to all utils](./Utils.md)

The `useHeader()` hook that can be used to easily set the Header of a react-navigation screen from within the screen's component.

```tsx
function AccountScreen() {
  useHeader({
    rightTx: "common.logOut",
    onRightPress: logout,
  })

  return <Screen />
}
```

## Parameters

### `headerProps: HeaderProps`

The first parameter is an object representing the props that will be passed directly to the [Header](./Components-Header.md) component.

```tsx
useHeader({
  rightTx: "common.logOut",
  leftTx: "common.back",
  onRightPress: logout,
  onLeftPress: goBack,
})
```

### `deps: any[]`

The second parameter is a list of dependencies passed to the `useLayoutEffect` that will cause the Header to be updated. Use this to control a dynamic header.

```tsx
const [count, setCount] = useState(1)

useEffect(() => {
  setTimeout(() => setCount(count + 1), 1000)
}, [count])

useHeader(
  {
    title: `Count: ${count}`,
  },
  [count],
)
```
