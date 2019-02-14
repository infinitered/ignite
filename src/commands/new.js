import isIgniteDirectory from '../lib/is-ignite-directory'
import exitCodes from '../lib/exit-codes'
import * as path from 'path'
import addEmptyBoilerplate from '../lib/add-empty-boilerplate'
import { isEmpty, match, not, toLower } from 'ramda'
import { IgniteToolbox } from '../types'
import boilerplateInstall from '../lib/boilerplate-install'

/**
 * Creates a new ignite project based on an optional boilerplate.
 */
module.exports = {
  alias: ['n'],
  description: 'Generate a new React Native project with Ignite CLI.',
  run: async function command(toolbox: IgniteToolbox) {
    const { parameters, strings, print, filesystem, ignite, prompt, runtime } = toolbox
    const { isBlank, upperFirst, camelCase } = strings
    const { log } = ignite

    // grab the project name
    const projectName = (parameters.first || '').toString()

    // check for kebabs
    const isKebabCase = not(isEmpty(match(/.-/g, `${projectName}`)))

    // camelCase the project name for user example
    const projectNameCamel = upperFirst(camelCase(projectName))

    // check for numbers-only names
    const isNumericOnly = /^\d+$/.test(projectName)

    // check for alphanumeric name, beginning with a letter
    const isValidName = /^[a-z_][a-z0-9_]+$/i.test(projectName)

    // ensure we're in a supported directory
    if (isIgniteDirectory(process.cwd())) {
      print.error('The `ignite new` command cannot be run within an already ignited project.')
      process.exit(exitCodes.NOT_IGNITE_PROJECT)
    }

    // prevent installing when node_modules/react-native exists
    if (filesystem.exists('node_modules/react-native')) {
      print.error(
        'The `ignite new` command cannot be run within a directory with `node_modules/react-native` installed.',
      )
      print.error('Try installing from a directory without a `node_modules` directory.')
      process.exit(exitCodes.EXISTING_REACT_NATIVE)
    }

    // verify the project name is a thing
    if (isBlank(projectName)) {
      print.info(`${runtime.brand} new <projectName>\n`)
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
      print.error(
        `The project name can only contain alphanumeric characters and underscore, but must not begin with a number.`,
      )
      process.exit(exitCodes.PROJECT_NAME)
    }

    // verify the directory doesn't exist already
    if (filesystem.exists(projectName) === 'dir') {
      print.error(`Directory ${projectName} already exists.`)
      if (parameters.options.overwrite) {
        print.info(`Overwriting ${projectName}...`)
        filesystem.remove(projectName)
      } else {
        const overwrite = await prompt.confirm('Do you want to overwrite this directory?')
        if (overwrite) {
          print.info(`Overwriting ${projectName}...`)
          filesystem.remove(projectName)
        } else {
          process.exit(exitCodes.DIRECTORY_EXISTS)
        }
      }
    }

    // print a header
    require('../brand/header')()
    print.newline()
    print.info(`🔥 igniting app ${print.colors.yellow(projectName)}`)

    // skip the boilerplate?
    // NOTE(steve): this expression is intentionally evaluating against false because of
    // --no-boilerplate and how the arguments parser works.
    if (parameters.options.boilerplate === false) {
      await addEmptyBoilerplate(toolbox)
      return
    }

    // grab the right boilerplate
    let boilerplateName = parameters.options.boilerplate || parameters.options.b

    // If the name includes a file separator, it's probably a path. Expand it so it's the full real path here.
    if ((boilerplateName || '').includes(path.sep)) {
      boilerplateName = filesystem.path(boilerplateName)
    }
    const bowser = 'Bowser (React Navigation, MobX State Tree, & TypeScript) - RECOMMENDED'
    const andross = 'Andross (React Navigation, Redux, & Redux Saga)'
    if (!boilerplateName) {
      const { boilerplate } = await prompt.ask([
        {
          name: 'boilerplate',
          message: 'Which boilerplate would you like to use?',
          type: 'list',
          choices: [bowser, andross],
        },
      ])
      // turn the long-form sentence answer into 'andross' or 'bowser'
      boilerplateName = { [andross]: 'andross', [bowser]: 'bowser' }[boilerplate]
    }

    // make & jump into the project directory
    const originalFolder = process.cwd()
    const appFolder = path.join(originalFolder, projectName)
    const deepFolder = path.join(originalFolder, projectName, projectName)

    log(`making directory ${appFolder}`)
    filesystem.dir(appFolder)
    process.chdir(appFolder)
    log(`switched directory to ${process.cwd()}`)

    // make a temporary package.json file so node stops walking up the directories
    // NOTE(steve): a lot of pain went into this 1 function call
    filesystem.write('package.json', {
      name: 'ignite-shim',
      description: 'A temporary package.json created to prevent node from wandering too far.',
      repository: 'infinitered/ignite',
      license: 'MIT',
    })

    // let's kick off the template
    const ok = await boilerplateInstall(toolbox)
    if (!ok) {
      print.error('error installing boilerplate')
      process.exit(exitCodes.GENERIC)
    }

    // always clean up the app-template stuff
    // log('cleaning temporary files')
    filesystem.remove('node_modules')
    // filesystem.remove('package.json')

    log(`switching back to ${appFolder}`)
    process.chdir(appFolder)

    // move everything that's 1 deep back up to here
    const deepFiles = filesystem.list(deepFolder) || []
    if (parameters.options.debug) console.log(deepFiles)

    log(`moving contents of ${projectName} into place`)
    deepFiles.forEach((filename: string) => {
      log(`moving ${filename}`)
      filesystem.move(path.join(deepFolder, filename), path.join(appFolder, filename))
    })
    log(`removing unused sub directory ${deepFolder}`)
    filesystem.remove(deepFolder)
    log('finished running new')
  },
}
