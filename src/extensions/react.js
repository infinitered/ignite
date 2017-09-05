const { test, trim } = require('ramda')
const exitCodes = require('../lib/exitCodes')

// DEPRECATED: Please specify React version when invoking install
// Example: const rnInstall = await reactNative.install({ name, version: '15.4.1' })
const REACT_VERSION = '15.4.1'

/**
 * Attach this extension to the context.
 *
 * @param   {any} plugin  - The current running plugin.
 * @param   {any} command - The current running command.
 * @param   {any} context - The active context.
 * @returns {any}         - The public-facing features this supports.
 */
function attach (plugin, command, context) {
  // fist-full o features
  const { parameters, print, system, filesystem, strings, ignite } = context
  const { log } = ignite

  /**
   * Installs React Native.
   *
   * @param {Object}  opts          - The options to pass to install react.
   * @param {string}  opts.name     - What to call this project.
   * @param {string}  opts.version  - The React version to install (if we care).
   * @param {string}  opts.template - The template to pass to React (if any).
   * @param {boolean} opts.skipJest - Should we bypass jest?
   * @returns {number}              - The error code we should exit with if non-0.
   */
  async function install (opts = {}) {
    //  grab the name & version
    const name = opts.name || parameters.third
    let reactVersion = opts.version || parameters.options['react-version']
    if (!reactVersion) {
      print.warning(`💩  unspecified react version in ignite cli has been deprecated `)
      print.warning(`   please use version property in project's boilerplate file to set a react version`)
      print.warning(`   falling back to react version: ${REACT_VERSION}`)
      reactVersion = REACT_VERSION
    }
    const reactTemplate = opts.template || parameters.options['react-template']

    const perfStart = (new Date()).getTime()

    // jet if the version isn't available
    // note that npm and yarn don't differ significantly in perf here, so use npm
    const versionCheck = await system.run(`npm info react@${reactVersion}`)
    const versionAvailable = test(new RegExp(reactVersion, ''), versionCheck || '')
    if (!versionAvailable) {
      print.error(`💩  react version ${print.colors.yellow(reactVersion)} not found on NPM -- ${print.colors.yellow(REACT_VERSION)} recommended`)
      return {
        exitCode: exitCodes.REACT_VERSION,
        version: reactVersion,
        template: reactTemplate
      }
    }

    // craft the additional options to pass to the react cli
    const rnOptions = [ ]
    if (!strings.isBlank(reactTemplate)) {
      rnOptions.push('--template')
      rnOptions.push(reactTemplate)
    }
    if (opts.skipJest) {
      rnOptions.push('--skip-jest')
    }

    // react init
    const cmd = trim(`create-react-app ${name} ${rnOptions.join(' ')}`)
    log('initializing react')
    log(cmd)
    const withTemplate = reactTemplate ? ` with ${print.colors.cyan(reactTemplate)} template` : ''
    const spinner = print.spin(`adding ${print.colors.cyan('React ' + reactVersion)}${withTemplate} ${print.colors.muted('(30 seconds-ish)')}`)
    if (parameters.options.debug) spinner.stop()

    // ok, let's do this
    // react init takes about 20s to execute
    const stdioMode = parameters.options.debug ? 'inherit' : 'ignore'
    try {
      await system.exec(cmd, { stdio: stdioMode })
      log('done')
    } catch (e) {
      spinner.fail(`failed to add ${print.colors.cyan('React ' + reactVersion)}${withTemplate}`)
      if (reactTemplate) {
        // TODO: we can totally check, just stopping here until while https://github.com/facebook/react/pull/12548 settles in.
        const fullTemplateName = `react-template-${reactTemplate}`
        spinner.fail(`Does ${print.colors.cyan(fullTemplateName)} exist on npm?`)
      }
      return {
        exitCode: exitCodes.REACT_INSTALL,
        version: reactVersion,
        template: reactTemplate
      }
    }

    const perfDuration = parseInt(((new Date()).getTime() - perfStart) / 10) / 100

    // good news everyone!
    const successMessage = `added ${print.colors.cyan('React ' + reactVersion)}${withTemplate} in ${perfDuration}s`
    spinner.succeed(successMessage)

    // jump immediately into the new directory
    process.chdir(name)
    log(`changed to directory ${process.cwd()}`)

    // Create ./ignite/plugins/.gitkeep
    filesystem.write(`${process.cwd()}/ignite/plugins/.gitkeep`, '')

    return {
      exitCode: exitCodes.OK,
      version: reactVersion,
      template: reactTemplate
    }
  }

  return {
    install
  }
}

module.exports = attach
