import { GluegunToolbox } from "gluegun"

import { Options } from "./new"
import { boolFlag } from "../tools/flag"
import { frontMatterDirectoryDir, generateFromTemplate, runGenerator } from "../tools/generators"
import { command, heading, p, prettyPrompt, warning } from "../tools/pretty"

const SUB_DIR_DELIMITER = "/"

module.exports = {
  alias: ["g", "generator", "generators"],
  description: "Generates components and other features from templates",
  run: async (toolbox: GluegunToolbox) => {
    const generator = toolbox.parameters.first?.toLowerCase()
    runGenerator(toolbox, generate, generator)
  },
}

async function generate(toolbox: GluegunToolbox) {
  const { parameters, strings, filesystem, prompt } = toolbox

  // what generator are we running?
  const generator = parameters.first.toLowerCase()

  // check if we should override front matter dir or default dir
  let dir = parameters.options.dir ?? parameters.third

  // we need a name for this component
  let name = parameters.second
  if (!name) {
    warning(`⚠️  Please specify a name for your ${generator}:`)
    p()
    command(`npx ignite-cli g ${generator} MyName`)
    return
  }

  // parse any subdirectories from the specified name
  let subdirectory = ""
  if (name.indexOf(SUB_DIR_DELIMITER) > -1) {
    const lastSlashIndex = name.lastIndexOf(SUB_DIR_DELIMITER)
    subdirectory = name.substring(0, lastSlashIndex + 1)
    name = name.substring(lastSlashIndex + 1)
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
    command(`npx ignite-cli generate ${generator} ${pascalName}`)
  }
  /**
   * Check if the project uses Expo Router as a dependency in package.json,
   * denoting an Expo Router app.
   */
  if (generator === "route") {
    const packageJson = filesystem.read("package.json", "json")
    const isExpoRouterApp = !!packageJson?.dependencies?.["expo-router"]

    const isSrcAppStructure = filesystem.exists("src/app") === "dir"
    const isAppStructure = filesystem.exists("app") === "dir"
    const defaultRouterDir = isSrcAppStructure ? "src/app" : isAppStructure ? "app" : null

    if (isExpoRouterApp) {
      const directoryDirSetInFrontMatter = frontMatterDirectoryDir("route")
      p(directoryDirSetInFrontMatter)

      if (directoryDirSetInFrontMatter || dir) {
        heading(
          `It looks like you're working in a project using Expo Router, determined directory for route from ${dir ? "override" : "template front matter"}`,
        )
        dir = dir || directoryDirSetInFrontMatter
      } else {
        const result = await prompt.ask({
          type: "input",
          name: "dir",
          message: `It looks like you're working in a project using Expo Router, please enter the desired directory${defaultRouterDir ? ` (e.g., ${defaultRouterDir})` : ""}:`,
          initial: defaultRouterDir,
        })

        if (result.dir) {
          // Validate the directory
          const isValidDir = filesystem.exists(result.dir) === "dir"
          if (isValidDir) {
            dir = result.dir
          } else {
            const createDirResult = await prompt.ask({
              type: "confirm",
              name: "createDir",
              message: `⚠️  Directory ${result.dir} does not exist. Would you like to create it?`,
              initial: true,
              format: prettyPrompt.format.boolean,
            })

            if (createDirResult.createDir) {
              filesystem.dir(result.dir)
              dir = result.dir
            } else {
              warning(`⚠️ Placing screen in ${result.dir} root.`)
              p()
              dir = result.dir
            }
          }
        }
      }
    }
  }

  // okay, let's do it!
  p()
  const options: Options = parameters.options
  const defaultOverwrite = false
  const overwrite = !options.overwrite ? defaultOverwrite : boolFlag(options.overwrite)
  const { written, overwritten, exists } = await generateFromTemplate(generator, {
    name: pascalName,
    originalName: name,
    overwrite,
    subdirectory,
    dir,
    case: parameters.options.case,
  })

  heading(`Generated new files:`)

  if (exists.length > 0) {
    if (written.length > 0) {
      written.forEach((f) => p(f))
    } else p(`<none>`)
    p()
    heading(`Skipped these files because they already exist:`)
    exists.forEach((f) => p(f))
    p()
    heading("To overwrite these files, run the command again with the `--overwrite` flag")
  } else if (overwritten.length > 0) {
    overwritten.forEach((f) => p(f))
  } else {
    written.forEach((f) => p(f))
  }
}
