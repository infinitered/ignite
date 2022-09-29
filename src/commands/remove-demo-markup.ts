import { GluegunToolbox } from "gluegun"
import * as pathlib from "path"
import type { CommentType } from "../tools/demo"
import { demo, demoMarkupRegex } from "../tools/demo"
import { boolFlag } from "../tools/flag"
import { packager } from "../tools/packager"
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
  alias: ["rdm"],
  description:
    "Remove all demo markup from generated boilerplate. Add --dry-run to see what would be removed.",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, patching, filesystem } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    const dryRun = boolFlag(parameters.options.dryRun) ?? false

    p()
    p(`Removing demo markup from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)

    const filePaths = filesystem
      .cwd(TARGET_DIR)
      .find({
        matching: MATCHING_GLOBS,
        recursive: true,
        files: true,
        directories: false,
      })
      .map((path) => pathlib.join(TARGET_DIR, path))

    // Go through every file path and handle the operation for each demo comment
    const demoCommentResults = await Promise.allSettled(
      filePaths.map(async (path) => {
        const { exists, update } = patching
        const { read } = filesystem
        const {
          REMOVE_CURRENT_LINE,
          REMOVE_NEXT_LINE,
          REMOVE_BLOCK_START,
          REMOVE_BLOCK_END,
          REMOVE_FILE,
        } = demo.CommentType

        const comments: CommentType[] = []

        if (await exists(path, REMOVE_FILE)) {
          comments.push(REMOVE_FILE)
        }

        const operations = [
          REMOVE_CURRENT_LINE,
          REMOVE_NEXT_LINE,
          REMOVE_BLOCK_START,
          REMOVE_BLOCK_END,
        ]
        const shouldUpdate = RegExp(demoMarkupRegex, "gm")

        if (await exists(path, shouldUpdate)) {
          const before = read(path)

          operations.forEach((operation) => {
            if (before.includes(operation)) {
              comments.push(operation)
            }
          })

          if (!dryRun) await update(path, demo.sanitize)
        }

        return { path, comments }
      }),
    )

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
    await packager.run("format")

    p(`Done removing demo markup from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
