import * as ejs from "ejs"
import { filesystem, GluegunToolbox, GluegunPatchingPatchOptions, patching, strings } from "gluegun"
import { Options } from "gluegun/build/types/domain/options"
import * as sharp from "sharp"
import * as YAML from "yaml"
import { command, direction, heading, igniteHeading, link, p, warning } from "./pretty"

const NEW_LINE = filesystem.eol

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
      command(`npx ignite-cli generate ${generator} --update`)
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
  igniteHeading()
  heading("Ignite Generators")
  p()
  p("When you create a new app with Ignite CLI, it will install several generator")
  p("templates in the project folder under the `ignite/templates` folder.")
  p()
  heading("Commands")
  p()
  command("--list  ", "List installed generators", ["npx ignite-cli --list"])
  command(
    "--update",
    "Update installed generators. You can also use the 'npx ignite-cli update X' format",
    [
      "npx ignite-cli --update",
      `npx ignite-cli model --update`,
      `npx ignite-cli update model`,
      `npx ignite-cli update --all`,
    ],
  )
  warning("          ⚠️  this erases any customizations you've made!")
  p()
  heading("Options")
  p()
  command("--dir", "Override front matter or default path for generated files", [
    "npx ignite-cli g model Episodes --dir src/models",
  ])
  command("--case", "Formats the generated filename", [
    "npx ignite-cli g model episode --case=auto",
    "npx ignite-cli g model episode --case=pascal",
    "npx ignite-cli g model episode --case=kebab",
    "npx ignite-cli g model episode --case=snake",
    "npx ignite-cli g model episode --case=none",
  ])
  p()
  heading("Installed generators")
  p()
  showGenerators()
}

function showGenerators() {
  if (!isIgniteProject()) {
    warning("⚠️  Not in an Ignite project root. Go to your Ignite project root to see generators.")
    return
  }

  const generators = installedGenerators()
  const longestGen = generators.reduce((c, g) => Math.max(c, g.length), 0)
  generators.forEach((g) => {
    if (g === "app-icon") {
      // specialty app-icon generator
      command(g.padEnd(longestGen), `generates app-icons`, [
        `npx ignite-cli ${g} all|ios|android|expo`,
      ])
    } else if (g === "splash-screen") {
      // specialty splash-screen generator
      command(g.padEnd(longestGen), `generates splash-screen`, [
        `npx ignite-cli ${g} "#191015" [--android-size=180 --ios-size=212]`,
      ])
    } else {
      // standard generators
      command(g.padEnd(longestGen), `generates a ${g}`, [`npx ignite-cli ${g} Demo`])
    }
  })
}

