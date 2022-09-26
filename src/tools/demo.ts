export enum CommentType {
  REMOVE_FILE = `@demo remove-file`,
  REMOVE_CURRENT_LINE = `@demo remove-current-line`,
  REMOVE_NEXT_LINE = `@demo remove-next-line`,
  REMOVE_BLOCK_START = `@demo remove-block-start`,
  REMOVE_BLOCK_END = `@demo remove-block-end`,
}

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

export const demo = {
  CommentType,
  removeCurrentLine,
  removeNextLine,
  removeBlock,
  remove,
} as const
