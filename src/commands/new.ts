import { GluegunToolbox } from "../types"
import { spawnProgress } from "../tools/spawn"
import { isAndroidInstalled, copyBoilerplate, renameReactNativeApp } from "../tools/react-native"
import { packager } from "../tools/packager"
import {
  command,
  direction,
  heading,
  igniteHeading,
  p,
  startSpinner,
  stopSpinner,
  clearSpinners,
} from "../tools/pretty"

// CLI tool versions we support
const deps: { [k: string]: string } = {
  podInstall: "0.1",
}

export interface Options {
  /**
   * Log raw parameters for debugging, run formatting script not quietly
   *
   * Input Source: `prompt.confirm` | `parameter.option`
   * @default false
   */
  debug?: boolean
  /**
   * Remove existing directory otherwise throw if exists
   *
   * Input Source: `prompt.confirm` | `parameter.option`
   * @default false
   */
  overwrite?: boolean
  /**
   * Input Source: `parameter.option`
   * @deprecated flag left in for backwards compatability, warn them to use old Ignite
   * @default undefined
   */
  boilerplate?: string
  /**
   * alias for `boilerplate`
   *
   * Input Source: `parameter.option`
   * @deprecated flag left in for backwards compatability, warn them to use old Ignite
   * @default undefined
   */
  b?: string
  /**
   * custom bundle identifier (android only)
   *
   * Input Source: `prompt.ask` | `parameter.option`
   * @default `com.${name}`
   * @example 'com.pizzaapp'
   */
  bundle?: string
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
   *
   * Default: packager that executed current command, i.e. `npx ignite new`, `yarn dlx ignite new`, `pnpm dlx ignite new`
   */
  packager?: "npm" | "yarn" | "pnpm"
  /**
   * Create new git repository and create an inital commit with boilerplate changes
   *
   * Input Source: `prompt.confirm` | `parameter.option`
   * @default true
   */
  git?: boolean
  /**
   * Whether or not to run packager install script after project is created
   *
   * @default true
   */
  installDeps?: boolean
  /**
   * React Native Colo Loco is no longer installed with Ignite,
   * but we will give instructions on how to install it if they pass in `--colo-loco`   *
   *
   * Input Source: `prompt.confirm` | `parameter.option`
   * @default false
   */
  coloLoco?: boolean
}

