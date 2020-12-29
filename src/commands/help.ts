import { GluegunToolbox } from "gluegun"
import { showGeneratorHelp } from "../tools/generators"
import { p, command, heading, igniteHeading, direction, link } from "../tools/pretty"

module.exports = {
  dashed: true,
  alias: ["h"],
  description: "Displays Ignite CLI help",
  run: async (toolbox: GluegunToolbox) => {
    const { meta, parameters } = toolbox

    p()

    // specific help -- generators
    if (
      parameters.second &&
      (parameters.second === "g" || parameters.second.startsWith("generat"))
    ) {
      return showGeneratorHelp(toolbox)
    }

    igniteHeading()
    heading(`Welcome to Ignite ${meta.version()}!`)
    p()
    p("Ignite is a CLI that helps you spin up a new React Native app using a")
    p("battle-tested tech stack.")
    p()
    heading("Commands")
    p()
    command("new         ", "Creates a new React Native app", [
      "ignite new MyApp",
      "ignite new MyApp --expo",
    ])
    p()
    command("generate (g)", "Generates components and other app features", [
      "ignite generate --hello",
      "ignite generate component Hello",
      "ignite generate model User",
      "ignite generate screen Login",
    ])
    p()
    command(
      "doctor      ",
      "Checks your environment & displays versions of installed dependencies",
      ["ignite doctor"],
    )
    p()
    direction(
      `See the documentation: ${link("https://github.com/infinitered/ignite/tree/master/docs")}`,
    )
    p()
    direction(
      `If you need additional help, join our Slack at ${link("http://community.infinite.red")}`,
    )
    p()
    igniteHeading()
  },
}
