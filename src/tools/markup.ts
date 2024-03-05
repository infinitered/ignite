import { filesystem, patching } from "gluegun"
import * as pathlib from "path"

export type CommentType = {
  REMOVE_CURRENT_LINE?: string
  REMOVE_NEXT_LINE?: string
  REMOVE_BLOCK_START?: string
  REMOVE_BLOCK_END?: string
  REMOVE_FILE?: string
}

/**
 * Take the file content as a string and remove any
 * line of code with an `// @x remove-current-line` comment
 */
function removeCurrentLine(contents: string, comment: string): string {
  const lines = contents.split("\n")
  const result = lines.filter((line) => !line.includes(comment))
  return result.join("\n")
}

/**
 * Take the file content as a string and remove the next line
 * of code with the REMOVE_NEXT_LINE comment before it
 */
function removeNextLine(contents: string, comment: string): string {
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
 * Take the file content as a string and remove the lines of code between
 * start and end block comments
 */
function removeBlock(contents: string, comment: { start: string; end: string }): string {
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
    return removeBlock(updateContents, comment)
  }

  return updateContents
}

/**
 * Perform all remove operations possible in a file
 * @param contents The file contents as a string
 * @return The file contents with all remove operations performed
 */
function updateFile(contents: string, commentTypes: CommentType): string {
  let result = contents
  if (commentTypes.REMOVE_BLOCK_START && commentTypes.REMOVE_BLOCK_END) {
    result = removeBlock(result, {
      start: commentTypes.REMOVE_BLOCK_START,
      end: commentTypes.REMOVE_BLOCK_END,
    })
  }
  if (commentTypes.REMOVE_CURRENT_LINE) {
    result = removeCurrentLine(contents, commentTypes.REMOVE_CURRENT_LINE)
  }
  if (commentTypes.REMOVE_NEXT_LINE) {
    result = removeNextLine(contents, commentTypes.REMOVE_NEXT_LINE)
  }
  return result
}

/**
 * Perform replace on all types of markup
 * @param contents The file contents as a string
 * @return The file contents with all CommentType removed
 */

export function findFiles(targetDir: string, matching?: string[]) {
  const MATCHING_GLOBS = [
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

  const filePaths = filesystem
    .cwd(targetDir)
    .find({
      matching: matching ?? MATCHING_GLOBS,
      recursive: true,
      files: true,
      directories: false,
    })
    .map((path) => pathlib.join(targetDir, path))
  return filePaths
}

export async function updateFiles({
  filePaths,
  markupRegex,
  commentTypes,
  dryRun = true,
  onlyMarkup = false,
}: {
  filePaths: string[]
  markupRegex: RegExp
  commentTypes: {
    REMOVE_CURRENT_LINE?: string
    REMOVE_NEXT_LINE?: string
    REMOVE_BLOCK_START?: string
    REMOVE_BLOCK_END?: string
    REMOVE_FILE?: string
  }
  dryRun?: boolean
  onlyMarkup?: boolean
}) {
  const sanitize = (contents: string) => {
    const result = contents.replace(markupRegex, "")
    return result
  }

  // Go through every file path and handle the operation for each comment
  const commentResults = await Promise.allSettled(
    filePaths.map(async (path) => {
      const { exists, update } = patching
      const { read } = filesystem
      const {
        REMOVE_CURRENT_LINE,
        REMOVE_NEXT_LINE,
        REMOVE_BLOCK_START,
        REMOVE_BLOCK_END,
        REMOVE_FILE,
      } = commentTypes

      const comments: string[] = []

      if (REMOVE_FILE && (await exists(path, REMOVE_FILE))) {
        if (!dryRun) {
          if (onlyMarkup) {
            const contents = read(path)
            const sanitized = sanitize(contents)
            filesystem.write(path, sanitized)
          } else {
            filesystem.remove(path)
          }
        }
        comments.push(REMOVE_FILE)
        return { path, comments }
      }

      const operations = [
        REMOVE_CURRENT_LINE,
        REMOVE_NEXT_LINE,
        REMOVE_BLOCK_START,
        REMOVE_BLOCK_END,
      ]

      const shouldUpdate = onlyMarkup ? markupRegex : RegExp(operations.join("|"), "g")

      if (await exists(path, shouldUpdate)) {
        const before = read(path)

        operations.forEach((operation) => {
          if (before.includes(operation)) {
            comments.push(operation)
          }
        })

        if (!dryRun)
          await update(path, (contents: string) => {
            let result = contents
            if (onlyMarkup) {
              result = sanitize(result)
            } else {
              result = updateFile(result, commentTypes)
            }
            return result
          })
      }

      return { path, comments }
    }),
  )

  return commentResults
}
