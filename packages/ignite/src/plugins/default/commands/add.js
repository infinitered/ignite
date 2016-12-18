// @cliDescription  Add a new thingy
// ----------------------------------------------------------------------------

module.exports = async function (context) {
    // grab a fist-full of features...
  const { system, print, filesystem, strings, R } = context
  const { trim, kebabCase } = strings
  const { info, warning, success, debug, checkmark } = print

  // ...and be the CLI you wish to see in the world
  debug(context.config)
}
