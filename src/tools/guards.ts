export function isStringifiedJson(input: unknown): input is string {
  if (typeof input !== "string") {
    return false
  }

  let isValid = false
  try {
    JSON.parse(input)
    isValid = true
  } catch {}

  return isValid
}

export function isYarnListOutput(output: unknown): output is string {
  return (
    typeof output === "string" &&
    output.split("\n").some((line) => {
      const match = line.match(/info "([^@]+)@([^"]+)" has binaries/)
      return match?.length > 0
    })
  )
}

export type NpmListOutput = { dependencies: Record<string, { version: string }> }
export function isNpmListOutput(output: unknown): output is NpmListOutput {
  if (typeof output !== "object" || Array.isArray(output) === true || output === null) {
    return false
  }

  return (
    "dependencies" in output &&
    Object.entries((output as { dependencies: unknown }).dependencies).every(
      ([key, value]) =>
        typeof key === "string" &&
        typeof value === "object" &&
        "version" in value &&
        typeof value.version === "string",
    )
  )
}
