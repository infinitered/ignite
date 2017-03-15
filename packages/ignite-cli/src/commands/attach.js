// @cliDescription Attaches Ignite to an existing project.

const isIgniteDirectory = require('../lib/isIgniteDirectory')

module.exports = async function (context) {
  const { filesystem, ignite, print } = context

  // ensure we're in a supported directory
  if (isIgniteDirectory(process.cwd())) {
    context.print.info('🍻  Good news! This project is already Ignite-enabled!')
    return
  }

  // ignite/ignite.json
  const igniteJson = {
    'createdWith': ignite.version,
    'boilerplate': 'empty',
    'examples': 'none'
  }
  filesystem.write('ignite/ignite.json', igniteJson)

  // the plugins folder
  filesystem.write('ignite/plugins/.gitkeep', '')

  context.print.info(`🔥  Good to go! Type ${print.colors.bold('ignite')} to get started.`)
}
