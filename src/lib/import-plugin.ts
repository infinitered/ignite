import exitCodes from '../lib/exit-codes'
import { IgniteDetectInstall, IgniteToolbox } from '../types'

/**
 * Install this module.
 */
async function importPlugin(toolbox: IgniteToolbox, opts: IgniteDetectInstall) {
  const { isEmpty, forEach, trim } = require('ramda')
  const { moduleName, version, type, directory, url } = opts
  const { ignite, system, filesystem } = toolbox
  const { log } = ignite
  const isDirectory = type === 'directory'
  const target = isDirectory ? directory : moduleName
  const packageVersion = version && !isDirectory ? `@${version}` : ''

  const getNPMPluginCommand = async () => {
    // check to see if it exists first
    try {
      const json = JSON.parse(await system.run(`npm info ${target}${packageVersion} --json`))
      log(`${json.name} ${json.version} on npm.`)
    } catch (e) {
      log(`unable to find ${target} on npm`)
      const boom = new Error(e.message) as any
      boom.unavailable = true
      boom.name = target
      throw boom
    }

    // prepare command line
    let command = ''
    if (ignite.useYarn === true) {
      command = `yarn add ${target}${packageVersion} --dev`
    } else {
      command = trim(`npm i ${target}${packageVersion} --save-dev`)
    }

    return command
  }

  const getDirectoryPluginCommand = async () => {
    // prepare command line
    let command = ''
    if (ignite.useYarn === true) {
      // where is the yarn cache?
      log(`checking for yarn cache`)
      const rawCacheDir = await system.exec('yarn cache dir')

      // look for a cached version of this
      const dirs = filesystem.cwd(rawCacheDir).find({
        matching: `npm-${moduleName}-*`,
        directories: true,
        recursive: false,
      })

      // clear existing cache if we have one
      if (!isEmpty(dirs)) {
        forEach(dir => {
          log(`removing yarn cache ${rawCacheDir}/${dir}`)
          filesystem.remove(`${rawCacheDir}/${dir}`)
        }, dirs)
      }

      command = `yarn add file:${target} --force --dev`
    } else {
      command = trim(`npm i ${target} --save-dev --cache-min=0`)
    }

    return command
  }

  const getGitPluginCommand = async () => {
    // prepare command line
    let command = ''
    if (ignite.useYarn === true) {
      command = `yarn add ${url} --force --dev`
    } else {
      command = `npm i ${url} --save-dev`
    }

    return command
  }

  let command = ''

  switch (type) {
    case 'npm':
      command = await getNPMPluginCommand()
      break

    case 'directory':
      command = await getDirectoryPluginCommand()
      break

    case 'git':
      command = await getGitPluginCommand()
      break
  }

  log(command)
  await system.run(command)
  log(`finished ${ignite.useYarn === true ? 'yarn' : 'npm'} command`)
}

/**
 * This does everything around the periphery of importing a plugin such
 * as UI and safety checks.
 */
export default async (toolbox: IgniteToolbox, specs: IgniteDetectInstall): Promise<number | void> => {
  const { moduleName } = specs
  const { print, ignite } = toolbox
  const { log } = ignite
  const spinner = print.spin(`adding ${print.colors.cyan(moduleName)}`)

  if (specs.type) {
    try {
      await importPlugin(toolbox, specs)
    } catch (e) {
      if (e.unavailable) {
        log(e.message)
        spinner.fail(`${print.colors.bold(moduleName)} is not available on npm.`)
        print.info('')
        print.info(print.colors.muted('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'))
        print.error('  We also searched in these directories:\n')
        ignite.pluginOverrides.forEach(dir => {
          print.info(`    ▸ ${dir}`)
        })
        print.info(print.colors.muted('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'))
      } else {
        spinner.fail(`${print.colors.red(moduleName)} was not able to be installed. Is it a valid NPM module?`)
        print.error('----------')
        print.error(e.message)
        print.error('----------')
      }
      return exitCodes.PLUGIN_INVALID
    }
  } else {
    spinner.fail(`💩  invalid ignite plugin`)
    return exitCodes.PLUGIN_INVALID
  }
  spinner.stop()
}
