import { GluegunToolbox } from "../types"
import { spawnProgress } from "../tools/spawn"
import { isAndroidInstalled } from "../tools/react-native"
import { packager } from "../tools/packager"
import { p, heading, command, direction, igniteHeading } from "../tools/pretty"

export default {
  run: async (toolbox: GluegunToolbox) => {
    const { print, filesystem, system, meta, parameters } = toolbox
    const { path } = filesystem
    const { info, colors } = print
    const { gray, red, magenta, cyan, yellow } = colors

    // start tracking performance
    const perfStart = new Date().getTime()

    // retrieve project name from toolbox
    const { validateProjectName } = require("../tools/validations")
    const projectName = validateProjectName(toolbox)

    // debug?
    const debug = Boolean(parameters.options.debug)
    const log = (m) => {
      if (debug) info(m)
      return m
    }

    // expo or no?
    const expo = Boolean(parameters.options.expo)
    const cli = expo ? "expo-cli" : "react-native-cli"
    const bowserPath = path(`${meta.src}`, "..")
    const boilerplatePath = path(bowserPath, "boilerplate")
    const cliString = expo
      ? `npx expo-cli init ${projectName} --template ${boilerplatePath}`
      : `npx react-native init ${projectName} --template ${bowserPath}`

    log({ expo, cli, bowserPath, boilerplatePath, cliString })

    // welcome everybody!
    p("\n")
    igniteHeading()
    p(` █ Creating ${magenta(projectName)} using ${red("Ignite Bowser")} ${meta.version()}`)
    p(` █ Powered by ${red("Infinite Red")} - https://infinite.red`)
    p(` █ Using ${cyan(cli)}`)
    p(` ────────────────────────────────────────────────\n`)
    p(`🔥 Igniting app`)

    // generate the project
    await spawnProgress(log(cliString), {
      onProgress: (out: string) => {
        out = log(out.toString())

        if (expo) {
          if (out.includes("Using Yarn")) p(`🪔 Summoning Expo CLI`)
          if (out.includes("project is ready")) p(`🎫 Cleaning up Expo install`)
        } else {
          if (out.includes("Welcome to React Native!")) p(`🖨  3D-printing a new React Native app`)
          if (out.includes("Run instructions for")) p(`🧊 Cooling print nozzles`)
        }
      },
    })

    // note the original directory
    const cwd = log(process.cwd())

    // jump into the project to do additional tasks
    process.chdir(projectName)

    // copy the .gitignore if it wasn't copied over [expo...]
    const gitPath = log(path(process.cwd(), ".gitignore"))
    if (!filesystem.exists(gitPath)) {
      filesystem.copy(path(boilerplatePath, ".gitignore"), gitPath)
    }

    // Update package.json. Having a "prepare" script in package.json
    // messes up expo-cli init above (it fails because npm-run-all hasn't been
    // installed yet), so we're adding it here; we also need to merge in our
    // extra expo stuff.
    let packageJson = filesystem.read("package.json", "json")
    packageJson.scripts.prepare = "npm-run-all patch hack:*"
    if (expo) {
      const merge = require("deepmerge-json")
      const expoJson = filesystem.read("package.expo.json", "json")
      packageJson = merge(expoJson, packageJson)
    }
    filesystem.write("package.json", packageJson)

    // More Expo-specific changes
    if (expo) {
      // remove the ios and android folders
      filesystem.remove("ios")
      filesystem.remove("android")

      // rename the index.js to App.js, which expo expects
      filesystem.rename("index.js", "App.js")

      p(`🧶 Unboxing NPM dependencies`)
      await packager.install({ onProgress: log })

      // for some reason we need to do this, or we get an error about duplicate RNCSafeAreaProviders
      // see https://github.com/th3rdwave/react-native-safe-area-context/issues/110#issuecomment-668864576
      // await packager.add("react-native-safe-area-context", { expo: true })
    }

    // remove the expo-only package.json
    filesystem.remove("package.expo.json")

    // TODO: copy over generators

    // install pods
    p(`☕️ Baking CocoaPods`)
    await spawnProgress("npx pod-install", {})

    // commit any changes
    if (parameters.options.git !== false) {
      p(`🗄  Backing everything up in source control`)
      await system.run(
        log(`
          \\rm -rf ./.git
          git init;
          git add -A;
          git commit -m "New Ignite Bowser app";
        `),
      )
    }

    // back to the original directory
    process.chdir(log(cwd))

    // we're done! round performance stats to .xx digits
    const perfDuration = Math.round((new Date().getTime() - perfStart) / 10) / 100
    const androidInfo = isAndroidInstalled(toolbox)
      ? ""
      : `\n\nTo run in Android, make sure you've followed the latest react-native setup instructions at https://facebook.github.io/react-native/docs/getting-started.html before using ignite.\nYou won't be able to run Android successfully until you have.`

    const runIos = process.platform === "darwin" ? "npx react-native run-ios\n     " : ""
    const runInfo = expo ? "yarn start" : `${runIos}npx react-native run-android${androidInfo}`

    p()
    p()
    heading(`${red("Ignite CLI")} ignited ${yellow(projectName)} in ${gray(`${perfDuration}s`)}`)
    p()
    direction(`To get started:`)
    command(`  cd ${projectName}`)
    command(`  ${runInfo}`)
    p()
    p("Need additional help?")
    p()
    direction("Join our Slack community at http://community.infinite.red.")
    p()
    heading("Now get cooking! 🍽")
    igniteHeading()
  },
}
