import { GluegunFilesystem } from "gluegun"
import * as path from "path"

export const BOILERPLATE_PATH = path.join(__dirname, "../..", "/boilerplate")

const IGNORED_PATHS = [
  ".DS_Store",
  "/.expo",
  "/node_modules",
  "/ios/build",
  "/ios/Pods",
  "/android/build",
  "/android/app/build",
]

export function createGetAllFilePaths(filesystem: GluegunFilesystem) {
  /**
   * Recursively get all file paths in a directory
   */
  return function getAllFilePaths(dir: string): string[] {
    const dirChildren = filesystem.list(dir)
    const dirChildrenPaths = dirChildren
      .map((file) => `${dir}/${file}`)
      .filter((path) => !IGNORED_PATHS.some((ignoredPath) => path.endsWith(ignoredPath)))

    const filePaths = dirChildrenPaths.filter((path) => filesystem.isFile(path))
    const dirPaths = dirChildrenPaths.filter((path) => filesystem.isDirectory(path))

    const dirFilePaths = dirPaths.map(getAllFilePaths)
    return [filePaths, dirFilePaths].flat(Infinity) as string[]
  }
}
