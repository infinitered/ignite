import { GluegunToolbox } from "gluegun"
import { demo } from "../tools/demo"
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
    p(`Removing demo code from ${TARGET_DIR}`)

    const getAllFilePaths = createGetAllFilePaths(filesystem)
    const paths = getAllFilePaths(TARGET_DIR)
    p(`Found ${paths.length} files in "${TARGET_DIR}"`)

    // Go through every file path and handle the operation for each demo comment
    const demoCommentResults = await Promise.allSettled(
      paths.map(async (path) => {
        const { exists, update } = patching

        if (await exists(path, demo.CommentType.REMOVE_FILE)) {
          filesystem.remove(path)
          p(`Removed "${path}"`)
        }

        if (await exists(path, demo.CommentType.REMOVE_CURRENT_LINE)) {
          await update(path, demo.removeCurrentLine)
          p(`Found "${demo.CommentType.REMOVE_CURRENT_LINE}" in "${path}"`)
        }

        if (await exists(path, demo.CommentType.REMOVE_NEXT_LINE)) {
          await update(path, demo.removeNextLine)
          p(`Found "${demo.CommentType.REMOVE_NEXT_LINE}" in "${path}"`)
        }
      }),
    )

    // Report any errors
    demoCommentResults.forEach((result) => {
      if (result.status === "rejected") {
        warning(result.reason)
      }
    })
  },
}
