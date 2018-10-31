// @cliDescription  Generate a new React Native project with Ignite CLI.
// @cliAlias n
// ----------------------------------------------------------------------------
const isIgniteDirectory = require('../lib/isIgniteDirectory')
const exitCodes = require('../lib/exitCodes')
const path = require('path')
const header = require('../brand/header')
const addEmptyBoilerplate = require('../lib/addEmptyBoilerplate')
const { forEach, keys, reduce, concat, trim, isEmpty, match, not, toLower } = require('ramda')

/**
 * Creates a new ignite project based on an optional boilerplate.
 *
 * @param {any} context - The gluegun context.
 */
async function command (context) {
  const { parameters, strings, print, system, filesystem, ignite, prompt } = context
  const { isBlank, upperFirst, camelCase } = strings
  const { log } = ignite

  // grab the project name
  const projectName = parameters.second

  // check for kebabs
  const isKebabCase = not(isEmpty(match(/.-/g, projectName || '')))

  // camelCase the project name for user example
  const projectNameCamel = upperFirst(camelCase(projectName))

  // check for numbers-only names
  const isNumericOnly = /^\d+$/.test(projectName)

  // check for alphanumeric name, beginning with a letter
  const isValidName = /^[a-z_][a-z0-9_]+$/i.test(projectName)

  // ensure we're in a supported directory
  if (isIgniteDirectory(process.cwd())) {
    context.print.error('The `ignite new` command cannot be run within an already ignited project.')
    process.exit(exitCodes.NOT_IGNITE_PROJECT)
  }

  // prevent installing when node_modules/react-native exists
  if (filesystem.exists('node_modules/react-native')) {
    context.print.error('The `ignite new` command cannot be run within a directory with `node_modules/react-native` installed.')
    context.print.error('Try installing from a directory without a `node_modules` directory.')
    process.exit(exitCodes.EXISTING_REACT_NATIVE)
  }

  // verify the project name is a thing
  if (isBlank(projectName)) {
    print.info(`${context.runtime.brand} new <projectName>\n`)
    print.error('Project name is required')
    process.exit(exitCodes.PROJECT_NAME)
  }

  // Guard against `ignite new ignite`
  if (toLower(projectName) === 'ignite') {
    print.error(`Hey...that's my name! Please name your project something other than '${projectName}'.`)
    process.exit(exitCodes.PROJECT_NAME)
  }

  // verify the project name isn't kebab cased
  if (isKebabCase) {
    print.error(`Please use camel case for your project name. Ex: ${projectNameCamel}`)
    process.exit(exitCodes.PROJECT_NAME)
  }

  // verify the project name isn't just numbers
  if (isNumericOnly) {
    print.error(`Please use at least one non-numeric character for your project name.`)
    process.exit(exitCodes.PROJECT_NAME)
  }

  // verify the project name is valid
  if (!isValidName) {
    print.error(`The project name can only contain alphanumeric characters and underscore, but must not begin with a number.`)
    process.exit(exitCodes.PROJECT_NAME)
  }

  // verify the directory doesn't exist already
  if (filesystem.exists(projectName) === 'dir') {
    print.error(`Directory ${projectName} already exists.`)
    const askOverwrite = async () => { return prompt.confirm('Do you want to overwrite this directory?') }

    if (parameters.options.overwrite || await askOverwrite()) {
      print.info(`Overwriting ${projectName}...`)
      filesystem.remove(projectName)
    } else {
      process.exit(exitCodes.DIRECTORY_EXISTS)
    }
  }

  // print a header
  header()
  print.newline()
  print.info(`🔥 igniting app ${print.colors.yellow(projectName)}`)

  // skip the boilerplate?
  // NOTE(steve): this expression is intentionally evaluating against false because of
  // --no-boilerplate and how minimist works.
  if (parameters.options.boilerplate === false) {
    addEmptyBoilerplate(context)
    return
  }

  // grab the right boilerplate
  let boilerplateName = parameters.options.boilerplate || parameters.options.b

  // If the name includes a file separator, it's probably a path. Expand it so it's the full real path here.
  if ((boilerplateName || '').includes(path.sep)) {
    boilerplateName = filesystem.path(boilerplateName)
  }
  const andross = 'Andross (React Navigation, Redux, & Redux Saga'
  const bowser = 'Bowser (React Navigation, MobX State Tree, & TypeScript)'
  if (!boilerplateName) {
    const { boilerplate } = await context.prompt.ask([
      {
        name: 'boilerplate',
        message: 'Which boilerplate would you like to use?',
        type: 'list',
        choices: [
          andross,
          bowser
        ]
      }
    ])
    switch (boilerplate) {
      case bowser:
        boilerplateName = 'ir-boilerplate-bowser'
        break
      case andross:
      default:
        boilerplateName = 'ir-boilerplate-andross'
        break
    }
  }

  // make & jump into the project directory
  log(`making directory ${projectName}`)
  filesystem.dir(projectName)
  process.chdir(projectName)
  log(`switched directory to ${process.cwd()}`)

  // make a temporary package.json file so node stops walking up the diretories
  // NOTE(steve): a lot of pain went into this 1 function call
  filesystem.write('package.json', {
    name: 'ignite-shim',
    description: 'A temporary package.json created to prevent node from wandering too far.',
    repository: 'infinitered/ignite',
    license: 'MIT'
  })

  // pick the inbound cli options
  const cliOpts = parameters.options

  // turn this back into a string
  const forwardingOptions = trim(reduce((src, k) => {
    const v = cliOpts[k]
    return concat(v === true ? `--${k} ` : `--${k} ${v} `, src)
  })('', keys(cliOpts)))

  // let's kick off the template
  let ok = false
  try {
    const command = trim(`ignite boilerplate-install ${boilerplateName} ${projectName} ${forwardingOptions}`)
    log(`running boilerplate: ${command}`)
    await system.exec(command, { stdio: 'inherit' })
    log('finished boilerplate')
    ok = true
  } catch (e) {
    log('error running boilerplate')
    log(e)
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
      , filesystem.list(projectName) || []
    )
    log(`removing unused sub directory ${projectName}`)
    filesystem.remove(projectName)
  }
  log('finished running new')
}

module.exports = command
