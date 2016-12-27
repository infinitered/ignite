const Shell = require('shelljs')

const add = async function (context) {
  console.log('Adding Ignite Dev Screens')

  // Set Examples to "classic" in Ignite config
  context.ignite.setGlobalConfig('examples', 'classic')

  // Copy the the screens to containers folder
  Shell.exec('ignite generate dev-screens')

  // Set App/Config/DebugSettings.js showDevScreens to __DEV__
  context.ignite.setDebugConfig('showDevScreens', '__DEV__')

  // Insert a function that renders the dev screens as part of the JSX in the navigation
  // TODO: Use navigation generator to add screens

  // Call the function in the navigation, which adds/provides the dev screens

  // Add a dev screens button tastefully to the launch page

}

const remove = async function (context) {
  { filesystem } = context

  console.log('Removing Ignite Dev Screens')

  // Set Examples to "false" in Ignite config
  context.ignite.removeGlobalConfig('examples')

  // Delete screens from containers folder
  // TODO: Use un-generate once #564 is resolved
  filesystem.remove('App/Containers/DevScreens')

  // Remove App/Config/DebugSettings.js showDevScreens value
  context.ignite.removeDebugConfig('showDevScreens')

  // Remove function and call from navigation
  // TODO: Use navigation generator to remove screens

  // Remove dev screens button from launch page, if launch page is found

}

module.exports = { add, remove }
