export function isValidJson(input: string): boolean {
  let isValid = false
  try {
    JSON.parse(input)
    isValid = true
  } catch {}

  return isValid
}

export function isYarnListOutput(output: unknown): boolean {
  return (
    typeof output === "string" &&
    output.split("\n").some((line) => {
      const match = line.match(/info "([^@]+)@([^"]+)" has binaries/)
      return match?.length > 0
    })
  )
}
