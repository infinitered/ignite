const sourceFolder = `${process.cwd()}/node_modules/ignite-dev-screens/templates`

const MANUAL_INSTALL_INFO = `
✨ DevScreens installed!

We couldn't automatically add them to your project. But it's pretty easy!
Just add the following to your primary screen or navigation:

${print.colors.bold('import DevscreensButton from \'../../ignite/DevScreens/DevscreensButton.js\'')}

${print.colors.darkGray('// In your view JSX somewhere...')}

<DevscreensButton />
`

const add = async function (context) {
  const { patching, filesystem, print, ignite } = context
  const { warning } = print

  // Set Examples to "classic" in Ignite config
  context.ignite.setIgniteConfig('examples', 'classic')

  // dev screens use react-navigation
  await ignite.addModule('react-navigation')

  // Copy the the screens to containers folder
  filesystem.copyAsync(`${sourceFolder}`, `${process.cwd()}/ignite/DevScreens`, { overwrite: true })

  // Set showDevScreens to __DEV__
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
    print.info(MANUAL_INSTALL_INFO)
  }

  // Call the function in the navigation, which adds/provides the dev screens
  // TODO: Use navigation generator to add screens
}

const remove = async function (context) {
  const { filesystem, ignite, patching } = context

  console.log('Removing Ignite Dev Screens')

  // Set Examples to "false" in Ignite config
  context.ignite.removeIgniteConfig('examples')

  // remove the npm module - probably should ask user here
  await ignite.removeModule('react-navigation')

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
