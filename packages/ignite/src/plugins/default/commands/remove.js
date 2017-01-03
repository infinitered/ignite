// @cliDescription  Add a new thingy
// ----------------------------------------------------------------------------
const Shell = require('shelljs')
const R = require('ramda')
const Toml = require('toml')
// Yeah, why would toml include this? :(
const json2toml = require('json2toml')

// use yarn or use npm? hardcode for now
const useYarn = false

const detectRemovals = (configObject, moduleName) => {
  return R.reduce((acc, k) => {
    if (configObject[k] === moduleName) {
      return R.concat([`${k}`], acc)
    }
    return acc
  }, [], R.keys(configObject))
}

const existsLocally = (moduleName) => {
  // we take a look at the local package.json
  const pack = require(`${process.cwd()}/package.json`)
  return R.pathOr(null, ['devDependencies', moduleName], pack)
}

const noMegusta = (moduleName) => {
  console.warn('Removing dev module')

  if (useYarn) {
    Shell.exec(`yarn remove ${moduleName}`, {silent: true})
  } else {
    Shell.exec(`npm rm ${moduleName}`, {silent: true})
  }
}

module.exports = async function (context) {
    // grab a fist-full of features...
  const { print, parameters, prompt, filesystem } = context
  const { info, warning, xmark, error, success, debug } = print

  // take the last parameter (because of https://github.com/infinitered/gluegun/issues/123)
  // prepend `ignite` as convention
  const moduleName = `ignite-${parameters.array.pop()}`
  info(`🔎    Verifying Plugin`)
  // Make sure what they typed, exists locally
  if (existsLocally(moduleName)) {
    // Detect generator changes
    const changes = detectRemovals(context.config.ignite.generators, moduleName)
    // Ask user if they are sure.
    if (changes.length > 0) {
      // we warn the user on changes
      warning(`The following generators would be removed: ${R.join(', ', changes)}`)
      const ok = await prompt.confirm('You ok with that?')
      if (ok) {
        const generatorsList = Object.assign({}, context.config.ignite.generators)
        R.map((k) => delete generatorsList[k], changes)
        const updatedConfig = R.assocPath(['ignite', 'generators'], generatorsList, context.config)
        // We write the toml changes
        const localToml = `${process.cwd()}/ignite.toml`
        filesystem.write(localToml, json2toml(updatedConfig))
      } else {
        process.exit(1)
      }
    }

    // Call remove functionality
    const pluginModule = require(`${process.cwd()}/node_modules/${moduleName}`)
    await pluginModule.remove(context)

    // Uninstall dep from node modules
    noMegusta(moduleName)
    success(`${xmark}    Removed`)
  } else {
    error("We couldn't find that ignite plugin")
    warning(`Please make sure ${moduleName} exists in package.json`)
    process.exit(1)
  }
}
