import * as ejs from "ejs"
import { filesystem, GluegunToolbox, strings } from "gluegun"
import { Options } from "gluegun/build/types/domain/options"
import * as sharp from "sharp"
import { command, direction, heading, igniteHeading, p, warning } from "./pretty"

export function runGenerator(
  toolbox: GluegunToolbox,
  generateFunc: (toolbox: GluegunToolbox) => Promise<void>,
  generator?: string,
) {
  const { parameters } = toolbox

  p()
  if (parameters.options.help || parameters.options.list) {
    // show help or list generators
    showGeneratorHelp(toolbox)
  } else if (parameters.options.update) {
    // update with fresh generators
    updateGenerators(toolbox)
  } else {
    if (generator) {
      const isValid = validateGenerator(generator)
      if (!isValid) return
    } else {
      // catch-all, just show help
      showGeneratorHelp(toolbox)
      return
    }

    generateFunc(toolbox)
  }
}

function validateGenerator(generator?: string) {
  const generators = installedGenerators()

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

    return false
  }

  return true
}

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
      const isAppIconGenerator = g === "app-icon"

      if (isAppIconGenerator) {
        command(g.padEnd(longestGen), `generates app-icons`, [`ignite g ${g} all|ios|android|expo`])
      } else {
        command(g.padEnd(longestGen), `generates a ${g}`, [`ignite g ${g} Demo`])
      }
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

function isIgniteProject(): boolean {
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
function installedGenerators(): string[] {
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
 * Ignite cli root directory
 */
function igniteCliRootDir(): string {
  return filesystem.path(__filename, "..", "..", "..")
}

/**
 * Directory where we can find Ignite CLI generator templates
 */
function sourceDirectory(): string {
  return filesystem.path(igniteCliRootDir(), "boilerplate", "ignite", "templates")
}

/**
 * Finds generator templates in Ignite CLI
 */
function availableGenerators(): string[] {
  const { subdirectories, separator } = filesystem
  return subdirectories(sourceDirectory()).map((g) => g.split(separator).slice(-1)[0])
}

/**
 * Copies over generators (specific generators, or all) from Ignite CLI to the project
 * ignite/templates folder.
 */
function installGenerators(generators: string[]): string[] {
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

enum Platforms {
  Ios = "ios",
  Android = "android",
  Expo = "expo",
}

// prettier-ignore
const APP_ICON_RULES = {
  icons: [
    { platform: Platforms.Ios, type: "universal", name: "Icon-{size}-{idiom}{scale}.png", inputFile: "ios-universal.png" },
    { platform: Platforms.Android, type: "adaptive", name: "mipmap-{dpi}/ic_launcher_background.png", inputFile: "android-adaptive-background.png" },
    { platform: Platforms.Android, type: "adaptive", name: "mipmap-{dpi}/ic_launcher_foreground.png", inputFile: "android-adaptive-foreground.png" },
    { platform: Platforms.Android, type: "legacy", name: "mipmap-{dpi}/ic_launcher.png", inputFile: "android-legacy.png", transform: { size: 812, radius: 64, padding: 106 } },
    { platform: Platforms.Android, type: "legacy", name: "mipmap-{dpi}/ic_launcher_round.png", inputFile: "android-legacy.png", transform: { size: 944, radius: 472, padding: 40 } },
    { platform: Platforms.Expo, type: "mobile", name: "app-icon-ios.png", inputFile: "ios-universal.png" },
    { platform: Platforms.Expo, type: "mobile", name: "app-icon-android-legacy.png", inputFile: "android-legacy.png" },
    { platform: Platforms.Expo, type: "mobile", name: "app-icon-android-adaptive-background.png", inputFile: "android-adaptive-background.png" },
    { platform: Platforms.Expo, type: "mobile", name: "app-icon-android-adaptive-foreground.png", inputFile: "android-adaptive-foreground.png" },
    { platform: Platforms.Expo, type: "mobile", name: "app-icon-all.png", inputFile: "ios-universal.png" },
    { platform: Platforms.Expo, type: "web", name: "app-icon-web-favicon.png", inputFile: "ios-universal.png" },
  ],
  rules: [
    { platform: Platforms.Ios, size: { universal: 1024 }, scale: 1, idiom: "ios-marketing" },
    { platform: Platforms.Ios, size: { universal: 83.5 }, scale: 2, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 20 }, scale: 1, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 20 }, scale: 2, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 29 }, scale: 1, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 29 }, scale: 2, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 40 }, scale: 1, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 40 }, scale: 2, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 76 }, scale: 1, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 76 }, scale: 2, idiom: "ipad" },
    { platform: Platforms.Ios, size: { universal: 20 }, scale: 2, idiom: "iphone" },
    { platform: Platforms.Ios, size: { universal: 20 }, scale: 3, idiom: "iphone" },
    { platform: Platforms.Ios, size: { universal: 29 }, scale: 2, idiom: "iphone" },
    { platform: Platforms.Ios, size: { universal: 29 }, scale: 3, idiom: "iphone" },
    { platform: Platforms.Ios, size: { universal: 40 }, scale: 2, idiom: "iphone" },
    { platform: Platforms.Ios, size: { universal: 40 }, scale: 3, idiom: "iphone" },
    { platform: Platforms.Ios, size: { universal: 60 }, scale: 2, idiom: "iphone" },
    { platform: Platforms.Ios, size: { universal: 60 }, scale: 3, idiom: "iphone" },
    { platform: Platforms.Android, size: { legacy: 192, adaptive: 432 }, dpi: "xxxhdpi" },
    { platform: Platforms.Android, size: { legacy: 144, adaptive: 324 }, dpi: "xxhdpi" },
    { platform: Platforms.Android, size: { legacy: 96, adaptive: 216 }, dpi: "xhdpi" },
    { platform: Platforms.Android, size: { legacy: 72, adaptive: 162 }, dpi: "hdpi" },
    { platform: Platforms.Android, size: { legacy: 48, adaptive: 108 }, dpi: "mdpi" },
    { platform: Platforms.Expo, size: { mobile: 1024, web: 48 } },
  ]
}

