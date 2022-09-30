import { filesystem, patching } from "gluegun"
import * as pathlib from "path"

export enum CommentType {
  REMOVE_FILE = `@demo remove-file`,
  REMOVE_CURRENT_LINE = `@demo remove-current-line`,
  REMOVE_NEXT_LINE = `@demo remove-next-line`,
  REMOVE_BLOCK_START = `@demo remove-block-start`,
  REMOVE_BLOCK_END = `@demo remove-block-end`,
}

/**
 * Regex pattern to find the various types of // @demo remove-x comments
 *
 * NOTE: This currently will _NOT_ remove a multiline comment
 */
export const demoMarkupRegex = /\s*\/\/\s*@demo.*|{?\/.*@demo.*\/}?/gm

/**
 * Take the file content as a string and remove any
 * line of code with an `// @demo remove-current-line` comment
 */
function removeCurrentLine(contents: string, comment = CommentType.REMOVE_CURRENT_LINE): string {
  const lines = contents.split("\n")
  const result = lines.filter((line) => !line.includes(comment))
  return result.join("\n")
}

/**
 * Take the file content as a string and remove the next line
 * of code with an `// @demo remove-next-line` comment before it
 */
function removeNextLine(contents: string, comment = CommentType.REMOVE_NEXT_LINE): string {
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
 * `// @demo remove-block-start` and `// @demo remove-block-end` comments
 */
function removeBlock(
  contents: string,
  comment = { start: CommentType.REMOVE_BLOCK_START, end: CommentType.REMOVE_BLOCK_END },
): string {
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
function remove(contents: string): string {
  const result = removeBlock(removeNextLine(removeCurrentLine(contents)))
  return result
}

/**
 * Perform replace on all types of @demo markup
 * @param contents The file contents as a string
 * @return The file contents with all @demo related CommentType removed
 */
function sanitize(contents: string): string {
  const result = contents.replace(demoMarkupRegex, "")
  return result
}

function find(targetDir: string, matching?: string[]) {
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

async function update({
  filePaths,
  dryRun = true,
  onlyMarkup = false,
}: {
  filePaths: string[]
  dryRun?: boolean
  onlyMarkup?: boolean
}) {
  // Go through every file path and handle the operation for each demo comment
  const demoCommentResults = await Promise.allSettled(
    filePaths.map(async (path) => {
      const { exists, update } = patching
      const { read } = filesystem
      const {
        REMOVE_CURRENT_LINE,
        REMOVE_NEXT_LINE,
        REMOVE_BLOCK_START,
        REMOVE_BLOCK_END,
        REMOVE_FILE,
      } = demo.CommentType

      const comments: CommentType[] = []

      if (await exists(path, REMOVE_FILE)) {
        if (!dryRun && !onlyMarkup) filesystem.remove(path)
        comments.push(REMOVE_FILE)
        return { path, comments }
      }

      const operations = [
        REMOVE_CURRENT_LINE,
        REMOVE_NEXT_LINE,
        REMOVE_BLOCK_START,
        REMOVE_BLOCK_END,
      ]
      const shouldUpdate = onlyMarkup
        ? RegExp(demoMarkupRegex, "gm")
        : RegExp(operations.join("|"), "g")

      if (await exists(path, shouldUpdate)) {
        const before = read(path)

        operations.forEach((operation) => {
          if (before.includes(operation)) {
            comments.push(operation)
          }
        })

        if (!dryRun) await update(path, onlyMarkup ? demo.sanitize : demo.remove)
      }

      return { path, comments }
    }),
  )

  return demoCommentResults
}

export const demo = {
  CommentType,
  removeCurrentLine,
  removeNextLine,
  removeBlock,
  remove,
  sanitize,
  find,
  update,
} as const
