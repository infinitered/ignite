## `navigationUtilities.ts`

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
