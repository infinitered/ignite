# Getting Started Guide

## What is Ignite?

Ignite is best described as "[Infinite Red](https://infinite.red)'s favorite way to build React Native apps". It's a CLI and a boilerplate React Native project dating back to the early days of React Native (2016), as well as some command-line generators. It's also a community of like-minded developers who like the way we do things!

In short -- if you use Ignite to start your next React Native project, you're using a battle-tested, familiar stack.

### Ignite CLI

In order to start a new Ignite project, you can use the CLI. No need to install it globally as it works great with `npx`:

```bash
npx ignite-cli@latest new PizzaApp
```

It'll walk you through several questions.

Once it's up and running, you can use the Ignite CLI to [generate](./Generators.md) components, screens, MST models, and more.

Running into errors? have a look at [upgrading Ignite CLI](./Upgrading-Ignite.md)

### Ignite Boilerplate

Your new Ignite project (whether you start with Expo or not) comes with a full stack of useful libraries, pre-set up for you so you can start coding.

- React Native
- React Navigation
- MobX-State-Tree [(Why not Redux?)](https://github.com/infinitered/ignite/blob/master/docs/MobX-State-Tree.md)
- MobX-React-Lite
- TypeScript
- AsyncStorage (integrated with MST for restoring state)
- apisauce (to talk to REST servers)
- Flipper-ready
- Reactotron-ready (and pre-integrated with MST)
- Supports Expo (and Expo web) out of the box
- About a dozen prebuilt [components](./Components.md) to build out your UI with
- And more!

## Where do I start?

First, spin up the app and make sure you can see the initial screen. If you have any issues, please report them.

Once it's running, you'll want to get familiarized with the following concepts:

### Navigation

We use React Navigation v6 in the current version of Ignite. You'll find any navigators in `./app/navigators`, with the `AppNavigator.tsx` being the primary one.

There's also a `navigationUtilities.ts` file which provides some utility functions we find useful in building apps, such as `getActiveRouteName`, `useBackButtonHandler` and `useNavigationPersistence`.

Learn more in our [Navigation](./Navigation.md) documentation.

### Components

Ignite comes with some prebuilt, flexible, and customizable components. Unlike most component libraries, it's not built to drop in out of the box, but rather with custom design in mind (you do have a nice, custom design, don't you?)

Ignite works fine with other component libraries, but the built-in component system works the best for custom-designed apps.

Check out the [Components](./Components.md) documentation.

### Testing

Ignite is preconfigured to have [Maestro](https://maestro.mobile.dev/) and Jest.

You can learn more about why we chose these tests and how to use them in the [Testing](./Testing.md) docs.

### Styling

Ignite's approach to styling is, like many other things in Ignite, straightforward and blunt.

We don't use `StyleSheet.create()` as a general rule, as it doesn't provide any real benefits over bare objects.

We instead use a strategy of constants, colocated with our components, camelCase and prefixed with `$`, and typed with TypeScript:

```tsx
import { View, ViewStyle } from "react-native"
import { palette } from "../theme"

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: palette.bgColor,
}

const MyComponent = () => {
  return <View style={$container}>...</View>
}
```

Very often, we use [components with presets](./Components.md) to share styles across our whole app.

Read more about styling in the [Styling](./Styling.md) docs.
