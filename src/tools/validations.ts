import { GluegunToolbox, strings } from "gluegun"
import { prefix } from "./pretty"
const { pascalCase } = strings

// #region Error Guards
type IsError = (str: string) => boolean
type ErrorMessage = (str?: string) => string
type ErrorGuard = [IsError, ErrorMessage]

const isIgnite: ErrorGuard = [
  (str) => str.toLowerCase() === "ignite",
  (str) => `Hey...that's my name! Please name your project something other than '${str}'.`,
]
const isOnlyNumbers: ErrorGuard = [
  (str) => /^\d+$/.test(str),
  () => `Please use at least one non-numeric character for your project name`,
]
const isKebabCase: ErrorGuard = [
  (str) => str.includes("-"),
  (str) =>
    `Please use 'PascalCase', not 'kebab-case' for your project name. Ex: ${pascalCase(str)}`,
]
const isNotAlphaNumeric: ErrorGuard = [
  (str) => !/^[a-z_][a-z0-9_]+$/i.test(str),
  () =>
    `The project name can only contain alphanumeric characters and underscore, but must not begin with a number.`,
]

const guards: ErrorGuard[] = [isIgnite, isOnlyNumbers, isKebabCase, isNotAlphaNumeric]

/**
 * check if the value matches any of the error guards
 * @returns error message from the first guard that matches, or `true` if no guards match
 */
const validate = (value: string): true | string => {
  for (const [isError, errorMessage] of guards) {
    if (isError(value)) {
      return errorMessage(value)
    }
  }
  return true
}
// #endregion

export async function validateProjectName(toolbox: GluegunToolbox): Promise<string> {
  const { parameters, strings, print } = toolbox
  const { isBlank } = strings

  // grab the project name
  let projectName: string = (parameters.first || "").toString()

  // verify the project name is a thing
  if (isBlank(projectName)) {
    const projectNameResponse = await toolbox.prompt.ask(() => ({
      name: "projectName",
      type: "input",
      message: "What do you want to call it?",
      prefix,
      validate,
    }))
    projectName = projectNameResponse.projectName
  }

  // warn if more than one argument is provided for <projectName>
  if (parameters.second) {
    print.info(`Info: You provided more than one argument for <projectName>. The first one (${projectName}) will be used and the rest are ignored.`) // prettier-ignore
  }

  const error = validate(projectName)
  if (typeof error === "string") {
    print.error(error)
    process.exit(1)
  }

  return projectName
}

export function validateBundleIdentifier(
  toolbox: GluegunToolbox,
  bundleID: string | undefined,
): string | undefined {
  const { print } = toolbox

  // no bundle ID provided
  if (bundleID === undefined) return undefined

  const id = bundleID.split(".")
  const validBundleID = /^([a-zA-Z]([a-zA-Z0-9_])*\.)+[a-zA-Z]([a-zA-Z0-9_])*$/u
  if (id.length < 2) {
    print.error(
      'Invalid Bundle Identifier. Add something like "com.travelapp" or "com.junedomingo.travelapp"',
    )
    process.exit(1)
  }
  if (!validBundleID.test(bundleID)) {
    print.error(
      "Invalid Bundle Identifier. It must have at least two segments (one or more dots). Each segment must start with a letter. All characters must be alphanumeric or an underscore [a-zA-Z0-9_]",
    )
    process.exit(1)
  }

  return bundleID
}

export type ValidationsExports = {
  validateProjectName: typeof validateProjectName
  validateBundleIdentifier: typeof validateBundleIdentifier
}
