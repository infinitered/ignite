const { isEmpty, forEach, trim } = require('ramda')
const exitCodes = require('../lib/exitCodes')
const path = require('path')

/**
 * Install this module.
 *
 * @param {Object} context         The gluegun context
 * @param {Object} opts            The options used to install
 * @param {string} opts.moduleName The module to install
 */
async function importPlugin (context, opts) {
  const { moduleName, type, directory } = opts
  const { ignite, system, filesystem } = context
  const { log } = ignite
  const isDirectory = type === 'directory'
  const target = isDirectory ? directory : moduleName

  // check to see if it exists first
  if (type === 'npm') {
    try {
      const json = JSON.parse(await system.run(`npm info ${target} --json`))
      log(`${json.name} ${json.version} on npm.`)
    } catch (e) {
      log(`unable to find ${target} on npm`)
      const boom = new Error(e.message)
      boom.unavailable = true
      boom.name = target
      throw boom
    }
  }

  if (ignite.useYarn) {
    if (isDirectory) {
      // where is the yarn cache?
      log(`checking for yarn cache`)
      const rawCacheDir = await system.exec('yarn cache dir')

      // look for a cached version of this
      const dirs = filesystem
        .cwd(rawCacheDir)
        .find({
          matching: `npm-${moduleName}-*`,
          directories: true,
          recursive: false
        })

      // clear existing cache if we have one
      if (!isEmpty(dirs)) {
        forEach(
          dir => {
            log(`removing yarn cache ${rawCacheDir}/${dir}`)
            filesystem.remove(`${rawCacheDir}/${dir}`)
          },
          dirs
        )
      }
    }
    const cmd = isDirectory
      ? `yarn add file:${target} --force --dev`
      : `yarn add ${target} --dev`
    log(cmd)
    await system.run(cmd)
    log('finished yarn command')
  } else {
    const cacheBusting = isDirectory ? '--cache-min=0' : ''
    const cmd = trim(`npm i ${target} --save-dev ${cacheBusting}`)
    log(cmd)
    await system.run(cmd)
    log('finished npm command')
  }
}

/**
 * This does everything around the periphery of importing a plugin such
 * as UI and safety checks.
 *
 * @param {any} context - The gluegun context.
 * @param {any} specs   - The specs of the module to import (sourced from detectInstall)
 * @returns An error code or null.
 */
async function safelyImportPlugin (context, specs) {
  const { moduleName } = specs
  const { print, ignite } = context
  const spinner = print.spin(`adding ${print.colors.cyan(moduleName)}`)

  if (specs.type) {
    try {
      await importPlugin(context, specs)
    } catch (e) {
      if (e.unavailable) {
        spinner.fail(
          `${print.colors.bold(moduleName)} is not available on npm.`
        )
        print.info('')
        print.info(
          print.colors.muted(
            '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'
          )
        )
        print.error('  We also searched in these directories:\n')
        ignite.pluginOverrides.forEach(dir => {
          print.info(`    ▸ ${dir}`)
        })
        print.error('')
        print.error(
          '  During Ignite 2 alpha, please consider setting this\n  environment variable:\n'
        )
        print.info(
          `  export IGNITE_PLUGIN_PATH=${path.resolve(
            __dirname,
            '..',
            '..',
            '..'
          )}`
        )
        print.info(
          print.colors.muted(
            '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'
          )
        )
      } else {
        spinner.fail(
          `${print.colors.red(
            moduleName
          )} was not able to be installed. Is it a valid NPM module?`
        )
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

module.exports = safelyImportPlugin
