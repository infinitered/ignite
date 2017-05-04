const { dissoc } = require('ramda')
const igniteConfigFilename = `${process.cwd()}/ignite/ignite.json`

module.exports = (plugin, command, context) => {
  const { filesystem } = context

  /**
   * Reads the contents of the ignite/ignite.json configuration.
   *
   * @return {Object} The configuration.
   */
  function loadIgniteConfig () {
    return filesystem.exists(igniteConfigFilename)
      ? filesystem.read(igniteConfigFilename, 'json') || {}
      : {}
  }

  /**
   * Saves a new ignite config file.
   *
   * @param {Object} config The new configuration object to save.
   */
  function saveIgniteConfig (config = {}) {
    filesystem.write(igniteConfigFilename, config, { jsonIndent: 2 })
  }

  /**
   * Sets an ignite config setting
   *
   * @param {string} key Key of setting to be defined
   * @param {string} value Value to be set
   */
  function setIgniteConfig (key, value, isVariableName = false) {
    const igniteConfig = loadIgniteConfig()
    igniteConfig[key] = value
    saveIgniteConfig(igniteConfig)
  }

  /**
   * Remove Global Config setting
   *
   * @param {string}  key Key of setting to be removed
   */
  function removeIgniteConfig (key) {
    const igniteConfig = dissoc(key, loadIgniteConfig())
    saveIgniteConfig(igniteConfig)
  }

  return {
    setIgniteConfig,
    removeIgniteConfig,
    saveIgniteConfig,
    loadIgniteConfig
  }
}