export default {
  run: async (toolbox: GluegunToolbox) => {
    // #region Toolbox
    const { print, filesystem, system, meta, parameters, strings } = toolbox
    const { kebabCase } = strings
    const { exists, path, remove, copy, read, write } = filesystem
    const { info, colors, warning } = print
    const { gray, red, magenta, cyan, yellow, green } = colors
    const options: Options = parameters.options
    // #endregion

    // #region Debug
    // start tracking performance
    const perfStart = new Date().getTime()

    // debug?
    const debug = Boolean(options.debug)
    const log = <T = unknown>(m: T): T => {
      debug && info(` ${m}`)
      return m
    }

    // log raw parameters for debugging
    log(`ignite command: ${parameters.argv.join(" ")}`)
    // #endregion

    // #region Project Name
    // retrieve project name from toolbox
    const { validateProjectName, validateBundleIdentifier } = require("../tools/validations")
    const projectName = validateProjectName(toolbox)
    const projectNameKebab = kebabCase(projectName)
    // #endregion

    // #region Overwrite
    // if they pass in --overwrite, remove existing directory otherwise throw if exists
    if (options.overwrite) {
      log(`Removing existing project ${projectName}`)
      remove(projectName)
    } else if (exists(projectName)) {
      const alreadyExists = `Error: There's already a folder with the name "${projectName}". To force overwriting that folder, run with --overwrite.`
      p()
      p(yellow(alreadyExists))
      process.exit(1)
    }
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
    // custom bundle identifier
    // TODO: refactor alert, need to rethink this
    const bundleIdentifier =
      validateBundleIdentifier(toolbox, options.bundle) || `com.${projectName.toLowerCase()}`
    // #endregion

    // #region Packager
    // check if a packager is provided, or detect one
    // we pass in expo because we can't use pnpm if we're using expo
    const packagerName = options.packager || packager.detectPackager()
    const packagerOptions = { packagerName }

    const ignitePath = path(`${meta.src}`, "..")
    const boilerplatePath = path(ignitePath, "boilerplate")
    log(`ignitePath: ${ignitePath}`)
    log(`boilerplatePath: ${boilerplatePath}`)
    // #endregion

    // #region Expo
    // show warning about --expo going away
    const expo = Boolean(options.expo)
    if (expo) {
      warning(
        " Detected --expo, this option is deprecated. Ignite sets you up to run native or Expo!",
      )
      p()
    }
    // #endregion

    // #region Print Welcome
    // welcome everybody!
    igniteHeading()
    p(` █ Creating ${magenta(projectName)} using ${red("Ignite")} ${meta.version()}`)
    p(` █ Powered by ${red("Infinite Red")} - https://infinite.red`)
    p(` █ Using ${cyan("ignite-cli")} with ${green(packagerName)}`)
    p(` █ Bundle identifier: ${magenta(bundleIdentifier)}`)
    p(` █ Path: ${gray(path(process.cwd(), projectName))}`)
    p(` ────────────────────────────────────────────────\n`)

    startSpinner("Igniting app")
    // #endregion

    // #region Copy Boilerplate Files
    // Remove some folders that we don't want to copy over
    // This mostly only applies to when you're developing locally
    remove(path(boilerplatePath, "ios", "Pods"))
    remove(path(boilerplatePath, "node_modules"))
    remove(path(boilerplatePath, "android", ".idea"))
    remove(path(boilerplatePath, "android", ".gradle"))
    stopSpinner("Igniting app", "🔥")

    startSpinner(" 3D-printing a new React Native app")
    await copyBoilerplate(toolbox, {
      boilerplatePath,
      projectName,
      excluded: [".vscode", "node_modules", "yarn.lock"],
    })
    stopSpinner(" 3D-printing a new React Native app", "🖨")

    // note the original directory
    const cwd = log(process.cwd())

    // jump into the project to do additional tasks
    process.chdir(projectName)

    // copy the .gitignore if it wasn't copied over
    // Release Ignite installs have the boilerplate's .gitignore in .gitignore.template
    // (see https://github.com/npm/npm/issues/3763); development Ignite still
    // has it in .gitignore. Copy it from one or the other.
    const targetIgnorePath = log(path(process.cwd(), ".gitignore"))
    if (!exists(targetIgnorePath)) {
      // gitignore in dev mode?
      let sourceIgnorePath = log(path(boilerplatePath, ".gitignore"))

      // gitignore in release mode?
      if (!exists(sourceIgnorePath)) {
        sourceIgnorePath = log(path(boilerplatePath, ".gitignore.template"))
      }

      // copy the file over
      copy(sourceIgnorePath, targetIgnorePath)
    }
    // #endregion

    // #region Handle package.json
    // Update package.json:
    // - We need to replace the app name in the detox paths. We do it on the
    //   unparsed file content since that's easier than updating individual values
    //   in the parsed structure, then we parse that as JSON.
    // - If Expo, we also merge in our extra expo stuff.
    // - Then write it back out.
    let packageJsonRaw = read("package.json")
    packageJsonRaw = packageJsonRaw
      .replace(/HelloWorld/g, projectName)
      .replace(/hello-world/g, projectNameKebab)
    const packageJson = JSON.parse(packageJsonRaw)

    write("./package.json", packageJson)

    // TODO: still need this in this order, was an if (expo) ?
    // for some reason we need to do this, or we get an error about duplicate RNCSafeAreaProviders
    // see https://github.com/th3rdwave/react-native-safe-area-context/issues/110#issuecomment-668864576
    // await packager.add(`react-native-safe-area-context`, packagerOptions)
    // #endregion

    // #region Run Packager Install
    // pnpm/yarn/npm install it
    startSpinner("Unboxing npm dependencies")
    await packager.install({ ...packagerOptions, onProgress: log })
    stopSpinner("Unboxing npm dependencies", "🧶")

    // remove the gitignore template
    remove(".gitignore.template")
    // #endregion

    // #region Rename App
    // rename the app using Ignite
    startSpinner(" Writing your app name in the sand")

    await renameReactNativeApp(
      toolbox,
      "HelloWorld",
      projectName,
      "com.helloworld",
      bundleIdentifier,
    )

    stopSpinner(" Writing your app name in the sand", "🏝")
    // #endregion

    // #region Install CocoaPods
    // install pods
    startSpinner("Baking CocoaPods")
    await spawnProgress(`npx pod-install@${deps.podInstall}`, {
      onProgress: log,
    })
    stopSpinner("Baking CocoaPods", "☕️")
    // #endregion

    // #region Run Format
    // Make sure all our modifications are formatted nicely
    await packager.run("format", { ...packagerOptions, silent: !debug })
    // #endregion

    // #region Git
    // commit any changes
    if (options.git !== false) {
      startSpinner(" Backing everything up in source control")
      try {
        await system.run(
          log(`
            \\rm -rf ./.git
            git init;
            git add -A;
            git commit -m "New Ignite ${meta.version()} app";
          `),
        )
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
    clearSpinners()

    // we're done! round performance stats to .xx digits
    const perfDuration = Math.round((new Date().getTime() - perfStart) / 10) / 100

    p()
    p()
    heading(`${red("Ignite CLI")} ignited ${yellow(projectName)} in ${gray(`${perfDuration}s`)}`)
    p()
    direction(`To get started:`)
    command(`  cd ${projectName}`)

    if (process.platform === "darwin") {
      command(`  ${packager.runCmd("ios", packagerOptions)}`)
    }
    command(`  ${packager.runCmd("android", packagerOptions)}`)
    if (!isAndroidInstalled(toolbox)) {
      p()
      direction("To run in Android, make sure you've followed the latest react-native setup")
      direction("instructions at https://facebook.github.io/react-native/docs/getting-started")
      direction(
        "before using ignite. You won't be able to run Android successfully until you have.",
      )
    }
    p()
    direction("Or with Expo:")
    command(`  ${packager.runCmd("expo:start", packagerOptions)}`)
    // #endregion

    // #region React Native Colo Loco
    // React Native Colo Loco is no longer installed with Ignite, but
    // we will give instructions on how to install it if they
    // pass in `--colo-loco`
    const coloLoco = Boolean(options.coloLoco)

    if (coloLoco) {
      p()
      direction(`React Native Colo Loco`)
      p("React Native Colo Loco is no longer installed by default.")
      p("(More info: https://github.com/jamonholmgren/react-native-colo-loco)")
      p("However, you can install it with the following commands in your app folder:")
      p()
      command(`  ${packager.addCmd("-g react-native-colo-loco")}`)
      command(`  ${packager.runCmd("install-colo-loco", packagerOptions)}`)
    }
    // #endregion

    // #region Infinite Red Plug
    p()
    p("Need additional help?")
    p()
    direction("Join our Slack community at http://community.infinite.red.")
    p()
    heading("Now get cooking! 🍽")
    igniteHeading()
    // #endregion
  },
}