export function updateGenerators(toolbox: GluegunToolbox) {
  const { parameters } = toolbox

  if (!isIgniteProject()) {
    warning("⚠️  Not in an Ignite project root. Go to your Ignite project root to see generators.")
    return
  }

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

function cwd() {
  return process.cwd()
}

function igniteDir() {
  return filesystem.path(cwd(), "ignite")
}

function appDir() {
  return filesystem.path(cwd(), "app")
}

function templatesDir() {
  return filesystem.path(igniteDir(), "templates")
}

function frontMatter(contents: string) {
  const parts = contents.split(`---${NEW_LINE}`)
  if (parts.length === 1 || parts.length === 3) {
    return {
      data: parts[1] ? YAML.parse(parts[1]) : {},
      content: parts[2] ?? parts[0],
    }
  } else {
    return {}
  }
}

/**
 * Patch front matter configuration
 */
type Patch = GluegunPatchingPatchOptions & {
  path: string
  append?: string
  prepend?: string
  replace?: string
  skip?: boolean
}

/**
 * Handles patching files via front matter config
 */
async function handlePatches(data: { patches?: Patch[]; patch?: Patch }) {
  const patches = data.patches ?? []
  if (data.patch) patches.push(data.patch)
  for (const patch of patches) {
    const { path: patchPath, skip, ...patchOpts } = patch
    if (patchPath && !skip) {
      if (patchOpts.append) {
        await patching.append(patchPath, patchOpts.append)
      }
      if (patchOpts.prepend) {
        await patching.prepend(patchPath, patchOpts.prepend)
      }
      if (patchOpts.replace) {
        await patching.replace(patchPath, patchOpts.replace, patchOpts.insert)
      }
      await patching.patch(patchPath, patchOpts)
    }
  }
}

/**
 * Finds generator templates installed in the current project
 */
function installedGenerators(): string[] {
  const { subdirectories, separator } = filesystem

  const generators = subdirectories(templatesDir()).map((g) => g.split(separator).slice(-1)[0])

  return generators
}

type GeneratorCaseOptions = "auto" | "pascal" | "camel" | "kebab" | "snake" | "none"

type GeneratorOptions = {
  name: string
  originalName: string
  skipIndexFile?: boolean
  subdirectory: string
  overwrite: boolean
  dir?: string
  case?: GeneratorCaseOptions
}

/**
 * Generates something using a template
 */
export async function generateFromTemplate(
  generator: string,
  options: GeneratorOptions,
): Promise<{ written: string[]; overwritten: string[]; exists: string[] }> {
  const { find, path, dir, separator } = filesystem
  const { pascalCase, kebabCase, pluralize, camelCase, snakeCase } = strings

  // permutations of the name
  const pascalCaseName = pascalCase(options.name)
  const kebabCaseName = kebabCase(options.name)
  const camelCaseName = camelCase(options.name)
  const snakeCaseName = snakeCase(options.name)

  // array of written, exists and overwritten files
  const written: string[] = []
  const overwritten: string[] = []
  const exists: string[] = []

  // passed into the template generator
  const props = { camelCaseName, kebabCaseName, pascalCaseName, snakeCaseName, ...options }

  // where are we copying from?
  const templateDir = path(templatesDir(), generator)

  // find the files
  const files = find(templateDir, { matching: "*" })

  // check case options
  let formattedName: string = pascalCaseName
  switch (options.case) {
    case "camel":
      formattedName = camelCaseName
      break
    case "kebab":
      formattedName = kebabCaseName
      break
    case "snake":
      formattedName = snakeCaseName
      break
    case "none":
      formattedName = options.originalName
      break
    case "auto":
    default:
      formattedName = pascalCaseName
      break
  }

  // loop through the files
  for (const templateFilename of files) {
    // get the filename and replace `NAME` with the actual name
    let filename = templateFilename.split(separator).slice(-1)[0].replace("NAME", formattedName)

    // strip the .ejs
    if (filename.endsWith(".ejs")) {
      filename = filename.slice(0, -4)
    }

    // read template file
    let templateContents = filesystem.read(templateFilename)

    // render ejs
    if (templateFilename.endsWith(".ejs")) {
      templateContents = ejs.render(templateContents, { props: { ...props, filename } })
    }

    // parse out front matter data and content
    const { data: frontMatterData, content } = frontMatter(templateContents)
    if (!content) {
      warning("⚠️  Unable to parse front matter. Please check your delimiters.")
      return { written, exists, overwritten }
    }

    // where are we copying to?
    const defaultDestinationDir = path(appDir(), pluralize(generator), options.subdirectory) // e.g. app/components, app/screens, app/models
    const overrideDestinationDir = options.dir ?? frontMatterData.destinationDir // cli dir takes priority over front matter dir
    const destinationDir = overrideDestinationDir
      ? path(cwd(), overrideDestinationDir)
      : defaultDestinationDir

    // apply any provided patches
    const destinationPath = path(destinationDir, frontMatterData.filename ?? filename)

    // apply any provided patches
    const isFileExist = filesystem.exists(destinationPath)
    if (!isFileExist) await handlePatches(frontMatterData)

    // ensure destination folder exists
    dir(destinationDir)

    // check if file exist or not and check of overwrite property
    if (isFileExist) {
      if (props.overwrite) {
        filesystem.write(destinationPath, content)
        overwritten.push(destinationPath)
      } else {
        exists.push(destinationPath)
      }
    } else {
      filesystem.write(destinationPath, content)
      written.push(destinationPath)
    }
  }
  return { written, exists, overwritten }
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
const APP_ICON_RULESET = {
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
  const inputFileNames = APP_ICON_RULESET.icons
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
    const optionProjectName = { expo: "Expo" }[o]

    // find the output path for platform and check if it exists
    // iOS is a bit weird since it's named differently for each project
    const relativeOutputDirPath = {
      expo: "assets/images",
      android: "android/app/src/main/res",
      ios: (function () {
        const searchPath = path(cwd, "ios")

        if (!exists(searchPath)) return searchPath

        return (
          find(searchPath, {
            directories: true,
            files: false,
            matching: "AppIcon.appiconset",
          })?.[0] || "ios/**/Images.xcassets/AppIcon.appiconset"
        )
      })(),
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

    const icons = APP_ICON_RULESET.icons.filter((i) => i.platform === o)

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

      const rules = APP_ICON_RULESET.rules.filter((i) => i.platform === o)

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
        const outputAppConfig = path(cwd, "app.json")

        const iconConfig = {
          expo: {
            icon: sourceExpoConfig?.icon,
            android: {
              icon: sourceExpoConfig?.android?.icon,
              adaptiveIcon: sourceExpoConfig?.android?.adaptiveIcon,
            },
            ios: { icon: sourceExpoConfig?.ios?.icon },
            web: { favicon: sourceExpoConfig?.web?.favicon },
          },
        }

        // Check if app.json exists - however, could also be `app.config.js` or `app.config.ts` in
        // which case we should output a warning of what files to update
        if (!exists(outputAppConfig)) {
          const appConfigFiles = find(cwd, { matching: "app.config.*" })
          if (appConfigFiles.length > 0) {
            warning(
              `⚠️  No "app.json" found at "${outputAppConfig}". It looks like you are using a dynamic configuration! Learn more at ${link(
                "https://docs.expo.dev/workflow/configuration/#dynamic-configuration-with-appconfigjs",
              )}`,
            )
            warning(`⚠️  Please add the following to your app.config.js manually:`)
            JSON.stringify(iconConfig, null, 2)
              .split("\n")
              .map((line) => p(`  ${line}`))
          } else {
            warning(`⚠️  No "app.json" found at "${outputAppConfig}". Skipping...`)
          }

          return
        }

        const updatedConfig = merge(require(outputAppConfig), iconConfig)

        write(path(cwd, "app.json"), JSON.stringify(updatedConfig, null, 2) + "\n")
        direction(`✅ app.json`)
      },
    }[o]

    postGenerationFn()

    // if we reached this point, generation for this platform was successful
    optionGenerationSuccesses.push(true)
  }

  return !!optionGenerationSuccesses.length
}
/**
 * Validates that splash screen icon input file exists in the template dir.
 * Additionally validates the size and background parameters.
 */
