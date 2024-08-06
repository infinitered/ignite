import { filesystem, patching } from "gluegun"
import * as pathlib from "path"

// all possible comment types
export enum MarkupComments {
  RemoveCurrentLine = "remove-current-line",
  RemoveNextLine = "remove-next-line",
  RemoveBlockStart = "remove-block-start",
  RemoveBlockEnd = "remove-block-end",
  RemoveFile = "remove-file",
  ReplaceNextLine = "replace-next-line",
}

// markup comments follow format:
// // @prefix ActionName
export const markupComment = (prefix: string, commentType: MarkupComments) =>
  `${prefix} ${commentType}`

export const markupRegex = (prefix: string) => {
  const pattern = `(\\/\\/|#)\\s*${prefix}.*|{?\\/.*${prefix}.*\\/}?`
  return new RegExp(pattern, "gm")
}

/**
 * Take the file content as a string and remove any
 * line of code with an `// @x remove-current-line` comment
 */
export function removeCurrentLine(contents: string, comment: string): string {
  const lines = contents.split("\n")
  const result = lines.filter((line) => !line.includes(comment))
  return result.join("\n")
}

/**
 * Take the file content as a string and remove the next line
 * of code with the REMOVE_NEXT_LINE comment before it
 */
export function removeNextLine(contents: string, comment: string): string {
  const lines = contents.split("\n")
  const result = lines.filter((line, index) => {
    const prevLine = lines[index - 1]

    const preserveCurrent = line.includes(comment) === false
    const preservePrevious = prevLine !== undefined && prevLine.includes(comment) === false

    if (index === 0) {
      // if we are on the first line, there is no previous line to check
      return preserveCurrent
    }

    // keep current line if there is no comment in current or previous line
    const keepLine = preserveCurrent && preservePrevious
    return keepLine
  })
  return result.join("\n")
}

/**
 * Take the file content as a string and replace the current line
 * of code with the contents of the REPLACE_NEXT_LINE comment before it
 * example: // @prefix replace-next-line const newLine = "new line"
 */
export function replaceNextLine(contents: string, comment: string): string {
  const lines = contents.split("\n")
  const result = lines.map((line, index) => {
    const prevLine = lines[index - 1]
    if (prevLine?.includes(comment)) {
      const newLineContent = prevLine.replace("//", "").replace(comment, "").trim()
      return newLineContent
    } else {
      return line
    }
  })
  return result.join("\n")
}

/**
 * Take the file content as a string and remove the lines of code between
 * start and end block comments
 */
export function removeBlocks(contents: string, comment: { start: string; end: string }): string {
  const { start, end } = comment
  const lines = contents.split("\n")

  const findIndex = (l: typeof lines, c: typeof start | typeof end) =>
    l.findIndex((line) => line.includes(c))
  const NOT_FOUND = -1

  const blockStartIndex = findIndex(lines, start)
  const blockEndIndex = findIndex(lines, end)
  const blockExists = findIndex(lines, start) !== NOT_FOUND && blockEndIndex !== NOT_FOUND

  if (blockExists) {
    const blockLength = blockEndIndex - blockStartIndex + 1
    lines.splice(blockStartIndex, blockLength) // mutates `lines`
  }

  const updateContents = lines.join("\n")

  const anotherBlockExists =
    findIndex(lines, start) !== NOT_FOUND && findIndex(lines, end) !== NOT_FOUND
  if (anotherBlockExists) {
    return removeBlocks(updateContents, comment)
  }

  return updateContents
}

/**
 * Perform all operations possible in a file
 * @param contents The file contents as a string
 * @return The file contents with all remove operations performed
 */
export function updateFile(contents: string, markupPrefix: string): string {
  let result = contents
  result = removeBlocks(result, {
    start: markupComment(markupPrefix, MarkupComments.RemoveBlockStart),
    end: markupComment(markupPrefix, MarkupComments.RemoveBlockEnd),
  })
  result = removeCurrentLine(result, markupComment(markupPrefix, MarkupComments.RemoveCurrentLine))
  result = removeNextLine(result, markupComment(markupPrefix, MarkupComments.RemoveNextLine))
  result = replaceNextLine(result, markupComment(markupPrefix, MarkupComments.ReplaceNextLine))

  return result
}

