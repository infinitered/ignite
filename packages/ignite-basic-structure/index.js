const generate = require('../shared/generate-utils')

const add = async function (context) {
  console.log('Adding Ignite Basic Structure')

    this.cpTemplate('README.md')
    this.cpTemplate('package.json')
    this.cpTemplate('.babelrc')
    this.cpTemplate('.env')
    this.cpFile('.ignite.template', '.ignite')
    this.cpFile('index.js.template', 'index.ios.js')
    this.cpFile('index.js.template', 'index.android.js')
    this.cpFile('.editorconfig.template', '.editorconfig')
    this.cpDirectory('git_hooks')
    this.cpDirectory('Tests')
    this.cpDirectory('App')
    this.cpDirectory('fastlane')

  const jobs = [
    {
      template: 'index.js',
      target: 'index.ios.js'
    },
    {
      template: 'index.js',
      target: 'index.android.js'
    },
    {
      template: 'README.md',
      target: 'README.md'
    },
    {
      template: 'ignite.toml',
      target: 'ignite.toml'
    },
    {
      template: '.editorconfig',
      target: '.editorconfig'
    },
    {
      template: 'App',
      target: 'App'
    },
    {
      template: 'git_hooks',
      target: 'git_hooks'
    },
  ]

  // make the templates
  await generate(context, jobs, props)
}

const remove = async function (context) {
  console.log('Removing Ignite Basic Structure')
}

module.exports = { add, remove }
