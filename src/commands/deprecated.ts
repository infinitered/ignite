import { GluegunToolbox } from "../types"
import { p, heading, command, direction } from "../tools/pretty"

export default {
  alias: ["add", "remove", "spork"],
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox

    const [, , ...fullCommand] = parameters.raw
    const commandArgs = fullCommand.join(" ")

    p()
    switch (fullCommand[0]) {
      case "add":
      case "remove":
      case "plugin":
        heading("Ignite CLI version 4+ no longer supports plugins.")
        p("You can read more about it here:")
        p("https://shift.infinite.red/some-url-here-716aa5f9310e")
        p()
        direction("To use the old plugins, run the old CLI:")
        p()
        command(`npx ignite-cli@3 ${commandArgs}`)
        break
      case "spork":
        heading("Ignite CLI version 4+ no longer supports the spork command.")
        p(`All generators are now "sporked" by default.`)
        p()
        p("You can read more about it here:")
        p("https://shift.infinite.red/some-url-here-716aa5f9310e")
        p()
        direction(`To learn more, run`)
        command("npx ignite-cli generate")
        break
      default:
        heading("That command is deprecated in Ignite CLI version 4+")
        p()
        direction("To run the old CLI:")
        p()
        command(`npx ignite-cli@3 ${commandArgs}`)
    }
  },
}
