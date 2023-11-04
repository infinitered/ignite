/**
 * This file does the setup for integration with Reactotron, which is a
 * free desktop app for inspecting and debugging your React Native app.
 * @see https://github.com/infinitered/reactotron
 */
import { Platform, NativeModules } from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { ArgType } from "reactotron-core-client"
import { mst } from "reactotron-mst"

import { clear } from "app/utils/storage"
import { goBack, resetRoot, navigate } from "app/navigators/navigationUtilities"

import { Reactotron } from "./ReactotronClient"

Reactotron.configure({
  name: require("../../package.json").name,
  host: "localhost",
  onConnect: () => {
    /** since this file gets hot reloaded, let's clear the past logs every time we connect */
    Reactotron.clear()
  },
})

Reactotron.use(
  mst({
    /** ignore some chatty `mobx-state-tree` actions  */
    filter: (event) => /postProcessSnapshot|@APPLY_SNAPSHOT/.test(event.name) === false,
  }),
)

if (Platform.OS !== "web") {
  Reactotron.setAsyncStorageHandler(AsyncStorage)
  Reactotron.useReactNative()
}

/**
 * Reactotron allows you to define custom commands that you can run
 * from Reactotron itself, and they will run in your app.
 *
 * Define them in the section below with `onCustomCommand`. Use your
 * creativity -- this is great for development to quickly and easily
 * get your app into the state you want.
 *
 * NOTE: If you edit this file while running the app, you will need to do a full refresh
 * or else your custom commands won't be registered correctly.
 */

Reactotron.onCustomCommand({
  title: "Show Dev Menu",
  description: "Opens the React Native dev menu",
  command: "showDevMenu",
  handler: () => {
    Reactotron.log("Showing React Native dev menu")
    NativeModules.DevMenu.show()
  },
})

Reactotron.onCustomCommand({
  title: "Reset Root Store",
  description: "Resets the MST store",
  command: "resetStore",
  handler: () => {
    Reactotron.log("resetting store")
    clear()
  },
})

Reactotron.onCustomCommand({
  title: "Reset Navigation State",
  description: "Resets the navigation state",
  command: "resetNavigation",
  handler: () => {
    Reactotron.log("resetting navigation state")
    resetRoot({ index: 0, routes: [] })
  },
})

Reactotron.onCustomCommand({
  command: "navigateTo",
  handler: (args) => {
    const { route } = args
    if (route) {
      Reactotron.log(`Navigating to: ${route}`)
      navigate(route)
    } else {
      Reactotron.log("Could not navigate. No route provided.")
    }
  },
  title: "Navigate To Screen",
  description: "Navigates to a screen by name.",
  args: [
    {
      name: "route",
      type: ArgType.String,
    },
  ],
})

Reactotron.onCustomCommand({
  title: "Go Back",
  description: "Goes back",
  command: "goBack",
  handler: () => {
    Reactotron.log("Going back")
    goBack()
  },
})

/**
 * We're going to add `console.tron` to the Reactotron object.
 * Now, anywhere in our app in development, we can use Reactotron like so:
 *
 * ```
 * if (__DEV__) {
 *  console.tron.log('here')
 * }
 * ```
 *
 * Use this power responsibly! :)
 */
console.tron = Reactotron

/**
 * We tell typescript about our dark magic
 *
 * You can also import Reactotron yourself from ./reactotronClient
 * and use it directly, like Reactotron.log('hello world')
 */
declare global {
  interface Console {
    /**
     * Reactotron client for logging, displaying, measuring performance, and more.
     * @see https://github.com/infinitered/reactotron
     *
     * @example
     * if (__DEV__) {
     *  console.tron.log("here")
     *
     *  console.tron.display({
     *    name: 'JOKE',
     *    preview: 'What's the best thing about Switzerland?',
     *    value: 'I don't know, but the flag is a big plus!',
     *    important: true
     *  })
     * }
     *
     */
    tron: typeof Reactotron
  }
}

/**
 * For our last trick, we are going to monkey patching console to also output to Reactotron.
 */
const ogConsoleLog = console.log
console.log = (...args: Parameters<typeof console.log>) => {
  ogConsoleLog(...args)
  Reactotron.log(...args)
}

const ogConsoleWarn = console.warn
console.warn = (...args: Parameters<typeof console.warn>) => {
  ogConsoleWarn(...args)
  Reactotron.warn(args[0])
}

const ogConsoleDebug = console.debug
console.debug = (...args: Parameters<typeof console.debug>) => {
  ogConsoleDebug(...args)
  Reactotron.debug(args[0])
}

/**
 * Now that we've setup all our Reactotron configuration, let's connect!
 */
Reactotron.connect()
