/**
 * Normalize boolean like values to boolean type.
 */
export const normalizeBoolean = (value: unknown): boolean | undefined => {
  const map = new Map<unknown, boolean>()
  map.set(true, true)
  map.set(false, false)
  map.set("true", true)
  map.set("false", false)
  return map.get(value)
}

/**
 * Windows uses `\` for slash, Unix uses `/` :'(
 *
 * Normalize path to use `/` as path separator.
 */
export const normalizePath = (input: string) => input.replace(/\\/g, "/")

export const normalize = {
  boolean: normalizeBoolean,
  path: normalizePath,
} as const
