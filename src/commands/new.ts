import { GluegunToolbox } from "../types"
import {
  isAndroidInstalled,
  copyBoilerplate,
  renameReactNativeApp,
  replaceMaestroBundleIds,
} from "../tools/react-native"
import { packager, PackagerName } from "../tools/packager"
import {
  p,
  startSpinner,
  stopSpinner,
  clearSpinners,
  ascii,
  em,
  link,
  ir,
  prefix,
  prettyPrompt,
  pkgColor,
  hr,
  INDENT,
} from "../tools/pretty"
import type { ValidationsExports } from "../tools/validations"
import { boolFlag } from "../tools/flag"
import { cache } from "../tools/cache"
import { EOL } from "os"

export interface Options {
  /**
   * alias for `boilerplate`
   *
   * Input Source: `parameter.option`
   * @deprecated flag left in for backwards compatibility, warn them to use old Ignite
   * @default undefined
   */
  b?: string
  /**
   * Input Source: `parameter.option`
   * @deprecated flag left in for backwards compatibility, warn them to use old Ignite
   * @default undefined
   */
  boilerplate?: string
  /**
   * custom bundle identifier for iOS and Android
   *
   * Input Source: `prompt.ask` | `parameter.option`
   * @default `com.${name}`
   * @example 'com.pizzaapp'
   */
  bundle?: string
  /**
   * Log raw parameters for debugging, run formatting script not quietly
   *
   * Input Source: `parameter.option`
   * @default false
   */
  debug?: boolean
  /**
   * Create new git repository and create an initial commit with boilerplate changes
   *
   * Input Source: `prompt.ask` | `parameter.option`
   * @default true
   */
  git?: boolean
  /**
   * Whether or not to run packager install script after project is created
   *
   * Input Source: `prompt.ask` | `parameter.option`
   * @default true
   */
  installDeps?: boolean
  /**
   * Remove existing directory otherwise throw if exists
   *
   * Input Source: `prompt.ask` | `parameter.option`
   * @default false
   */
  overwrite?: boolean
  /**
   * Input Source: `parameter.option`
   * @deprecated this option is deprecated. Ignite sets you up to run native or Expo
   * @default undefined
   */
  expo?: boolean
  /**
   * Package manager to install dependencies with
   *
   * Input Source: `prompt.ask`| `parameter.option`
   */
  packager?: "npm" | "yarn" | "pnpm"
  /**
   * The target directory where the project will be created.
   *
   * Input Source: `prompt.ask` | `parameter.option`
   * @default `${cwd}/${projectName}`
   */
  targetPath?: string
  /**
   * Whether or not to remove the boilerplate demo code
   *
   * Input Source: `prompt.ask` | `parameter.option`
   * @default false
   */
  removeDemo?: boolean
  /**
   * Whether or not to use the dependency cache to speed up installs
   * Input Source: `parameter.option`
   * @default true
   */
  useCache?: boolean
  /**
   * alias for `yes`
   *
   * Whether or not to accept the default options for all prompts
   *
   * Input Source: `parameter.option`
   * @default false
   */
  y?: boolean
  /**
   * Whether or not to accept the default options for all prompts
   * Input Source: `parameter.option`
   * @default false
   */
  yes?: boolean
}

