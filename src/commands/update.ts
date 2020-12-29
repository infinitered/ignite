import { GluegunToolbox } from "gluegun"
import { showGeneratorHelp, updateGenerators } from "../tools/generators"
import { p, warning } from "../tools/pretty"

module.exports = {
  description: "Update generator templates",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox
    p()
    if (parameters.options.all || parameters.first) {
      updateGenerators(toolbox)
    } else {
      warning(`⚠️  Update what?`)
      p()
      showGeneratorHelp(toolbox)
    }
  },
}
