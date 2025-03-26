# AppNavigator.tsx

If you open the file `app/navigators/AppNavigator.tsx` up, you'll find the AppNavigator and the AppStack.

The AppNavigator is the root navigator for your whole app. It will have the navigation container and wrap the AppStack.

The AppStack is a native stack navigator (via [React Navigation](https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator)) and contains all the screens and subnavigators of your app.

In the case of Ignite's demo code, it is prepared with an example flow for an app requiring authentication. The screens included within the AppStack are dependent on value of `isAuthenticated` from `authenticationStore`. If in an unauthenticated state, the only screen to be shown will be the `LoginScreen`. Otherwise, that screen is left out of the navigator and the user is presented with the `WelcomeScreen` and screens that fall under the `DemoNavigator`
