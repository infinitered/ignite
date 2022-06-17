import { GluegunToolbox } from "gluegun"
import { direction, heading, p, warning } from "../tools/pretty"
import { renameReactNativeApp } from "../tools/react-native"

module.exports = {
  alias: ["rn"],
  description: "Renames a React Native and/or Ignite app",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, prompt, filesystem, print } = toolbox
    const { colors, info } = print
    const { red, green } = colors

    let newName = parameters.first
    let newBundleIdentifier = parameters.options.bundle

    // first, get the current name
    const oldName = require(`${process.cwd()}/app.json`).name
    if (!oldName) {
      warning("Couldn't find the current name in app.json.")
      return
    }

    // then, get the package name from Android
    const manifest = await filesystem.readAsync(
      `${process.cwd()}/android/app/src/main/AndroidManifest.xml`,
    )

    // match <manifest package="name" to get the bundle id
    const oldBundleIdentifier = manifest.match(/package="([^"]+)"/)[1]

    // do some validations here

    // check if we are in the folder with the package.json file
    if (!filesystem.exists(`${process.cwd()}/app.json`)) {
      warning("You must be in the root of a React Native project to rename it.")
      warning("(We look for an app.json file to verify this.)")
      return
    }

    // check the name
    if (!newName) {
      // ask for a name
      const result = await prompt.ask({
        type: "input",
        name: "newName",
        message: `What would you like to rename your app to? Currently: ${oldName}`,
      })
      newName = result.newName
    }

    if (!newName) {
      // no name, no go
      warning("No name provided, nothing to do.")
      return
    }

    // check the package name
    if (!newBundleIdentifier) {
      // ask for a name
      const result = await prompt.ask({
        type: "input",
        name: "newBundleIdentifier",
        message: `What would you like to rename your package to? Currently: ${oldBundleIdentifier}`,
      })
      newBundleIdentifier = result.newBundleIdentifier
    }

    if (!newBundleIdentifier) {
      // no name, no go
      warning("No package name provided, nothing to do.")
      return
    }

    // rename the app

    if (oldName === newName) {
      warning("The current name and the new name are the same.")
      return
    }

    await renameReactNativeApp(toolbox, oldName, newName, oldBundleIdentifier, newBundleIdentifier)

    heading(`Ignite successfully renamed your app from ${red(oldName)} to ${green(newName)}!`)
    p()
    heading(`Caveats:`)
    p()
    info(`    * Ignite's rename feature is not 100% perfect in all cases.`)
    info(`      Carefully examine the diff it produces with \`git diff\` before committing.`)
    info(`    * Additionally, you'll want to re-run \`pod install\` and`)
    info(`      rebuild your app and caches. We don't make any changes to those files or folders.`)
    p()
    direction(`Next: run \`git diff\` to see the changes we made.`)
    direction(`To reset everything: run \`git reset --hard && git clean -fd\``)
    warning(`(${red("careful")}: this will remove all other changes you haven't committed!)`)
  },
}
