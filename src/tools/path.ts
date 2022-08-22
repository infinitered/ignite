import { GluegunFilesystem } from "gluegun"
import * as path from "path"

export const BOILERPLATE_PATH = path.join(__dirname, "../..", "/boilerplate")

export function createGetAllFilePaths(filesystem: GluegunFilesystem) {
  /**
   * Recursively get all file paths in a directory
   */
  return function getAllFilePaths(dir: string): string[] {
    const files = filesystem.list(dir)
    const filePaths = files
      .map((file) => `${dir}/${file}`)
      .filter((file) => filesystem.isFile(file))
    const subdirs = files.filter((file) => filesystem.isDirectory(`${dir}/${file}`))
    const subdirPaths = subdirs.map((subdir) => getAllFilePaths(`${dir}/${subdir}`))
    return [...filePaths, ...subdirPaths.flat()]
  }
}
