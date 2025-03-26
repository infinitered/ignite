---
sidebar_position: 3
---

# Ignite Built-in Components

Ignite comes with a number of customizable built-in React Native components -- sort of a lightweight design system, in a way. It's the system we (at Infinite Red) tend to use the most often with our own custom mobile designs, and is designed to emphasize flexibility and customizability _over_ out-of-the-box power.

There are a number of other options out there that work great with Ignite -- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/), [RN Elements](https://reactnativeelements.com/), and more. But if you're building something with a totally custom design, Ignite's built-in components work great.

## Components

Here's a summary of each component. Click through to view detailed documentation and code examples!

### AutoImage

This is a wrapper around React Native's [Image](https://reactnative.dev/docs/image) component, which automatically resizes the image to fit the container.

```tsx
<AutoImage
  source={{ uri: "https://pbs.twimg.com/profile_images/845384502067159040/pqF2RQ2q_400x400.jpg" }}
/>
```

[Full AutoImage Component Documentation](./AutoImage.md)

### Button

This is a component that renders a [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity) with given text or children.

```tsx
<Button
  text="Click It"
  tx="button:clickIt"
  preset="primary"
  onPress={() => Alert.alert("pressed")}
  style={[{ paddingVertical: 100 }, { borderRadius: 0 }]}
  textStyle={[{ fontSize: 20 }, { color: "#a511dc" }]}
/>
```

```tsx
<Button onPress={() => Alert.alert("pressed")}>
  <Text>Click It</Text>
</Button>
```

[Full Button Component Documentation](./Button.md)

### Card

The `Card` component is useful for displaying related information in a contained way. Where you'll use `ListItem` for horizontal information, `Card` can be used for vertical information.

```tsx
<Card
  preset="reversed"
  verticalAlignment="space-between"
  LeftComponent={<Text>Left</Text>}
  RightComponent={<Text>Right</Text>}
  heading="Card Heading"
  headingStyle={{ color: "#a511dc" }}
  HeadingTextProps={{ weight: "bold" }}
  content="Card Content"
  contentStyle={{ color: "#a511dc" }}
  ContentTextProps={{ weight: "light" }}
  footer="Card Footer"
  footerStyle={{ color: "#a511dc" }}
  FooterTextProps={{ weight: "medium" }}
/>
```

[Full Card Component Documentation](./Card.md)

### Checkbox

The `Checkbox` component is useful for displaying a user's choice for a boolean value.

```tsx
<Checkbox
  value={value}
  icon="check"
  onValueChange={setValue}
  labelTx="signup:rememberMe"
  labelStyle={{ color: "#a511dc" }}
  containerStyle={{ backgroundColor: "#fff" }}
/>
```

[Full Checkbox Component Documentation](./Checkbox.md)

### EmptyState

The `EmptyState` component can be used when there is no data to display and direct the user on how to proceed.

```tsx
<EmptyState
  preset="default"
  style={{ padding: 10 }}
  imageSource={require("../../assets/images/sad-face.png")}
  imageStyle={{ height: 400, width: 400 }}
  ImageProps={{ resizeMode: "contain" }}
  heading="EmptyState Heading"
  headingStyle={{ color: "#a511dc" }}
  HeadingTextProps={{ weight: "bold" }}
  content="EmptyState Content"
  contentStyle={{ color: "#a511dc" }}
  ContentTextProps={{ weight: "light" }}
  button="Press here"
  buttonOnPress={handleButtonPress}
/>
```

[Full EmptyState Component Documentation](./EmptyState.md)

### Header

The `Header` component is a component that will appear at the top of your screen. It is used to hold navigation buttons and the screen title.

```tsx
<Header
  headerTx="header:title"
  headerText="Header Title"
  leftIcon="back"
  rightIcon="bullet"
  onLeftPress={() => navigation.goBack()}
  onRightPress={() => Alert.alert("pressed")}
  style={{ backgroundColor: "purple" }}
  titleStyle={{ color: "white" }}
/>
```

[Full Header Component Documentation](./Header.md)

### Icon

This is a component that renders an icon.

```tsx
<Icon
  icon="back"
  color="#a511dc"
  size={30}
  containerStyle={{ backgroundColor: "#fff" }}
  style={{ resizeMode: "contain" }}
  onPress={() => Alert.alert("pressed")}
/>
```

[Full Icon Component Documentation](./Icon.md)

### Radio

The `Radio` component is useful for displaying a user's choice for a boolean value.

```tsx
<Radio
  value={value}
  onValueChange={setValue}
  labelTx="signup:rememberMe"
  labelStyle={{ color: "#a511dc" }}
  containerStyle={{ backgroundColor: "#fff" }}
/>
```

[Full Radio Component Documentation](./Radio.md)

### Screen

This is a component that renders a screen. It is used to wrap your entire screen, and handles scrolling, [safe areas](https://reactnavigation.org/docs/handling-safe-area/), and keyboard avoiding behavior.

```tsx
<Screen preset="scroll">
  <Header headerTitle="screen" />
  // ... content here ...
</Screen>
```

[Full Screen Component Documentation](./Screen.md)

### Switch

The `Switch` component is useful for displaying a user's choice for a boolean value.

```tsx
<Switch
  value={value}
  accessibilityMode="icon"
  onValueChange={setValue}
  labelTx="signup:rememberMe"
  labelStyle={{ color: "#a511dc" }}
  containerStyle={{ backgroundColor: "#fff" }}
/>
```

[Full Switch Component Documentation](./Switch.md)

### Text

This is an enhanced version of the built-in React Native Text component. It adds internationalization and property presets.

```tsx
<Text
  preset="header"
  tx="welcome:header"
  txOptions={{
    name: rootStore.currentUser.name,
  }}
  style={$header}
/>
```

[Full Text Component Documentation](./Text.md)

### TextField

This component renders a View with a [`TextInput`](https://reactnative.dev/docs/textinput) and a text label.

```tsx
const [input, setInput] = useState("")
const inputRef = useRef()
<TextField
  value={input}
  onChangeText={setInput}
  labelTx="signup:name"
  placeholderTx="signup:nameplaceholder"
  style={$header}
  inputStyle={$inputStyle}
  preset="default"
  forwardedRef={inputRef}
/>
```

[Full Text Component Documentation](./TextField.md)

## Custom Components

Ignite includes a generator for creating custom components. If the built in components don't fit your needs, you can create your own.

`npx ignite-cli generate component MyCustomButton`

Running the generator will create a new component in the `components` directory.

```
-- app
  -- components
    -- MyCustomButton.tsx
```
