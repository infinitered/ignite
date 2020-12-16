import { GluegunToolbox } from "gluegun"

export function validateProjectName(toolbox: GluegunToolbox): string {
  const { parameters, strings, print, runtime } = toolbox
  const { isBlank, upperFirst, camelCase } = strings

  // grab the project name
  const projectName = (parameters.first || "").toString()

  // verify the project name is a thing
  if (isBlank(projectName)) {
    print.info(`${runtime.brand} new <projectName>\n`)
    print.error("Project name is required")
    process.exit(1)
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
