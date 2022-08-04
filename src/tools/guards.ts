export function isValidJson(input: string): boolean {
  let isValid = false
  try {
    JSON.parse(input)
    isValid = true
  } catch {}

  return isValid
}