export default {
  run: async (toolbox: GluegunToolbox) => {
    // #region Toolbox
    const { print, filesystem, system, meta, parameters, strings, prompt } = toolbox
    const { kebabCase } = strings
    const { exists, path, removeAsync, copy, read, write, homedir } = filesystem
    const { info, colors, warning } = print
    const { gray, cyan, yellow, underline, white } = colors
    const options: Options = parameters.options

    const yname = boolFlag(options.y) || boolFlag(options.yes)
    const useDefault = (option: unknown) => yname && option === undefined

    const CMD_INDENT = "  "
    const command = (cmd: string) => p2(white(CMD_INDENT + cmd))

    // #endregion

    // debug?
    const debug = boolFlag(options.debug)
    const log = <T = unknown>(m: T): T => {
      debug && info(` ${m}`)
      return m
    }

    // log raw parameters for debugging
    log(`ignite command: ${parameters.argv.join(" ")}`)
    // #endregion

    // #region Project Name
    // retrieve project name from toolbox
    p()
    const { validateProjectName } = require("../tools/validations") as ValidationsExports
    const projectName = await validateProjectName(toolbox)
    const projectNameKebab = kebabCase(projectName)
    // #endregion

    // #region Boilerplate
    // if they pass in --boilerplate, warn them to use old Ignite
    const bname = options.b || options.boilerplate
    if (bname) {
      p()
      p(yellow(`Different boilerplates are no longer supported in Ignite v4+.`))
      p(gray(`To use the old CLI to support different boilerplates, try:`))
      p(cyan(`npx ignite-cli@3 new ${projectName} --boilerplate ${bname}`))
      process.exit(1)
    }
    // #endregion

    // #region Bundle Identifier
    const defaultBundleIdentifier = `com.${projectName.toLowerCase()}`
    let bundleIdentifier = useDefault(options.bundle) ? defaultBundleIdentifier : options.bundle

    if (bundleIdentifier === undefined) {
      const bundleIdentifierResponse = await prompt.ask(() => ({
        type: "input",
        name: "bundleIdentifier",
        message: "What bundle identifier?",
        initial: defaultBundleIdentifier,
        prefix,
      }))

      bundleIdentifier = bundleIdentifierResponse.bundleIdentifier
    }

    const { validateBundleIdentifier } = require("../tools/validations") as ValidationsExports
    validateBundleIdentifier(toolbox, bundleIdentifier)

    // #endregion

    // #region Project Path
    const defaultTargetPath = path(projectName)
    let targetPath = useDefault(options.targetPath) ? defaultTargetPath : options.targetPath
    if (targetPath === undefined) {
      const targetPathResponse = await prompt.ask(() => ({
        type: "input",
        name: "targetPath",
        message: "Where do you want to start your project?",
        initial: defaultTargetPath,
        prefix,
      }))

      targetPath = targetPathResponse.targetPath
    }

    const handleHomePrefix = (p: string | undefined) =>
      p?.startsWith("~") ? p.replace("~", homedir()) : p
    targetPath = path(handleHomePrefix(targetPath))

    // #endregion

    // #region Prompt Overwrite
    // if they pass in --overwrite, remove existing directory otherwise throw if exists
    const defaultOverwrite = false
    let overwrite = useDefault(options.overwrite) ? defaultOverwrite : boolFlag(options.overwrite)

    if (exists(targetPath) && overwrite === undefined) {
      const overwriteResponse = await prompt.ask<{ overwrite: boolean }>(() => ({
        type: "confirm",
        name: "overwrite",
        message: `Directory ${targetPath} already exists. Do you want to overwrite it?`,
        initial: defaultOverwrite,
        format: prettyPrompt.format.boolean,
        prefix,
      }))
      overwrite = overwriteResponse.overwrite
    }

    if (exists(targetPath) && overwrite === false) {
      const alreadyExists = `Error: There's already a folder at ${targetPath}. To force overwriting that folder, run with --overwrite or say yes.`
      p()
      p(yellow(alreadyExists))
      process.exit(1)
    }
    // #endregion

    // #region Prompt Git Option
    const defaultGit = true
    let git = useDefault(options.git) ? defaultGit : boolFlag(options.git)

    if (git === undefined) {
      const gitResponse = await prompt.ask<{ git: boolean }>(() => ({
        type: "confirm",
        name: "git",
        message: "Do you want to initialize a git repository?",
        initial: defaultGit,
        format: prettyPrompt.format.boolean,
        prefix,
      }))
      git = gitResponse.git
    }
    // #endregion

    // #region Prompt to Remove Demo code
    const defaultRemoveDemo = false
    let removeDemo = useDefault(options.removeDemo)
      ? defaultRemoveDemo
      : boolFlag(options.removeDemo)
    if (removeDemo === undefined) {
      const removeDemoResponse = await prompt.ask<{ removeDemo: boolean }>(() => ({
        type: "confirm",
        name: "removeDemo",
        message:
          "Remove demo code? We recommend leaving it in if it's your first time using Ignite",
        initial: defaultRemoveDemo,
        format: prettyPrompt.format.boolean,
        prefix,
      }))
      removeDemo = removeDemoResponse.removeDemo
    }
    // #endregion

    // #region Packager
    // check if a packager is provided, or detect one
    // we pass in expo because we can't use pnpm if we're using expo

    const availablePackagers = packager.availablePackagers()
    const defaultPackagerName = availablePackagers.includes("yarn") ? "yarn" : "npm"
    let packagerName = useDefault(options.packager) ? defaultPackagerName : options.packager

    const validatePackagerName = (input: unknown): input is PackagerName =>
      typeof input === "string" && ["npm", "yarn", "pnpm"].includes(input)

    if (packagerName !== undefined && validatePackagerName(packagerName) === false) {
      p()
      p(yellow(`Error: Invalid packager: "${packagerName}". Valid packagers are npm, yarn, pnpm.`))
      process.exit(1)
    }

    if (packagerName !== undefined && availablePackagers.includes(packagerName) === false) {
      p()
      p(yellow(`Error: selected "${packagerName}" but packager was not available on system`))
      process.exit(1)
    }

    if (packagerName === undefined) {
      const initial = availablePackagers.findIndex((p) => p === defaultPackagerName)
      const NOT_FOUND = -1

      if (initial === NOT_FOUND) {
        p()
        p(yellow(`Error: Default packager "${defaultPackagerName}" was not available on system`))
        process.exit(1)
      }

      const packagerNameResponse = await prompt.ask<{ packagerName: PackagerName }>(() => ({
        type: "select",
        name: "packagerName",
        message: "Which package manager do you want to use?",
        choices: availablePackagers,
        initial,
        prefix,
      }))
      packagerName = packagerNameResponse.packagerName
    }

    const packagerOptions = { packagerName }

    const ignitePath = path(`${meta.src}`, "..")
    const boilerplatePath = path(ignitePath, "boilerplate")
    const boilerplate = (...pathParts: string[]) => path(boilerplatePath, ...pathParts)
    log(`ignitePath: ${ignitePath}`)
    log(`boilerplatePath: ${boilerplatePath}`)

    const defaultInstallDeps = true
    let installDeps = useDefault(options.installDeps)
      ? defaultInstallDeps
      : boolFlag(options.installDeps)
    if (installDeps === undefined) {
      const installDepsResponse = await prompt.ask<{ installDeps: boolean }>(() => ({
        type: "confirm",
        name: "installDeps",
        message: "Do you want to install dependencies?",
        initial: defaultInstallDeps,
        format: prettyPrompt.format.boolean,
        prefix,
      }))
      installDeps = installDepsResponse.installDeps
    }
    // #endregion

    // #region Expo
    // show warning about --expo going away
    const expo = boolFlag(options.expo)
    if (expo) {
      warning(
        " Detected --expo, this option is deprecated. Ignite sets you up to run native or Expo!",
      )
      p()
    }
    // #endregion

    // #region Debug
    // start tracking performance
    const perfStart = new Date().getTime()

    // #region Print Welcome
    // welcome everybody!
    const terminalWidth = process.stdout.columns ?? 80
    const logo =
      terminalWidth > 80 ? () => ascii("logo.ascii.txt") : () => ascii("logo-sm.ascii.txt")
    p()
    p()
    p()
    p()
    logo()
    p()
    p()

    const pkg = pkgColor(packagerName)
    p(` █ Creating ${em(projectName)} using ${em(`Ignite ${meta.version()}`)}`)
    p(` █ Powered by ${ir(" ∞ Infinite Red ")} (${link("https://infinite.red")})`)
    p(` █ Package Manager: ${pkg(print.colors.bold(packagerName))}`)
    p(` █ Bundle identifier: ${em(bundleIdentifier)}`)
    p(` █ Path: ${underline(targetPath)}`)
    hr()
    p()
    // #endregion

    // #region Overwrite
    if (exists(targetPath) === "dir" && overwrite === true) {
      const msg = ` Tossing that old app like it's hot`
      startSpinner(msg)
      await removeAsync(targetPath)
      stopSpinner(msg, "🗑️")
    }
    // #endregion

    // #region Local build folder clean
    // Remove some folders that we don't want to copy over
    // This mostly only applies when you're developing locally
    await Promise.all([
      removeAsync(path(boilerplatePath, "node_modules")),
      removeAsync(path(boilerplatePath, "ios", "Pods")),
      removeAsync(path(boilerplatePath, "ios", "build")),
      removeAsync(path(boilerplatePath, "android", ".idea")),
      removeAsync(path(boilerplatePath, "android", ".gradle")),
      removeAsync(path(boilerplatePath, "android", "build")),
    ])
    // #endregion

    // #region Copy Boilerplate Files
    startSpinner(" 3D-printing a new React Native app")
    await copyBoilerplate(toolbox, {
      boilerplatePath,
      targetPath,
      excluded: [".vscode", "node_modules", "yarn.lock"],
      overwrite,
    })
    stopSpinner(" 3D-printing a new React Native app", "🖨")
    // copy the .gitignore if it wasn't copied over
    // Release Ignite installs have the boilerplate's .gitignore in .gitignore.template
    // (see https://github.com/npm/npm/issues/3763); development Ignite still
    // has it in .gitignore. Copy it from one or the other.
    const boilerplateIgnorePath = exists(boilerplate(".gitignore.template"))
      ? boilerplate(".gitignore.template")
      : boilerplate(".gitignore")
    const targetIgnorePath = log(path(targetPath, ".gitignore"))
    copy(log(boilerplateIgnorePath), targetIgnorePath, { overwrite: true })

    if (exists(targetIgnorePath) === false) {
      warning(`  Unable to copy ${boilerplateIgnorePath} to ${targetIgnorePath}`)
    }

    // note the original directory
    const cwd = log(process.cwd())

    // jump into the project to do additional tasks
    process.chdir(targetPath)
    // #endregion

    // #region Handle package.json
    // Update package.json:
    // - Replacing app name: We do it on the unparsed file content
    //   since that's easier than updating individual values
    //   in the parsed structure, then we parse that as JSON.
    // - If Expo, we also merge in our extra expo stuff.
    // - Then write it back out.
    let packageJsonRaw = read("package.json")
    packageJsonRaw = packageJsonRaw
      .replace(/HelloWorld/g, projectName)
      .replace(/hello-world/g, projectNameKebab)
    const packageJson = JSON.parse(packageJsonRaw)

    write("./package.json", packageJson)
    // #endregion

    // #region Run Packager Install
    // pnpm/yarn/npm install it

    // check if there is a dependency cache using a hash of the package.json
    const boilerplatePackageJsonHash = cache.hash(read(path(boilerplatePath, "package.json")))
    const cachePath = path(cache.rootdir(), boilerplatePackageJsonHash, packagerName)
    const cacheExists = exists(cachePath) === "dir"

    log(`${!cacheExists ? "expected " : ""}cachePath: ${cachePath}`)
    log(`cacheExists: ${cacheExists}`)

    // use-cache defaults to `false` for now; if we make it robust enough,
    // we can enable it by default in the future.
    const defaultUseCache = false
    const useCache = options.useCache === undefined ? defaultUseCache : boolFlag(options.useCache)

    const shouldUseCache = installDeps && cacheExists && useCache
    if (shouldUseCache) {
      const msg = `Grabbing those ${packagerName} dependencies from the back`
      startSpinner(msg)
      await cache.copy({
        fromRootDir: cachePath,
        toRootDir: targetPath,
        packagerName,
      })
      stopSpinner(msg, "📦")
    }

    // #region Rename App
    // rename the app using Ignite
    const renameSpinnerMsg = `Getting those last few details perfect`
    startSpinner(renameSpinnerMsg)

    const boilerplateBundleIdentifier = "com.helloworld"
    await renameReactNativeApp(
      toolbox,
      "HelloWorld",
      projectName,
      boilerplateBundleIdentifier,
      bundleIdentifier,
    )

    await replaceMaestroBundleIds(toolbox, boilerplateBundleIdentifier, bundleIdentifier)

    stopSpinner(renameSpinnerMsg, "🎨")
    // #endregion

    const shouldFreshInstallDeps = installDeps && shouldUseCache === false
    if (shouldFreshInstallDeps) {
      const unboxingMessage = `Installing ${packagerName} dependencies (wow these are heavy)`
      startSpinner(unboxingMessage)
      await packager.install({ ...packagerOptions, onProgress: log })
      stopSpinner(unboxingMessage, "🧶")
    }

    // remove the gitignore template
    await removeAsync(".gitignore.template")
    // #endregion

    // #region Cache dependencies
    if (shouldFreshInstallDeps && cacheExists === false && useCache) {
      const msg = `Saving ${packagerName} dependencies for next time`
      startSpinner(msg)
      log(targetPath)
      await cache.copy({
        fromRootDir: targetPath,
        toRootDir: cachePath,
        packagerName,
      })
      stopSpinner(msg, "📦")
    }
    // #endregion

    // #region Run Format
    // we can't run this option if we didn't install deps
    if (installDeps === true) {
      // Make sure all our modifications are formatted nicely
      await packager.run("format", { ...packagerOptions, silent: !debug })
    }
    // #endregion

    // #region Remove Demo code
    if (removeDemo === true) {
      startSpinner(" Removing fancy demo code")
      try {
        const IGNITE = "node " + filesystem.path(__dirname, "..", "..", "bin", "ignite")

        log(`Ignite bin path: ${IGNITE}`)
        await system.run(`${IGNITE} remove-demo ${targetPath}`, {
          onProgress: log,
        })
      } catch (e) {
        log(e)
        p(yellow("Unable to remove demo code."))
      }
      stopSpinner(" Removing fancy demo code", "🛠️")
    }
    // #endregion

    // #region Create Git Repository and Initial Commit
    // commit any changes
    if (git === true) {
      startSpinner(" Backing everything up in source control")
      try {
        const isWindows = process.platform === "win32"

        // The separate commands works on Windows, but not Mac OS
        if (isWindows) {
          await system.run(log("git init"))
          await system.run(log("git add -A"))
          await system.run(log(`git commit -m "New Ignite ${meta.version()} app`))
        } else {
          await system.run(
            log(`
              \\rm -rf ./.git
              git init;
              git add -A;
              git commit -m "New Ignite ${meta.version()} app";
            `),
          )
        }
      } catch (e) {
        p(yellow("Unable to commit the initial changes. Please check your git username and email."))
      }
      stopSpinner(" Backing everything up in source control", "🗄")
    }

    // back to the original directory
    process.chdir(log(cwd))
    // #endregion

    // #region Print Finish
    // clean up any spinners we forgot to clear
    p()
    hr()
    p()
    clearSpinners()

    // we're done! round performance stats to .xx digits
    const perfDuration = Math.round((new Date().getTime() - perfStart) / 10) / 100

    /** Add just a _little_ more spacing to match with spinners and heading */
    const p2 = (m = "") => p(` ${m}`)

    p2(`Ignited ${em(`${projectName}`)} in ${gray(`${perfDuration}s`)}  🚀 `)
    p2()
    const cliCommand = buildCliCommand({
      flags: {
        b: bname,
        boilerplate: bname,
        bundle: bundleIdentifier,
        debug,
        git,
        installDeps,
        overwrite,
        expo,
        packager: packagerName,
        targetPath,
        removeDemo,
        useCache,
        y: yname,
        yes: yname,
      },
      projectName,
      toolbox,
    })

    p2(`For next time: here are the Ignite options you picked!`)

    // create a multi-line string of the command, where each --flag is on it's own line
    const prettyCliCommand = cliCommand
      .split(" ")
      .map((c) => (c === projectName || c?.startsWith("--") ? `${c} \\${EOL}` : c)) // add a line break after the project name and each flag
      .map((c, i, a) => (i === a.length - 1 ? c.replace(`\\${EOL}`, "") : c)) // remove the line break after the last flag
      .map((c) => (c.startsWith("--") ? INDENT + CMD_INDENT + CMD_INDENT + c : c)) // add whitespace to the flags so it looks nice
      .join(" ")

    command(`${prettyCliCommand}`)
    p2()

    if (!isAndroidInstalled(toolbox)) {
      hr()
      p2()
      p2("To run in Android, make sure you've followed the latest")
      p2(`react-native setup instructions. You reference them at:`)
      p2(`${link("https://reactnative.dev/docs/environment-setup")}`)
      p2()
    }

    hr()
    p2()
    p2("Need additional help?")
    p2()
    p2(`Join our Slack community at ${link("http://community.infinite.red.")}`)
    p2()

    hr()
    p2()
    p2("Now get cooking! 🍽")
    command(`cd ${projectName}`)
    if (!installDeps) command(packager.installCmd({ packagerName }))
    command(`${packagerName} start`)

    const isMac = process.platform === "darwin"
    if (isMac) {
      command(`${packager.runCmd("ios", packagerOptions)}`)
    } else {
      command(`${packager.runCmd("android", packagerOptions)}`)
    }

    p2()
    p2("With Expo:")
    command(`cd ${projectName}`)
    if (!installDeps) command(packager.installCmd({ packagerName }))
    command(`${packager.runCmd("expo:start", packagerOptions)}`)
    p2()
    p2()
    // #endregion

    // this is a hack to prevent the process from hanging
    // if there are any tasks left in the event loop
    // like I/O operations to process.stdout and process.stderr
    // see https://github.com/infinitered/ignite/issues/2084
    process.exit(0)
  },
}

function buildCliCommand(args: {
  flags: Required<Options>
  toolbox: GluegunToolbox
  projectName: string
}): string {
  const { flags, toolbox, projectName } = args
  const { strings } = toolbox
  const { kebabCase } = strings

  type Flag = keyof typeof flags
  type FlagEntry = [key: Flag, value: Options[Flag]]

  const privateFlags: Flag[] = ["b", "boilerplate", "debug", "expo", "useCache", "y", "yes"]

  const stringFlag = ([key, value]: FlagEntry) => `--${kebabCase(key)}=${value}`
  const booleanFlag = ([key, value]: FlagEntry) =>
    value ? `--${kebabCase(key)}` : `--${kebabCase(key)}=${value}`

  const cliCommand = `npx ignite-cli new ${projectName} ${(Object.entries(flags) as FlagEntry[])
    .filter(([key]) => privateFlags.includes(key) === false)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) =>
      typeof value === "boolean" ? booleanFlag([key, value]) : stringFlag([key, value]),
    )
    .join(" ")}`

  return cliCommand
}
