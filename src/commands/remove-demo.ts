import { GluegunToolbox } from "gluegun"
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
    p(`Found ${paths.length} files`)

    enum DemoComment {
      REMOVE_FILE = `// @demo remove-file`,
    }
    // Go through every file path and handle the operation for each demo comment
    const demoCommentResults = await Promise.allSettled(
      paths.map(async (path) => {
        if (await patching.exists(path, DemoComment.REMOVE_FILE)) {
          filesystem.remove(path)
          p(`Removed ${path}`)
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
