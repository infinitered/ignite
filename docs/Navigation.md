# Navigation in Ignite

We use [React Navigation v6](https://reactnavigation.org/docs/getting-started/) in the current version of Ignite. You'll find any navigators in `./app/navigators`, with the `AppNavigator.tsx` being the primary one.

There's also a `navigationUtilities.tsx` file which provides some utility functions we find useful in building apps, such as `getActiveRouteName`, `useBackButtonHandler` and `useNavigationPersistence`.

There's a provided Ignite CLI generator for creating new navigators. Learn more in the [Generator docs](./Generators.md#navigator-generator).

## General Structure

```tsx
<AppNavigator initialState={initialNavigationState} onStateChange={onNavigationStateChange} />
```

If you open the file `app/navigators/AppNavigator.tsx` up, you'll find the AppNavigator and the AppStack.

The AppNavigator is the root navigator for your whole app. It will have the navigation container and wrap the AppStack.

The AppStack is a native stack navigator (via [React Navigation](https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator)) and contains all the screens and subnavigators of your app.

In the case of Ignite's demo code, it is prepared with an example flow for an app requiring authentication. The screens included within the AppStack are dependent on value of `isAuthenticated` from `authenticationStore`. If in an unauthenticated state, the only screen to be shown will be the `LoginScreen`. Otherwise, that screen is left out of the navigator and the user is presented with the `WelcomeScreen` and screens that fall under the `DemoNavigator`

## Useful Patterns

We've found that there are some useful patterns for building navigators in React Native.

### Authentication Flow

We recommend following the guidance of [React Navigation's Authentication Flows](https://reactnavigation.org/docs/auth-flow/) and Ignite comes bootstrapped with this pattern in its demo code.

```tsx
const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Demo" component={DemoNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})
```

The screens included within the AppStack are dependent on value of `isAuthenticated` from `authenticationStore`. If the user hasn't been authenticated yet, the only screen to be shown will be the `LoginScreen`.

When authenticated, `LoginScreen` is left out of the navigator and the user is presented with the `WelcomeScreen` and screens that fall under the `DemoNavigator`

### Tab Navigation

We recommend using the [React Navigation Tabs](https://reactnavigation.org/docs/tab-based-navigation/) for tabs.

Inside `./app/navigators/DemoNavigator.tsx` you'll see the definition of the bottom tab navigator. Here is where you can customize the style and behavior of the tab bar itself, as well as each individual tab.

In addition to the user pressing the tab buttons, you may also navigate from tab to tab programmatically via the same familiar navigation API:

```tsx
// currently on the DemoShowroom tab, navigate to the DemoDebug tab
navigation.navigate("DemoDebug")
```

Tabs can jump to a single screen (as seen in Ignite's demo code) or another stack navigator comprised of many screens the user could navigate through within the same tab. Let's use a message inbox as an example:

```tsx
const InboxStack = createNativeStackNavigator()

function InboxStackScreen() {
  return (
    <InboxStack.Navigator>
      <InboxStack.Screen name="List" component={ListScreen} />
      <InboxStack.Screen name="MessageDetails" component={MessageDetailsScreen} />
    </InboxStack.Navigator>
  )
}
```

A tab could be added to the tab navigator as a child component.

`<Tab.Screen name="Inbox" component={InboxStackScreen} />`

This would initially display the `ListScreen` with all of the messages and if the user happened to press a list item, the app would then navigate to a `MessageDetailsScreen`.

### Sidebar Navigation

Ignite comes with an example sidebar navigation, aka "drawer" navigator. It is implemented using the `DrawerLayout` from [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/drawer-layout/), a cross-platform replacement for [React Native's DrawerLayoutAndroid](https://reactnative.dev/docs/drawerlayoutandroid.html).

The view passed via `renderNavigationView` prop is the content rendered to the side of the screen, which can be pulled in or opened by the toggle button press. Here is where you can render header information (perhaps a company logo or logged in user avatar along with labels), menu items, logout or settings functionality and more.

`DrawerLayout` also allows you to customize the behavior (open/close speed, overlay position), style and even has events to track the progress and states of the drawer transitioning. See more info at the [documentation](https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/drawer-layout/).

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

This helper custom hook persists app navigation state between app loads. This is only enabled in dev by default, but can be enabled in production as well by editing the hook in `navigationUtilities.tsx`.

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

## More Examples

TODO: Ignite cookbook examples coming soon!
