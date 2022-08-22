import { GluegunToolbox } from "gluegun"
import { createGetAllFilePaths } from "../tools/path"
import { p } from "../tools/pretty"

module.exports = {
  alias: ["rd", "remove-demos"],
  description: "Remove demo code from generated boilerplate",
  run: async (toolbox: GluegunToolbox) => {
    enum DemoComment {
      REMOVE_FILE = `// @demo remove-file`,
    }

    p()

    const { parameters, filesystem } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD

    p(`Removing demo code from ${TARGET_DIR}`)

    const getAllFilePaths = createGetAllFilePaths(filesystem)

    const paths = getAllFilePaths(TARGET_DIR)

    p(`Found ${paths.length} files`)

    for (const path of paths) {
      const contents = filesystem.read(path)

      if (contents.includes(DemoComment.REMOVE_FILE)) {
        filesystem.remove(path)
        p(`Removed ${path}`)
      }
    }
  },
}
