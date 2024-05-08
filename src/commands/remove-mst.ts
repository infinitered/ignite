import { GluegunToolbox, system } from "gluegun"
import * as pathlib from "path"
import { boolFlag } from "../tools/flag"
import { p, warning } from "../tools/pretty"
import { MST_MARKUP_PREFIX, mstCommentRegex, mstDependenciesToRemove } from "../tools/mst"
import { findFiles, removeEmptyDirs, updateFiles } from "../tools/markup"
import { removePackageJSONDependencies } from "../tools/dependencies"
// import { packager } from "../tools/packager"

module.exports = {
  alias: ["rm-mst", "remove-mst"],
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

    const filePaths = findFiles(TARGET_DIR)

    p(
      `Removing dependencies from package.json: ${mstDependenciesToRemove.join(", ")} ${
        dryRun ? "(dry run)" : ""
      }`,
    )
    if (!dryRun) {
      const packageJSONPath = pathlib.join(TARGET_DIR, "package.json")
      removePackageJSONDependencies(packageJSONPath, mstDependenciesToRemove)
    }

    const mstCommentResults = await updateFiles({
      filePaths,
      markupPrefix: MST_MARKUP_PREFIX,
      markupCommentRegex: mstCommentRegex,
      removeMarkupOnly: false,
      dryRun: dryRun,
    })

    // Handle the results of the mst comment operations
    mstCommentResults
      // Sort the results by the path in alphabetical order
      .sort((a, b) => {
        if (a.status === "fulfilled" && b.status === "fulfilled") {
          return a.value.path.localeCompare(b.value.path)
        }
        return 0
      })
      .forEach((result) => {
        // Log any rejected results as warnings
        if (result.status === "rejected") {
          warning(result.reason)
          return
        }

        // Log any fulfilled results that have comments
        const { path, comments } = result.value
        if (comments.length > 0) {
          p(`Found ${comments.map((c) => `'${c}'`).join(", ")} in ${path}`)
        }
      })

    // first pass
    const emptyDirsRemoved = removeEmptyDirs({ targetDir: TARGET_DIR, dryRun })
    emptyDirsRemoved.forEach((path) => {
      p(`Removed empty directory '${path}'`)
    })

    // patch app.tsx manually
    const appFile = pathlib.join(TARGET_DIR, "app/app.tsx")
    await toolbox.patching.patch(appFile, {
      after: `const [areFontsLoaded] = useFonts(customFontsToLoad)`,
      insert: `
        \n\n
        React.useEffect(() => {
          setTimeout(hideSplashScreen, 500)
        }, [])
        \n\n
        if (!isNavigationStateRestored || !areFontsLoaded) return null
        `,
    })

    // format
    await system.run(`npx prettier ${appFile}`)

    // templates
    const templateDir = pathlib.join(TARGET_DIR, "ignite/templates")
    // update templates/screen
    const screenTemplate = pathlib.join(templateDir, "screen/NAMEScreen.tsx.ejs")
    // TODO: show error if string not found in file (if template has been updated)
    await toolbox.patching.replace(
      screenTemplate,
      `observer(function <%= props.pascalCaseName %>Screen() {`,
      `() => {`,
    )
    await toolbox.patching.replace(screenTemplate, `})`, `}`) // currently '})' only exists once in the file

    // update templates/component
    const componentTemplate = pathlib.join(templateDir, "component/NAME.tsx.ejs")
    // TODO: show error if string not found in file (if template has been updated)
    await toolbox.patching.replace(
      componentTemplate,
      `observer(function <%= props.pascalCaseName %>(props: <%= props.pascalCaseName %>Props) {`,
      `(props: <%= props.pascalCaseName %>Props) => {`,
    )
    await toolbox.patching.replace(componentTemplate, `})`, `}`) // assuming '})' only exists once in the file

    p(`Done removing MobX-State-Tree code from '${TARGET_DIR}'${dryRun ? " (dry run)" : ""}`)
  },
}
