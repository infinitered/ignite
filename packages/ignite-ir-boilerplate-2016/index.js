const screenExamples = require('./screenExamples')

/**
 * Add the plugin.
 *
 * @param {any} context - The gluegun context.
 */
async function add (context) {
  await screenExamples.add(context)
}

/**
 * Remove the plugin.
 *
 * @param {any} context - The gluegun context.
 */
async function remove (context) {
  await screenExamples.remove(context)
}

module.exports = { add, remove }
