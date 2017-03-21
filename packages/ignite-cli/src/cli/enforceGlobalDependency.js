// NOTE: this file is intentionally written with es3
var shell = require('shelljs')
var semver = require('semver')
var ramda = require('ramda')

/**
 * Extracts the version number from a somewhere within a string.
 *
 * This looks for things that look like semver (e.g. 0.0.0) and picks the first one.
 *
 * @param {string} raw - The raw text which came from running the version command.
 */
function defaultVersionMatcher (raw) {
  // sanity check
  if (ramda.isNil(raw) || ramda.isEmpty(raw)) return null

  try {
    // look for something that looks like semver
    var rx = /([0-9]+\.[0-9]+\.[0-9]+)/
    var match = ramda.match(rx, raw)
    if (match.length > 0) {
      return match[0]
    } else {
      return null
    }
  } catch (err) {
    // something tragic happened
    return false
  }
}

/**
 * Verifies the dependency which is installed is compatible with ignite.
 *
 * @param  {any}      opts                The options to enforce.
 * @param  {boolean}  opts.optional       Is this an optional dependency?
 * @param  {string}   opts.range          The semver range to test against.
 * @param  {string}   opts.which          The command to run `which` on.
 * @param  {string}   opts.versionCommand The command to run which returns text containing the version number.
 * @param  {string}   opts.installMessage What to print should we fail.
 * @param  {function} opts.versionMatcher A way to override the method to discover the version number.
 * @return {boolean}                      `true` if we meet the requirements; otherwise `false`.
 */
function enforce (opts = {}) {
  // opts to pass in
  var optional = opts.optional || false
  var range = opts.range
  var which = opts.which
  var versionCommand = opts.versionCommand
  var installMessage = opts.installMessage
  var versionMatcher = opts.versionMatcher || defaultVersionMatcher

  /**
   * Prints a friendly message that they don't meet the requirement.
   *
   * @param {string} installedVersion - current version if installed.
   */
  function printNotMetMessage (installedVersion) {
    console.log('Ignite requires ' + which + ' ' + range + ' to be installed.')
    if (installedVersion) {
      console.log('')
      console.log('You currently have ' + installedVersion + ' installed.')
    }
    console.log('')
    console.log(installMessage)
  }

  /**
   * Gets the version from the global dependency.
   *
   * @return {string} The version number or null.
   */
  function getVersion () {
    // parse the version number
    try {
      // grab the raw output
      var result = shell.exec(versionCommand, { silent: true })
      var rawOut = ramda.trim(result.stdout || '')
      var rawErr = ramda.trim(result.stderr || '') // java -version does this... grr

      // assign the "right" one to raw
      var raw = rawOut
      if (ramda.isEmpty(raw)) {
        raw = rawErr
      }
      if (ramda.isEmpty(raw)) {
        raw = null
      }

      // and run it by the version matcher
      return versionMatcher(raw)
    } catch (err) {
      return null
    }
  }

  // are we installed?
  var isInstalled = Boolean(shell.which(which))

  if (!isInstalled) {
    if (optional) {
      return true
    } else {
      printNotMetMessage()
      return false
    }
  }

  // which version is installed?
  try {
    var installedVersion = getVersion()
    var isMet = semver.satisfies(installedVersion, range)

    // dependency has minimum met, we're good.
    if (isMet) return true
  } catch (err) {
    // can't parse? just catch and we'll fallback to an error.
  }

  // o snap, time to upgrade
  printNotMetMessage(installedVersion)
  return false
}

module.exports = enforce
