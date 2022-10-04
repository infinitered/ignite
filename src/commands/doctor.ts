/**
 * This command checks the current dev environment to see if their machine is set up
 * to run Ignite properly. This needs some TLC, as it is mostly designed
 * for the old Ignite CLI and Bowser. Ignite v4 ("flame") is a combination of the two.
 */
import { GluegunToolbox } from "gluegun"
import * as os from "os"
import { packager } from "../tools/packager"

const isWindows = process.platform === "win32"
const isMac = process.platform === "darwin"

module.exports = {
  description: "Checks your dev environment for dependencies.",
  run: async function (toolbox: GluegunToolbox) {
    // fistful of features
    const {
      filesystem: { separator, isFile },
      system: { run, which },
      print: { colors, info, table },
      strings: { padEnd },
      meta,
    } = toolbox

    // display helpers
    const column1 = (label, length = 16) => padEnd(label || "", length)
    const column2 = (label) => colors.yellow(padEnd(label || "-", 10))
    const column3 = (label) => colors.muted(label)

    // -=-=-=- system -=-=-=-
    const platform = process.platform
    const arch = os.arch()
    const cpus = os.cpus() || []
    const firstCpu = cpus[0] || { model: undefined }
    const cpu = `${firstCpu.model}`
    const cores = `${cpus.length} cores`
    const directory = `${process.cwd()}`

    info(colors.cyan("System"))
    table([
      [column1("platform"), column2(platform), column3("")],
      [column1("arch"), column2(arch), column3("")],
      [column1("cpu"), column2(cores), column3(cpu)],
      [column1("directory"), column2(directory.split(separator).pop()), column3(directory)],
    ])

    // -=-=-=- javascript -=-=-=-
    const nodePath = which("node")
    const nodeVersion = (await run("node --version", { trim: true })).replace("v", "")
    const npmPath = which("npm")
    const npmVersion = npmPath && (await run("npm --version", { trim: true }))
    const yarnPath = which("yarn")
    const yarnVersion = yarnPath && (await run("yarn --version", { trim: true }))
    const pnpmPath = which("pnpm")
    const pnpmVersion = pnpmPath && (await run("pnpm --version", { trim: true }))

    const nodeInfo = [column1("node"), column2(nodeVersion), column3(nodePath)]
    const npmInfo = [column1("npm"), column2(npmVersion), column3(npmPath || "not installed")]
    const yarnInfo = [column1("yarn"), column2(yarnVersion), column3(yarnPath || "not installed")]
    const pnpmInfo = [column1("pnpm"), column2(pnpmVersion), column3(pnpmPath || "not installed")]

    async function packageInfo(packagerName: "npm" | "yarn" | "pnpm") {
      return (await packager.list({ packagerName, global: true })).map((nameAndVersion) => [
        column1("  " + nameAndVersion[0]),
        column2(nameAndVersion[1]),
        column3(""),
      ])
    }
    const npmPackages = npmPath ? await packageInfo("npm") : []
    const yarnPackages = yarnPath ? await packageInfo("yarn") : []
    // TODO: list pnpm global packages in doctor output
    const pnpmPackages = pnpmPath
      ? [[column1("  "), column2("<no pnpm global package info available>"), column3("")]]
      : []
    const haveGlobalPackages = npmPackages.length > 0 || yarnPackages.length > 0

    const expoVersionCmd = "npm list --depth 0 expo 2>&1"
    let expoVersion
    let expoWorkflow

    function expoWorkflowInfo() {
      const iosFound = isFile(`${directory}\\ios\\.xcodeproj`)
      const androidFound = isFile(`${directory}\\android\\.gradle`)

      return iosFound || androidFound
    }

    try {
      expoVersion = (await run(expoVersionCmd))?.match(/expo@(.*)/)?.slice(-1)[0]
      expoWorkflow = expoWorkflowInfo() ? "bare" : "managed"
    } catch (_) {
      expoVersion = "-"
      expoWorkflow = "not installed"
    }

    const expoInfo = [column1("expo"), column2(expoVersion), column3(expoWorkflow)]

    info("")
    info(colors.cyan(`JavaScript${haveGlobalPackages ? " (and globally-installed packages)" : ""}`))
    table([
      nodeInfo,
      npmInfo,
      ...npmPackages,
      yarnInfo,
      ...yarnPackages,
      pnpmInfo,
      ...pnpmPackages,
      expoInfo,
    ])

    // -=-=-=- ignite -=-=-=-
    const ignitePath = which("ignite")
    const igniteSrcPath = `${meta.src}`
    const igniteVersion = meta.version()

    info("")
    info(colors.cyan("Ignite"))
    const igniteTable = []
    igniteTable.push([column1("ignite-cli"), column2(igniteVersion), column3(ignitePath)])
    igniteTable.push([
      column1("ignite src"),
      column2(igniteSrcPath.split(separator).pop()),
      column3(igniteSrcPath),
    ])
    table(igniteTable)

    // -=-=-=- android -=-=-=-
    const androidPath = process.env.ANDROID_HOME
    let javaPath = which("java")
    const javaVersionCmd = "java -version 2>&1"
    let javaVersion

    try {
      javaVersion = javaPath && (await run(javaVersionCmd))?.match(/"(.*)"/)?.slice(-1)[0]
    } catch (_) {
      javaVersion = "-"
      javaPath = "not installed"
    }

    info("")
    info(colors.cyan("Android"))
    table([
      [column1("java"), column2(javaVersion), column3(javaPath)],
      [column1("android home"), column2("-"), column3(androidPath)],
    ])

    // -=-=-=- iOS -=-=-=-
    if (isMac) {
      const xcodePath = which("xcodebuild")
      const xcodeVersion =
        xcodePath && (await run("xcodebuild -version", { trim: true })).split(/\s/)[1]

      info("")
      info(colors.cyan("iOS"))
      table([[column1("xcode"), column2(xcodeVersion)]])

      const cocoaPodsPath = which("pod") || ""
      const cocoaPodsVersion = cocoaPodsPath
        ? await run("pod --version", { trim: true })
        : "Not installed"
      table([[column1("cocoapods"), column2(cocoaPodsVersion), column3(cocoaPodsPath)]])
    }

    // -=-=-=- windows -=-=-=-
    // TODO: what can we check on Windows?
    if (isWindows) {
      // info('')
      // info(colors.cyan('Windows'))
      // table([])
    }

    // -=-=-=- tools -=-=-=-
    info("")
    info(colors.cyan("Tools"))
    const gitPath = which("git")
    const gitVersion = gitPath && (await run("git --version", { trim: true }))
    const gitInfo = [column1("git"), column2(gitVersion), column3(gitPath || "not installed")]
    table([gitInfo])
  },
}
