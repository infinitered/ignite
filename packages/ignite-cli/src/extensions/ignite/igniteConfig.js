const { dissoc, merge } = require('ramda')
const igniteConfigFilename = `${process.cwd()}/ignite/ignite.json`

const defaultConfig = {
  generators: {},
  paths: {
    app: 'App',
    tests: 'Tests',
    components: 'Components',
    config: 'Config',
    containers: 'Containers',
    fixtures: 'Fixtures',
    images: 'Images',
    navigation: 'Navigation',
    services: 'Services'
  }
}

module.exports = (plugin, command, context) => {
  const { filesystem } = context

  /**
   * Reads the contents of the ignite/ignite.json configuration.
   * Sets some defaults if not set.
   *
   * @return {Object} The configuration.
   */
  function loadIgniteConfig () {
    const appConfig = loadConfig(igniteConfigFilename)
    return merge(defaultConfig, appConfig)
  }

  /**
   * Reads the contents of a configuration file.
   */
  function loadConfig (filename) {
    return filesystem.exists(filename)
      ? filesystem.read(filename, 'json') || {}
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
    loadIgniteConfig,
    loadConfig
  }
}
