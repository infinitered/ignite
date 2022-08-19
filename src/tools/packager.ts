import { system } from "gluegun"
import { spawnProgress } from "./spawn"

// we really need a packager core extension on Gluegun
// in the meantime, we'll use this hacked together version

// Expo doesn't support pnpm, so we'll use yarn or npm
export type PackagerName = "npm" | "yarn" | "pnpm"
type PackageOptions = {
  packagerName?: PackagerName
  dev?: boolean
  global?: boolean
  silent?: boolean
}

type PackageRunOptions = PackageOptions & {
  onProgress?: (out: string) => void
}
const packageInstallOptions: PackageRunOptions = {
  dev: false,
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

function detectPackager(): PackagerName {
  if (yarnAvailable()) {
    return "yarn"
  } else if (pnpmAvailable()) {
    return "pnpm"
  } else {
    return "npm"
  }
}

function availablePackagers(): PackagerName[] {
  const packagers: PackagerName[] = ["npm"]

  if (yarnAvailable()) {
    packagers.push("yarn")
  }
  if (pnpmAvailable()) {
    packagers.push("pnpm")
  }

  return packagers
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

  if (options.packagerName === "pnpm") {
    cmd = `pnpm install`
  } else if (options.packagerName === "yarn") {
    cmd = `yarn add`
  } else if (options.packagerName === "npm") {
    cmd = `npm install`
  } else {
    // neither expo nor a packagerName was provided, so let's detect one
    return addCmd(pkg, { ...options, packagerName: detectPackager() })
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

  if (options.packagerName === "pnpm") {
    cmd = "pnpm uninstall"
  } else if (options.packagerName === "yarn") {
    cmd = `yarn remove`
  } else if (options.packagerName === "npm") {
    cmd = `npm uninstall`
  } else {
    // neither expo nor a packagerName was provided, so let's detect one
    return removeCmd(pkg, { ...options, packagerName: detectPackager() })
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

  if (options.packagerName === "pnpm") {
    return `pnpm install${silent}`
  } else if (options.packagerName === "yarn") {
    return `yarn install${silent}`
  } else if (options.packagerName === "npm") {
    return `npm install${silent}`
  } else {
    return installCmd({ ...options, packagerName: detectPackager() })
  }
}

type PackageListOutput = [string, (string) => [string, string][]]
export function list(options: PackageOptions = packageListOptions): PackageListOutput {
  if (options.packagerName === "pnpm") {
    // TODO: pnpm list?
    throw new Error("pnpm list is not supported yet")
  } else if (
    options.packagerName === "yarn" ||
    (options.packagerName === undefined && yarnAvailable())
  ) {
    return [
      `yarn${options.global ? " global" : ""} list`,
      (output: string): [string, string][] => {
        // Parse yarn's human-readable output
        return output
          .split("\n")
          .reduce((acc: [string, string][], line: string): [string, string][] => {
            const match = line.match(/info "([^@]+)@([^"]+)" has binaries/)
            return match ? [...acc, [match[1], match[2]]] : acc
          }, [])
      },
    ]
  } else {
    return [
      `npm list${options.global ? " --global" : ""} --depth=0 --json`,
      (output: string): [string, string][] => {
        // npm returns a single JSON blob with a "dependencies" key
        // however, sometimes npm can emit warning messages prepended to json output
        const json = JSON.parse(output.replace(/npm WARN.+/g, ""))
        return Object.keys(json.dependencies || []).map((key: string): [string, string] => [
          key,
          json.dependencies[key].version,
        ])
      },
    ]
  }
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
    const [cmd, parseFn] = list(options)
    return parseFn(await spawnProgress(cmd, {}))
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
  availablePackagers,
}
