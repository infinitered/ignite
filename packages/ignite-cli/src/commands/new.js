// @cliDescription  Generate a new React Native project with Ignite.
// @cliAlias n
// ----------------------------------------------------------------------------
const isIgniteDirectory = require('../lib/isIgniteDirectory')
const exitCodes = require('../lib/exitCodes')
const path = require('path')
const header = require('../brand/header')
const addEmptyTemplate = require('../lib/addEmptyTemplate')
const { merge, forEach, keys, reduce, concat, trim } = require('ramda')

module.exports = async function (context) {
  const { parameters, strings, print, system, filesystem, ignite } = context
  const { isBlank } = strings
  const { log } = ignite

  // grab the project name
  const projectName = parameters.second

  // ensure we're in a supported directory
  if (isIgniteDirectory(process.cwd())) {
    context.print.error('The `ignite new` command cannot be run within an already ignited project.')
    process.exit(exitCodes.NOT_IGNITE_PROJECT)
  }

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

  // print a header
  header()
  print.newline()
  print.info(`🔥 igniting app ${print.colors.yellow(projectName)}`)

  // empty template has a shorter route
  if (parameters.options.empty) {
    addEmptyTemplate(context)
    return
  }

  // make & jump into the project directory
  log(`making directory ${projectName}`)
  filesystem.dir(projectName)
  process.chdir(projectName)
  log(`switched directory to ${process.cwd()}`)

  // make a temporary package.json file so node stops walking up the diretories
  filesystem.write('package.json', {
    name: 'ignite-shim',
    description: 'A temporary package.json created to prevent node from wandering too far.',
    repository: 'infinitered/ignite',
    license: 'MIT'
  })

  /**
   * Figures out which app template we'll be using (without the ignite- prefix).
   *
   * @return {string} The app template we'll be using.
   */
  function getAppTemplate () {
    // check for a user-defined template
    const cliTemplate = parameters.options.template || parameters.options.t
    if (cliTemplate) return cliTemplate

    // default
    return 'infinite-red-app-template'
  }

  // grab the right app template
  const appTemplatePackage = getAppTemplate()

  // pick the inbound cli options and add our --is-app-template
  const cliOpts = merge(parameters.options, { 'is-app-template': true })

  // turn this back into a string
  const forwardingOptions = trim(reduce((src, k) => {
    const v = cliOpts[k]
    return concat(v === true ? `--${k} ` : `--${k} ${v} `, src)
  })('', keys(cliOpts)))

  // let's kick off the template
  let ok = false
  try {
    const command = `ignite add ${appTemplatePackage} ${projectName} ${forwardingOptions}`
    log(`running app template: ${command}`)
    await system.spawn(command, { stdio: 'inherit' })
    log('finished app template')
    ok = true
  } catch (e) {
    log('error running app template')
    log(e.message)
  }

  // always clean up the app-template stuff
  log('cleaning temporary files')
  filesystem.remove('node_modules')
  filesystem.remove('ignite')
  filesystem.remove('package.json')

  // did we install everything successfully?
  if (ok) {
    log(`moving contents of ${projectName} into place`)
    // move everything that's 1 deep back up to here
    forEach(
      filename => filesystem.move(path.join(projectName, filename), filename)
      , filesystem.list(projectName)
    )
    log(`removing unused sub directory ${projectName}`)
    filesystem.remove(projectName)
  }
  log('finished running new')
}
