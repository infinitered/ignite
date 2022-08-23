enum CommentType {
  REMOVE_FILE = `// @demo remove-file`,
  REMOVE_CURRENT_LINE = `// @demo remove-current-line`,
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

export const demo = {
  CommentType,
  removeCurrentLine,
} as const
