/**
 * Utility for converting 'true' and 'false' strings to booleans.
 *
 * Both `Boolean('true')` and `Boolean('false')` return `true`, because any string is a truthy value.
 * `!!'true'` and `!!'false'` also return `true`, for the same reason.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
 *
 * @param value The value to check.
 * @returns `true` for 'true', `false` for 'false', `Boolean` result otherwise.
 */
export function bool(value: unknown): boolean {
  if (value === "false") return false
  return Boolean(value)
}

/**
 * Utility for converting 'true' and 'false' strings to booleans,
 * while preserving `undefined` values as `undefined` instead of `false`.
 */
export function boolFlag(option: unknown): boolean | undefined {
  if (option === undefined) return undefined
  return bool(option)
}
