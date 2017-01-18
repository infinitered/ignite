// @cliDescription  Generate a new React Native project with Ignite
// ----------------------------------------------------------------------------

const installWalkthrough = [
  {
    name: 'dev-screens',
    message: 'Would you like Ignite Development Screens',
    type: 'confirm'
  }, {
    name: 'vector-icons',
    message: 'What kind of vector icon library will you use?',
    type: 'list',
    choices: ['react-native-vector-icons', 'none']
  }

]

module.exports = async function (context) {
  const { parameters, strings, print, system } = context
  const { isBlank } = strings
  const { info, debug } = print

  // validation
  const projectName = parameters.second
  if (isBlank(projectName)) {
    print.info(`${context.runtime.brand} new <projectName>\n`)
    print.error('Project name is required')
    process.exit(1)
    return
  }

  // First we ask!
  const answers = await context.prompt.ask(installWalkthrough)
  // then we kick off (TODO: Would be awesome to have this kick off during questions)
  // we need to lock the RN version here
  info('Creating new RN project')
  await system.run(`react-native init ${projectName} --version 0.38.0`)
  process.chdir(projectName)
  info('Add ignite basic structure with unholy')
  await system.run(`ignite add basic-structure ${projectName} --unholy`)
  info('Link up all those unholy goodies')
  await system.run('yarn || npm i')
  await system.run('react-native link')
  info('Add ignite basic generators')
  await system.run('ignite add basic-generators')

  // now run install of Ignite Plugins
  if (answers['dev-screens']) {
    await system.run('ignite add dev-screens')
  }

  if (answers['vector-icons'] === 'react-native-vector-icons') {
    await system.run('ignite add vector-icons')
  }

  debug(answers)
}
