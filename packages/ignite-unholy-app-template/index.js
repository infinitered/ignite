// Questions to ask during install if the chatty route is chosen.
const installQuestions = [
  {
    name: 'dev-screens',
    message: 'Would you like Ignite Development Screens?',
    type: 'list',
    choices: ['No', 'Yes']
  }, {
    name: 'vector-icons',
    message: 'What vector icon library will you use?',
    type: 'list',
    choices: ['none', 'react-native-vector-icons']
  }, {
    name: 'i18n',
    message: 'What internationalization library will you use?',
    type: 'list',
    choices: ['none', 'react-native-i18n']
  }, {
    name: 'animatable',
    message: 'What animation library will you use?',
    type: 'list',
    choices: ['none', 'react-native-animatable']
  }
]

const maxOptions = {
  'dev-screens': 'Yes',
  'vector-icons': 'react-native-vector-icons',
  'i18n': 'react-native-i18n',
  'animatable': 'react-native-animatable'
}

const add = async function (context) {
  const { filesystem, parameters, ignite, strings, print, system, prompt } = context
  const { spin } = print
  const { isBlank } = strings

  // validation
  if (isBlank(parameters.third)) {
    print.info(`ignite add unholy-app-template <name>\n`)
    print.error('Name is required.')
    process.exit(1)
    return
  }

  // TODO(steve): This is a developer quality-of-life switch that will go away when we :shipit: !
  // see more details up in `new.js` as this is only set there.
  const igniteDevPackagePrefix = parameters.options['ignite-dev-package-prefix']

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
      template: 'README.md',
      target: 'README.md'
    },
    {
      template: 'ignite.json.ejs',
      target: 'ignite/ignite.json'
    },
    {
      template: '.editorconfig',
      target: '.editorconfig'
    },
    {
      template: 'App/Config/AppConfig.js.ejs',
      target: 'App/Config/AppConfig.js'
    }
  ]

  // copy far too many opinions
  filesystem.copy(`${__dirname}/templates/App`, `${process.cwd()}/App`, { overwrite: true })

  // TODO: merge, don't clobber here.
  copyJobs.push({
    template: 'package.json.ejs',
    target: 'package.json'
  })

  // copy the things that make us unholy
  const spinner = spin('▸ adding required files') // i struggled with the right wording here
  await ignite.copyBatch(context, copyJobs, {
    name: parameters.third,
    igniteVersion: ignite.version
  })
  spinner.stop()

  // figure out which parts of unholy to install
  const answers = parameters.options.max
    ? maxOptions
    : await prompt.ask(installQuestions)

  spinner.text = '▸ installing ignite dependencies'
  spinner.start()
  if (context.ignite.useYarn) {
    await system.run('yarn')
  } else {
    await system.run('npm i')
  }
  spinner.stop()

  // react native link -- must use spawn & stdio: ignore or it hangs!! :(
  spinner.text = `▸ linking native libraries`
  spinner.start()
  await system.spawn('react-native link', { stdio: 'ignore' })
  spinner.stop()

  await system.spawn(`ignite add ${igniteDevPackagePrefix}basic-generators`, { stdio: 'inherit' })

  // now run install of Ignite Plugins
  if (answers['dev-screens'] === 'Yes') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}dev-screens`, { stdio: 'inherit' })
  }

  if (answers['vector-icons'] === 'react-native-vector-icons') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}vector-icons`, { stdio: 'inherit' })
  }

  if (answers['i18n'] === 'react-native-i18n') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}i18n`, { stdio: 'inherit' })
  }

  if (answers['animatable'] === 'react-native-animatable') {
    await system.spawn(`ignite add ${igniteDevPackagePrefix}animatable`, { stdio: 'inherit' })
  }
}

// TODO
const remove = async function (context) {
}

module.exports = { add, remove }
