/**
 * Fires when the ignite plugin is added.
 *
 * @param {Object} context - The ignite context.
 */
const add = async function (context) {
  const { filesystem, system, parameters, ignite, print } = context

  // TODO(steve): This is a developer quality-of-life switch that will go away when we :shipit: !
  // see more details up in `new.js` as this is only set there.
  const igniteDevPackagePrefix = parameters.options['ignite-dev-package-prefix']

  // copy the app templates files
  filesystem.copy(
    `${__dirname}/templates/App`, // from my templates/App
    `${process.cwd()}/App`,       // to your ignited project's App
    { overwrite: true }           // clobber any existing files
  )

  const copyJobs = [
    {
      template: 'index.js.ejs',
      target: 'index.ios.js'
    },
    {
      template: 'index.js.ejs',
      target: 'index.android.js'
    },
    {
      template: 'App/Config/AppConfig.js.ejs',
      target: 'App/Config/AppConfig.js'
    },
    {
      template: 'ignite.json.ejs',
      target: 'ignite/ignite.json'
    }
  ]

  // copy the things that make us unholy
  const spinner = print.spin('▸ adding required files')
  await ignite.copyBatch(context, copyJobs, {
    name: parameters.third,
    igniteVersion: ignite.version
  })
  spinner.stop()

  // install the generators
  await system.spawn(`ignite add ${igniteDevPackagePrefix}basic-generators`, { stdio: 'inherit' })
}

/**
 * Fires when the ignite plugin is removed.
 *
 * @param {Object} context - The ignite context.
 */
const remove = async function (context) {
  const { print, filesystem, prompt } = context
  const ok = await prompt.confirm('Are you sure you want to delete your App directory?')
  if (ok) {
    filesystem.remove(`${process.cwd()}/App`) // RIP
  } else {
    print.info('Whew. That was a close one.')
  }
}

module.exports = { add, remove }