export async function validateSplashScreenGenerator(
  options: { androidSize: number; iosSize: number; backgroundColor: string },
  flags: Options,
) {
  const { androidSize, iosSize, backgroundColor } = options || {}
  const { skipSourceEqualityValidation } = flags || {}

  const { path, exists, inspect } = filesystem

  const validationMessages = []

  // check if the android size option is numerical and non-zero
  const androidMessages = [
    Number.isNaN(androidSize) && "   • a numerical value",
    androidSize <= 0 && "   • a value greater than 0",
    androidSize >= 288 && "   • a value less than 288",
  ].filter(Boolean)

  if (androidMessages.length) {
    validationMessages.push(`⚠️  "--android-size" option must be:`, ...androidMessages)
  }

  // check if the ios size option is numerical and non-zero
  const iosMessages = [
    Number.isNaN(iosSize) && "   • a numerical value",
    iosSize <= 0 && "   • a value greater than 0",
  ].filter(Boolean)

  if (iosMessages.length) {
    validationMessages.push(`⚠️  "--ios-size" option must be:`, ...iosMessages)
  }

  // check if the background option is a valid hex color
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(backgroundColor)) {
    validationMessages.push(`⚠️  background color parameter must be:`)
    validationMessages.push(`   • a valid hex color`)
  }

  // validate template input file
  const boilerplateInputFilePath = path(sourceDirectory(), "splash-screen", "logo.png")
  const inputFilePath = path(templatesDir(), "splash-screen", "logo.png")

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

  const messages = [
    isMissing && "   • the file is missing",
    isInvalidSize && "   • the file is the wrong size (expected 1024x1024px)",
    isSameAsSource &&
      "   • looks like you're using our default template; customize the file with your own icon first",
  ].filter(Boolean)

  if (messages.length) {
    validationMessages.push(`⚠️  ignite/templates/splash-screen/logo.png:`, ...messages)
  }

  return {
    isValid: !validationMessages.length,
    messages: validationMessages,
  }
}

/**
 * Generates splash screen for all platforms
 */
