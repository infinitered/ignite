# Screens folder

The `screens` folder contains the main screens of your app. Each screen is a file ending in `Screen.tsx`, such as `LoginScreen.tsx`. They are optionally contained in folders (but we recommend keeping it fairly flat).

Explore the included screens (if you left the demo code in place) to see how they work.

Screens are the central point of interaction within your app. They are responsible for rendering the UI / state, styling, handling user input, and initiating navigation to other screens.

We also tend to co-locate specific components for screens within the same folder. For example, if a login screen has a "LoginForm" component that is only used by that screen, we might put it in `app/screens/login/LoginForm.tsx` (alongside `LoginScreen.tsx`). If it's a component that is used by multiple screens, we'll put it in the `components` folder.
