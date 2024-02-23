import { GluegunToolbox, filesystem, system } from "gluegun"
import * as pathlib from "path"
import { boolFlag } from "../tools/flag"
import { p, warning } from "../tools/pretty"
import { DEFAULT_MATCHING_GLOBS, mst } from "../tools/mst"
// import { packager } from "../tools/packager"

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

    const filePaths = mst.find(TARGET_DIR)

    // Go through every file path and handle the operation for each mst comment
    const mstCommentResults = await mst.update({ filePaths, dryRun })

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

    function removeEmptyDirs() {
      const emptyDirPaths = filesystem
        .cwd(TARGET_DIR)
        .find({
          matching: DEFAULT_MATCHING_GLOBS,
          recursive: true,
          files: false,
          directories: true,
        })
        .map((path) => pathlib.join(TARGET_DIR, path))
        .filter((path) => !filesystem.list(path)?.length)

      emptyDirPaths.forEach((path) => {
        if (!dryRun) filesystem.remove(path)
        p(`Removed empty directory '${path}'`)
      })
    }

    // first pass
    removeEmptyDirs()
    // second pass, for nested directories that are now empty after the first pass
    // https://github.com/infinitered/ignite/issues/2225
    removeEmptyDirs()

    // patch app.tsx
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
