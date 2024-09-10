import { GluegunToolbox } from "gluegun"
import { boolFlag } from "../tools/flag"
import { p, warning } from "../tools/pretty"
import { findFiles, updateFiles } from "../tools/markup"
import { DEMO_MARKUP_PREFIX } from "../tools/demo"

module.exports = {
  alias: ["rdm"],
  description:
    "Remove all demo markup from generated boilerplate. Add --dry-run to see what would be removed.",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    const dryRun = boolFlag(parameters.options.dryRun) ?? false

    p()
    p(`Removing demo markup from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)

    const filePaths = findFiles(TARGET_DIR)

    // Go through every file path and handle the operation for each demo comment
    const demoCommentResults = await updateFiles({
      filePaths,
      markupPrefix: DEMO_MARKUP_PREFIX,
      dryRun,
      removeMarkupOnly: true,
    })

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

    p(`Done removing demo markup from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
