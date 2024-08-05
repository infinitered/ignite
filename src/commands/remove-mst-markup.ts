import { GluegunToolbox } from "gluegun"
import { boolFlag } from "../tools/flag"
import { p, warning } from "../tools/pretty"
import { findFiles, updateFiles } from "../tools/markup"
import { MST_MARKUP_PREFIX } from "../tools/mst"

module.exports = {
  alias: ["rmstm", "remove-mst-markup"],
  description:
    "Remove all MobX-State-Tree markup from boilerplate. Add --dry-run to see what would be removed.",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, system } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    const dryRun = boolFlag(parameters.options.dryRun) ?? false

    p()
    p(`Removing MobX-State-Tree markup from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)

    const filePaths = findFiles(TARGET_DIR)

    // Go through every file path and handle the operation for each demo comment
    const mstCommentResults = await updateFiles({
      filePaths,
      markupPrefix: MST_MARKUP_PREFIX,
      dryRun,
      removeMarkupOnly: true,
    })

    // Handle the results of the demo comment operations
    mstCommentResults
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
      p(`Running prettier to clean up code formatting`)
      await system.run(`npx prettier@2.8.8 --write "./app/**/*.{js,jsx,json,md,ts,tsx}"`, {
        trim: true,
        cwd: TARGET_DIR,
      })
    }

    p(`Done removing MobX-State-Tree markup from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
