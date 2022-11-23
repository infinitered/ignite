import { GluegunToolbox } from "gluegun"
import { generateFromTemplate, runGenerator } from "../tools/generators"
import { command, heading, p, warning } from "../tools/pretty"

module.exports = {
  alias: ["g", "generator", "generators"],
  description: "Generates components and other features from templates",
  run: async (toolbox: GluegunToolbox) => {
    const generator = toolbox.parameters.first?.toLowerCase()
    runGenerator(toolbox, generate, generator)
  },
}

async function generate(toolbox: GluegunToolbox) {
  const { parameters, strings } = toolbox

  // what generator are we running?
  const generator = parameters.first.toLowerCase()

  // we need a name for this component
  const name = parameters.second
  if (!name) {
    warning(`⚠️  Please specify a name for your ${generator}:`)
    p()
    command(`ignite g ${generator} MyName`)
    return
  }

  // avoid the my-component-component phenomenon
  const pascalGenerator = strings.pascalCase(generator)
  let pascalName = strings.pascalCase(name)
  if (pascalName.endsWith(pascalGenerator)) {
    p(`Stripping ${pascalGenerator} from end of name`)
    p(
      `Note that you don't need to add ${pascalGenerator} to the end of the name -- we'll do it for you!`,
    )
    pascalName = pascalName.slice(0, -1 * pascalGenerator.length)
    command(`ignite generate ${generator} ${pascalName}`)
  }

  // okay, let's do it!
  p()
  const updatedFiles = await Promise.all(
    generateFromTemplate(generator, {
      name: pascalName,
      skipIndexFile: parameters.options.skipIndexFile,
    }),
  )
  heading(`Generated new files:`)
  updatedFiles.forEach((f) => p(f))
}
