# app.tsx

The `app/app.tsx` file is the main entry point for your app.

:::tip
Don't confuse this `app/app.tsx` file with the `App.tsx` component in the root of your project -- that's the entry point for Expo/React Native itself and just immediately loads this one after setting up the splash screen.
:::

Most of this file is boilerplate and you shouldn't need to modify it very often. But take some time to look through and understand what is going on.

Things that this file is responsible for:

- Loading fonts
- Setting up internationalization
- Initializing the root MST store
- Initializing the root navigator
- Ensuring everything is loaded and then hiding the splash screen
- Setting up the safe area provider
- Rendering error boundaries and error screen
- Enabling deep linking
