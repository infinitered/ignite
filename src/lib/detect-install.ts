import { IgniteToolbox, IgniteDetectInstall } from '../types'
import prependIgnite from './prepend-ignite'
import packageExtract from './package-extract'
import * as path from 'path'

/**
 * Detects the type of install the user is requesting for this plugin.
 *
 * We check 3 different things:
 *
 *   1. a plugin which exists in one of the plugin override paths
 *   2. a plugin which lives in a relative or absolute path
 *   3. otherwise let npm hook us up
 */
export default function detectInstall(plugin: string, toolbox: IgniteToolbox): IgniteDetectInstall {
  // grab some gluegun goodies
  const { filesystem, ignite } = toolbox
  const sep = path.sep // why isn't filesystem.separator working here?

  // grab the plugin overrides
  const pluginOverrides = (ignite && ignite.pluginOverrides) || []

  /**
   * Is this a valid ignite plugin?
   *
   * @param  {string} candidate - The potential directory to check.
   * @return {boolean}          - True if this is valid; otherwise false.
   */
  function isValidIgnitePluginDirectory(candidate: string): boolean {
    const isDir = filesystem.exists(candidate) === 'dir'
    const packageIsFile = filesystem.exists(`${candidate}${sep}package.json`) === 'file'
    return isDir && packageIsFile
  }

  // Normalize package name
  let packageName = plugin
  let packageVersion = undefined

  // Check if referring to a path
  if (['~', '.', '\\', '/'].includes(plugin[0])) {
    // verify that the path exists and has a `package.json`
    const packagePath = filesystem.path(plugin, 'package.json')
    const packageExists = filesystem.exists(packagePath)
    if (packageExists) {
      packageName = filesystem.path(packageName)
    } else {
      throw new Error(`Couldn't find package at ${packagePath}. Check path and try again.`)
    }
  } else {
    // extract the package name and (optionally) version
    let { name, scoped, version } = packageExtract(plugin)
    packageName = scoped ? name : prependIgnite(name)
    packageVersion = version
  }

  // do we have overrides?
  if (pluginOverrides.length > 0) {
    // look for the plugin into one of our override paths
    const foundPath = pluginOverrides.find(overridePath =>
      isValidIgnitePluginDirectory(`${overridePath}${sep}${packageName}`),
    )

    // did we find it?
    if (foundPath) {
      const path = `${foundPath}/${packageName}`
      return {
        directory: path,
        override: true,
        moduleName: filesystem.read(`${path}/package.json`, 'json').name,
        type: 'directory',
      }
    }
  }

  // is this a directory?
  if (isValidIgnitePluginDirectory(packageName)) {
    const json = filesystem.read(`${packageName}/package.json`, 'json') || {}
    return {
      directory: packageName,
      moduleName: json.name,
      type: 'directory',
    }
  }

  // the default is to assume that npm can figure out where to get this
  return {
    moduleName: packageName,
    version: packageVersion,
    type: 'npm',
  }
}
