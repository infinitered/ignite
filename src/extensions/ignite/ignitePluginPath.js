module.exports = (plugin, command, context) => {
  /**
   * The current executing ignite plugin path.
   */
  let pluginPath = null

  /**
   * Set the current executing ignite plugin path.
   */
  function setIgnitePluginPath (path) {
    pluginPath = path
  }

  /**
   * Gets the path to the current running ignite plugin.
   */
  function ignitePluginPath () {
    return pluginPath
  }

  return {
    setIgnitePluginPath,
    ignitePluginPath
  }
}