export async function generateSplashScreen(options: {
  androidSize: number
  iosSize: number
  backgroundColor: string
}) {
  const { androidSize, iosSize, backgroundColor } = options || {}
  const { path, exists, write, find } = filesystem
  const cwd = process.cwd()

  const inputFilePath = path(templatesDir(), "splash-screen", "logo.png")
  const expoOutputDirPath = path(cwd, "assets/images")
  const isExpoOutputDirExists = exists(expoOutputDirPath) === "dir"

  const optionGenerationSuccesses = []

  async function generateForExpo(
    type: "ios" | "android" | "web" | "all",
    size: number,
    expoRules: { name?: string; width: number; height: number; scale: number }[],
  ) {
    for (const expoRule of expoRules) {
      const { name, width, height, scale } = expoRule

      const outputFileName = [`splash-logo`, type, name].filter(Boolean).join("-") + ".png"
      const outputFilePath = path(expoOutputDirPath, outputFileName)
      const logoSize = size * scale
      const verticalPadding = Math.ceil((height - logoSize) / 2)
      const horizontalPadding = Math.ceil((width - logoSize) / 2)

      try {
        await sharp(inputFilePath)
          .resize(logoSize, logoSize, { fit: "fill" })
          .extend({
            top: verticalPadding,
            bottom: verticalPadding,
            left: horizontalPadding,
            right: horizontalPadding,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .toFile(outputFilePath)

        direction(`✅ assets/images/${outputFileName}`)
        optionGenerationSuccesses.push(true)
      } catch (error) {}
    }
  }

  heading(`Generating Expo splash screens (Android, iOS, and Web)...`)
  if (isExpoOutputDirExists) {
    await generateForExpo("ios", iosSize, [
      { name: "mobile", width: 1284, height: 2778, scale: 3 },
      { name: "tablet", width: 2048, height: 2732, scale: 2 },
    ])
    await generateForExpo("android", androidSize, [
      { name: "universal", width: 1440, height: 2560, scale: 4 },
    ])
    await generateForExpo("web", 300, [{ width: 1920, height: 1080, scale: 1 }])
    await generateForExpo("all", 180, [{ width: 1242, height: 2436, scale: 3 }])

    // update app.json
    const boilerplateDirPath = path(igniteCliRootDir(), "boilerplate")
    const merge = require("deepmerge-json")
    const sourceExpoConfig = require(path(boilerplateDirPath, "app.json"))?.expo
    const outputAppConfig = path(cwd, "app.json")

    const splashConfig = {
      expo: {
        splash: {
          backgroundColor,
          image: sourceExpoConfig?.splash?.image,
          resizeMode: sourceExpoConfig?.splash?.resizeMode,
        },
        android: {
          splash: {
            backgroundColor,
            image: sourceExpoConfig?.android?.splash?.image,
            resizeMode: sourceExpoConfig?.android?.splash?.resizeMode,
          },
        },
        ios: {
          splash: {
            backgroundColor,
            image: sourceExpoConfig?.ios?.splash?.image,
            resizeMode: sourceExpoConfig?.ios?.splash?.resizeMode,
          },
        },
        web: {
          splash: {
            backgroundColor,
            image: sourceExpoConfig?.web?.splash?.image,
            resizeMode: sourceExpoConfig?.web?.splash?.resizeMode,
          },
        },
      },
    }

    // Check if app.json exists - however, could also be `app.config.js` or `app.config.ts` in
    // which case we should output a warning of what files to update
    if (!exists(outputAppConfig)) {
      const appConfigFiles = find(cwd, { matching: "app.config.*" })
      if (appConfigFiles.length > 0) {
        warning(
          `⚠️  No "app.json" found at "${outputAppConfig}". It looks like you are using a dynamic configuration! Learn more at ${link(
            "https://docs.expo.dev/workflow/configuration/#dynamic-configuration-with-appconfigjs",
          )}`,
        )
        warning(`⚠️  Please add the following to your app.config.js manually:`)
        JSON.stringify(splashConfig, null, 2)
          .split("\n")
          .map((line) => p(`  ${line}`))
      } else {
        warning(`⚠️  No "app.json" found at "${outputAppConfig}". Skipping...`)
      }

      return
    }

    const updatedConfig = merge(require(outputAppConfig), splashConfig)

    write(path(cwd, "app.json"), JSON.stringify(updatedConfig, null, 2) + "\n")
    direction(`✅ app.json`)
  } else {
    warning(`⚠️  No output directory found for "Expo" at "${expoOutputDirPath}". Skipping...`)
  }

  return !!optionGenerationSuccesses.length
}
