import { GluegunToolbox } from "gluegun"
import * as pathlib from "path"
import { demo } from "../tools/demo"
import { boolFlag } from "../tools/flag"
import { p, warning } from "../tools/pretty"

const MATCHING_GLOBS = [
  "!**/.DS_Store",
  "!**/.expo{,/**}",
  "!**/.git{,/**}",
  "!**/.vscode{,/**}",
  "!**/node_modules{,/**}",
  "!**/ios/build{,/**}",
  "!**/ios/Pods{,/**}",
  "!**/ios/*.xcworkspace{,/**}",
  "!**/android/build{,/**}",
  "!**/android/app/build{,/**}",
]

module.exports = {
  alias: ["rd", "remove-demos"],
  description:
    "Remove demo code from generated boilerplate. Add --dry-run to see what would be removed.",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, filesystem } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    const dryRun = boolFlag(parameters.options.dryRun) ?? false

    p()
    p(`Removing demo code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)

    const filePaths = demo.find(TARGET_DIR)

    // Go through every file path and handle the operation for each demo comment
    const demoCommentResults = await demo.update({ filePaths, dryRun })

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

    const emptyDirPaths = filesystem
      .cwd(TARGET_DIR)
      .find({
        matching: MATCHING_GLOBS,
        recursive: true,
        files: false,
        directories: true,
      })
      .map((path) => pathlib.join(TARGET_DIR, path))
      .filter((path) => !filesystem.list(path)?.length)

    emptyDirPaths.forEach((path) => {
      if (!dryRun) filesystem.remove(path)
      p(`Removed empty directory '${path}'`)
    })

    p(`Done removing demo code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
