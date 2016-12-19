// @cliDescription  Add a new thingy
// ----------------------------------------------------------------------------
const Shell = require('shelljs')
const Exists = require('npm-exists')
const Toml = require('toml')
// Yeah, why would toml include this? :(
const json2toml = require('json2toml')
const R = require('ramda')

// use yarn or use npm? hardcode for now
const useYarn = false

// Optional - could be used for changes warnings
const detectedChanges = (oldObject, newObject) => {
  let oldKeys = R.keys(oldObject)
  let newKeys = R.keys(newObject)
  const inter = R.intersection(oldKeys, newKeys)
  return R.reduce((acc, k) => {
    if (oldObject[k] !== newObject[k]) {
      return R.concat([`'${k}'`], acc)
    }
    return acc
  }, [], inter)
}

const noMegusta = (moduleName) => {
  console.warn('Rolling back...')

  if (useYarn) {
    Shell.exec(`yarn remove ${moduleName}`, {silent: true})
  } else {
    Shell.exec(`npm rm ${moduleName}`, {silent: true})
  }
  process.exit(1)
}

module.exports = async function (context) {
    // grab a fist-full of features...
  const { print, filesystem, parameters, prompt } = context
  const { info, warning, success, checkmark, error } = print

  // /////////////////////////////////////////////////////////////////////////
  // ...and be the CLI you wish to see in the world
  // debug(context)
  // debug(parameters, 'Captured parameters')

  // take the last parameter (because of https://github.com/infinitered/gluegun/issues/123)
  // prepend `ignite` as convention
  const moduleName = `ignite-${parameters.array.pop()}`
  info(`🔎    Finding Plugin`)
  const moduleExists = await Exists(moduleName)
  // it exists?  Let's install it else warn
  if (moduleExists) {
    success(`${checkmark}    Installing`)

    if (useYarn) {
      Shell.exec(`yarn add ${moduleName} --dev`, {silent: true})
    } else {
      Shell.exec(`npm i ${moduleName} --save-dev`, {silent: true})
    }

    // once installed, let's check on its toml
    const tomlFilePath = `${process.cwd()}/node_modules/${moduleName}/ignite.toml`
    if (!filesystem.exists(tomlFilePath)) {
      error('No `ignite.toml` file found in this node module, are you sure it is an Ignite plugin?')
      noMegusta(moduleName)
    }
    const newConfig = Toml.parse(filesystem.read(tomlFilePath))

    // debug(newConfig, 'Toml Config from Module')
    const proposedGenerators = R.reduce((acc, k) => {
      acc[k] = moduleName
      return acc
    }, {}, newConfig.ignite.generators)

    // we compare the toml changes against ours
    const changes = detectedChanges(context.config.ignite.generators, proposedGenerators)
    if (changes.length > 0) {
      // we warn the user on changes
      warning(`The following generators would be changed: ${R.join(', ', changes)}`)
      const ok = await prompt.confirm('You ok with that?')
      // if they refuse, then npm/yarn uninstall
      if (!ok) noMegusta(moduleName)
    }

    const combinedGenerators = Object.assign({}, context.config.ignite.generators, proposedGenerators)
    const updatedConfig = R.assocPath(['ignite', 'generators'], combinedGenerators, context.config)
    // local toml file

    // We write the toml changes
    const localToml = `${process.cwd()}/ignite.toml`
    filesystem.write(localToml, json2toml(updatedConfig))

    // and then call the add function
    const pluginModule = require(`${process.cwd()}/node_modules/${moduleName}`)
    await pluginModule.add(context)

    // get cooking message!
    success('Time to get cooking! 🍽 ')
  } else {
    error("We couldn't find that ignite plugin")
    warning(`Please make sure ${moduleName} exists on the NPM registry`)
    process.exit(1)
  }


}
