import { GluegunToolbox, filesystem } from "gluegun"
import * as pathlib from "path"
import { boolFlag } from "../tools/flag"
import { p } from "../tools/pretty"
// import * as fs from "fs"
// import parser from "ts-node"

// import * as recast from "recast"
// import * as typescript from "recast/parsers/typescript"

const { run: jscodeshift } = require("jscodeshift/src/Runner")

module.exports = {
  alias: ["rmst", "remove-mst"],
  description:
    "Remove MobX-State-Tree code from generated boilerplate. Add --dry-run to see what would be removed.",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    const dryRun = boolFlag(parameters.options.dryRun) ?? false

    p()
    p(`Removing MobX-State-Tree code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)

    // remove package.json dependencies
    const dependenciesToRemove = ["mobx", "mobx-react-lite", "mobx-state-tree", "reactotron-mst"]
    const packageJsonPath = pathlib.join(TARGET_DIR, "package.json")
    const packageJson = filesystem.read(packageJsonPath, "json")
    if (packageJson) {
      const updatedPackageJson = {
        ...packageJson,
        dependencies: {
          ...packageJson.dependencies,
        },
      }
      dependenciesToRemove.forEach((dependency) => {
        if (updatedPackageJson.dependencies[dependency]) {
          delete updatedPackageJson.dependencies[dependency]
        }
      })
      if (!dryRun) {
        filesystem.write(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2))
      }
    }

    // // delete app/models dir
    const modelsDir = pathlib.join(TARGET_DIR, "app/models")
    if (filesystem.exists(modelsDir) && !dryRun) {
      filesystem.remove(modelsDir)
    }

    // patch observer() usage
    const filesToProcess = [
      "app/navigators/AppNavigator.tsx",
      "app/screens/WelcomeScreen.tsx",
      "app/app.tsx",
    ]
    const transformPath = pathlib.join(__dirname, "../tools/remove-mst-transformer.ts")
    const paths = filesToProcess.map((file) => pathlib.join(TARGET_DIR, file))
    const options = {
      dry: false, // TODO:
      print: true,
      verbose: 1,
    }
    const res = await jscodeshift(transformPath, paths, options)
    console.log(res)

    // patch app.tsx
    const appFile = pathlib.join(TARGET_DIR, "app/app.tsx")
    await toolbox.patching.replace(
      appFile,
      `if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null`,
      `if (!isNavigationStateRestored || !areFontsLoaded) return null`,
    )
    await toolbox.patching.patch(appFile, {
      delete: `import { useInitialRootStore } from "./models"`,
    })
    await toolbox.patching.replace(
      appFile,
      `import React from "react"`,
      `import React, { useEffect } from "react"`,
    )
    await toolbox.patching.patch(appFile, {
      insert: `\n\nuseEffect(() => {\nsetTimeout(hideSplashScreen, 500)\n}, [])`,
      after: `const [areFontsLoaded] = useFonts(customFontsToLoad)`,
    })

    p(`Done removing MobX-State-Tree code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
