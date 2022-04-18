import * as ejs from "ejs"
import { filesystem, GluegunToolbox, strings } from "gluegun"
import * as sharp from "sharp"
import { command, direction, heading, igniteHeading, p, warning } from "./pretty"

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
  // where are we copying to?
  const generatorDir = path(appDir(), pluralize(generator))
  const destinationDir = path(generatorDir, kebabCaseName)

  // find index file if it exists
  let indexFile: string
  let hasIndex: boolean
  try {
    indexFile = find(generatorDir, { matching: "index.@(ts|tsx|js|jsx)", recursive: false })[0]
    hasIndex = !!indexFile
  } catch (e) {
    // just ignore if index doesn't exist
  }

  // find the files
  const files = find(templateDir, { matching: "*" })

  // create destination folder
  dir(destinationDir)

  // loop through the files
  const newFiles = files.map((templateFilename: string) => {
    // get the filename and replace `NAME` with the actual name
    let filename = templateFilename.split(separator).slice(-1)[0].replace("NAME", kebabCaseName)

    // strip the .ejs
    if (filename.endsWith(".ejs")) filename = filename.slice(0, -4)

    let destinationFile: string

    // if .ejs, run through the ejs template system
    if (templateFilename.endsWith(".ejs")) {
      // where we're going
      destinationFile = path(destinationDir, filename)

      // file-specific props
      const data = { props: { ...props, filename } }

      // read the template
      const templateContent = filesystem.read(templateFilename)

      // render the template
      const content = ejs.render(templateContent, data)

      // write to the destination file
      filesystem.write(destinationFile, content)
    } else {
      // no .ejs, so just direct copy
      destinationFile = path(destinationDir, filename)
      copy(templateFilename, destinationFile)
    }

    // append to barrel export if applicable
    if (
      !options.skipIndexFile &&
      hasIndex &&
      !filename.includes(".test") &&
      !filename.includes(".story") &&
      !filename.includes(".styles")
    ) {
      const basename = filename.split(".")[0]
      const exportLine = `export * from "./${kebabCaseName}/${basename}"\n`
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

/**
 * Validates that all necessary app-icon input files exist in the template dir.
 * Additionally validates that they are of the correct size.
 */
export async function validateAppIconGenerator() {
  const { path, exists } = filesystem
  const appIcons = ["ios-universal.png"]

  const missingAppIconInputFiles = appIcons
    .map((icon) => (exists(path(templatesDir(), "app-icon", icon)) ? null : icon))
    .filter(Boolean)

  if (!!missingAppIconInputFiles.length) {
    return {
      isValid: false,
      message: `Missing app-icon input files: "${missingAppIconInputFiles.join(", ")}"`,
    }
  }

  const incorrectlySizedAppIconInputFiles = (
    await Promise.all(
      appIcons.map(async (icon) => {
        const metadata = await sharp(path(templatesDir(), "app-icon", icon)).metadata()
        return metadata.width !== 1024 || metadata.height !== 1024 ? icon : null
      }),
    )
  ).filter(Boolean)

  if (!!incorrectlySizedAppIconInputFiles.length) {
    return {
      isValid: false,
      // prettier-ignore
      message: `Incorrectly sized app-icon input files: "${incorrectlySizedAppIconInputFiles.join(", ")}". Expected 1024x1024.`,
    }
  }

  return { isValid: true }
}

/**
 * Generates app-icons for iOS. Skips if ios directory does not exist in project (most likely expo).
 */
export async function generateIosAppIcons() {
  const { path, exists, find } = filesystem
  const cwd = process.cwd()
  const iosPath = path(cwd, "ios")

  if (exists(iosPath) !== "dir") {
    warning(`⚠️  No iOS project found at "${iosPath}". Skipping...`)
    return
  }

  const appIconSetPathMatches = find(iosPath, {
    directories: true,
    files: false,
    matching: "AppIcon.appiconset",
  })

  if (!appIconSetPathMatches.length) {
    warning(
      `⚠️  The directory "AppIcon.appiconset" was not found anywhere in "${iosPath}". Skipping...`,
    )
    return
  }

  heading("Generating iOS app icons...")

  const iconGenerationPromises = [
    { idiom: "ios-marketing", size: 1024, scale: 1 },
    { idiom: "iphone", size: 20, scale: 2 },
    { idiom: "iphone", size: 20, scale: 3 },
    { idiom: "iphone", size: 29, scale: 2 },
    { idiom: "iphone", size: 29, scale: 3 },
    { idiom: "iphone", size: 40, scale: 2 },
    { idiom: "iphone", size: 40, scale: 3 },
    { idiom: "iphone", size: 60, scale: 2 },
    { idiom: "iphone", size: 60, scale: 3 },
    { idiom: "ipad", size: 20, scale: 1 },
    { idiom: "ipad", size: 20, scale: 2 },
    { idiom: "ipad", size: 29, scale: 1 },
    { idiom: "ipad", size: 29, scale: 2 },
    { idiom: "ipad", size: 40, scale: 1 },
    { idiom: "ipad", size: 40, scale: 2 },
    { idiom: "ipad", size: 76, scale: 1 },
    { idiom: "ipad", size: 76, scale: 2 },
    { idiom: "ipad", size: 83.5, scale: 2 },
  ].map(async (icon) => {
    const fileName = `${icon.idiom}-${icon.size}x${icon.size}@${icon.scale}x.png`
    const filePath = path(cwd, appIconSetPathMatches[0], fileName)
    const iconSize = icon.size * icon.scale

    try {
      await sharp(path(templatesDir(), "app-icon", "ios-universal.png"))
        .resize(iconSize, iconSize, { fit: "fill" })
        .toFile(filePath)

      direction(`✅  ${fileName}`)
    } catch (error) {
      warning(`⚠️  ${fileName}`)
    }
  })

  await Promise.all(iconGenerationPromises)
}
