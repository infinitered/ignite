const copyDevScreens = async function (context) {
  // grab some features
  const { parameters, print, strings, ignite } = context
  const { isBlank } = strings

  const screens = ["APITestingScreen", "ComponentExamplesScreen", "DeviceInfoScreen", "DevscreensButton", "PluginExamplesScreen", "PresentationScreen", "ThemeScreen"]

  const jobs = []

  screens.map((screen) => {
    jobs.push(
      {
        template: `${screen}.js.ejs`,
        target: `ignite/DevScreens/${screen}.js`
      },
      {
        template: `${screen}Style.js.ejs`,
        target: `ignite/DevScreens/Styles/${screen}Style.js`
      }
    )
  })

  // make the templates
  await ignite.copyBatch(context, jobs, {})
}


const add = async function (context) {
  const { patching, filesystem, print, system } = context
  const { warning } = print

  // Set Examples to "classic" in Ignite config
  context.ignite.setGlobalConfig('examples', 'classic')

  // // Copy the the screens to containers folder
  await copyDevScreens(context)

  // Set App/Config/DebugConfig.js showDevScreens to __DEV__
  context.ignite.setDebugConfig('showDevScreens', '__DEV__', true)

  // Insert a function that renders the dev screens as part of the JSX in the navigation
  const launchScreen = `${process.cwd()}/App/Containers/LaunchScreen.js`
  if (filesystem.exists(launchScreen)) {
    if (!patching.isInFile(launchScreen, 'import DevscreensButton')) {
      patching.insertInFile(launchScreen, 'from \'react-native\'', 'import DevscreensButton from \'../../ignite/DevScreens/DevscreensButton.js\'\n')
    }
    if (!patching.isInFile(launchScreen, '<DevscreensButton />')) {
      patching.insertInFile(launchScreen, '</ScrollView>', '          <DevscreensButton />', false)
    }
  } else {
    warning('LaunchScreen.js not found. Please manually link the PresentationScreen from your primary screen/navigation.')
  }

  // Call the function in the navigation, which adds/provides the dev screens
  // TODO: Use navigation generator to add screens

}

const remove = async function (context) {
  const { filesystem } = context

  console.log('Removing Ignite Dev Screens')

  // Set Examples to "false" in Ignite config
  context.ignite.removeGlobalConfig('examples')

  // Delete screens from containers folder
  filesystem.remove('ignite/DevScreens')

  // Remove App/Config/DebugSettings.js showDevScreens value
  context.ignite.removeDebugConfig('showDevScreens')

  // Remove function and call from navigation
  // TODO: Use navigation generator to remove screens

  // Remove dev screens button from launch page, if launch page is found
  const launchScreen = `${process.cwd()}/App/Containers/LaunchScreen.js`
  if (filesystem.exists(launchScreen)) {
    patching.replaceInFile(launchScreen, 'import DevscreensButton', '')
    patching.replaceInFile(launchScreen, '<DevscreensButton />', '')
  }

}

module.exports = { add, remove }
