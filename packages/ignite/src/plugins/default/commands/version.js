// @cliDescription  Prints current version of installed ignite
// ----------------------------------------------------------------------------
const pjson = require('./../../../../package.json')

module.exports = async function (context) {
  context.print.info(pjson.version)
}
