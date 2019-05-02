import { dissoc } from 'ramda'
import { IgniteToolbox } from '../../types'

const igniteConfigFilename = `${process.cwd()}/ignite/ignite.json`

export default (toolbox: IgniteToolbox) => {
  const { filesystem } = toolbox

  /**
   * Reads the contents of the ignite/ignite.json configuration.
   */
  function loadIgniteConfig(): Object {
    return filesystem.exists(igniteConfigFilename) ? filesystem.read(igniteConfigFilename, 'json') || {} : {}
  }

  /**
   * Saves a new ignite config file.
   */
  function saveIgniteConfig(config: Object = {}) {
    filesystem.write(igniteConfigFilename, config, { jsonIndent: 2 })
  }

  /**
   * Sets an ignite config setting
   */
  function setIgniteConfig(key: string, value: string) {
    const igniteConfig = loadIgniteConfig()
    igniteConfig[key] = value
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
