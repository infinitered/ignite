export interface ReactotronConfig {
  /** The name of the app. */
  name?: string
  /** The host to connect to: default 'localhost'. */
  host?: string
  /** Should we use async storage */
  useAsyncStorage?: boolean
  /** Should we clear Reactotron when load? */
  clearOnLoad?: boolean
  /** log the initial data that we put into the state on startup? */
  logInitialState?: boolean
  /** log snapshot changes. */
  logSnapshots?: boolean
}

/**
 * The default Reactotron configuration.
 */
export const DEFAULT_REACTOTRON_CONFIG: ReactotronConfig = {
  clearOnLoad: true,
  host: "localhost",
  useAsyncStorage: true,
  logInitialState: true,
  logSnapshots: false,
}
