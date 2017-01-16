// @cliDescription  Generate a new React Native project with Ignite
// ----------------------------------------------------------------------------

const installWalthrough = [
  {
    question: 'Would you like Ignite Development Screens',
    plugin: 'dev-screens'
  }, {
    question: 'Will you need a vector icon library?',
    plugin: 'vector-icons'
  }

]

module.exports = async function (context) {
  const { filesystem, parameters, ignite, strings, print, system } = context
  const { isBlank, trim, kebabCase } = strings
  const { info, warning, success, debug, checkmark, error } = print

  // validation
  if (isBlank(parameters.second)) {
    print.info(`${context.runtime.brand} new <projectName>\n`)
    print.error('Project name is required')
    process.exit(1)
    return
  }

  // what does new do?
  info('Create new RN project')
  info('Add ignite basic structure with unholy')
  info('Add ignite basic generators')

  // now run a myriad of Ignite Plugins with yes/no options.
  {

  }
  // ignite-vector-icons
}
