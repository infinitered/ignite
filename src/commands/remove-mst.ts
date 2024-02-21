import { GluegunToolbox, filesystem } from "gluegun"
import * as pathlib from "path"
import { boolFlag } from "../tools/flag"
import { p } from "../tools/pretty"
import { packager } from "../tools/packager"

const { run: jscodeshift } = require("jscodeshift/src/Runner")

export const mstDependenciesToRemove = [
  "mobx",
  "mobx-react-lite",
  "mobx-state-tree",
  "reactotron-mst",
]

module.exports = {
  alias: ["rmst", "remove-mst"],
  description:
    "Remove MobX-State-Tree code from generated boilerplate. Add --dry-run to see what would be removed.",
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox

    const CWD = process.cwd()
    const TARGET_DIR = parameters.first ?? CWD
    const dryRun = boolFlag(parameters.options.dryRun) ?? false

    // TODO: full dryRun support

    p()
    p(`Removing MobX-State-Tree code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)

    // delete entire app/models dir
    const modelsDir = pathlib.join(TARGET_DIR, "app/models")
    if (filesystem.exists(modelsDir) && !dryRun) {
      filesystem.remove(modelsDir)
    }

    // patch observer() usage
    const filesToProcess = [
      "app/navigators/AppNavigator.tsx",
      "app/screens/WelcomeScreen.tsx",
      "app/app.tsx",
      "app/devtools/ReactotronConfig.ts",
    ]
    const transformPath = pathlib.join(__dirname, "../tools/remove-mst-transformer.ts")
    const paths = filesToProcess.map((file) => pathlib.join(TARGET_DIR, file))
    const options = {
      dry: dryRun,
      print: false,
      importsToRemove: mstDependenciesToRemove,
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
    await toolbox.patching.replace(
      appFile,
      `import React from "react"`,
      `import React, { useEffect } from "react"`,
    )
    await toolbox.patching.patch(appFile, {
      delete: `import { useInitialRootStore } from "./models"`,
    })
    await toolbox.patching.patch(appFile, {
      insert: `\n\nuseEffect(() => {\nsetTimeout(hideSplashScreen, 500)\n}, [])`,
      after: `const [areFontsLoaded] = useFonts(customFontsToLoad)`,
    })

    // templates
    const templateDir = pathlib.join(TARGET_DIR, "ignite/templates")
    // remove templates/models
    const modelsTemplateDir = pathlib.join(templateDir, "model")
    if (filesystem.exists(modelsTemplateDir) && !dryRun) {
      filesystem.remove(modelsTemplateDir)
    }

    // update templates/screen
    const screenTemplate = pathlib.join(templateDir, "screen/NAMEScreen.tsx.ejs")
    const screenTemplateLinesToDelete = [
      `import { observer } from "mobx-react-lite"`,
      `// import { useStores } from "app/models"`,
      `// Pull in one of our MST stores`,
      `// const { someStore, anotherStore } = useStores()`,
    ]
    for (const line of screenTemplateLinesToDelete) {
      await toolbox.patching.patch(screenTemplate, {
        delete: line,
      })
    }

    await toolbox.patching.replace(
      screenTemplate,
      `observer(function <%= props.pascalCaseName %>Screen() {`,
      `() => {`,
    )
    await toolbox.patching.replace(screenTemplate, `})`, `}`) // currently '})' only exists once in the file

    // update templates/component
    const componentTemplate = pathlib.join(templateDir, "component/NAME.tsx.ejs")
    await toolbox.patching.patch(componentTemplate, {
      delete: `import { observer } from "mobx-react-lite"`,
    })
    await toolbox.patching.replace(
      componentTemplate,
      `observer(function <%= props.pascalCaseName %>(props: <%= props.pascalCaseName %>Props) {`,
      `(props: <%= props.pascalCaseName %>Props) => {`,
    )
    await toolbox.patching.replace(componentTemplate, `})`, `}`) // assuming '})' only exists once in the file

    await packager.run("format")

    p(`Done removing MobX-State-Tree code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
