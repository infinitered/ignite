/**
 * enquirer style customization
 * @see https://github.dev/enquirer/enquirer/blob/36785f3399a41cd61e9d28d1eb9c2fcd73d69b4c/examples/select/option-elements.js#L19
 */
export const prefix = (state: { status: "pending" | "submitted" | "canceled" }): string => {
  return {
    pending: "📝",
    submitted: "✅",
    cancelled: "❌",
  }[state.status]
}

/** Format displayed messages for prompts */
export const format = {
  /** Format boolean values for human on prompts  */
  boolean: (value: string): string | Promise<string> => {
    return value ? "Yes" : "No"
  },
}

export const prettyPrompt = {
  prefix,
  format,
}
