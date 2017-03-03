const PrettyError = require('pretty-error')

module.exports = (plugin, command, context) => {
  /**
   * Prints a debug message to the console.  Used when the user wants to run in --debug.
   *
   * @param {string|Object} message - The message to write
   */
  const pe = new PrettyError()
  function log (message) {
    // jet if we're not running in debug mode
    if (!context.parameters.options.debug) return

    const date = new Date().toISOString().slice(11, 19)
    const prefix = context.print.colors.muted(date) +
      ' ' +
      context.print.colors.magenta('[ignite]')

    if (typeof message === 'object') {
      console.log(`${prefix}`)
      console.log(pe.render(message))
    } else {
      console.log(`${prefix} ${message}`)
    }
  }

  return log
}
