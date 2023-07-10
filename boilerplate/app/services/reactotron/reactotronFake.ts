import { type Reactotron } from "reactotron-core-client"
import { type ReactotronReactNative } from "reactotron-react-native"

/** Do Nothing. */
const noop = () => undefined

/**
 * Fake no-op version of Reactotron, so nothing breaks if a console.tron.*
 * gets through our conditionals.
 */
export const fakeReactotron: Reactotron<ReactotronReactNative> & ReactotronReactNative = {
  benchmark: (_title: string) => ({
    step: (_startKey: string) => undefined,
    stop: (_stopKey: string) => undefined,
    last: noop,
  }),
  clear: noop,
  close: noop,
  configure: () => fakeReactotron,
  connect: () => fakeReactotron,
  display: noop,
  error: noop,
  image: noop,
  log: noop,
  logImportant: noop,
  onCustomCommand: () => noop,
  overlay: noop,
  reportError: noop,
  send: noop,
  startTimer: () => () => Date.now(),
  storybookSwitcher: () => () => "<></>",
  use: () => fakeReactotron,
  useReactNative: () => fakeReactotron,
  warn: noop,
}
