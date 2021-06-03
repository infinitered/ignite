import { GluegunToolbox, filesystem } from "gluegun"

// export const isWindows = process.platform === "win32"

export const isAndroidInstalled = (toolbox: GluegunToolbox): boolean => {
  const androidHome = process.env.ANDROID_HOME
  const hasAndroidEnv = !toolbox.strings.isBlank(androidHome)
  const hasAndroid = hasAndroidEnv && toolbox.filesystem.exists(`${androidHome}/tools`) === "dir"

  return Boolean(hasAndroid)
}

type Params = {
  debug?: boolean
  expo?: boolean
}
type CLIEnv = NodeJS.ProcessEnv & { EXPO_DEBUG?: number }
type CLIStrings = {
  cliString: string
  cliEnv: CLIEnv
  debug: boolean
  cli: "@react-native-community/cli" | "expo-cli"
  boilerplatePath: string
}
type CLISrc = string | void

/**
 *
 * @param name The name of the app
 * @param src The source path of Ignite's CLI (to find the boilerplate)
 * @param parameters The parameters passed in
 * @returns
 */
export const buildCLIString = (name: string, src: CLISrc, options: Params): CLIStrings => {
  const { path } = filesystem

  const debug = Boolean(options.debug)
  const expo = Boolean(options.expo)
  const cli = expo ? "expo-cli" : "@react-native-community/cli"
  const ignitePath = path(`${src}`, "..")
  const boilerplatePath = path(ignitePath, "boilerplate")
  const cliTemplatePath = expo ? boilerplatePath : ignitePath
  const boilerplateExtraFlags = []
  if (expo) boilerplateExtraFlags.push("--non-interactive")
  if (!expo && debug) boilerplateExtraFlags.push("--verbose")

  const cliEnv = expo && debug ? ({ ...process.env, EXPO_DEBUG: 1 } as CLIEnv) : process.env
  const cliString = `npx ${cli} init ${name} --template ${cliTemplatePath} ${boilerplateExtraFlags.join(
    " ",
  )}`.trim()

  return { cliString, cliEnv, debug, cli, boilerplatePath }
}
