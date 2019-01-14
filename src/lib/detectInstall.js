const prependIgnite = require('./prependIgnite')
const { find } = require('ramda')
const path = require('path')

/**
 * Detects the type of install the user is requesting for this plugin.
 *
 * We check 3 different things:
 *
 *   1. a plugin which exists in one of the plugin override paths
 *   2. a plugin which lives in a relative or absolute path
 *   3. otherwise let npm hook us up
 *
 * @param  {object} context - an ignite context
 * @return {object}         - specs about the type of install
 */
function detectInstall (context) {
  // grab some gluegun goodies
  const { filesystem, parameters, ignite } = context

  // grab the plugin overrides
  const pluginOverrides = (ignite && ignite.pluginOverrides) || []

  /**
   * Is this a valid ignite plugin?
   *
   * @param  {string} candidate - The potential directory to check.
   * @return {boolean}          - True if this is valid; otherwise false.
   */
  const isValidIgnitePluginDirectory = candidate =>
    filesystem.exists(candidate) === 'dir' &&
      filesystem.exists(`${candidate}${path.sep}package.json`) === 'file'

  // the plugin we're trying to install
  let plugin = parameters.second
  
  // extract the package name and (optionally) version
  let packageName, packageVersion
  const versionSepRe = /(?<!^|\/)@/
  const isScoped = plugin.startsWith('@')
  packageName = plugin.split(versionSepRe)[0]
  packageVersion = plugin.split(versionSepRe)[1] || null

  // If a path, expand that path. If not, prepend with `ignite-*`.
  if (packageName.includes(path.sep) && !isScoped) {
    packageName = filesystem.path(packageName)
  } else if (!isScoped) {
    packageName = prependIgnite(packageName)
  }

  // do we have overrides?
  if (pluginOverrides.length > 0) {
    // look for the plugin into one of our override paths
    const foundPath = find(
      overridePath => isValidIgnitePluginDirectory(`${overridePath}${path.sep}${packageName}`),
      pluginOverrides
    )

    // did we find it?
    if (foundPath) {
      const path = `${foundPath}/${packageName}`
      return {
        directory: path,
        override: true,
        moduleName: filesystem.read(`${path}/package.json`, 'json').name,
        type: 'directory'
      }
    }
  }

  // is this a directory?
  if (isValidIgnitePluginDirectory(packageName)) {
    const json = filesystem.read(`${packageName}/package.json`, 'json') || {}
    return {
      directory: packageName,
      moduleName: json.name,
      type: 'directory'
    }
  }

  // the default is to assume that npm can figure out where to get this
  return {
    moduleName: packageName,
    version: packageVersion,
    type: 'npm'
  }
}

module.exports = detectInstall
