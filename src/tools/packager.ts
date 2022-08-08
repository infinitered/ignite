import { system } from "gluegun"
import { isValidJson } from "./guards"
import { spawnChunked, spawnProgress } from "./spawn"

// we really need a packager core extension on Gluegun
// in the meantime, we'll use this hacked together version

// Expo doesn't support pnpm, so we'll use yarn or npm
type PackageManager = "npm" | "yarn" | "pnpm"
type SupportedPackager = "npm" | "yarn"

type PackageOptions =
  | {
      packagerName?: PackageManager
      dev?: boolean
      expo?: false
      global?: boolean
      silent?: boolean
    }
  | {
      packagerName?: SupportedPackager
      dev?: boolean
      expo?: true
      global?: boolean
      silent?: boolean
    }

type PackageRunOptions = PackageOptions & {
  onProgress?: (out: string) => void
}
const packageInstallOptions: PackageRunOptions = {
  dev: false,
  expo: false,
  onProgress: (out: string) => console.log(out),
}

const packageListOptions: PackageOptions = {
  global: false,
}

let isYarn
function yarnAvailable() {
  if (isYarn !== undefined) return isYarn
  isYarn = Boolean(system.which("yarn"))
  return isYarn
}

let isPnpm
function pnpmAvailable() {
  if (isPnpm !== undefined) return isPnpm
  isPnpm = Boolean(system.which("pnpm"))
  return isPnpm
}

function detectPackager(options: PackageOptions): PackageManager {
  // Expo doesn't support pnpm, so we'll use yarn or npm
  if (!options?.expo && pnpmAvailable()) {
    return "pnpm"
  } else if (yarnAvailable()) {
    return "yarn"
  } else {
    return "npm"
  }
}

/**
 *
 * Returns a string command to run a generic install with a packager of your choice (or auto-detects).
 *
 * For example, `yarn add ramda` or `npm install ramda`.
 *
 */
function addCmd(pkg: string, options: PackageRunOptions = packageInstallOptions) {
  const silent = options.silent ? " --silent" : ""

  let cmd

  if (options.expo) {
    cmd = `npx expo-cli install`
  } else if (options.packagerName === "pnpm") {
    cmd = `pnpm install`
  } else if (options.packagerName === "yarn") {
    cmd = `yarn add`
  } else if (options.packagerName === "npm") {
    cmd = `npm install`
  } else {
    // neither expo nor a packagerName was provided, so let's detect one
    return addCmd(pkg, { ...options, expo: false, packagerName: detectPackager(options) })
  }

  return `${cmd} ${pkg}${options.dev ? " --save-dev" : ""}${silent}`
}

/**
 *
 * Returns a string command to remove a package with a packager of your choice (or auto-detects).
 *
 * For example, `yarn remove ramda` or `npm uninstall ramda`.
 *
 */
function removeCmd(pkg: string, options: PackageOptions = packageInstallOptions) {
  const silent = options.silent ? " --silent" : ""

  let cmd

  if (options.expo) {
    cmd = "npx expo-cli uninstall"
  } else if (options.packagerName === "pnpm") {
    cmd = "pnpm uninstall"
  } else if (options.packagerName === "yarn") {
    cmd = `yarn remove`
  } else if (options.packagerName === "npm") {
    cmd = `npm uninstall`
  } else {
    // neither expo nor a packagerName was provided, so let's detect one
    return removeCmd(pkg, { ...options, expo: false, packagerName: detectPackager(options) })
  }

  return `${cmd} ${pkg}${options.dev ? " --save-dev" : ""}${silent}`
}

/**
 *
 * Returns a string command to run a generic install with a packager of your choice (or auto-detects).
 *
 * For example, `yarn install` or `npm install`.
 *
 */
function installCmd(options: PackageRunOptions) {
  const silent = options.silent ? " --silent" : ""

  if (options.expo) {
    return `npx expo-cli install${silent}`
  } else if (options.packagerName === "pnpm") {
    return `pnpm install${silent}`
  } else if (options.packagerName === "yarn") {
    return `yarn install${silent}`
  } else if (options.packagerName === "npm") {
    return `npm install${silent}`
  } else {
    return installCmd({ ...options, expo: false, packagerName: detectPackager(options) })
  }
}

