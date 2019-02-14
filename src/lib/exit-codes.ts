/**
 * Exit codes used to off the app.
 */
export default {
  /**
   * A peaceful & expected death.
   */
  OK: 0,

  /**
   * A generic and unexpected ending for our hero.
   */
  GENERIC: 1,

  /**
   * This is not a normal ignite plugin.
   */
  PLUGIN_INVALID: 2,

  /**
   * An ignite plugin bombed while installing.
   */
  PLUGIN_INSTALL: 3,

  /**
   * Cannot find React Native version.
   */
  REACT_NATIVE_VERSION: 4,

  /**
   * Invalid Project name.
   */
  PROJECT_NAME: 5,

  /**
   * You're trying to spork, but there's nothing to eat
   */
  SPORKABLES_NOT_FOUND: 6,

  /**
   * Invalid Plugin name.
   */
  PLUGIN_NAME: 7,

  /**
   * This directory already exists
   */
  DIRECTORY_EXISTS: 8,

  /**
   * Problem installing React Native
   */
  REACT_NATIVE_INSTALL: 9,

  /**
   * This is not a compatible Ignite CLI directory.
   */
  NOT_IGNITE_PROJECT: 10,

  /**
   * node_modules/react-native already exists.
   */
  EXISTING_REACT_NATIVE: 11,

  /**
   * One of the global dependencies are not met.
   */
  INVALID_GLOBAL_DEPENDENCY: 12,
}
