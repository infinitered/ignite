const sourceFolder = `${process.cwd()}/node_modules/ignite-basic-structure/templates/`

const add = async function (context) {
  const { filesystem, parameters, ignite, strings, print } = context
  const { isBlank } = strings

  // validation
  if (isBlank(parameters.third)) {
    print.info(`${context.runtime.brand} add basic-structure <name>\n`)
    print.error('App name is required to properly brand structure')
    process.exit(1)
    return
  }

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


  if (parameters.options.unholy) {
    // copy far too many opinions
    filesystem.copy(`${sourceFolder}Unholy`, `${process.cwd()}/App`, { overwrite: true })
    copyJobs.push({
      template: 'package.json.unholy.ejs',
      target: 'package.json'
    })
  } else {
    // copy minimal structure YAY!
    filesystem.copy(`${sourceFolder}App`, `${process.cwd()}/App`, { overwrite: true })
  }

  await ignite.copyBatch(context, copyJobs, {name: parameters.third})
}

// TODO
const remove = async function (context) {
  console.log('This SHOULD remove Ignite Basic Structure')
}

module.exports = { add, remove }
