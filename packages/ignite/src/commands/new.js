// @cliDescription  Generate a new React Native project with Ignite.
// @cliAlias n
// ----------------------------------------------------------------------------
const exitCodes = require('../lib/exitCodes')
const path = require('path')
const header = require('../brand/header')
const { forEach } = require('ramda')

module.exports = async function (context) {
  const { parameters, strings, print, system, filesystem } = context
  const { isBlank } = strings

  // grab the project name
  const projectName = parameters.second

  // verify the project name is a thing
  if (isBlank(projectName)) {
    print.info(`${context.runtime.brand} new <projectName>\n`)
    print.error('Project name is required')
    process.exit(exitCodes.PROJECT_NAME)
    return
  }

  // verify the directory doesn't exist already
  if (filesystem.exists(projectName) === 'dir') {
    print.error(`Directory ${projectName} already exists.`)
    process.exit(exitCodes.DIRECTORY_EXISTS)
  }

  // make & jump into the project directory
  filesystem.dir(projectName)
  process.chdir(projectName)

  // are we looking for a minimal template?
  const isMinimalAppTemplate =
    context.parameters.template === 'min' ||
    context.parameters.options.min ||
    context.parameters.options.m

  // pick an app template and run with it
  const appTemplatePackage = isMinimalAppTemplate ? 'minimal-app-template' : 'unholy-app-template'

  // pretty bird, yes, pretty bird... petey is a pretty bird.
  header()
  print.newline()
  print.info(`🔥 igniting app ${print.colors.yellow(projectName)}`)

  // Install the ignite-* packages from the local dev directory.
  //
  // This is pretty much always what we while we dev.
  //
  // To test what live is like, you can run `ignite new FooTown --live`.
  //
  // TODO(steve): Don't forget to remove this when we launch... open to better ways of handling it.
  const igniteDevPackagePrefix = parameters.options.live || path.resolve(`${__dirname}/../../..`) + '/ignite-'

  // some extra options we'll be passing through to the `ignite add <app-template>`
  const extraAddOptions = ['--is-app-template']

  // pass along the ignite prefix if we have it
  if (!parameters.options.live) {
    extraAddOptions.push(`--ignite-dev-package-prefix ${igniteDevPackagePrefix}`)
  }

  // pass through the --max flag
  // NOTE(steve):
  //   I'd like to see this go away by introducing a new addTemplate command... baby steps though.
  //   Another thing to consider is just passing through *all* options.
  if (parameters.options.max) {
    extraAddOptions.push('--max')
  }

  // let's kick off the template
  let ok = false
  try {
    const command = `ignite add ${igniteDevPackagePrefix}${appTemplatePackage} ${projectName} ${extraAddOptions.join(' ')}`
    await system.spawn(command, { stdio: 'inherit' })
    ok = true
  } catch (e) {
  }

  // always clean up the app-template stuff
  filesystem.remove('node_modules')
  filesystem.remove('ignite')

  // did we install everything successfully?
  if (ok) {
    // move everything that's 1 deep back up to here
    forEach(
      filename => filesystem.move(path.join(projectName, filename), filename)
      , filesystem.list(projectName)
    )
  }
}
