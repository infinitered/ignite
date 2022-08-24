export interface ConfigBaseProps {
  NavigationIsRestored: boolean,
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
}

export default {
  // This feature is particularly useful in development mode.
  // It is selectively enabled in development mode with
  // the following approach. If you'd like to use navigation persistence
  // in production and dev both, remove the __DEV__ and set the state to false
  NavigationIsRestored: !__DEV__,

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: 'always',

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],
} as ConfigBaseProps