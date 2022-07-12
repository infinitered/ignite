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
[on, setOn] = useState(false);
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

This is a component that renders a horizontal container for a form row.

```tsx
<FormRow preset="top">
  <Text>This is a form row</Text>
</FormRow>
<FormRow preset="middle">
  <Text>This is a form row</Text>
</FormRow>
<FormRow preset="bottom">
  <Text>This is a form row</Text>
</FormRow>
```

[Full FormRow Component Documentation](./Components-FormRow.md)

### GradientBackground

### Header

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

### Switch

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