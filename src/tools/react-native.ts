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

export async function renameReactNativeApp(
  toolbox: GluegunToolbox,
  oldName: string,
  newName: string,
  oldBundleIdentifier: string,
  newBundleIdentifier: string,
) {
  const { parameters, patching, filesystem, print } = toolbox
  // debug?
  const debug = Boolean(parameters.options.debug)
  const log = <T = unknown>(m: T): T => {
    debug && print.info(` ${m}`)
    return m
  }

  const oldnamelower = oldName.toLowerCase()
  const newnamelower = newName.toLowerCase()

  async function rename(oldFile: string, newFile: string) {
    log(`Renaming ${oldFile} to ${newFile}`)
    return filesystem.renameAsync(oldFile, newFile)
  }

  // rename files and folders

  // prettier-ignore
  await Promise.allSettled([
    rename(`android/app/src/main/java/com/${oldnamelower}`, newnamelower),
    rename(`android/app/src/debug/java/com/${oldnamelower}`, newnamelower),
    rename(`ios/${oldName}.xcodeproj/xcshareddata/xcschemes/${oldName}.xcscheme`, `${newName}.xcscheme`),
    rename(`ios/${oldName}Tests/${oldName}Tests.m`, `${newName}Tests.m`),
    rename(`ios/${oldName}-Bridging-Header.h`, `${newName}-Bridging-Header.h`),
    rename(`ios/${oldName}.xcworkspace`, `${newName}.xcworkspace`),
    rename(`ios/${oldName}`, `${newName}`),
  ])

  // these we delay to avoid race conditions
  await Promise.allSettled([
    rename(`ios/${oldName}Tests`, `${newName}Tests`),
    rename(`ios/${oldName}.xcodeproj`, `${newName}.xcodeproj`),
  ])

  // here's a list of all the files to patch the name in
  const filesToReplace = [`./app.json`, `./package.json`]

  // patch the files
  const patchPromises = filesToReplace.map((file) =>
    patching.update(file, (content) => {
      const newContent = content
        .replace(oldName, newName)
        .replace(oldnamelower, newnamelower)
        .replace()
      return newContent
    }),
  )

  // wait for all the patches to finish
  await Promise.allSettled(patchPromises)
}
