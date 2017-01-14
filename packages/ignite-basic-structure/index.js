const sourceFolder = `${process.cwd()}/node_modules/ignite-basic-structure/templates/`
const generate = require('./shared/generate-utils')

const add = async function (context) {
  const { filesystem, parameters, ignite } = context

  const copyJobs = [
    {
      template: 'index.ejs',
      target: 'index.ios.js'
    },
    {
      template: 'index.ejs',
      target: 'index.android.js'
    },
    {
      template: 'README.md',
      target: 'README.md'
    },
    {
      template: 'ignite.toml',
      target: 'ignite/ignite.toml'
    },
    {
      template: '.editorconfig',
      target: '.editorconfig'
    }
  ]

  await ignite.copyBatch(context, copyJobs, {name: 'Taco'})

  // Should be using template.generate but we can't due to gluegun #126
  // filesystem.copy(`${sourceFolder}index.js`, `${process.cwd()}/index.ios.js`, { overwrite: true })
  // filesystem.copy(`${sourceFolder}index.js`, `${process.cwd()}/index.android.js`, { overwrite: true })
  // filesystem.copy(`${sourceFolder}README.md`, `${process.cwd()}/README.md`, { overwrite: true })
  // filesystem.copy(`${sourceFolder}ignite.toml`, `${process.cwd()}/ignite/ignite.toml`, { overwrite: true })
  // filesystem.copy(`${sourceFolder}.editorconfig`, `${process.cwd()}/.editorconfig`, { overwrite: true })

  if (parameters.options.unholy) {
    // copy far too many opinions
    filesystem.copy(`${sourceFolder}Unholy`, `${process.cwd()}/App`, { overwrite: true })
  } else {
    // copy minimal structure YAY!
    filesystem.copy(`${sourceFolder}App`, `${process.cwd()}/App`, { overwrite: true })
  }
}

const remove = async function (context) {
  console.log('Removing Ignite Basic Structure')
}

module.exports = { add, remove }
