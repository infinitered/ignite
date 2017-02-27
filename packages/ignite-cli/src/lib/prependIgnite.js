/**
 * Ensures the given string starts with 'ignite-'.
 *
 * @param {string} value The string to check.
 * @returns {string} The same string, but better.
 */
const prependIgnite = function (value) {
  return /^ignite-/.test(value) ? value : 'ignite-' + value
}

module.exports = prependIgnite