type CmdChunkReducer = (cmdChunks: string[]) => string | undefined
export const cmdChunkReducer: Record<PackageManager, CmdChunkReducer> = {
  npm: (cmdChunks) =>
    cmdChunks.find((line) => isValidJson(line) && "dependencies" in JSON.parse(line)),
  yarn: (cmdChunks) => cmdChunks[0],
  pnpm: (cmdChunks) => cmdChunks[0],
}

type Dependency = [key: string, semver: string]
type DependencyParser = (output: string) => Dependency[]
type PackageListOutputParser = [cmd: string, parser: DependencyParser]
export function listCmdOutputParser(
  options: PackageOptions = packageListOptions,
): PackageListOutputParser {
  if (options.packagerName === "pnpm") {
    // TODO: pnpm list?
    throw new Error("pnpm list is not supported yet")
  } else if (
    options.packagerName === "yarn" ||
    (options.packagerName === undefined && yarnAvailable())
  ) {
    return [
      `yarn${options.global ? " global" : ""} list`,
      (output: string): Dependency[] => {
        // Parse yarn's human-readable output
        return output.split("\n").reduce((acc: Dependency[], line: string): Dependency[] => {
          const match = line.match(/info "([^@]+)@([^"]+)" has binaries/)
          return match ? [...acc, [match[1], match[2]]] : acc
        }, [])
      },
    ]
  } else {
    return [
      `npm list${options.global ? " --global" : ""} --depth=0 --json`,
      (output: string): Dependency[] => {
        // npm returns a single JSON blob with a "dependencies" key
        const json = JSON.parse(output)
        return Object.keys(json.dependencies || []).map(
          (key: string): Dependency => [key, json.dependencies[key].version],
        )
      },
    ]
  }
}

type CmdExecuter = (cmd: string) => Promise<string[]>
type ListCmdServices = {
  cmd: string
  executer: CmdExecuter
  reducer: CmdChunkReducer
  parser: DependencyParser
}
export async function listCmd({ cmd, executer, reducer, parser }: ListCmdServices) {
  const outputChunks = await executer(cmd)
  const cmdOutput: string | undefined = reducer(outputChunks)

  if (cmdOutput === undefined) {
    throw Error(`Could not find expected ${cmd} output`)
  }

  return parser(cmdOutput)
}

/**
 * Returns a string command to run a script via a packager of your choice.
 */
function runCmd(command: string, options: PackageOptions) {
  const silent = options.silent ? " --silent" : ""
  if (options.packagerName === "pnpm") {
    return `pnpm run ${command}${silent}`
  } else if (options.packagerName === "yarn") {
    return `yarn ${command}${silent}`
  } else {
    // defaults to npm run
    return `npm run ${command}${silent}`
  }
}

export const packager = {
  run: async (command: string, options: PackageRunOptions = packageInstallOptions) => {
    return spawnProgress(`${runCmd(command, options)}`, {
      onProgress: options.onProgress,
    })
  },
  add: async (pkg: string, options: PackageRunOptions = packageInstallOptions) => {
    const cmd = addCmd(pkg, options)
    return spawnProgress(cmd, { onProgress: options.onProgress })
  },
  remove: async (pkg: string, options: PackageRunOptions = packageInstallOptions) => {
    const cmd = removeCmd(pkg, options)
    return spawnProgress(cmd, { onProgress: options.onProgress })
  },
  install: async (options: PackageRunOptions = packageInstallOptions) => {
    const cmd = installCmd(options)
    return spawnProgress(cmd, { onProgress: options.onProgress })
  },
  list: async (options: PackageOptions = packageListOptions) => {
    const [cmd, parser] = listCmdOutputParser(options)
    const { packagerName = "npm" } = options
    const reducer = cmdChunkReducer[packagerName]

    return listCmd({ cmd, reducer, parser, executer: spawnChunked })
  },
  has: (packageManager: "yarn" | "npm" | "pnpm"): boolean => {
    if (packageManager === "yarn") return yarnAvailable()
    if (packageManager === "pnpm") return pnpmAvailable()
    return true
  },
  detectPackager,
  runCmd,
  addCmd,
  installCmd,
}
