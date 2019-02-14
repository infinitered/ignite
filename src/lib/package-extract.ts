import { IgniteNPMPackageParts } from '../types'

/**
 * Splits an NPM package name into parts.
 */
export default (versionString: string): IgniteNPMPackageParts => {
  const scoped = versionString.includes('/')
  let name = versionString

  const packageParts = versionString.split('@')

  // has version string?
  let version = undefined
  if (versionString.lastIndexOf('@') > 0) {
    name = packageParts.slice(0, packageParts.length - 1).join('@')
    version = packageParts[packageParts.length - 1]
  }

  return { name, scoped, version }
}
