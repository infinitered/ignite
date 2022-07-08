# Navigation in Ignite

We use [React Navigation v6](https://reactnavigation.org/docs/getting-started/) in the current version of Ignite. You'll find any navigators in `./app/navigators`, with the `app-navigator.tsx` being the primary one.

There's also a `navigation-utilities.tsx` file which provides some utility functions we find useful in building apps, such as `getActiveRouteName`, `useBackButtonHandler` and `useNavigationPersistence`.

There's a provided Ignite CLI generator for creating new navigators.

## General Structure

The root navigator is called `AppNavigator` and is rendered in `./app/app.tsx`.

```tsx
<AppNavigator initialState={initialNavigationState} onStateChange={onNavigationStateChange} />
```

If you open the file `app/navigators/app-navigator.tsx` up, you'll find ...

TODO

## Useful Patterns

We've found that there are some useful patterns for building navigators in React Native.

TODO

## Tab Navigation

TODO

## Sidebar Navigation

TODO

## Modals

TODO

## Utility Functions

### `getActiveRouteName`

TODO

### `useBackButtonHandler`

TODO

### `useNavigationPersistence`

TODO
