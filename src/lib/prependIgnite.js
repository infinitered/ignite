/**
 * Ensures the given string starts with 'ignite-'.
 *
 * @param {string} value The string to check.
 * @returns {string} The same string, but better.
 */
const prependIgnite = function (value) {
  // If a path, ignore, it's fine
  if (value.includes('/')) return value

  return /^ignite-/.test(value) ? value : 'ignite-' + value
}

module.exports = prependIgnite
