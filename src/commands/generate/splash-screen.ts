import { GluegunToolbox } from "gluegun"
import {
  generateSplashScreen,
  runGenerator,
  validateSplashScreenGenerator,
} from "../../tools/generators"
import { command, heading, p, warning } from "../../tools/pretty"

module.exports = {
  alias: ["splash"],
  description: "Generates splash-screen from templates",
  run: async (toolbox: GluegunToolbox) => {
    const generator = toolbox.parameters.command?.toLowerCase()
    runGenerator(toolbox, generate, generator)
  },
}

async function generate(toolbox: GluegunToolbox) {
  const { parameters } = toolbox

  // what generator are we running?
  const generator = parameters.command.toLowerCase()

  // color to use for the splash screen
  let backgroundColor = parameters.first

  // get optional android/ios logo sizes
  let { androidSize = 180, iosSize = 212, ...options } = parameters.options || {}

  if (!backgroundColor) {
    warning(
      `⚠️  Please specify the background color of the screen that will be used to generate the splash screen.`,
    )

    p()
    command(`ignite g ${generator} "#191015" [--android-size=180 --ios-size=212]`)
    return
  }

  // force coercion of size to number if a user quotes it
  // force coercion of background to string if the hex color is numerical; add "#" if it's not there
  androidSize = Number(androidSize)
  iosSize = Number(iosSize)
  backgroundColor = String(backgroundColor).startsWith("#")
    ? backgroundColor
    : `#${backgroundColor}`

  const { isValid, messages } = await validateSplashScreenGenerator(
    { androidSize, iosSize, backgroundColor },
    options,
  )

  if (!isValid) {
    messages.forEach((message) => warning(message))
    return
  }

  const isSuccessful = await generateSplashScreen({ androidSize, iosSize, backgroundColor })

  if (isSuccessful) {
    heading(`Splash screen generated!`)
    p(
      "Uninstall the application from your simulator/emulator and re-build your app to see the changes!",
    )
    p(
      "Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106",
    )
    p(
      "Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.",
    )
  }
}
