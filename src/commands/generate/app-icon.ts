import { GluegunToolbox } from "gluegun"
import { generateAppIcons, runGenerator, validateAppIconGenerator } from "../../tools/generators"
import { heading, p, warning } from "../../tools/pretty"

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

  const { isValid, messages } = await validateAppIconGenerator("expo", parameters.options)

  if (!isValid) {
    messages.forEach((message) => warning(message))
    return
  }

  const isSuccessful = await generateAppIcons("expo")

  if (isSuccessful) {
    heading(`App icons generated!`)
    p(
      "Uninstall the application from your simulator/emulator and re-build your app to see the changes!",
    )
  }
}
