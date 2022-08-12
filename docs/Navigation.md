# Navigation in Ignite

We use [React Navigation v6](https://reactnavigation.org/docs/getting-started/) in the current version of Ignite. You'll find any navigators in `./app/navigators`, with the `app-navigator.tsx` being the primary one.

There's also a `navigation-utilities.tsx` file which provides some utility functions we find useful in building apps, such as `getActiveRouteName`, `useBackButtonHandler` and `useNavigationPersistence`.

There's a provided Ignite CLI generator for creating new navigators. Learn more in the [Generator docs](./Generators.md#navigator-generator).

## General Structure

The root navigator is called `AppNavigator` and is rendered in `./app/app.tsx`.

```tsx
<AppNavigator initialState={initialNavigationState} onStateChange={onNavigationStateChange} />
```

If you open the file `app/navigators/app-navigator.tsx` up, you'll find the AppNavigator and the AppStack.

The AppNavigator is the root navigator for your whole app. It will have the navigation container and wrap the AppStack.

The AppStack is a native stack navigator (via [React Native Screens](https://github.com/software-mansion/react-native-screens)) and contains all the screens and subnavigators of your app.

MAVERICKTODO: Update with new navigation structure that Lizzi and Kate are working on.

## Useful Patterns

We've found that there are some useful patterns for building navigators in React Native.

MAVERICKTODO: Point them to the relevant Ignite cookbook docs.

### Tab Navigation

We recommend using the [React Navigation Tabs](https://reactnavigation.org/docs/tab-based-navigation/) for tabs.

MAVERICKTODO: Expand and add any useful tips for tab navigation here.

### Sidebar Navigation

Ignite comes with an example sidebar navigation, aka "drawer" navigator.

MAVERICKTODO: Add info about the example drawer here.

### Modals

Ignite comes with an example modal screen.

MAVERICKTODO: Add info about the example modal screen here.

## Utility Functions

### `getActiveRouteName`

This helper allows you to fetch the active route name from your navigator. It will recursively dive into nested routers. It takes the current navigation state (via `navigation.getState()`) and returns a string.

Example:

```tsx
// nested navigators, 2-deep
const NestedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="myScreen" component={MyScreen} />
    </Stack.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="nestedNav" component={NestedStack} />
    </Stack.Navigator>
  )
}

// getActiveRouteName usage
function MyScreen({ navigation }) {
  const routeName = getActiveRouteName(navigation.getState())
  // => "myScreen"
}
```

### `useBackButtonHandler`

This helper custom hook allows you to easily specify what routes you want to exit the app from, when the "back" button is pressed on Android. It has no effect on iOS.

We recommend using this in your root AppNavigator.

Example:

```tsx
export const AppNavigator = (props) => {
  // What route names do we allow the back button to exit the app from?
  const exitRoutes = ["welcome"]
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  // ...
}
```

### `useNavigationPersistence`

This helper custom hook persists app navigation state between app loads. This is only enabled in dev by default, but can be enabled in production as well by editing the hook in `navigation-utilities.tsx`.

```tsx
import * as storage from "./utils/storage"

function App(props: AppProps) {
  const persistence = useNavigationPersistence(storage, "my-persistence-key")
  const { initialNavigationState, onNavigationStateChange, isRestored } = persistence

  // wait for the navigation state to restore
  // `null` will show the background color
  // can replace with <LoadingScreen /> or similar if you want
  if (!isRestored) return null

  return (
    <AppNavigator
      // initial navigation state is fetched from storage
      initialState={initialNavigationState}
      // persist changes to storage
      onStateChange={onNavigationStateChange}
    />
  )
}
```
