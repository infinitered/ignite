# ListItem Component

The `ListItem` component is a component that is used to display a single item in a list. It provides a lot of flexibility in terms of what you can do with it. It can be used to display a simple piece text, or a complex component with multiple actionable and custom styled elements inside.

```tsx
<ListItem height={50} />
```

## Props

As the `ListItem` component is interactable, it includes a `TouchableOpacity` component, which means that in addition to the custom props listed here, you can pass any props that are valid for a `TouchableOpacity` component.

### `height`

The `height` prop is used to set the height of the `ListItem` component. The default is `56`.

```tsx
<ListItem height={50} />
```

### `topSeparator` and `bottomSeparator`

The `topSeparator` and `bottomSeparator` props are used to display a separator above or below the `ListItem` component. The default is `false`.

```tsx
<ListItem topSeparator={true} bottomSeparator={true} />
```

### `text`

The `text` prop is used to display a simple piece of text inside the `ListItem` component.

```tsx
<ListItem text="Hello World" />
```

### `tx`

The `tx` prop is used to display a simple piece of text inside the `ListItem` component. It is used to display a localized string.

```tsx
<ListItem tx="example.helloWorld" />
```

### `children`

The `children` prop is used to display components inside the `ListItem` component. Note that these will be nested inside a [`Text`](./Components-Text.md) component.

```tsx
<ListItem height={100}>
  <Text>Subtext</Text>
</ListItem>
```

### `txOptions`

The `txOptions` prop is used to pass options to the `tx` prop. It is used to display a localized string.

```tsx
<ListItem tx="example.helloWorld" txOptions={{ name: "John" }} />
```

### `textStyle`

The `textStyle` prop is used to pass a style to the `Text` component that is used to display the text inside the `ListItem` component.

```tsx
<ListItem text="Hello World" textStyle={{ color: "red" }} />
```

### `TextProps`

The `TextProps` prop is used to pass any additional props directly to the [`Text`](./Components-Text.md) component.

```tsx
<ListItem text="Hello World" TextProps={{ weight: "bold" }} />
```

### `containerStyle`

The `containerStyle` prop is used to pass a style to the `View` component that is used to display the `ListItem` component.

```tsx
<ListItem text="Hello World" containerStyle={{ backgroundColor: "red" }} />
```

### `style`

The `style` prop is used to pass a style to the `TouchableOpacity` component that is used to display the `ListItem` component.

```tsx
<ListItem text="Hello World" style={{ backgroundColor: "red" }} />
```

### `leftIcon` and `rightIcon`

The `leftIcon` and `rightIcon` props are used to display an icon on the left or right side of the `ListItem` component, respectively.

```tsx
<ListItem text="Hello World" leftIcon="bell" rightIcon="bell" />
```

### `leftIconColor` and `rightIconColor`

The `leftIconColor` and `rightIconColor` props are used to set the color of the icon on the left or right side of the `ListItem` component, respectively.

```tsx
<ListItem
  text="Hello World"
  leftIcon="bell"
  leftIconColor="red"
  rightIcon="bell"
  rightIconColor="red"
/>
```

### `RightComponent` and `LeftComponent`

The `RightComponent` and `LeftComponent` props are `ReactElement` objects used to display a component on the left or right side of the `ListItem` component, respectively.

```tsx
<ListItem
  text="Hello World"
  LeftComponent={<Text>Left</Text>}
  RightComponent={<Text>Right</Text>}
/>
```
