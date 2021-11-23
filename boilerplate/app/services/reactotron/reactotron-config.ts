export interface ReactotronConfig {
  /** The name of the app. */
  name?: string
  /** The host to connect to: default 'localhost'. */
  host?: string
  /** Should we use async storage */
  useAsyncStorage?: boolean
  /** Should we clear Reactotron when load? */
  clearOnLoad?: boolean
  /** Root state logging. */
  state?: {
    /** log the initial data that we put into the state on startup? */
    initial?: boolean
    /** log snapshot changes. */
    snapshots?: boolean
  }
}

/**
 * The default Reactotron configuration.
 */
export const DEFAULT_REACTOTRON_CONFIG: ReactotronConfig = {
  clearOnLoad: true,
  host: "localhost",
  useAsyncStorage: true,
  state: {
    initial: true,
    snapshots: false,
  },
}

/**
 * The default Reactotron WebSocket URI
 */
export const DEFAULT_REACTOTRON_WS_URI = "ws://localhost:9090"