const DEFAULT_MATCHING_GLOBS = [
  "!**/.DS_Store",
  "!**/.expo{,/**}",
  "!**/.git{,/**}",
  "!**/.vscode{,/**}",
  "!**/node_modules{,/**}",
  "!**/ios/build{,/**}",
  "!**/ios/Pods{,/**}",
  "!**/ios/*.xcworkspace{,/**}",
  "!**/android/build{,/**}",
  "!**/android/app/build{,/**}",
]

/**
 * Perform replace on all types of markup
 * @param contents The file contents as a string
 * @return The file contents with all CommentType removed
 */

export function findFiles(targetDir: string, matching?: string[]) {
  const filePaths = filesystem
    .cwd(targetDir)
    .find({
      matching: matching ?? DEFAULT_MATCHING_GLOBS,
      recursive: true,
      files: true,
      directories: false,
    })
    .map((path) => pathlib.join(targetDir, path))
  return filePaths
}

export function removeEmptyDirs({
  targetDir,
  dryRun,
  matching = DEFAULT_MATCHING_GLOBS,
}: {
  targetDir: string
  dryRun: boolean
  matching?: string[]
}) {
  const removedDirs: string[] = []
  const getEmptyDirPaths = () =>
    filesystem
      .cwd(targetDir)
      .find({
        matching,
        recursive: true,
        files: false,
        directories: true,
      })
      .map((path) => pathlib.join(targetDir, path))
      .filter((path) => !filesystem.list(path)?.length)

  let emptyDirPaths = getEmptyDirPaths()
  while (emptyDirPaths.length > 0) {
    emptyDirPaths.forEach((path) => {
      if (!dryRun) filesystem.remove(path)
      removedDirs.push(path)
    })
    emptyDirPaths = getEmptyDirPaths()
  }

  return removedDirs
}

export async function deleteFiles({
  filePaths,
  comment,
  dryRun = true,
}: {
  filePaths: string[]
  comment: string
  dryRun?: boolean
}) {
  const commentResults = await Promise.allSettled(
    filePaths.map(async (path) => {
      const { remove } = filesystem
      const { exists } = patching
      if (await exists(path, comment)) {
        if (!dryRun) {
          remove(path)
        }
        return { path }
      }
    }),
  )

  return commentResults
}

export async function updateFiles({
  filePaths,
  markupPrefix,
  dryRun = true,
  removeMarkupOnly = false,
}: {
  filePaths: string[]
  markupPrefix: string
  dryRun?: boolean
  removeMarkupOnly?: boolean
}) {
  const sanitize = (contents: string) => {
    return contents.replace(markupRegex(markupPrefix), "")
  }

  // Go through every file path and handle the operation for each comment
  const commentResults = await Promise.allSettled(
    filePaths.map(async (path) => {
      const { exists, update } = patching
      const { read } = filesystem

      const comments: string[] = []

      // remove files first
      if (await exists(path, markupComment(markupPrefix, MarkupComments.RemoveFile))) {
        console.log("removing file", path)
        if (!dryRun) {
          if (removeMarkupOnly) {
            const contents = read(path)
            const sanitized = sanitize(contents)
            filesystem.write(path, sanitized)
          } else {
            filesystem.remove(path)
          }
        }
        comments.push(MarkupComments.RemoveFile)
        return { path, comments }
      }

      // filter out RemoveFile (weve already handled it above)
      // and create a regex for the remaining comment types
      const operationComments = Object.keys(MarkupComments)
        .filter((key) => MarkupComments[key] !== MarkupComments.RemoveFile)
        .map((key) => markupComment(markupPrefix, MarkupComments[key]))

      const shouldUpdate = removeMarkupOnly
        ? markupRegex(markupPrefix)
        : RegExp(operationComments.join("|"), "g")

      if (await exists(path, shouldUpdate)) {
        const before = read(path)

        operationComments.forEach((operation) => {
          if (before.includes(operation)) {
            comments.push(operation)
          }
        })

        if (!dryRun) {
          await update(path, (contents: string) => {
            let result = contents
            if (removeMarkupOnly) {
              result = sanitize(result)
            } else {
              result = updateFile(result, markupPrefix)
              result = sanitize(result)
            }
            return result
          })
        }
      }

      return { path, comments }
    }),
  )

  return commentResults
}
