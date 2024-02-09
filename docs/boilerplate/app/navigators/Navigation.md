---
sidebar_position: 90
---

# Navigation in Ignite

We use [React Navigation v6](https://reactnavigation.org/docs/getting-started/) in the current version of Ignite. You'll find any navigators in `./app/navigators`, with the `AppNavigator.tsx` being the primary one.

There's also a `navigationUtilities.tsx` file which provides some utility functions we find useful in building apps, such as `getActiveRouteName`, `useBackButtonHandler` and `useNavigationPersistence`.

There's a provided Ignite CLI generator for creating new navigators. Learn more in the [Generator docs](../../../concept/Generators.md#navigator-generator).

## General Structure

```tsx
<AppNavigator initialState={initialNavigationState} onStateChange={onNavigationStateChange} />
```

See the [AppNavigator.tsx](./AppNavigator.tsx.md) docs for more info on how the app navigator is set up.

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

Ignite's navigation setup also comes with some very useful [navigation utilities](./navigationUtilities.ts.md) to help you with common tasks such as getting the current route name, handling the back button, and persisting navigation state.

## A note about Expo Router

We are currently evaluating [Expo Router](https://docs.expo.dev/router/introduction/) to power Ignite's navigation system. It's a very promising project (built on React Navigation), but our philosophy is that nothing makes it into Ignite unless we've proven it in a full project (or two...or three...) first. We'll update this section when we have more information.
