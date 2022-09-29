import * as crypto from "crypto"
import { filesystem } from "gluegun"
import type { PackagerName } from "./packager"

const lockFile = {
  yarn: "yarn.lock",
  pnpm: "pnpm-lock.yaml",
  npm: "package-lock.json",
} as const

const MAC: NodeJS.Platform = "darwin"
const WINDOWS: NodeJS.Platform = "win32"
const LINUX: NodeJS.Platform = "linux"
const cachePath = {
  [MAC]: "Library/Caches",
  [WINDOWS]: "AppData/Local/Temp",
  [LINUX]: ".cache",
} as const

const { path, dir, homedir } = filesystem

function hash(str: string) {
  return crypto.createHash("md5").update(str).digest("hex")
}

interface TargetsOptions {
  rootDir: string
  packagerName: PackagerName
  platform: NodeJS.Platform | undefined
}
const targets = ({ rootDir, packagerName, platform }: TargetsOptions) => {
  return [
    { type: "dir", path: path(rootDir, "node_modules") },
    { type: "file", path: path(rootDir, lockFile[packagerName]) },
    { type: "dir", path: path(rootDir, "ios", "Pods"), platform: ["darwin"] },
    { type: "dir", path: path(rootDir, "ios", "build"), platform: ["darwin"] },
  ].filter((target) => (target?.platform ? target.platform.includes(platform) : true))
}

interface CopyOptions {
  fromRootDir: string
  toRootDir: string
  packagerName: PackagerName
  platform?: NodeJS.Platform
}
function copy(options: CopyOptions) {
  const { fromRootDir, toRootDir, packagerName, platform = process.platform } = options

  const fromTargets = targets({ rootDir: fromRootDir, packagerName, platform })
  const toTargets = targets({ rootDir: toRootDir, packagerName, platform })

  return Promise.all(
    fromTargets.map((from, index) => {
      const to = toTargets[index]
      if (from.type === "dir") {
        dir(from.path)
      }

      return filesystem.copyAsync(from.path, to.path, { overwrite: true })
    }),
  )
}

/**
 * Root directory path of ignite dependency cache
 */
function rootdir(platform: NodeJS.Platform = process.platform) {
  const folder = cachePath[platform] ?? cachePath[LINUX]
  return path(homedir(), folder, "ignite")
}

function clear() {
  filesystem.remove(rootdir())
}

/** Tool for managing cache of dependencies related to the ignite boilerplate */
export const cache = {
  copy,
  targets,
  hash,
  rootdir,
  clear,
} as const
