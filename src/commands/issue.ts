/**
 * This command runs ignite doctor and launches the user's browser
 * to a new GitHub issue populated with the provided title and doctor command  output
 */
import { GluegunToolbox } from "gluegun"
import {
  command,
  p,
  warning,
  startSpinner,
  stopSpinner,
  prettyPrompt,
  prefix,
} from "../tools/pretty"

const isMac = process.platform === "darwin"

const START_CMD = isMac ? "open" : "start"

module.exports = {
  alias: ["i"],
  description: "Opens a new GitHub issue for Ignite.",
  run: async function (toolbox: GluegunToolbox) {
    const {
      filesystem,
      system,
      print: { colors },
      parameters,
      prompt,
    } = toolbox

    const { yellow, cyan, white } = colors

    // title for issue
    let title = parameters.first

    if (!title) {
      warning(`⚠️  Please specify a title for your issue:`)
      p()
      command(`ignite i "The issue title here"`)
      return
    }

    // do title quote check
    if (parameters.array.length > 1 && !parameters.first.startsWith('"')) {
      const suggestedTitle = parameters.array.join(" ")

      const titleResponse = await prompt.ask<{ title: boolean }>(() => ({
        type: "confirm",
        name: "title",
        message: `Received title "${title}" but without quotes, did you mean "${suggestedTitle}"?`,
        initial: true,
        format: prettyPrompt.format.boolean,
        prefix,
      }))

      if (titleResponse.title) {
        title = suggestedTitle
      }
    }

    // get the `ignite doctor` output
    let doctorInfo = ""
    startSpinner(" Gathering system and project details")
    try {
      const IGNITE = "node " + filesystem.path(__dirname, "..", "..", "bin", "ignite")

      doctorInfo = await system.run(`${IGNITE} doctor`)
    } catch (e) {
      p(yellow("Unable to gather system and project details."))
    }
    stopSpinner(" Gathering system and project details", "🛠️")

    // open up GitHub issue form
    const header = `\n### Describe the bug\n\n[Fill out bug description here]\n\n### Additional info\nnpx ignite-cli doctor`
    const body = `${header}\n\n\`\`\`\n${doctorInfo}\`\`\``

    const url = new URL("https://github.com/infinitered/ignite/issues/new")
    const params = new URLSearchParams(url.search)
    params.append("title", title)
    params.append("body", body)

    try {
      p(cyan("Starting GitHub issue, thanks for alerting us!"))
      await system.run(`${START_CMD} \"${url}?${params.toString()}\"`)
    } catch (e) {
      p(yellow("Unable to start GitHub issue."))
    }

    process.exit(0)
  },
}
