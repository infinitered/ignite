import { GluegunToolbox } from "gluegun"
import { children } from "./filesystem-ext"

export const isAndroidInstalled = (toolbox: GluegunToolbox): boolean => {
  const androidHome = process.env.ANDROID_HOME
  const hasAndroidEnv = !toolbox.strings.isBlank(androidHome)
  const hasAndroid = hasAndroidEnv && toolbox.filesystem.exists(`${androidHome}/tools`) === "dir"

  return Boolean(hasAndroid)
}

type CopyBoilerplateOptions = {
  boilerplatePath: string
  projectName: string
  excluded: Array<string | RegExp>
}

/**
 * Copies the boilerplate over to the destination folder.
 *
 */
export async function copyBoilerplate(toolbox: GluegunToolbox, options: CopyBoilerplateOptions) {
  const { filesystem } = toolbox
  const { copyAsync, path } = filesystem

  // ensure the desitnation folder exists
  await filesystem.dirAsync(options.projectName)

  // rather than copying everything wholesale, let's check what's in the boilerplate folder
  // and copy over everything except stuff like lockfiles and node_modules
  // just to make it faster, y'know? Don't want to copy unnecessary stuff
  const filesAndFolders = children(options.boilerplatePath, true)
  const copyTargets = filesAndFolders.filter(
    (file) =>
      !options.excluded.find((exclusion) =>
        exclusion instanceof RegExp ? exclusion.test(file) : exclusion === file,
      ),
  )

  // kick off a bunch of copies
  const copyPromises = copyTargets.map((fileOrFolder) =>
    copyAsync(path(options.boilerplatePath, fileOrFolder), path(options.projectName, fileOrFolder)),
  )

  // copy them all at once
  return Promise.all(copyPromises)
}
