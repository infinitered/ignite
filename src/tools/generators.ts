import { filesystem, GluegunToolbox, strings } from "gluegun"
import * as matter from 'gray-matter'
import * as ejs from "ejs"
import { command, heading, igniteHeading, p, warning } from "./pretty"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function showGeneratorHelp(toolbox: GluegunToolbox) {
  const inIgnite = isIgniteProject()
  const generators = inIgnite ? installedGenerators() : []

  igniteHeading()
  heading("Ignite Generators")
  p()
  p("When you create a new app with Ignite CLI, it will install several generator")
  p("templates in the project folder under the `ignite/templates` folder.")
  p()
  heading("Commands")
  p()
  command("--list  ", "List installed generators", ["ignite g --list"])
  command(
    "--update",
    "Update installed generators. You can also use the 'ignite update X' format",
    ["ignite g --update", `ignite g model --update`, `ignite update model`, `ignite update --all`],
  )
  warning("          ⚠️  this erases any customizations you've made!")
  p()
  heading("Installed generators")
  p()
  if (inIgnite) {
    const longestGen = generators.reduce((c, g) => Math.max(c, g.length), 0)
    generators.forEach((g) => {
      command(g.padEnd(longestGen), `generates a ${g}`, [`ignite g ${g} Demo`])
    })
  } else {
    warning("⚠️  Not in an Ignite project root. Go to your Ignite project root to see generators.")
  }
}

export function updateGenerators(toolbox: GluegunToolbox) {
  const { parameters } = toolbox

  let generatorsToUpdate
  if (parameters.first) {
    // only update the specified one
    generatorsToUpdate = [parameters.first]
  } else {
    // update any available generators
    generatorsToUpdate = availableGenerators()
  }

  const changes = installGenerators(generatorsToUpdate)
  const distinct = (val, index, self) => self.indexOf(val) === index
  const allGenerators = changes.concat(generatorsToUpdate).filter(distinct).sort()

  heading(`Updated ${changes.length} generator${changes.length === 1 ? "" : "s"}`)
  allGenerators.forEach((g) => {
    if (changes.includes(g)) {
      heading(`  ${g} - updated`)
    } else {
      p(`  ${g} - no changes`)
    }
  })
}

export function isIgniteProject(): boolean {
  return filesystem.exists("./ignite") === "dir"
}

function igniteDir() {
  const cwd = process.cwd()
  return filesystem.path(cwd, "ignite")
}

function appDir() {
  const cwd = process.cwd()
  return filesystem.path(cwd, "app")
}

function templatesDir() {
  return filesystem.path(igniteDir(), "templates")
}

/**
 * Finds generator templates installed in the current project
 */
export function installedGenerators(): string[] {
  const { subdirectories, separator } = filesystem

  const generators = subdirectories(templatesDir()).map((g) => g.split(separator).slice(-1)[0])

  return generators
}

type GeneratorOptions = {
  name: string
  skipIndexFile?: boolean
}

/**
 * Generates something using a template
 */
export function generateFromTemplate(generator: string, options: GeneratorOptions): string[] {
  const { find, path, dir, copy, separator } = filesystem
  const { pascalCase, kebabCase, pluralize, camelCase } = strings

  // permutations of the name
  const pascalCaseName = pascalCase(options.name)
  const kebabCaseName = kebabCase(options.name)
  const camelCaseName = camelCase(options.name)

  // passed into the template generator
  const props = { camelCaseName, kebabCaseName, pascalCaseName }

  // where are we copying from?
  const templateDir = path(templatesDir(), generator)

  // find the files
  const files = find(templateDir, { matching: "*" })

  // loop through the files
  const newFiles = files.map((templateFilename: string) => {
    // read file and parse with gray matter console log result
    const templateContents = filesystem.read(templateFilename)
    const parsedTempContents = matter(templateContents)

    console.log(parsedTempContents)

    // where are we copying to?
    const destAppDir = parsedTempContents.data.destinationDir
    const generatorDir = path(appDir(), pluralize(generator))
    const defaultDestinationDir = path(generatorDir, kebabCaseName)
    const tempDestDir = destAppDir ? path(appDir(), destAppDir) : defaultDestinationDir

    // find index file if it exists
    let indexFile: string
    let hasIndex: boolean
    try {
      indexFile = find(tempDestDir, { matching: "index.@(ts|tsx|js|jsx)", recursive: false })[0]
      hasIndex = !!indexFile
    } catch (e) {
      // just ignore if index doesn't exist
    }

    // create destination folder
    dir(tempDestDir)

    // get the filename and replace `NAME` with the actual name
    let filename = templateFilename.split(separator).slice(-1)[0].replace("NAME", kebabCaseName)

    // strip the .ejs
    if (filename.endsWith(".ejs")) filename = filename.slice(0, -4)

    const destinationFile = path(tempDestDir, filename)


    // if .ejs, run through the ejs template system
    if (templateFilename.endsWith(".ejs")) {
      // file-specific props
      const data = { props: { ...props, filename } }

      // read the template
      // const templateContent = filesystem.read(templateFilename)

      // render the template
      const content = ejs.render(parsedTempContents.content, data)

      // write to the destination file
      filesystem.write(destinationFile, content)
    } else {
      copy(templateFilename, destinationFile)
    }

    // append to barrel export if applicable
    if (
      !options.skipIndexFile &&
      hasIndex &&
      !filename.includes(".test") &&
      !filename.includes(".story")
    ) {
      const basename = filename.split(".")[0]
      const exportPath = destAppDir ? `./${basename}` : `./${kebabCaseName}/${basename}`
      const exportLine = `export * from "${exportPath}"\n`
      const indexContents = filesystem.read(indexFile)
      const exportExists = indexContents.includes(exportLine)

      if (!exportExists) {
        filesystem.append(indexFile, exportLine)
      }
    }

    return destinationFile
  })

  return newFiles
}

/**
 * Directory where we can find Ignite CLI generator templates
 */
function sourceDirectory(): string {
  return filesystem.path(__filename, "..", "..", "..", "boilerplate", "ignite", "templates")
}

/**
 * Finds generator templates in Ignite CLI
 */
export function availableGenerators(): string[] {
  const { subdirectories, separator } = filesystem
  return subdirectories(sourceDirectory()).map((g) => g.split(separator).slice(-1)[0])
}

/**
 * Copies over generators (specific generators, or all) from Ignite CLI to the project
 * ignite/templates folder.
 */
export function installGenerators(generators: string[]): string[] {
  const { path, find, copy, dir, cwd, separator, exists, read } = filesystem
  const sourceDir = sourceDirectory()
  const targetDir = path(cwd(), "ignite", "templates")

  if (!isIgniteProject()) {
    throw new Error("Not in an Ignite root directory (can't find ./ignite folder)")
  }

  // for each generator type, copy it over to the ignite/templates folder
  const changedGenerators = generators.filter((gen) => {
    const sourceGenDir = path(sourceDir, gen)
    const targetGenDir = path(targetDir, gen)

    // ensure the directory exists
    dir(targetDir)

    // find all source files
    const files = find(sourceGenDir, { matching: "*" })

    // copy them over
    const changedFiles = files.filter((file) => {
      const filename = file.split(separator).slice(-1)[0]
      const targetFile = path(targetGenDir, filename)

      if (!exists(targetFile) || read(targetFile) !== read(file)) {
        copy(file, targetFile, { overwrite: true })
        return true
      } else {
        return false
      }
    })

    return changedFiles.length > 0
  })

  return changedGenerators
}
