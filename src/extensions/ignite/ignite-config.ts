import { dissoc } from 'ramda'
import { IgniteToolbox, IgniteProjectConfig } from '../../types'

const igniteConfigFilename = `./ignite/ignite.json`

export default (toolbox: IgniteToolbox) => {
  const { filesystem } = toolbox

  /**
   * Reads the contents of the ignite/ignite.json configuration.
   */
  function loadIgniteConfig(): IgniteProjectConfig {
    return filesystem.exists(igniteConfigFilename) ? filesystem.read(igniteConfigFilename, 'json') || {} : {}
  }

  /**
   * Saves a new ignite config file.
   */
  function saveIgniteConfig(config: IgniteProjectConfig = {}) {
    filesystem.write(igniteConfigFilename, config, { jsonIndent: 2 })
  }

  /**
   * Sets an ignite config setting. Takes an object or a key/value pair.
   */
  function setIgniteConfig(keyOrObject: string | object, value?: string) {
    const igniteConfig = loadIgniteConfig()
    if (typeof keyOrObject === 'string') {
      igniteConfig[keyOrObject] = value
    } else {
      Object.assign(igniteConfig, keyOrObject)
    }
    saveIgniteConfig(igniteConfig)
  }

  /**
   * Remove Global Config setting
   */
  function removeIgniteConfig(key: string) {
    const igniteConfig = dissoc(key, loadIgniteConfig())
    saveIgniteConfig(igniteConfig)
  }

  return {
    setIgniteConfig,
    removeIgniteConfig,
    saveIgniteConfig,
    loadIgniteConfig,
  }
}
