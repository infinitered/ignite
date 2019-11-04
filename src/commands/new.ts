import * as path from 'path'
import { isEmpty, match, not, toLower } from 'ramda'
import isIgniteDirectory from '../lib/is-ignite-directory'
import exitCodes from '../lib/exit-codes'
import addEmptyBoilerplate from '../lib/add-empty-boilerplate'
import boilerplateInstall from '../lib/boilerplate-install'
import { IgniteToolbox } from '../types'

/**
 * Creates a new ignite project based on an optional boilerplate.
 */
module.exports = {
  alias: ['n'],
  description: 'Generate a new project with Ignite CLI.',
  run: async function command(toolbox: IgniteToolbox) {
    const { parameters, strings, print, filesystem, system, ignite, prompt, runtime, meta } = toolbox
    const { isBlank, upperFirst, camelCase } = strings
    const { log } = ignite

    // grab the project name
    const projectName = (parameters.first || '').toString()

    // verify the project name is a thing
    if (isBlank(projectName)) {
      print.info(`${runtime.brand} new <projectName>\n`)
      print.error('Project name is required')
      process.exit(exitCodes.PROJECT_NAME)
    }

    // warn if more than one argument is provided for <projectName>
    if (parameters.second) {
      print.info(`Info: You provided more than one argument for <projectName>. The first one (${projectName}) will be used and the rest are ignored.`) // prettier-ignore
    }

    // guard against `ignite new ignite`
    if (toLower(projectName) === 'ignite') {
      print.error(`Hey...that's my name! Please name your project something other than '${projectName}'.`)
      process.exit(exitCodes.PROJECT_NAME)
    }

    // check for kebabs
    if (not(isEmpty(match(/.-/g, `${projectName}`)))) {
      // camelCase the project name for user example
      const projectNameCamel = upperFirst(camelCase(projectName))

      print.error(`Please use camel case for your project name. Ex: ${projectNameCamel}`)
      process.exit(exitCodes.PROJECT_NAME)
    }

    // check for numbers-only names
    if (/^\d+$/.test(projectName)) {
      print.error(`Please use at least one non-numeric character for your project name.`)
      process.exit(exitCodes.PROJECT_NAME)
    }

    // check for alphanumeric name, beginning with a letter
    if (!/^[a-z_][a-z0-9_]+$/i.test(projectName)) {
      print.error(
        `The project name can only contain alphanumeric characters and underscore, but must not begin with a number.`,
      )
      process.exit(exitCodes.PROJECT_NAME)
    }

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

    // verify the directory doesn't exist already
    if (filesystem.exists(projectName) === 'dir') {
      print.error(`Directory ${projectName} already exists.`)
      if (parameters.options.overwrite) {
        print.info(`Overwriting ${projectName}...`)
        filesystem.remove(projectName)
      } else {
        const overwrite = await prompt.confirm('Do you want to overwrite this directory?')
        if (overwrite === true) {
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

    // If the name starts with ., /, \, or ~, it's probably a path.
    // Expand it so it's the full real path here.
    if (['~', '.', '\\', '/'].includes((boilerplateName || '')[0])) {
      boilerplateName = filesystem.path(boilerplateName)
    }

    const boilerplates = [
      { name: '---', message: 'Infinite Red boilerplates', value: 'sep', role: 'separator' },
      {
        name: 'ignite-bowser',
        message: 'Bowser (React Navigation, MobX State Tree, & TypeScript) - RECOMMENDED',
      },
      { name: 'ignite-andross', message: 'Andross (React Navigation, Redux, & Redux Saga)' },
      { name: '---', message: 'Third-party boilerplates', value: 'sep', role: 'separator' },
      {
        name: 'ignite-jhipster',
        message: 'JHipster (https://github.com/ruddell/ignite-jhipster)',
      },
    ]
    if (!boilerplateName) {
      const { boilerplate } = await prompt.ask([
        {
          name: 'boilerplate',
          message: 'Which boilerplate would you like to use?',
          type: 'select',
          choices: boilerplates,
        },
      ])
      boilerplateName = boilerplate
    }

    // update parameters for down the stack
    parameters.options.boilerplate = boilerplateName
    parameters.options.b = boilerplateName

    if (boilerplateName.includes('alpha') || boilerplateName.includes('beta')) {
      print.warning(`🐉 You're using a prerelease version of ${boilerplateName}.`)
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

    // remove the temporary node_modules
    filesystem.remove('node_modules')

    log(`switching back to ${appFolder}`)
    process.chdir(appFolder)

    // move everything that's 1 deep back up to here
    const deepFiles = filesystem.list(deepFolder) || []
    if (parameters.options.debug) {
      ignite.log('files that will be moved to main folder:')
      console.log(deepFiles)
    }

    log(`moving contents of ${projectName} into place`)
    deepFiles.forEach((filename: string) => {
      log(`moving ${filename}`)
      filesystem.move(path.join(deepFolder, filename), path.join(appFolder, filename))
    })
    log(`removing unused sub directory ${deepFolder}`)
    filesystem.remove(deepFolder)

    // run yarn or NPM one last time
    const yarnOrNPM = ignite.useYarn ? 'yarn' : 'npm i'
    log(`running ${yarnOrNPM} one last time...`)
    let spinner = print.spin(`running ${yarnOrNPM} one last time...`)
    await system.run(yarnOrNPM)
    spinner.succeed(`${yarnOrNPM} complete`)

    // initialize git if it isn't already initialized
    if (!parameters.options['skip-git'] && !filesystem.exists('./.git') && system.which('git')) {
      spinner = print.spin('setting up source control with git')
      const gitCommand = `git init . && git add -A && git commit -m "Initial commit\n\nIgnite CLI version ${meta.version()}"`
      ignite.log('setting up git repo with command:')
      ignite.log(gitCommand)
      await system.run(gitCommand)
      spinner.succeed(`configured git`)
    }

    // done
    log('finished running new')
    return true
  },
}
