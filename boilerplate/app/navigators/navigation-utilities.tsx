import React, { useState, useEffect, useRef } from "react"
import { BackHandler } from "react-native"
import {
  createNavigationContainerRef,
  NavigationContainerRef,
  Route,
} from "@react-navigation/native"

export const navigationRef = createNavigationContainerRef()

/**
 *
 * Gets the current route from any navigation state.
 * returns an array with [route.key || route.name, route]
 * route.name is a string, route is the entire route object.
 * #### Example
 * ```js
 * const [currentRouteName, route] = getRoute(navigationRef)
 * setCurrentScreen(currentRouteName)
 * ```
 */
export const getRoute = (
  navigationRef: React.MutableRefObject<NavigationContainerRef<any> | null>,
): [routeName: string | null, route: Route<string, any> | null] => {
  if (navigationRef.current == null) {
    return [null, null]
  }
  const route = navigationRef.current.getCurrentRoute()
  if (route == null) {
    return [null, null]
  }
  return [route.name ?? route.key ?? null, route]
}

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 */
export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  const canExitRef = useRef(canExit)

  useEffect(() => {
    canExitRef.current = canExit
  }, [canExit])

  useEffect(() => {
    // We'll fire this when the back button is pressed on Android.
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false
      }

      // grab the current route
      const [currentRouteName] = getRoute(navigationRef)

      // are we allowed to exit?
      if (canExitRef.current(currentRouteName)) {
        // let the system know we've not handled this event
        return false
      }

      // we can't exit, so let's turn this into a back action
      if (navigationRef.canGoBack()) {
        navigationRef.goBack()
        return true
      }

      return false
    }

    // Subscribe when we come to life
    BackHandler.addEventListener("hardwareBackPress", onBackPress)

    // Unsubscribe when we're done
    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
  }, [])
}

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState()

  // This feature is particularly useful in development mode.
  // It is selectively enabled in development mode with
  // the following approach. If you'd like to use navigation persistence
  // in production, remove the __DEV__ and set the state to true
  const [isRestored, setIsRestored] = useState(!__DEV__)

  const routeNameRef = useRef<string | undefined>()

  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current
    const [currentRouteName] = getRoute(navigationRef)

    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console.tron.log(`currentRouteName: ${currentRouteName}`)
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName

    // Persist state to storage
    storage.save(persistenceKey, state)
  }

  const restoreState = async () => {
    try {
      const state = await storage.load(persistenceKey)
      if (state) setInitialNavigationState(state)
    } finally {
      setIsRestored(true)
    }
  }

  useEffect(() => {
    if (!isRestored) restoreState()
  }, [isRestored])

  return { onNavigationStateChange, restoreState, isRestored, initialNavigationState }
}

/**
 * use this to navigate to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 * More info: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never)
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack()
  }
}

export function resetRoot(params = { index: 0, routes: [] }) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params)
  }
}
