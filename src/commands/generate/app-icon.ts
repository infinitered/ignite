import { GluegunToolbox } from "gluegun"
import { generateAppIcons, runGenerator, validateAppIconGenerator } from "../../tools/generators"
import { command, heading, p, warning } from "../../tools/pretty"

module.exports = {
  alias: ["launcher-icon"],
  description: "Generates app-icons from templates",
  run: async (toolbox: GluegunToolbox) => {
    const generator = toolbox.parameters.command?.toLowerCase()
    runGenerator(toolbox, generate, generator)
  },
}

async function generate(toolbox: GluegunToolbox) {
  const { parameters } = toolbox

  // what generator are we running?
  const generator = parameters.command.toLowerCase()

  // we need a platform to generate app-icons
  const option = parameters.first
  if (!option) {
    warning(`⚠️  Please specify which icons you would like to generate:`)
    p()
    command(`ignite g ${generator} all|ios|android|expo`)
    return
  }

  const { isValid, messages } = await validateAppIconGenerator(option as any, parameters.options)

  if (!isValid) {
    messages.forEach((message) => warning(message))
    return
  }

  const isSuccessful = await generateAppIcons(option as any)

  if (isSuccessful) {
    heading(`App icons generated!`)
    p(
      "Uninstall the application from your simulator/emulator and re-build your app to see the changes!",
    )
  }
}
