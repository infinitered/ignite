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
    const paths = getAllFilePaths(TARGET_DIR).filter(
      (path) => path.includes("node_modules") === false,
    )

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

    // Recurisvely remove any empty directories in TARGET_DIR
    const removeEmptyDirs = (dir: string) => {
      const files = filesystem.list(dir).filter((file) => file.includes("node_modules") === false)
      if (files.length === 0) {
        filesystem.remove(dir)
        p(`Removed empty directory '${dir}'`)
        return
      }
      files.forEach((file) => {
        const filePath = `${dir}/${file}`
        if (filesystem.isDirectory(filePath)) {
          removeEmptyDirs(filePath)
        }
      })
    }
    removeEmptyDirs(TARGET_DIR)

    p(`Done removing demo code from '${TARGET_DIR}'`)
  },
}
