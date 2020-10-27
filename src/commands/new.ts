import * as tempy from "tempy"
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
    const boilerplateCopy = path(tempy.directory(), "boilerplate")
    if (expo) {
      filesystem.copy(boilerplatePath, boilerplateCopy)
      const packageJsonPath = path(boilerplateCopy, "package.json")
      const packageJson = filesystem.read(packageJsonPath, "json")
      delete packageJson.scripts.prepare
      filesystem.write(packageJsonPath, packageJson)
    }

    const cliString = expo
      ? `npx expo-cli init ${projectName} --template ${boilerplateCopy}`
      : `npx react-native init ${projectName} --template ${bowserPath}`

    log({ expo, cli, bowserPath, boilerplatePath, boilerplateCopy, cliString })

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

    // expo-specific changes
    if (expo) {
      // merge package.json with Expo's (if Expo)
      const merge = require("deepmerge-json")
      const dst = filesystem.read("package.json", "json")
      const src = filesystem.read("package.expo.json", "json")
      const pkgJob = filesystem.writeAsync("package.json", merge(dst, src))

      // remove the ios and android folders if we're spinning up an Expo app
      const iosJob = filesystem.removeAsync("ios")
      const androidJob = filesystem.removeAsync("android")

      // do all this concurrently for speed
      await Promise.all([iosJob, androidJob, pkgJob])

      // remove the expo-only package.json
      filesystem.remove("package.expo.json")

      // rename the index.js to App.js, which expo expects
      filesystem.rename("index.js", "App.js")

      p(`🧶 Unboxing NPM dependencies`)
      await packager.install({ onProgress: log })

      // for some reason we need to do this, or we get an error about duplicate RNCSafeAreaProviders
      // see https://github.com/th3rdwave/react-native-safe-area-context/issues/110#issuecomment-668864576
      // await packager.add("react-native-safe-area-context", { expo: true })
    }

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
