// @cliDescription  WUT?
// ----------------------------------------------------------------------------
const { assoc } = require('ramda')

module.exports = async function (context) {
    // grab a fist-full of features...
  const { system, print, filesystem, strings, R } = context
  const { trim, kebabCase } = strings
  const { info, warning, success, debug, checkmark } = print

  // ...and be the CLI you wish to see in the world
  const awesome = trim(system.run('whoami'))
  const moreAwesome = kebabCase(`${awesome} and a keyboard`)
  const contents = `🚨 Warning! ${moreAwesome} coming thru! 🚨`
  const home = process.env['HOME']
  filesystem.write(`${home}/realtalk.json`, { contents })
  const cool = assoc('name', 'gant', {})

  debug(contents, `hello ${cool.name}!`)
  info(`${checkmark} Citius`)
  warning(`${checkmark} Altius`)
  success(`${checkmark} Fortius`)
  debug('tacos')
}
