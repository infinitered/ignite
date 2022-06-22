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

  // YULIANTODO: https://stackoverflow.com/questions/69812590/android-12-splash-screen-icon-not-displaying/69831106#69831106

  // what generator are we running?
  const generator = parameters.command.toLowerCase()

  // we need a size and color options
  let { androidSize = null, iosSize = null, backgroundColor, ...options } = parameters.options || {}

  if ((!androidSize && !iosSize) || !backgroundColor) {
    warning(
      `⚠️  Please specify the ${[
        !androidSize && !iosSize && "size of the icon",
        !backgroundColor && "background color of the screen",
      ]
        .filter(Boolean)
        .join(" and ")} that will be used to generate the splash screen.`,
    )

    p()
    command(`ignite g ${generator} --android-size=180 --ios-size=212 --background-color=191015`)
    return
  }

  // force coercion of size to number if a user quotes it
  // force coercion of background to string if the hex color is numerical; add "#" if it's not there
  androidSize = androidSize !== null ? Number(androidSize) : null
  iosSize = iosSize !== null ? Number(iosSize) : null
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
      "Note: If you are using vanilla React Native on an Android 12, the splash screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon.",
    )
    // YULIANTODO: link to relative github issue
  }
}
