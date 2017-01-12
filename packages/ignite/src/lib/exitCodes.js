/**
 * Exit codes used to off the app.
 */
module.exports = {
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
  PLUGIN_INSTALL: 3

}
