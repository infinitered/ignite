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

  const targets = (rootDir: string, packagerName: PackagerName) => [
    { type: "dir", path: path(rootDir, "node_modules") },
    { type: "file", path: path(rootDir, lockFile[packagerName]) },
    { type: "dir", path: path(rootDir, "ios", "Pods") },
    { type: "dir", path: path(rootDir, "ios", "build") },
  ]

  function copy(options: { fromRootDir: string; toRootDir: string; packagerName: PackagerName }) {
    const { fromRootDir, toRootDir, packagerName } = options

    const fromTargets = targets(fromRootDir, packagerName)
    const toTargets = targets(toRootDir, packagerName)

    fromTargets.forEach((fromTarget, index) => {
      const toTarget = toTargets[index]
      if (toTarget.type === "dir") {
        dir(fromTarget.path)
      }
      filesystem.copy(fromTarget.path, toTarget.path)
    })
  }

  return {
    copy,
    targets,
    hash,
  }
}

export const cache = createCacheTool(filesystem)
