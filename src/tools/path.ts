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

export function createGetIgnoredFiles(filesystem: GluegunFilesystem) {
  /**
   * Get an array of all the files in a gitignore file
   * @param gitignorePath Path to the gitignore file
   * @returns Array of files to ignore
   * @example
   * getIgnoredFiles("/Users/username/project/.gitignore")
   * // => ["/Users/username/project/node_modules", "/Users/username/project/dist"]
   */
  return function getIgnoredFiles(gitignorePath: string): string[] {
    const gitignore = filesystem.read(gitignorePath)
    const lines = gitignore.split("\n")
    const ignoredFiles = lines
      .filter((line) => !line.startsWith("#"))
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    return ignoredFiles
  }
}
