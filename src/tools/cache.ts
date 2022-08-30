import * as crypto from "crypto"
import { filesystem, GluegunFilesystem } from "gluegun"
import type { PackagerName } from "./packager"

const lockFile = {
  yarn: "yarn.lock",
  pnpm: "pnpm-lock.yaml",
  npm: "package-lock.json",
} as const

/**
 * Function to create cache tool
 *
 * @example
 * export default {
 *   run: async (toolbox: GluegunToolbox) => {
 *      const cache = createCacheTool(toolbox.filesystem)
 *   }
 * }
 */
export function createCacheTool(filesystem: GluegunFilesystem) {
  const { path, dir } = filesystem

  function hash(str: string) {
    return crypto.createHash("md5").update(str).digest("hex")
  }

  interface TargetsOptions {
    rootDir: string
    packagerName: PackagerName
    platform: NodeJS.Platform | undefined
  }
  const targets = ({ rootDir, packagerName, platform }: TargetsOptions) =>
    [
      { type: "dir", path: path(rootDir, "node_modules") },
      { type: "file", path: path(rootDir, lockFile[packagerName]) },
      { type: "dir", path: path(rootDir, "ios", "Pods"), platform: ["darwin"] },
      { type: "dir", path: path(rootDir, "ios", "build"), platform: ["darwin"] },
    ].filter((target) => (target.platform ? target.platform.includes(platform) : true))

  interface CopyOptions {
    fromRootDir: string
    toRootDir: string
    packagerName: PackagerName
    platform: NodeJS.Platform
  }
  function copy(options: CopyOptions) {
    const { fromRootDir, toRootDir, packagerName, platform } = options

    const fromTargets = targets({ rootDir: fromRootDir, packagerName, platform })
    const toTargets = targets({ rootDir: toRootDir, packagerName, platform })

    fromTargets.forEach((from, index) => {
      const to = toTargets[index]
      if (from.type === "dir") {
        dir(from.path)
      }

      filesystem.copy(from.path, to.path)
    })
  }

  return {
    copy,
    targets,
    hash,
  }
}

export const cache = createCacheTool(filesystem)
