export enum CommentType {
  REMOVE_FILE = `// @demo remove-file`,
  REMOVE_CURRENT_LINE = `// @demo remove-current-line`,
  REMOVE_NEXT_LINE = `// @demo remove-next-line`,
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
    return line.includes(comment) === false && prevLine?.includes(comment) === false
  })
  return result.join("\n")
}

export const demo = {
  CommentType,
  removeCurrentLine,
  removeNextLine,
} as const
