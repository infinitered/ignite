/**
 * Is Ignite compatible with the directory we're currently inside?
 */
export default function isIgniteDirectory(directory: string): boolean {
  const jetpack = require('fs-jetpack')

  // read the ignite config
  const igniteConfigPath = `${directory}/ignite/ignite.json`

  // it must be a file
  if (jetpack.exists(igniteConfigPath) !== 'file') return false

  // let's read it as a JSON file
  try {
    const contents = jetpack.read(igniteConfigPath, 'json')
    // it needs to be an object
    return typeof contents === 'object'
  } catch (err) {
    return false
  }
}
