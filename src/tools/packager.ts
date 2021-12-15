import { system } from "gluegun"
import { spawnProgress } from "./spawn"

// we really need a packager core extension on Gluegun
// in the meantime, we'll use this hacked together version

type PackageInstallOptions = {
  dev?: boolean
  expo?: boolean
  onProgress?: (out: string) => void
}
const packageInstallOptions: PackageInstallOptions = {
  dev: false,
  expo: false,
  onProgress: (out: string) => console.log(out),
}

type PackageListOptions = {
  packager?: "npm" | "yarn" | "pnpm"
  global?: boolean
}
const packageListOptions: PackageListOptions = {
  global: false,
}

let isYarn
function yarn() {
  if (isYarn !== undefined) return isYarn
  isYarn = Boolean(system.which("yarn"))
  return isYarn
}

let isPnpm
function pnpm() {
  if (isPnpm !== undefined) return isPnpm
  isPnpm = Boolean(system.which("pnpm"))
  return isPnpm
}

function add(pkg: string, options: PackageInstallOptions = packageInstallOptions) {
  if (options.expo) {
    return `npx expo-cli install ${pkg}`
  } else if (pnpm()) {
    const dev = options.dev ? " --save-dev" : ""
    return `pnpm install ${pkg}${dev}`
  } else if (yarn()) {
    const dev = options.dev ? " --dev" : ""
    return `yarn add ${pkg}${dev}`
  } else {
    const dev = options.dev ? " --save-dev" : ""
    return `npm install ${pkg}${dev}`
  }
}

function remove(pkg: string, options: PackageInstallOptions = packageInstallOptions) {
  if (options.expo) {
    return `npx expo-cli uninstall ${pkg}`
  } else if (pnpm()) {
    return `pnpm uninstall ${pkg}`
  } else if (yarn()) {
    return `yarn remove ${pkg}`
  } else {
    return `npm uninstall ${pkg}`
  }
}

function install() {
  if (pnpm()) {
    return "pnpm install"
  } else if (yarn()) {
    return `yarn install -s`
  } else {
    return `npm install`
  }
}

type PackageListOutput = [string, (string) => [string, string][]]
function list(options: PackageListOptions = packageListOptions): PackageListOutput {
  if (options.packager === "pnpm") {
    // TODO: pnpm list?
    throw new Error("pnpm list is not supported yet")
  } else if (options.packager === "yarn" || (options.packager === undefined && yarn())) {
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
        const json = JSON.parse(output)
        return Object.keys(json.dependencies || []).map((key: string): [string, string] => [
          key,
          json.dependencies[key].version,
        ])
      },
    ]
  }
}

export const packager = {
  runCmd: (command: string) => {
    if (pnpm()) {
      return `pnpm run ${command} --log-level=error`
    } else if (yarn()) {
      return `yarn ${command}`
    } else {
      return `npm run ${command}`
    }
  },
  run: async (command: string, options: PackageInstallOptions = packageInstallOptions) => {
    return spawnProgress(packager.runCmd(command), { onProgress: options.onProgress })
  },
  add: async (pkg: string, options: PackageInstallOptions = packageInstallOptions) => {
    const cmd = add(pkg, options)
    return spawnProgress(cmd, { onProgress: options.onProgress })
  },
  remove: async (pkg: string, options: PackageInstallOptions = packageInstallOptions) => {
    const cmd = remove(pkg, options)
    return spawnProgress(cmd, { onProgress: options.onProgress })
  },
  install: async (options: PackageInstallOptions = packageInstallOptions) => {
    const cmd = install()
    return spawnProgress(cmd, { onProgress: options.onProgress })
  },
  list: async (options: PackageListOptions = packageListOptions) => {
    const [cmd, parseFn] = list(options)
    return parseFn(await spawnProgress(cmd, {}))
  },
  is: (packageManager: "yarn" | "npm" | "pnpm"): boolean => {
    if (packageManager === "yarn") return yarn()
    if (packageManager === "pnpm") return pnpm()
    return true
  },
  name: (): string => {
    if (pnpm()) return "pnpm"
    if (yarn()) return "yarn"
    return "npm"
  },
}
