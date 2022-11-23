import { GluegunToolbox } from "gluegun"
import { demo } from "../tools/demo"
import { boolFlag } from "../tools/flag"
import { p, warning } from "../tools/pretty"

module.exports = {
  alias: ["rdm"],
  description:
    "Remove all demo markup from generated boilerplate. Add --dry-run to see what would be removed.",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, system } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    const dryRun = boolFlag(parameters.options.dryRun) ?? false

    p()
    p(`Removing demo markup from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)

    const filePaths = demo.find(TARGET_DIR)

    // Go through every file path and handle the operation for each demo comment
    const demoCommentResults = await demo.update({ filePaths, dryRun, onlyMarkup: true })

    // Handle the results of the demo comment operations
    demoCommentResults
      // Sort the results by the path in alphabetical order
      .sort((a, b) => {
        if (a.status === "fulfilled" && b.status === "fulfilled") {
          return a.value.path.localeCompare(b.value.path)
        }
        return 0
      })
      .forEach((result) => {
        // Log any rejected results as warnings
        if (result.status === "rejected") {
          warning(result.reason)
          return
        }

        // Log any fulfilled results that have comments
        const { path, comments } = result.value
        if (comments.length > 0) {
          p(`Found ${comments.map((c) => `'${c}'`).join(", ")} in ${path}`)
        }
      })

    // Run prettier at the end to clean up any spacing issues
    if (!dryRun) {
      await system.run(`npx prettier@2.6.2 --write "./app/**/*.{js,jsx,json,md,ts,tsx}"`, {
        trim: true,
      })
    }

    p(`Done removing demo markup from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
