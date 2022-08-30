import { GluegunToolbox } from "gluegun"
import * as pathlib from "path"
import type { CommentType } from "../tools/demo"
import { demo } from "../tools/demo"
import { p, warning } from "../tools/pretty"

const MATCHING_GLOBS = [
  "!**/.DS_Store",
  "!**/.expo{,/**}",
  "!**/.git{,/**}",
  "!**/node_modules{,/**}",
  "!**/ios/build{,/**}",
  "!**/ios/Pods{,/**}",
  "!**/android/build{,/**}",
  "!**/android/app/build{,/**}",
]

module.exports = {
  alias: ["rd", "remove-demos"],
  description: "Remove demo code from generated boilerplate",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, patching, filesystem } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    p()
    p(`Removing demo code from '${TARGET_DIR}'`)

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

        const comments: CommentType[] = []

        if (await exists(path, demo.CommentType.REMOVE_FILE)) {
          filesystem.remove(path)
          comments.push(demo.CommentType.REMOVE_FILE)
          return { path, comments }
        }

        if (await exists(path, demo.CommentType.REMOVE_CURRENT_LINE)) {
          await update(path, demo.removeCurrentLine)
          comments.push(demo.CommentType.REMOVE_CURRENT_LINE)
        }

        if (await exists(path, demo.CommentType.REMOVE_NEXT_LINE)) {
          await update(path, demo.removeNextLine)
          comments.push(demo.CommentType.REMOVE_NEXT_LINE)
        }

        if (
          (await exists(path, demo.CommentType.REMOVE_BLOCK_START)) &&
          (await exists(path, demo.CommentType.REMOVE_BLOCK_END))
        ) {
          await update(path, demo.removeBlock)
          comments.push(demo.CommentType.REMOVE_BLOCK_START, demo.CommentType.REMOVE_BLOCK_END)
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
      filesystem.remove(path)
      p(`Removed empty directory '${path}'`)
    })

    p(`Done removing demo code from '${TARGET_DIR}'`)
  },
}