/**
 * Validates that all necessary app-icon input files exist in the template dir.
 * Additionally validates that they are of the correct size.
 */
export async function validateAppIconGenerator(option: `${Platforms}` | "all", flags: Options) {
  const { skipSourceEqualityValidation } = flags || {}

  const { path, exists, inspect } = filesystem

  const allowedOptions = Object.values(Platforms) as `${Platforms}`[]

  // check that the option is allowed
  if (option !== "all" && !allowedOptions.includes(option)) {
    return {
      isValid: false,
      messages: [`The option "${option}" is not valid for generator "app-icon"`],
    }
  }

  const optionsToValidate = option === "all" ? allowedOptions : [option]

  // get all the file-names that are required for the supplied option(s) and dedup
  const inputFileNames = APP_ICON_RULES.icons
    .filter((i) => optionsToValidate.includes(i.platform))
    .reduce((acc, i) => Array.from(new Set([...acc, i.inputFile])), [])

  // validate both presence and size of all input files
  const validationPromises = inputFileNames.map(async (fileName) => {
    const boilerplateInputFilePath = path(sourceDirectory(), "app-icon", fileName)
    const inputFilePath = path(templatesDir(), "app-icon", fileName)

    const isMissing = !exists(inputFilePath)
    const isInvalidSize = await (async function () {
      if (isMissing) return false

      const metadata = await sharp(inputFilePath).metadata()
      return metadata.width !== 1024 || metadata.height !== 1024
    })()
    const isSameAsSource = await (async function () {
      if (skipSourceEqualityValidation) return false
      if (isMissing) return false

      const inputFileMd5 = inspect(inputFilePath, { checksum: "md5" }).md5
      const sourceFileMd5 = inspect(boilerplateInputFilePath, { checksum: "md5" }).md5

      return inputFileMd5 === sourceFileMd5
    })()

    return { fileName, isMissing, isInvalidSize, isSameAsSource }
  })

  const validationResults = await Promise.all(validationPromises)

  // accumulate error messages for any failed validations
  const validationMessages = validationResults.reduce((acc, r) => {
    const messages = [
      r.isMissing && "   • the file is missing",
      r.isInvalidSize && "   • the file is the wrong size (expected 1024x1024px)",
      r.isSameAsSource &&
        "   • looks like you're using our default template; customize the file with your own icon first",
    ].filter(Boolean)

    if (messages.length) {
      acc.push(`⚠️  ignite/templates/app-icon/${r.fileName}:`, ...messages)
    }

    return acc
  }, [])

  return {
    isValid: !validationMessages.length,
    messages: validationMessages,
  }
}

/**
 * Generates app-icons for specified option.
 */
