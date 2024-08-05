import { GluegunToolbox, system } from "gluegun"
import * as pathlib from "path"
import { boolFlag } from "../tools/flag"
import { p, warning } from "../tools/pretty"
import { MST_MARKUP_PREFIX, mstDependenciesToRemove } from "../tools/mst"
import { findFiles, removeEmptyDirs, updateFiles } from "../tools/markup"
import { removePackageJSONDependencies } from "../tools/dependencies"

module.exports = {
  alias: ["rm-mst", "remove-mst"],
  description:
    "Remove MobX-State-Tree code from generated boilerplate. Add --dry-run to see what would be removed.",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    const dryRun = boolFlag(parameters.options.dryRun) ?? false

    p()
    p(`Removing MobX-State-Tree code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)

    const filePaths = findFiles(TARGET_DIR)

    p(
      `Removing dependencies from package.json: ${mstDependenciesToRemove.join(", ")} ${
        dryRun ? "(dry run)" : ""
      }`,
    )
    if (!dryRun) {
      const packageJSONPath = pathlib.join(TARGET_DIR, "package.json")
      removePackageJSONDependencies(packageJSONPath, mstDependenciesToRemove)
    }

    const mstCommentResults = await updateFiles({
      filePaths,
      markupPrefix: MST_MARKUP_PREFIX,
      removeMarkupOnly: false,
      dryRun: dryRun,
    })

    // Handle the results of the mst comment operations
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

    // first pass
    const emptyDirsRemoved = removeEmptyDirs({ targetDir: TARGET_DIR, dryRun })
    emptyDirsRemoved.forEach((path) => {
      p(`Removed empty directory '${path}'`)
    })

    // Run prettier at the end to clean up any spacing issues
    if (!dryRun) {
      p(`Running prettier to clean up code formatting`)
      await system.run(`npx prettier@2.8.8 --write "./app/**/*.{js,jsx,json,md,ts,tsx}"`, {
        trim: true,
        cwd: TARGET_DIR,
      })
    }

    p(`Done removing MobX-State-Tree code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
