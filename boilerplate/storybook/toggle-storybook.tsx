import React, { useState, useEffect, useRef } from "react"
import { DevSettings } from "react-native"
import { loadString, saveString } from "../app/utils/storage"
import { DEFAULT_REACTOTRON_WS_URI } from "../app/services/reactotron/reactotron-config"

/**
 * Toggle Storybook mode, in __DEV__ mode only.
 *
 * In non-__DEV__ mode, or when Storybook isn't toggled on,
 * renders its children.
 *
 * The mode flag is persisted in async storage, which means it
 * persists across reloads/restarts - this is handy when developing
 * new components in Storybook.
 */
export function ToggleStorybook(props) {
  const [showStorybook, setShowStorybook] = useState(false)
  const [StorybookUIRoot, setStorybookUIRoot] = useState(null)
  const ws = useRef(new WebSocket(DEFAULT_REACTOTRON_WS_URI))

  useEffect(() => {
    if (!__DEV__) {
      return undefined
    }

    // Load the setting from storage if it's there
    loadString("devStorybook").then((storedSetting) => {
      // Set the initial value
      setShowStorybook(storedSetting === "on")

      if (DevSettings) {
        // Add our toggle command to the menu
        DevSettings.addMenuItem("Toggle Storybook", () => {
          setShowStorybook((show) => {
            // On toggle, flip the current value
            show = !show

            // Write it back to storage
            saveString("devStorybook", show ? "on" : "off")

            // Return it to change the local state
            return show
          })
        })
      }

      // Load the storybook UI once
      setStorybookUIRoot(() => require("./storybook").StorybookUIRoot)

      // Behave as Reactotron.storybookSwitcher(), not a HOC way.
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data)

        if (data.type === "storybook") {
          saveString("devStorybook", data.payload ? "on" : "off")
          setShowStorybook(data.payload)
        }
      }
      ws.current.onerror = (e) => {
        console.tron.error(e, null)
        setShowStorybook(storedSetting === "on")
      }
    })
  }, [])

  if (showStorybook) {
    return StorybookUIRoot ? <StorybookUIRoot /> : null
  } else {
    return props.children
  }
}
