// @cliDescription  Add a new thingy
// ----------------------------------------------------------------------------
const Shell = require('shelljs')
const Exists = require('npm-exists')
const Toml = require('toml')
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

const verifyAddedGenerators = (oldIgniteConfig, newIgniteConfig, callback) => {
  const changes = detectedChanges(oldIgniteConfig, newIgniteConfig)
  let pluginGood = true
  if (changes.length > 0) {
    console.log(`The following generators would be changed: ${R.join(', ', changes)}`)

    // enquirer.question('color', 'What is your favorite color?');
    // const answers = await context.prompt.ask({ name: 'type', type: 'list', message, choices })
    // var rl = readline.createInterface(process.stdin, process.stdout)
    // rl.question('Do you want to proceed overwriting these generators? (y/n): ', (answer) => {
    //   if (answer.match(/n/ig)) pluginGood = false
    //   callback(pluginGood)
    //   rl.close()
    // })
  } else {
    console.log('no change')
    // callback(pluginGood)
  }
}


module.exports = async function (context) {
    // grab a fist-full of features...
  const { system, print, filesystem, strings, parameters, prompt } = context
  const { trim, kebabCase } = strings
  const { info, warning, success, debug, checkmark, error } = print

  // /////////////////////////////////////////////////////////////////////////
  // ...and be the CLI you wish to see in the world
  // debug(context)
  // debug(parameters, 'Captured parameters')

  info('Does it exist?')
  // take the last parameter (because of https://github.com/infinitered/gluegun/issues/123)
  // prepend `ignite` as convention
  const moduleName = `ignite-${parameters.array.pop()}`
  const moduleExists = await Exists(moduleName)
  // it exists?  Let's install it else warn
  if (moduleExists) {
    success(`Found plugin ${moduleName}`)

    if (useYarn) {
      Shell.exec(`yarn add ${moduleName} --dev`, {silent: true})
    } else {
      Shell.exec(`npm i ${moduleName} --save-dev`, {silent: true})
    }

    // once installed, let's check on its toml
    info('grab expected toml file')
    const tomlFilePath = `${process.cwd()}/node_modules/${moduleName}/ignite.toml`
    if (!filesystem.exists(tomlFilePath)) {
      error('No `ignite.toml` file found in this node module, are you sure it is an Ignite plugin?')
      if (useYarn) {
        Shell.exec(`yarn remove ${moduleName}`, {silent: true})
      } else {
        Shell.exec(`npm rm ${moduleName}`, {silent: true})
      }
      Shell.exit(1)
    }
    const newConfig = Toml.parse(filesystem.read(tomlFilePath))

    debug(newConfig, 'Toml Config from Module')
    const proposedGenerators = R.reduce((acc, k) => {
      acc[k] = moduleName
      return acc
    }, {}, newConfig.ignite.generators)

    // we compare the toml changes against ours
    const changes = detectedChanges(context.config.ignite.generators, proposedGenerators)
    let pluginGood = true
    if (changes.length > 0) {
      warning(`The following generators would be changed: ${R.join(', ', changes)}`)
      const answer = await context.prompt.confirm('You ok with that?')
      // const test = await context.prompt.confirm('You ok with that?')
      // const answers = await context.prompt.ask({ name: 'type', type: 'list', message, choices })
      // var rl = readline.createInterface(process.stdin, process.stdout)
      // rl.question('Do you want to proceed overwriting these generators? (y/n): ', (answer) => {
      //   if (answer.match(/n/ig)) pluginGood = false
      //   callback(pluginGood)
      //   rl.close()
      // })
    } else {
      console.log('no change')
      // callback(pluginGood)
    }

    info('next thing')

    // we warn the user on changes
    // if they refuse, then npm/yarn uninstall
    // if they accept we write the toml changes
    // and then call the add function
    // get cooking message!

  } else {
    error("We couldn't find that ignite plugin")
    warning(`Please make sure ${moduleName} exists on the NPM registry`)
  }


}
