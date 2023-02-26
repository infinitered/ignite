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
  targetPath: string
  excluded: Array<string>
  overwrite?: boolean
}

/**
 * Copies the boilerplate over to the destination folder.
 *
 */
export async function copyBoilerplate(toolbox: GluegunToolbox, options: CopyBoilerplateOptions) {
  const { filesystem } = toolbox
  const { copyAsync, path } = filesystem

  // ensure the destination folder exists
  await filesystem.dirAsync(options.targetPath)

  // rather than copying everything wholesale, let's check what's in the boilerplate folder
  // and copy over everything except stuff like lockfiles and node_modules
  // just to make it faster, y'know? Don't want to copy unnecessary stuff
  const filesAndFolders = children(options.boilerplatePath, true)
  const copyTargets = filesAndFolders.filter(
    (file) => !options.excluded.find((exclusion) => file.includes(exclusion)),
  )

  const { overwrite } = options
  // kick off a bunch of copies
  const copyPromises = copyTargets.map((fileOrFolder) =>
    copyAsync(path(options.boilerplatePath, fileOrFolder), path(options.targetPath, fileOrFolder), {
      ...(overwrite && { overwrite }),
    }),
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
  const { parameters, filesystem, print, strings } = toolbox
  const { kebabCase } = strings
  const { path } = filesystem

  // debug?
  const debug = Boolean(parameters.options.debug)
  const log = <T = unknown>(m: T): T => {
    debug && print.info(` ${m}`)
    return m
  }

  // lower case stuff
  const oldnamelower = oldName.toLowerCase()
  const newnamelower = newName.toLowerCase()

  // kebab case
  const oldnamekebab = kebabCase(oldName)
  const newnamekebab = kebabCase(newName)

  // SCREAMING_SNAKE_CASE
  const oldnamesnake = oldnamelower.replace(/[^a-z0-9]/g, "_").toUpperCase()
  const newnamesnake = newnamelower.replace(/[^a-z0-9]/g, "_").toUpperCase()

  async function rename(oldFile: string, newFile: string) {
    log(`Renaming ${oldFile} to ${newFile}`)
    return filesystem.renameAsync(oldFile, newFile)
  }

  // rename files and folders

  // prettier-ignore
  await Promise.allSettled([
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

  // if the bundle identifier / android package name changed,
  // we need to move everything to the new folder structure
  const oldPath = oldBundleIdentifier.replace(/\./g, "/")
  const newPath = newBundleIdentifier.replace(/\./g, "/")

  if (oldBundleIdentifier !== newBundleIdentifier) {
    log(`Renaming bundle identifier to ${newBundleIdentifier}`)

    // move everything at the old bundle identifier path to the new one
    await Promise.allSettled([
      filesystem.moveAsync(
        `android/app/src/main/java/${oldPath}`,
        `android/app/src/main/java/${newPath}`,
      ),
      filesystem.moveAsync(
        `android/app/src/debug/java/${oldPath}`,
        `android/app/src/debug/java/${newPath}`,
      ),
    ])
  }

  // here's a list of all the files to patch the name in
  const filesToPatch = [
    `app.json`,
    `package.json`,
    `index.js`,
    `android/settings.gradle`,
    `android/app/_BUCK`,
    `android/app/BUCK`,
    `android/app/build.gradle`,
    `android/app/src/debug/java/${newPath}/ReactNativeFlipper.java`,
    `android/app/src/main/AndroidManifest.xml`,
    `android/app/src/main/java/${newPath}/MainActivity.java`,
    `android/app/src/main/java/${newPath}/MainApplication.java`,
    `android/app/src/main/java/${newPath}/MainApplication.java`,
    `android/app/src/main/java/${newPath}/newarchitecture/MainApplicationReactNativeHost.java`,
    `android/app/src/main/java/${newPath}/newarchitecture/components/MainComponentsRegistry.java`,
    `android/app/src/main/java/${newPath}/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate.java`,
    `android/app/src/main/jni/Android.mk`,
    `android/app/src/main/jni/MainApplicationTurboModuleManagerDelegate.h`,
    `android/app/src/main/jni/MainComponentsRegistry.h`,
    `android/app/src/main/res/values/strings.xml`,
    `ios/Podfile`,
    `ios/main.jsbundle`, // this file could just be regenerated, but this isn't bad to do
    `ios/${newName}/Info.plist`,
    `ios/${newName}.xcodeproj/project.pbxproj`,
    `ios/${newName}.xcodeproj/xcshareddata/xcschemes/${newName}.xcscheme`,
    `ios/${newName}.xcworkspace/contents.xcworkspacedata`,
    `ios/${newName}Tests/${newName}Tests.m`,
    `ios/${newName}/AppDelegate.mm`,
    `ios/${newName}/LaunchScreen.storyboard`,
  ]

  // patch the files
  await Promise.allSettled(
    filesToPatch.map(async (file) => {
      // no need to patch files that don't exist
      const exists = await filesystem.existsAsync(path(file))
      if (!exists) return

      const content = await filesystem.readAsync(path(process.cwd(), file), "utf8")

      log(`Patching ${file} - ${oldName} to ${newName} and variants`)

      // replace all instances of the old name and all its variants
      const newContent = content
        .replace(new RegExp(oldBundleIdentifier, "g"), newBundleIdentifier)
        .replace(new RegExp(oldnamekebab, "g"), newnamekebab)
        .replace(new RegExp(oldnamesnake, "g"), newnamesnake)
        .replace(new RegExp(oldName, "g"), newName)
        .replace(new RegExp(oldnamelower, "g"), newnamelower)

      // write the new content back to the file
      await filesystem.writeAsync(file, newContent, { atomic: true })
    }),
  )
}

export async function replaceMaestroBundleIds(
  toolbox: GluegunToolbox,
  oldBundleIdentifier: string,
  newBundleIdentifier: string,
) {
  const { parameters, filesystem, print } = toolbox
  const { path } = filesystem

  // debug?
  const debug = Boolean(parameters.options.debug)
  const log = <T = unknown>(m: T): T => {
    debug && print.info(` ${m}`)
    return m
  }

  // here's a list of all the files to patch the name in
  const filesToPatch = [`.maestro/Login.yaml`, `.maestro/FavoritePodcast.yaml`]

  // patch the files
  await Promise.allSettled(
    filesToPatch.map(async (file) => {
      // no need to patch files that don't exist
      const exists = await filesystem.existsAsync(path(file))
      if (!exists) return

      const content = await filesystem.readAsync(path(process.cwd(), file), "utf8")

      log(`Patching ${file} - ${oldBundleIdentifier} to ${newBundleIdentifier} and variants`)

      // replace all instances of the old name and all its variants
      const newContent = content.replace(new RegExp(oldBundleIdentifier, "g"), newBundleIdentifier)

      // write the new content back to the file
      await filesystem.writeAsync(file, newContent, { atomic: true })
    }),
  )
}
