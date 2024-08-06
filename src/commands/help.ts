import { GluegunToolbox } from "gluegun"
import { showGeneratorHelp } from "../tools/generators"
import { p, command, heading, direction, link } from "../tools/pretty"

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

    heading(`Welcome to Ignite ${meta.version()}!`)
    p()
    p("Ignite is a CLI that helps you spin up a new React Native app using a")
    p("battle-tested tech stack.")
    p()
    heading("Commands")
    p()
    command("new             ", "Creates a new React Native app", [
      "npx ignite-cli new MyApp",
      "npx ignite-cli new MyApp --bundle com.mycompany.myapp",
    ])
    p()
    command("generate (g)    ", "Generates components and other app features", [
      "npx ignite-cli generate --hello",
      "npx ignite-cli generate component Hello",
      "npx ignite-cli generate model User",
      "npx ignite-cli generate screen Login",
      "npx ignite-cli generate component Hello --dir src/components",
    ])
    p()
    command(
      "doctor          ",
      "Checks your environment & displays versions of installed dependencies",
      ["npx ignite-cli doctor"],
    )
    p()
    command("rename          ", "Renames your React Native project (experimental)", [
      "npx ignite-cli rename NewName com.mycompany.newname",
    ])
    p()
    command(
      "remove-demo (rd)",
      "Removes demo code from the project (add --dry-run to list changes but not execute)",
      ["npx ignite-cli remove-demo", "npx ignite-cli remove-demo --dry-run"],
    )
    p()
    command(
      "remove-demo-markup (rdm)",
      "Removes @demo markup from the project (add --dry-run to list changes but not execute)",
      ["npx ignite-cli remove-demo-markup", "npx ignite-cli remove-demo-markup --dry-run"],
    )
    p()
    command("snackify        ", "Creates a new branch which can be imported as an Expo snack", [
      "npx ignite-cli snackify",
    ])
    p()
    direction(
      `See the documentation: ${link("https://github.com/infinitered/ignite/tree/master/docs")}`,
    )
    p()
    direction(
      `If you need additional help, join our Slack at ${link("http://community.infinite.red")}`,
    )
    p()
  },
}
