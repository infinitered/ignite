# Ignite Built-in Components

Ignite comes with a number of customizable built-in React Native components -- sort of a lightweight design system, in a way. It's the system we (at Infinite Red) tend to use the most often with our own custom mobile designs, and is designed to emphasize flexibility and customizability _over_ out-of-the-box power.

There are a number of other options out there that work great with Ignite -- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/), [RN Elements](https://reactnativeelements.com/), and more. But if you're building something with a totally custom design, Ignite's built-in components work great.

## Components

Here's a summary of each component. Click through to view detailed documentation and code examples!

_NOTE: Work-in-progress -- stay tuned, as our new docs will be landing soon!_

### AutoImage

This is a wrapper around React Native's [Image](https://reactnative.dev/docs/image) component, which automatically resizes the image to fit the container.

```tsx
import { AutoImage as Image } from '../components/AutoImage';
export const logoIgnite = require("./logo-ignite.png");

<Image source={logoIgnite} />
```

[Full AutoImage Component Documentation](./Components-AutoImage.md)

### BulletItem

This is a component that renders a bullet point with associated text.

```tsx
<BulletItem text="This is a bullet item" />
```

[Full BulletItem Component Documentation](./Components-BulletItem.md)

### Button

This is a component that renders a [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity) with given text or children.

```tsx
<Button
  text="Click It"
  tx="button.clickIt"
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

[Full Button Component Documentation](./Components-Button.md)

### Checkbox

This is a component that renders a [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity) with a view to hold a checkbox and a text label.

```tsx
const [on, setOn] = useState(false);
// ...
<Checkbox
  text="Outline is the box frame"
  value={on}
  multiline
  style={{
    backgroundColor: "purple",
    marginLeft: 40,
    paddingVertical: 30,
    paddingLeft: 60,
  }}
  fillStyle={{
    backgroundColor: "red",
    borderRadius: 8
  }}
  outlineStyle={{
    borderColor: "green",
    borderRadius: 10,
    borderWidth: 4,
    width: 60,
    height: 20,
  }}
  onToggle={setOn}
/>
```

[Full Checkbox Component Documentation](./Components-Checkbox.md)

### FormRow

This is a component that renders a horizontal container for a form row. It includes presets that control rounded borders.

```tsx
<FormRow preset="top">
  <TextField
    value={input}
    onChangeText={setName}
    labelTx="signup.name"
    placeholderTx="signup.nameplaceholder"
    style={$header}
    inputStyle={$inputStyle}
    preset="default"
    forwardedRef={inputRef}
  />
</FormRow>
<FormRow preset="middle">
  <TextField
    value={input}
    onChangeText={setEmail}
    labelTx="signup.email"
    placeholderTx="signup.emailplaceholder"
    style={$header}
    inputStyle={$inputStyle}
    preset="default"
    forwardedRef={inputRef}
  />
</FormRow>
<FormRow preset="bottom">
  <Text>This is a form row</Text>
</FormRow>
```

[Full FormRow Component Documentation](./Components-FormRow.md)

### GradientBackground

This is a convenience component that wraps [`LinearGradient`]((https://docs.expo.dev/versions/latest/sdk/linear-gradient/)) from `expo-linear-gradient` and handles the styling for you.

```tsx
<GradientBackground colors={["#422443", "#281b34"]} />
```

[Full GradientBackground Component Documentation](./Components-GradientBackground.md)

### Header

The `Header` component is a component that will appear at the top of your screen. It is used to hold navigation buttons and the screen title.

```tsx
<Header
  headerTx="header.title"
  headerText="Header Title"
  leftIcon="back"
  rightIcon="bullet"
  onLeftPress={() => navigation.goBack()}
  onRightPress={() => Alert.alert("pressed")}
  style={{ backgroundColor: "purple" }}
  titleStyle={{ color: "white" }}
/>
```

[Full Header Component Documentation](./Components-Header.md)

### Icon

This is a component that renders an icon.

```tsx
<Icon
  icon='back'
  containerStyle={{backgroundColor: '#fff'}}
  style={{resizeMode: 'contain'}}
/>
```

[Full Icon Component Documentation](./Components-Icon.md)

### Screen

This is a component that renders a screen. It is used to wrap your entire screen, and handles scrolling, [safe areas](https://reactnavigation.org/docs/handling-safe-area/), and keyboard avoiding behavior.

```tsx
<Screen preset="scroll" >
  <Header headerTitle="screen"/>
  // ... content here ...
</Screen>
```

[Full Screen Component Documentation](./Components-Screen.md)

### Switch

This is a component that renders a few animated views that can be toggled on and off like a switch. This component handles all the logic of the animation, and all you need to do is style it as you see fit.

```tsx
<Switch
  value={switch}
  onToggle={() => setSwitch(!switch)}
  style={{ backgroundColor: "purple" }}
  trackOnStyle={{ backgroundColor: "red" }}
  trackOffStyle={{ backgroundColor: "blue" }}
  thumbOnStyle={{ backgroundColor: "red" }}
  thumbOffStyle={{ backgroundColor: "blue" }}
/>
```

[Full Switch Component Documentation](./Components-Switch.md)

### Text

This is an enhanced version of the built-in React Native Text component. It adds internationalization and property presets.

```tsx
<Text
  preset="header"
  tx="welcome.header"
  txOptions={{
    name: rootStore.currentUser.name,
  }}
  style={$header}
/>
```

[Full Text Component Documentation](./Components-Text.md)

### TextField


This component renders a View with a [`TextInput`](https://reactnative.dev/docs/textinput) and a text label.

```tsx
const [input, setInput] = useState("");
const inputRef = useRef();
<TextField
  value={input}
  onChangeText={setInput}
  labelTx="signup.name"
  placeholderTx="signup.nameplaceholder"
  style={$header}
  inputStyle={$inputStyle}
  preset="default"
  forwardedRef={inputRef}
/>
```
[Full Text Component Documentation](./Components-TextField.md)

### Wallpaper

This component renders an image background to a component or a screen.

```tsx
 <Wallpaper
  style={{
    marginHorizontal: 10,
    paddingVertical: 10,
  }}
  backgroundImage={newImage}
  preset="stretch"
 />
```
[Full Text Component Documentation](./Components-Wallpaper.md)

## Custom Components

Ignite includes a generator for creating custom components. If the built in components don't fit your needs, you can create your own.

`npx ignite-cli generate component MyCustomButton`

Running the generator will create a new component in the `components` directory.

```
-- app
  -- components
    -- my-custom-button
      -- my-custom-button.tsx
      -- my-custom-button.story.tsx
```