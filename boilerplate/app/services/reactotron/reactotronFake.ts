/** Do Nothing. */
const noop = () => undefined

/**
 * Fake no-op version of Reactotron, so nothing breaks if a console.tron.*
 * gets through our conditionals.
 */
export const fakeReactotron = {
  benchmark: noop,
  clear: noop,
  close: noop,
  configure: noop,
  connect: noop,
  display: noop,
  error: noop,
  image: noop,
  log: noop,
  logImportant: noop,
  onCustomCommand: noop,
  overlay: noop,
  reportError: noop,
  send: noop,
  startTimer: noop,
  storybookSwitcher: noop,
  use: noop,
  useReactNative: noop,
  warn: noop,
}
