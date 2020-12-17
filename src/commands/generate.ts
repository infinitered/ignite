import { GluegunToolbox } from "gluegun"
import { p, command, heading, warning, direction } from "../tools/pretty"
import {
  showGeneratorHelp,
  updateGenerators,
  installedGenerators,
  availableGenerators,
  generateFromTemplate,
} from "../tools/generators"

module.exports = {
  alias: ["g", "generator", "generators"],
  description: "Generates components and other features from templates",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox

    p()
    if (parameters.options.help || parameters.options.list) {
      // show help or list generators
      showGeneratorHelp(toolbox)
    } else if (parameters.options.update) {
      // update with fresh generators
      updateGenerators(toolbox)
    } else if (parameters.first) {
      // actually generate something
      generate(toolbox)
    } else {
      // catch-all, just show help
      showGeneratorHelp(toolbox)
    }
  },
}

function generate(toolbox: GluegunToolbox) {
  const { parameters, strings } = toolbox

  const generators = installedGenerators()

  // what generator are we running?
  const generator = parameters.first.toLowerCase()
  if (!generators.includes(generator)) {
    warning(`⚠️  Generator "${generator}" isn't installed.`)
    p()

    if (availableGenerators().includes(generator)) {
      direction("Install the generator with:")
      p()
      command(`ignite generate ${generator} --update`)
      p()
      direction("... and then try again!")
    } else {
      direction("Check your spelling and try again")
    }

    return
  }

  // we need a name for this component
  const name = parameters.second
  if (!name) {
    return warning(`⚠️  Please specify a name for your ${generator}: ignite g ${generator} MyName`)
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
  const updatedFiles = generateFromTemplate(generator, { name: pascalName })
  heading(`Generated new files:`)
  updatedFiles.forEach((f) => p(f))
}
