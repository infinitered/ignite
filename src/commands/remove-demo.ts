import { GluegunToolbox } from "gluegun"
import { demo } from "../tools/demo"
import type { CommentType } from "../tools/demo"
import { createGetAllFilePaths } from "../tools/path"
import { p, warning } from "../tools/pretty"

module.exports = {
  alias: ["rd", "remove-demos"],
  description: "Remove demo code from generated boilerplate",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, patching, filesystem } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    p()
    p(`Removing demo code from '${TARGET_DIR}'`)

    const getAllFilePaths = createGetAllFilePaths(filesystem)
    const paths = getAllFilePaths(TARGET_DIR)
    p(`Found ${paths.length} files in '${TARGET_DIR}'`)

    // Go through every file path and handle the operation for each demo comment
    const demoCommentResults = await Promise.allSettled(
      paths.map(async (path) => {
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
  },
}
