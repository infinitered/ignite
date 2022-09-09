import { GluegunToolbox } from "gluegun"
import { prefix } from "./pretty"

export async function validateProjectName(toolbox: GluegunToolbox): Promise<string> {
  const { parameters, strings, print } = toolbox
  const { isBlank, upperFirst, camelCase } = strings

  // grab the project name
  let projectName: string = (parameters.first || "").toString()

  // verify the project name is a thing
  if (isBlank(projectName)) {
    const projectNameResponse = await toolbox.prompt.ask(() => ({
      name: "projectName",
      type: "input",
      message: "What do you want to call it?",
      prefix,
    }))
    projectName = projectNameResponse.projectName
  }

  // warn if more than one argument is provided for <projectName>
  if (parameters.second) {
    print.info(`Info: You provided more than one argument for <projectName>. The first one (${projectName}) will be used and the rest are ignored.`) // prettier-ignore
  }

  // guard against `ignite new ignite`
  if (projectName.toLowerCase() === "ignite") {
    print.error(
      `Hey...that's my name! Please name your project something other than '${projectName}'.`,
    )
    process.exit(1)
  }

  // check for kebabs
  if (`${projectName}`.includes("-")) {
    // camelCase the project name for user example
    const projectNameCamel = upperFirst(camelCase(projectName))

    print.error(`Please use camel case for your project name. Ex: ${projectNameCamel}`)
    process.exit(1)
  }

  // check for numbers-only names
  if (/^\d+$/.test(projectName)) {
    print.error(`Please use at least one non-numeric character for your project name.`)
    process.exit(1)
  }

  // check for alphanumeric name, beginning with a letter
  if (!/^[a-z_][a-z0-9_]+$/i.test(projectName)) {
    print.error(
      `The project name can only contain alphanumeric characters and underscore, but must not begin with a number.`,
    )
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