export async function generateAppIcons(option: `${Platforms}` | "all") {
  const { path, exists, find, copy, write } = filesystem
  const cwd = process.cwd()

  const options = option === "all" ? Object.values(Platforms) : ([option] as `${Platforms}`[])

  const optionGenerationSuccesses = []

  // start the generation process for each platform
  // looping instead of mapping allows us to await for each platform sequentially
  for (const o of options) {
    const optionProjectName = { ios: "iOS", android: "Android", expo: "Expo" }[o]

    // find the output path for platform and check if it exists
    // iOS is a bit weird since it's named differently for each project
    const relativeOutputDirPath = {
      expo: "assets/images",
      android: "android/app/src/main/res",
      ios:
        (exists("ios") &&
          find("ios", {
            directories: true,
            files: false,
            matching: "AppIcon.appiconset",
          })?.[0]) ||
        "ios/**/Images.xcassets/AppIcon.appiconset",
    }[o]
    const outputDirPath = path(cwd, relativeOutputDirPath)

    // if not, skip...
    if (exists(outputDirPath) !== "dir") {
      warning(
        `⚠️  No output directory found for "${optionProjectName}" at "${outputDirPath}". Skipping...`,
      )
      continue
    }

    heading(`Generating ${optionProjectName} app icons...`)

    const icons = APP_ICON_RULES.icons.filter((i) => i.platform === o)

    // prepare each icon for generation sequentially
    for (const i of icons) {
      const inputFilePath = path(templatesDir(), "app-icon", i.inputFile)

      // get the input file for sharp and do some initial transforms when necessary (e.g. radius and padding)
      const inputFile = await (async function () {
        if (!i.transform) return inputFilePath

        try {
          const { size, radius, padding } = i.transform
          const cutoutMask = Buffer.from(
            `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
          )
          return await sharp(inputFilePath)
            .resize(size, size, { fit: "fill" })
            .composite([{ input: cutoutMask, blend: "dest-in" }])
            .extend({
              top: padding,
              bottom: padding,
              left: padding,
              right: padding,
              background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .toBuffer()
        } catch (error) {}
      })()

      const rules = APP_ICON_RULES.rules.filter((i) => i.platform === o)

      // actually resize the input files and save to output dir sequentially
      for (const r of rules) {
        // construct the output file name
        const outputFileName = {
          expo: i.name,
          android: i.name.replace("{dpi}", r.dpi),
          ios: i.name
            .replace("{size}", r.size[i.type])
            .replace("{idiom}", r.idiom)
            .replace("{scale}", r.scale > 1 ? `@${r.scale}x` : ""),
        }[o]

        if (!inputFile) {
          warning(`⚠️  ${outputFileName}: transform failed, please file an issue on GitHub`)
          continue
        }

        const outputFilePath = path(outputDirPath, outputFileName)
        const outputSize = r.size[i.type] * (r.scale || 1)

        // finally, resize and save
        try {
          await sharp(inputFile)
            .resize(outputSize, outputSize, { fit: "fill" })
            .toFile(outputFilePath)

          direction(`✅ ${outputFileName}`)
        } catch (error) {
          warning(`⚠️  ${outputFileName}: saving failed, check if the directory exists`)
        }
      }
    }

    const boilerplateDirPath = path(igniteCliRootDir(), "boilerplate")

    const postGenerationFn = {
      ios: () => {
        const sourceContentsJsonFilePath = path(
          boilerplateDirPath,
          "ios",
          require(path(boilerplateDirPath, "app.json")).name,
          "Images.xcassets/AppIcon.appiconset/Contents.json",
        )
        copy(sourceContentsJsonFilePath, path(outputDirPath, "Contents.json"), { overwrite: true })
        direction(`✅ Contents.json`)
      },

      android: () => {
        const sourceIcLauncherXmlFilePath = path(
          boilerplateDirPath,
          relativeOutputDirPath,
          "mipmap-anydpi-v26/ic_launcher.xml",
        )

        copy(
          sourceIcLauncherXmlFilePath,
          path(outputDirPath, "mipmap-anydpi-v26/ic_launcher.xml"),
          { overwrite: true },
        )
        direction(`✅ mipmap-anydpi-v26/ic_launcher.xml`)
      },

      expo: () => {
        const merge = require("deepmerge-json")
        const sourceExpoConfig = require(path(boilerplateDirPath, "app.json"))?.expo
        const outputAppConfig = require(path(cwd, "app.json"))

        const updatedConfig = merge(outputAppConfig, {
          expo: {
            icon: sourceExpoConfig?.icon,
            android: {
              icon: sourceExpoConfig?.android?.icon,
              adaptiveIcon: sourceExpoConfig?.android?.adaptiveIcon,
            },
            ios: { icon: sourceExpoConfig?.ios?.icon },
            web: { favicon: sourceExpoConfig?.web?.favicon },
          },
        })

        write(path(cwd, "app.json"), updatedConfig)
        direction(`✅ app.json`)
      },
    }[o]

    postGenerationFn()

    // if we reached this point, generation for this platform was successful
    optionGenerationSuccesses.push(true)
  }

  return !!optionGenerationSuccesses.length
}
